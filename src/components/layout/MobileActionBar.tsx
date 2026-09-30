"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Siren } from "lucide-react";
import { siteConfig, telHref } from "@/config/site";

/** Barre d'actions fixe en bas de l'écran sur mobile : Rendez-vous + Urgences. */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/rendez-vous") return null;
  const { emergencyPhone } = siteConfig.contact;
  const href = telHref(emergencyPhone);
  const urgentCls = "flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-alert-600 px-5 font-semibold text-white active:bg-alert-700";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-[1fr_auto] gap-2 p-3">
        <Link
          href="/rendez-vous"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-care-600 font-semibold whitespace-nowrap text-white active:bg-care-700"
        >
          <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
        </Link>
        {href ? (
          <a href={href} aria-label={`Appeler les urgences au ${emergencyPhone.display}`} className={urgentCls}>
            <Siren aria-hidden="true" className="h-5 w-5" /> Urgences
          </a>
        ) : (
          <Link href="/contact" className={urgentCls}>
            <Siren aria-hidden="true" className="h-5 w-5" /> Urgences
          </Link>
        )}
      </div>
    </div>
  );
}

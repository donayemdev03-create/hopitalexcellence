import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Logo : définir `siteConfig.logo` pour utiliser le fichier officiel. */
export function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group inline-flex items-center gap-3" aria-label={`${siteConfig.name} — accueil`}>
      {siteConfig.logo ? (
        <Image src={siteConfig.logo} alt="" width={160} height={40} className="h-10 w-auto" priority />
      ) : (
        <>
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-600 shadow-[0_6px_16px_-6px_rgba(26,86,207,.8)] transition group-hover:rotate-6">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="#fff" />
            </svg>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-care-500" />
          </span>
          <span className="flex flex-col leading-none" aria-hidden="true">
            <span
              className={`text-[0.7rem] font-semibold tracking-[0.2em] uppercase ${light ? "text-brand-200" : "text-brand-600"}`}
            >
              Hôpital
            </span>
            <span className={`font-display text-lg font-semibold ${light ? "text-white" : "text-navy-900"}`}>
              {siteConfig.shortName}
            </span>
          </span>
        </>
      )}
    </Link>
  );
}

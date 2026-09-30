"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Clock, Mail, Menu, Phone, Siren, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig, telHref } from "@/config/site";
import { hoursSummary } from "@/config/hours";
import { Logo } from "@/components/ui/Logo";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { PulseDot } from "@/components/sections/Sections";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { phone, emergencyPhone, email } = siteConfig.contact;

  // Referme le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuButton?.focus();
    };
  }, [open]);

  const linkCls = (active: boolean) =>
    `relative whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-semibold transition ${
      active ? "text-brand-700 bg-brand-50" : "text-ink-600 hover:text-navy-900 hover:bg-slate-50"
    }`;

  return (
    <>
      {/* Barre d'information supérieure (ordinateur) */}
      <div className="hidden bg-navy-900 text-[0.85rem] text-brand-100 lg:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Clock aria-hidden="true" className="h-4 w-4 text-brand-300" /> {hoursSummary}
            </span>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail aria-hidden="true" className="h-4 w-4 text-brand-300" /> {email}
            </a>
          </div>
          <a
            href={telHref(emergencyPhone)}
            className="inline-flex items-center gap-2 font-semibold text-white hover:text-alert-100"
          >
            <PulseDot />
            Urgences {siteConfig.emergencyAvailability.split(" · ")[0]} : <span className="tabular">{emergencyPhone.display}</span>
          </a>
        </div>
      </div>

      <header
        style={{ top: "env(safe-area-inset-top, 0px)" }}
        className={`sticky z-40 border-b bg-white/90 backdrop-blur-md transition ${
          scrolled ? "border-slate-200 shadow-[0_6px_24px_-18px_rgba(13,36,71,.5)]" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={active ? "page" : undefined} className={linkCls(active)}>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ButtonAnchor
              href={telHref(phone)}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex xl:hidden 2xl:inline-flex"
            >
              <Phone aria-hidden="true" className="h-4 w-4" /> <span className="tabular">{phone.display}</span>
            </ButtonAnchor>
            <ButtonLink href="/rendez-vous" size="sm" className="hidden min-h-[44px]! sm:inline-flex">
              <CalendarCheck aria-hidden="true" className="h-4 w-4" /> Prendre rendez-vous
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 text-navy-900 transition hover:bg-slate-50 xl:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile (tiroir) */}
      <div className={`fixed inset-0 z-50 overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`} inert={!open}>
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-950/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute top-0 right-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
            <Logo onClick={() => setOpen(false)} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-slate-50"
              aria-label="Fermer le menu"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul>
              {mainNav.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[52px] items-center rounded-xl px-4 font-display text-lg font-medium transition ${
                        active ? "bg-brand-50 text-brand-700" : "text-navy-900 hover:bg-slate-50"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-slate-100 p-5">
            <ButtonLink href="/rendez-vous" size="lg" className="w-full">
              <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
            </ButtonLink>
            <ButtonAnchor href={telHref(emergencyPhone)} variant="danger" size="lg" className="w-full">
              <Siren aria-hidden="true" className="h-5 w-5" /> Appeler les urgences
            </ButtonAnchor>
            <p className="text-center text-sm text-ink-500">
              Urgences {siteConfig.emergencyAvailability.split(" · ")[0]} :{" "}
              <span className="tabular font-semibold text-alert-700">{emergencyPhone.display}</span>
            </p>
            <p className="pt-1 text-center text-sm text-ink-500">
              Accueil : <span className="tabular font-semibold text-navy-800">{phone.display}</span>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

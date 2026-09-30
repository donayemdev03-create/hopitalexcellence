/**
 * Sections réutilisées sur plusieurs pages (reprises de la maquette) :
 * en-tête de page, horaires complémentaires, urgences, témoignages,
 * contact rapide, chiffres clés, bandeau d'appel à l'action.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarCheck, ChevronRight, Mail, MapPin, MessageCircle, Phone, Quote, Star } from "lucide-react";
import { formatAddress, siteConfig, telHref } from "@/config/site";
import { extraHours } from "@/config/hours";
import { stats, testimonials } from "@/content/content";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ---------- En-tête des pages intérieures ---------- */
export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  text,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-mist">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-x relative py-12 sm:py-16">
        <nav aria-label="Fil d'Ariane" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
            <li>
              <Link href="/" className="hover:text-brand-700">
                Accueil
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand-700">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-navy-800">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-brand-500" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-[2.1rem] leading-[1.1] font-semibold sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-ink-500">{text}</p>}
        {children}
      </div>
    </section>
  );
}

/* ---------- Horaires complémentaires ---------- */
export function ExtraHours() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {extraHours.map((h) => (
        <li key={h.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-ink-500">{h.label}</p>
          <p className="tabular mt-1 font-semibold text-navy-900">{h.value}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Pastille animée ---------- */
export function PulseDot({ className = "bg-alert-500" }: { className?: string }) {
  return (
    <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
      <span className={`absolute inset-0 animate-pulse-ring rounded-full ${className}`} />
      <span className={`relative h-2.5 w-2.5 rounded-full ${className}`} />
    </span>
  );
}

/* ---------- Urgences ---------- */
export function EmergencyBanner() {
  const { emergencyPhone } = siteConfig.contact;
  return (
    <section aria-labelledby="urgence-titre" className="container-x">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-alert-600 to-alert-900 p-7 text-white sm:p-10 lg:p-12">
        <svg className="absolute -top-10 -right-10 h-64 w-64 text-white/10" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="currentColor" />
        </svg>
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              <PulseDot className="bg-white" />
              Service ouvert {siteConfig.emergencyAvailability}
            </p>
            <h2 id="urgence-titre" className="mt-4 text-3xl font-semibold text-white! sm:text-4xl">
              Une urgence médicale ?
            </h2>
            <p className="mt-3 max-w-xl text-lg text-white/85">
              Appelez immédiatement notre service des urgences. Une équipe médicale est présente jour et nuit, y compris les
              week-ends et jours fériés.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur sm:p-6">
            <p className="text-sm font-semibold tracking-[0.12em] text-white/70 uppercase">Numéro des urgences</p>
            <p className="tabular mt-1 font-display text-3xl font-semibold select-all sm:text-[2.1rem]">{emergencyPhone.display}</p>
            <ButtonAnchor href={telHref(emergencyPhone)} variant="light" size="lg" className="mt-5 w-full text-alert-700!">
              <Phone aria-hidden="true" className="h-5 w-5" /> Appeler les urgences
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Témoignages ---------- */
export function Testimonials() {
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <SectionHeading
          eyebrow="Témoignages"
          title="Ce que disent nos patients"
          text="Emplacements réservés à de vrais retours de patients, publiés avec leur accord."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={`${t.name}-${i}`} className="card relative flex flex-col p-7">
              <Quote aria-hidden="true" className="h-8 w-8 text-brand-200" />
              {t.rating !== null && (
                <div className="mt-3 flex gap-0.5" role="img" aria-label={`${t.rating} sur 5`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      aria-hidden="true"
                      className={`h-4 w-4 ${s < t.rating! ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                    />
                  ))}
                </div>
              )}
              <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-ink-700">« {t.text} »</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-display font-semibold text-brand-700"
                >
                  {t.name.replace(/[[\]]/g, "")[0]}
                </span>
                <span>
                  <span className="block font-semibold text-navy-900">{t.name}</span>
                  <span className="text-sm text-ink-500">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact rapide ---------- */
export function QuickContact() {
  const { contact } = siteConfig;
  const address = formatAddress();
  const items = [
    { icon: Phone, label: "Accueil / standard", value: contact.phone.display, href: telHref(contact.phone), cta: "Appeler" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp.display,
      href: contact.whatsapp.href ? `https://wa.me/${contact.whatsapp.href.replace(/\D/g, "")}` : undefined,
      cta: "Écrire",
    },
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}`, cta: "Envoyer un e-mail" },
    { icon: MapPin, label: "Adresse", value: `${address.line1}, ${contact.address.city}`, href: contact.mapUrl || undefined, cta: "Itinéraire" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: I, label, value, href, cta }) => (
        <div key={label} className="card flex flex-col p-6">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <I aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-ink-500">{label}</p>
          <p className="tabular mt-1 flex-1 font-semibold break-words text-navy-900 select-all">{value}</p>
          {href ? (
            <a
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
            >
              {cta}
              <span className="sr-only"> : {label}</span> <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <span className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-semibold text-ink-400" aria-disabled="true">
              {cta} <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Chiffres clés ---------- */
export function StatsBand({ dark = true }: { dark?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4 ${dark ? "bg-white/10" : "bg-slate-200"}`}>
      {stats.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse p-6 sm:p-8 ${dark ? "bg-navy-900" : "bg-white"}`}>
          <dt className={`mt-2 text-[0.95rem] ${dark ? "text-brand-100/80" : "text-ink-500"}`}>{s.label}</dt>
          <dd className={`tabular font-display text-3xl font-semibold sm:text-[2.6rem] ${dark ? "text-white" : "text-navy-900"}`}>
            {s.value}
            <span className={dark ? "text-brand-300" : "text-brand-600"}>{s.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Bandeau d'appel à l'action ---------- */
export function CtaBand({
  title = "Besoin d’une consultation ?",
  text = "Envoyez votre demande en ligne en 2 minutes. Notre secrétariat vous rappelle pour confirmer le créneau.",
}: {
  title?: string;
  text?: string;
}) {
  const { phone } = siteConfig.contact;
  return (
    <section aria-labelledby="cta-titre" className="container-x pt-4 pb-20 sm:pb-24">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 p-8 sm:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-titre" className="text-3xl font-semibold text-white!">
              {title}
            </h2>
            <p className="mt-3 text-lg text-brand-100/85">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/rendez-vous" size="lg">
              <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
            </ButtonLink>
            <ButtonAnchor href={telHref(phone)} variant="ghostLight" size="lg">
              <Phone aria-hidden="true" className="h-5 w-5" /> <span className="tabular">{phone.display}</span>
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}

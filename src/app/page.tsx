import Link from "next/link";
import {
  ArrowRight, CalendarCheck, Clock3, FlaskConical, Phone, ShieldCheck, Siren, Star, Stethoscope, UsersRound,
} from "lucide-react";
import { siteConfig, telHref } from "@/config/site";
import { images } from "@/config/images";
import { services } from "@/content/services";
import { doctors } from "@/content/doctors";
import { stats, whyUs } from "@/content/content";
import { hospitalJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { HospitalScene } from "@/components/illustrations/HospitalScene";
import { HoursCard } from "@/components/sections/HoursCard";
import { EmergencyBanner, ExtraHours, QuickContact, StatsBand, Testimonials } from "@/components/sections/Sections";

function Hero() {
  const [firstLine, ...rest] = siteConfig.tagline.split(", ");
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-mist to-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-20 -left-40 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-xs">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Hôpital général · {siteConfig.contact.address.city}
          </p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.2rem]">
            {firstLine},
            <br />
            <span className="text-brand-600">{rest.join(", ")}.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            Depuis {siteConfig.foundedYear}, {siteConfig.name} réunit médecins spécialistes, urgences 24 h/24, laboratoire et
            imagerie sous un même toit, pour des soins sûrs et humains.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/rendez-vous" size="lg">
              <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Découvrir nos services <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            {[
              { icon: Clock3, v: "24/7", l: "Urgences" },
              { icon: UsersRound, v: stats[0].value, l: "Médecins" },
              { icon: FlaskConical, v: "24 h", l: "Résultats labo" },
            ].map(({ icon: I, v, l }) => (
              <div key={l}>
                <dt className="flex items-center gap-1.5 text-sm text-ink-500">
                  <I aria-hidden="true" className="h-4 w-4 text-care-600" />
                  {l}
                </dt>
                <dd className="tabular mt-1 font-display text-2xl font-semibold text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <Photo
            src={images.hero}
            alt={`Façade de ${siteConfig.name}`}
            priority
            className="aspect-[4/3.4] w-full rounded-[2rem] shadow-lift ring-1 ring-slate-200/70"
            fallback={<HospitalScene className="h-full w-full" label={siteConfig.shortName} idPrefix="hero" />}
          />

          <div className="absolute right-3 -bottom-6 left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-slate-100 sm:right-auto sm:-left-6 sm:w-72">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-care-50 text-care-600">
              <CalendarCheck aria-hidden="true" className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-ink-500">Rendez-vous en ligne</p>
              <p className="font-semibold text-navy-900">Demande en 2 minutes</p>
              <p className="text-xs text-ink-400">Rappel pour confirmer le créneau</p>
            </div>
          </div>
          <div className="absolute top-6 -right-2 hidden items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-lift ring-1 ring-slate-100 sm:flex">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-alert-50 text-alert-600">
              <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-alert-500/30" />
              <Siren aria-hidden="true" className="relative h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ink-500">Urgences</p>
              <p className="text-sm font-semibold text-navy-900">Ouvertes {siteConfig.emergencyAvailability.split(" · ")[0]}</p>
            </div>
          </div>
          <div className="absolute -right-2 bottom-20 hidden items-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-white shadow-lift md:flex">
            <Star aria-hidden="true" className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-display text-lg font-semibold">[—]</span>
            <span className="text-sm text-brand-100/80">satisfaction patients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickAccess() {
  const { emergencyPhone, phone } = siteConfig.contact;
  const tiles = [
    { href: "/rendez-vous", icon: CalendarCheck, title: "Prendre rendez-vous", text: "Demande en ligne en 2 minutes", cls: "bg-care-600 text-white hover:bg-care-700", iconCls: "bg-white/15" },
    { href: "/services", icon: Stethoscope, title: "Nos services", text: `${services.length} spécialités sur place`, cls: "bg-white hover:border-brand-200", iconCls: "bg-brand-50 text-brand-600" },
    { href: telHref(emergencyPhone) ?? "/contact", icon: Siren, title: `Urgences ${siteConfig.emergencyAvailability.split(" · ")[0]}`, text: emergencyPhone.display, cls: "bg-white hover:border-alert-100", iconCls: "bg-alert-50 text-alert-600" },
    { href: "/contact", icon: Phone, title: "Nous contacter", text: phone.display, cls: "bg-white hover:border-brand-200", iconCls: "bg-brand-50 text-brand-600" },
  ];
  return (
    <section aria-label="Accès rapide" className="container-x relative z-10 pt-6 lg:-mt-6 lg:pt-0">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {tiles.map(({ href, icon: I, title, text, cls, iconCls }) => {
          const className = `flex h-full min-h-[88px] flex-col gap-3 rounded-2xl border border-slate-200/70 p-4 shadow-card transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:p-5 ${cls}`;
          const inner = (
            <>
              <span aria-hidden="true" className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${iconCls}`}>
                <I className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display leading-snug font-semibold">{title}</span>
                <span className="tabular block text-sm opacity-75">{text}</span>
              </span>
            </>
          );
          return (
            <li key={title}>
              {href.startsWith("/") ? (
                <Link href={href} className={className}>
                  {inner}
                </Link>
              ) : (
                <a href={href} className={className}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nos services"
          title="Des soins complets, au même endroit"
          text="De la consultation de médecine générale à la chirurgie, nos équipes vous accompagnent à chaque étape."
          action={
            <ButtonLink href="/services" variant="outline">
              Tous les services <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services
            .filter((s) => s.featured)
            .map((s) => (
              <ServiceCard key={s.slug} service={s} compact />
            ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section relative overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Pourquoi nous choisir ?"
          title="Une prise en charge sérieuse, rapide et humaine"
          text="Nous plaçons la sécurité et le confort de chaque patient au cœur de notre organisation."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-200">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white!">{w.title}</h3>
              <p className="mt-2 text-brand-100/75">{w.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <StatsBand />
        </div>
      </div>
    </section>
  );
}

function DoctorsPreview() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nos médecins"
          title="Des spécialistes à votre écoute"
          text="Rencontrez quelques-uns des médecins de l’hôpital. Profils à compléter."
          action={
            <ButtonLink href="/medecins" variant="outline">
              Toute l’équipe <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors
            .filter((d) => d.featured)
            .map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
        </div>
      </div>
    </section>
  );
}

function Hours() {
  return (
    <section className="section bg-mist">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Horaires"
            title="Quand venir nous voir ?"
            text="Les consultations se font de préférence sur rendez-vous. Les urgences et la pharmacie restent ouvertes en permanence."
          />
          <ExtraHours />
          <ButtonLink href="/rendez-vous" className="mt-8" size="lg">
            <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Réserver un créneau
          </ButtonLink>
        </div>
        <HoursCard />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <QuickAccess />
      <ServicesPreview />
      <WhyUs />
      <DoctorsPreview />
      <Hours />
      <div className="py-16 sm:py-20">
        <EmergencyBanner />
      </div>
      <Testimonials />
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Contact rapide"
            title="Une question ? Nous vous répondons"
            action={
              <ButtonLink href="/contact" variant="outline">
                Page contact <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            }
          />
          <QuickContact />
        </div>
      </section>
    </>
  );
}

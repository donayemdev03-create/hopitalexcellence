import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, CheckCircle2, Phone } from "lucide-react";
import { siteConfig, telHref } from "@/config/site";
import { getServiceBySlug, services } from "@/content/services";
import { doctors } from "@/content/doctors";
import { pageMetadata } from "@/lib/seo";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { PageHero } from "@/components/sections/Sections";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({ title: service.name, description: service.short, path: `/services/${service.slug}` });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const team = doctors.filter((d) => d.service === slug);
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const urgent = slug === "urgences";
  const { phone, emergencyPhone } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        text={service.short}
        crumbs={[{ label: "Nos services", href: "/services" }, { label: service.name }]}
      />
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <span
              className={`grid h-16 w-16 place-items-center rounded-2xl ${
                urgent ? "bg-alert-50 text-alert-600" : "bg-brand-50 text-brand-600"
              }`}
            >
              <Icon name={service.icon} className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">Présentation du service</h2>
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-600">{service.description}</p>
            <h3 className="mt-10 text-xl font-semibold">Ce que nous proposons</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-xl border border-slate-200 p-4">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-care-600" />
                  {h}
                </li>
              ))}
            </ul>
            <Link href="/services" className="mt-10 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-700">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Tous les services
            </Link>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-7">
              <h2 className="text-xl font-semibold">{urgent ? "Besoin d’aide maintenant ?" : "Consulter ce service"}</h2>
              <p className="mt-2 text-ink-500">
                {urgent
                  ? `Appelez directement le service des urgences, ouvert ${siteConfig.emergencyAvailability.split(" · ")[0]}.`
                  : "Envoyez une demande, nous vous rappelons pour confirmer le rendez-vous."}
              </p>
              <div className="mt-6 space-y-3">
                {urgent ? (
                  <ButtonAnchor href={telHref(emergencyPhone)} variant="danger" size="lg" className="w-full">
                    <Phone aria-hidden="true" className="h-5 w-5" /> {emergencyPhone.display}
                  </ButtonAnchor>
                ) : (
                  <ButtonLink href={`/rendez-vous?service=${slug}`} size="lg" className="w-full">
                    <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
                  </ButtonLink>
                )}
                <ButtonAnchor href={telHref(phone)} variant="outline" size="lg" className="w-full">
                  <Phone aria-hidden="true" className="h-5 w-5" /> {phone.display}
                </ButtonAnchor>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section bg-mist">
          <div className="container-x">
            <SectionHeading eyebrow="L’équipe" title={`Médecins du service ${service.name.toLowerCase()}`} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="À découvrir" title="Autres services" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} compact />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

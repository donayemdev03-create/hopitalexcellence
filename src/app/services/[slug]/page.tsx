import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/content/services";
import { doctors } from "@/content/doctors";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { DoctorCard } from "@/components/doctors/DoctorCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: `${service.name} : présentation du service, équipe et informations pratiques.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const team = doctors.filter((d) => d.serviceSlug === service.slug);

  return (
    <>
      <PageHeader
        title={service.name}
        intro={service.summary}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 text-muted lg:col-span-2">
            {service.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="pt-4">
              <ButtonLink href={`/rendez-vous?service=${service.slug}`}>Prendre rendez-vous dans ce service</ButtonLink>
            </div>
          </div>
          <ImagePlaceholder label={`Photo du service ${service.name}`} className="aspect-square rounded-card" />
        </div>
      </Section>
      {team.length > 0 && (
        <Section id="equipe" title="L'équipe" tone="alt">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((d) => (
              <li key={d.id}>
                <DoctorCard doctor={d} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

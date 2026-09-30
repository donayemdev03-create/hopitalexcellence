import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata = pageMetadata({
  title: "Services et spécialités",
  description: "Découvrez les services et spécialités médicales de l'établissement.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services et spécialités"
        intro="[Texte d'introduction des services à rédiger.]"
        breadcrumbs={[{ label: "Services" }]}
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Card title={s.name} href={`/services/${s.slug}`} linkLabel="Voir le service">
                {s.summary}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

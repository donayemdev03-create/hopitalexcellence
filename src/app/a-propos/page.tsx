import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata = pageMetadata({
  title: "L'hôpital",
  description: `Présentation de ${siteConfig.name} : histoire, missions et valeurs.`,
  path: "/a-propos",
});

const values = ["[Valeur 1]", "[Valeur 2]", "[Valeur 3]", "[Valeur 4]"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="L'hôpital"
        intro="[Texte de présentation générale de l'établissement.]"
        breadcrumbs={[{ label: "L'hôpital" }]}
      />
      <Section id="histoire" title="Notre histoire">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-muted">
            <p>[Historique de l&apos;établissement à rédiger.]</p>
            <p>[Étapes marquantes, agrandissements, certifications…]</p>
          </div>
          <ImagePlaceholder label="Photo historique ou du bâtiment" className="aspect-video rounded-card" />
        </div>
      </Section>
      <Section id="missions" title="Nos missions et nos valeurs" tone="alt">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v} className="rounded-card bg-surface p-6 shadow-sm">
              <h3 className="font-semibold">{v}</h3>
              <p className="mt-2 text-sm text-muted">[Description à rédiger.]</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="direction" title="Direction et gouvernance">
        <p className="max-w-2xl text-muted">[Présentation de l&apos;équipe de direction à compléter.]</p>
      </Section>
    </>
  );
}

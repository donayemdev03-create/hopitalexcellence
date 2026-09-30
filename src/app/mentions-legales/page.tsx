import { formatAddress, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site.",
  path: "/mentions-legales",
});

export default function LegalPage() {
  return (
    <>
      <PageHeader title="Mentions légales" breadcrumbs={[{ label: "Mentions légales" }]} />
      <Section>
        <Prose>
          <p>
            <strong>Modèle à compléter et à faire valider</strong> par le service juridique de l&apos;établissement.
          </p>
          <h2>Éditeur du site</h2>
          <p>
            {siteConfig.name} — [forme juridique, numéro d&apos;identification]
            <br />
            {formatAddress()}
          </p>
          <h2>Directeur de la publication</h2>
          <p>[Nom et fonction]</p>
          <h2>Hébergement</h2>
          <p>[Nom, adresse et coordonnées de l&apos;hébergeur]</p>
          <h2>Propriété intellectuelle</h2>
          <p>[Conditions d&apos;utilisation des contenus, crédits photos.]</p>
        </Prose>
      </Section>
    </>
  );
}

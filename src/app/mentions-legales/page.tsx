import { formatAddress, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/Sections";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site.",
  path: "/mentions-legales",
});

export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" crumbs={[{ label: "Mentions légales" }]} />
      <section className="section">
        <div className="container-x">
        <Prose>
          <p>
            <strong>Modèle à compléter et à faire valider</strong> par le service juridique de l&apos;établissement.
          </p>
          <h2>Éditeur du site</h2>
          <p>
            {siteConfig.name} — [forme juridique, numéro d&apos;identification]
            <br />
            {formatAddress().line1}, {formatAddress().line2}
          </p>
          <h2>Directeur de la publication</h2>
          <p>[Nom et fonction]</p>
          <h2>Hébergement</h2>
          <p>[Nom, adresse et coordonnées de l&apos;hébergeur]</p>
          <h2>Propriété intellectuelle</h2>
          <p>[Conditions d&apos;utilisation des contenus, crédits photos.]</p>
        </Prose>
      </div>
      </section>
    </>
  );
}

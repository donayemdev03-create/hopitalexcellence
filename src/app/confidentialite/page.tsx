import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/Sections";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment vos données personnelles sont collectées et protégées.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Politique de confidentialité" crumbs={[{ label: "Confidentialité" }]} />
      <section className="section">
        <div className="container-x">
        <Prose>
          <p>
            <strong>Modèle à compléter et à faire valider</strong> par le délégué à la protection des données (DPO) de
            l&apos;établissement.
          </p>
          <h2>Responsable du traitement</h2>
          <p>[Identité et coordonnées du responsable du traitement et du DPO]</p>
          <h2>Données collectées</h2>
          <p>Via le formulaire de demande de rendez-vous :</p>
          <ul>
            <li>nom, prénom ;</li>
            <li>adresse e-mail et numéro de téléphone ;</li>
            <li>service, date et créneau souhaités ;</li>
            <li>motif de la demande (facultatif).</li>
          </ul>
          <h2>Finalités et base légale</h2>
          <p>[À préciser.]</p>
          <h2>Durée de conservation</h2>
          <p>[À préciser.]</p>
          <h2>Vos droits</h2>
          <p>[Droits d&apos;accès, de rectification, d&apos;effacement… et modalités d&apos;exercice.]</p>
          <h2>Cookies</h2>
          <p>Ce site n&apos;utilise actuellement aucun cookie de mesure d&apos;audience ou publicitaire.</p>
        </Prose>
      </div>
      </section>
    </>
  );
}

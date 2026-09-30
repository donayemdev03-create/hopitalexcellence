import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Informations patients",
  description: "Admission, séjour, visites et questions fréquentes.",
  path: "/informations-patients",
});

const topics = [
  { id: "admission", title: "Admission", text: "[Démarches d'admission et documents à prévoir.]" },
  { id: "sejour", title: "Votre séjour", text: "[Informations sur le séjour : chambre, repas, effets personnels.]" },
  { id: "visites", title: "Visites", text: "[Horaires et règles de visite.]" },
  { id: "frais", title: "Frais et prise en charge", text: "[Tarifs, prise en charge, mutuelles et assurances.]" },
  { id: "sortie", title: "Votre sortie", text: "[Formalités de sortie et suivi.]" },
  { id: "droits", title: "Droits des patients", text: "[Droits, réclamations, accès au dossier médical.]" },
];

const faq = [
  { q: "[Question fréquente 1]", a: "[Réponse à rédiger.]" },
  { q: "[Question fréquente 2]", a: "[Réponse à rédiger.]" },
  { q: "[Question fréquente 3]", a: "[Réponse à rédiger.]" },
];

export default function PatientInfoPage() {
  return (
    <>
      <PageHeader
        title="Informations patients"
        intro="Tout ce qu'il faut savoir pour préparer votre venue."
        breadcrumbs={[{ label: "Informations patients" }]}
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li key={t.id} id={t.id} className="scroll-mt-24 rounded-card border border-border p-6">
              <h2 className="text-lg font-semibold">{t.title}</h2>
              <p className="mt-2 text-sm text-muted">{t.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="faq" title="Questions fréquentes" tone="alt">
        <div className="max-w-3xl space-y-3">
          {faq.map((item, i) => (
            <details key={i} className="group rounded-card bg-surface p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

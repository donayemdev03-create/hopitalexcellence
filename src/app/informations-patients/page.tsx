import { BedDouble, ClipboardList, DoorOpen, HandCoins, Scale, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand, PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Informations patients",
  description: "Admission, séjour, visites, frais et droits des patients : tout pour préparer votre venue.",
  path: "/informations-patients",
});

const topics = [
  { id: "admission", icon: ClipboardList, title: "Admission", text: "[Démarches d'admission et documents à prévoir.]" },
  { id: "sejour", icon: BedDouble, title: "Votre séjour", text: "[Informations sur le séjour : chambre, repas, effets personnels.]" },
  { id: "visites", icon: Users, title: "Visites", text: "[Horaires et règles de visite.]" },
  { id: "frais", icon: HandCoins, title: "Frais et prise en charge", text: "[Tarifs, prise en charge, mutuelles et assurances.]" },
  { id: "sortie", icon: DoorOpen, title: "Votre sortie", text: "[Formalités de sortie et suivi.]" },
  { id: "droits", icon: Scale, title: "Droits des patients", text: "[Droits, réclamations, accès au dossier médical.]" },
];

const faq = [
  { q: "[Question fréquente 1]", a: "[Réponse à rédiger.]" },
  { q: "[Question fréquente 2]", a: "[Réponse à rédiger.]" },
  { q: "[Question fréquente 3]", a: "[Réponse à rédiger.]" },
];

export default function PatientInfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Patients"
        title="Informations patients"
        text="Tout ce qu’il faut savoir pour préparer votre venue."
        crumbs={[{ label: "Informations patients" }]}
      />
      <section className="section">
        <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ id, icon: I, title, text }) => (
            <li key={id} id={id} className="card scroll-mt-28 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <I aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-ink-500">{text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
          <div className="max-w-3xl space-y-3">
            {faq.map((item, i) => (
              <details key={i} className="card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-xl text-brand-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <div className="pt-16 sm:pt-20" />
      <CtaBand />
    </>
  );
}

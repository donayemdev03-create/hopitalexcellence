import { Info } from "lucide-react";
import { doctors } from "@/content/doctors";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";
import { CtaBand, PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Nos médecins",
  description: "Consultez les profils des médecins de l'hôpital et prenez rendez-vous avec le praticien de votre choix.",
  path: "/medecins",
});

export default function DoctorsPage() {
  const cards = Object.fromEntries(doctors.map((d) => [d.id, <DoctorCard key={d.id} doctor={d} />]));
  return (
    <>
      <PageHero
        eyebrow="Nos médecins"
        title="Une équipe de spécialistes à votre service"
        text="Consultez les profils de nos médecins et prenez rendez-vous directement avec le praticien de votre choix."
        crumbs={[{ label: "Nos médecins" }]}
      >
        <p className="mt-6 inline-flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink-600 ring-1 ring-slate-200">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Profils à compléter : noms, portraits
          et parcours seront publiés avec l’accord des praticiens.
        </p>
      </PageHero>

      <section className="section pt-10!">
        <div className="container-x">
          <DoctorDirectory doctors={doctors} services={services} cards={cards} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

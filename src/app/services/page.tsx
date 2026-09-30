import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CtaBand, EmergencyBanner, PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Nos services médicaux",
  description: `${services.length} services et spécialités : urgences, maternité, pédiatrie, chirurgie, cardiologie, laboratoire, imagerie…`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Nos services médicaux"
        text={`${services.length} services et spécialités pour vous soigner, de la consultation à l’hospitalisation.`}
        crumbs={[{ label: "Nos services" }]}
      />
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          <div className="flex flex-col justify-center rounded-xl2 border-2 border-dashed border-brand-200 bg-brand-50/50 p-6">
            <h2 className="text-xl font-semibold">Vous ne savez pas quel service choisir ?</h2>
            <p className="mt-2 text-ink-500">
              Prenez rendez-vous en médecine générale : le médecin vous orientera vers le bon spécialiste.
            </p>
          </div>
        </div>
      </section>
      <EmergencyBanner />
      <div className="pt-16 sm:pt-20" />
      <CtaBand />
    </>
  );
}

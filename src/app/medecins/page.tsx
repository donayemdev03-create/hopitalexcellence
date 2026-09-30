import { doctors } from "@/content/doctors";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";

export const metadata = pageMetadata({
  title: "Nos médecins",
  description: "Annuaire des praticiens de l'établissement, par spécialité.",
  path: "/medecins",
});

export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        title="Nos médecins"
        intro="[Texte d'introduction de l'annuaire à rédiger.]"
        breadcrumbs={[{ label: "Médecins" }]}
      />
      <Section>
        <DoctorDirectory doctors={doctors} services={services} />
      </Section>
    </>
  );
}

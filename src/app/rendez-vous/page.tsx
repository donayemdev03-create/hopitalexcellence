import { siteConfig } from "@/config/site";
import { getServiceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { PhoneLink } from "@/components/layout/PhoneLink";

export const metadata = pageMetadata({
  title: "Prendre rendez-vous",
  description: "Demandez un rendez-vous de consultation en ligne.",
  path: "/rendez-vous",
});

export default async function AppointmentPage(props: PageProps<"/rendez-vous">) {
  const { service } = await props.searchParams;
  const defaultService = typeof service === "string" && getServiceBySlug(service) ? service : undefined;

  return (
    <>
      <PageHeader
        title="Prendre rendez-vous"
        intro="Remplissez ce formulaire : le secrétariat vous recontactera pour confirmer le rendez-vous."
        breadcrumbs={[{ label: "Rendez-vous" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p role="note" className="mb-8 rounded-lg bg-warning-soft px-4 py-3 text-sm">
              <strong>Formulaire de démonstration :</strong> aucune demande n&apos;est transmise pour le moment.
            </p>
            <AppointmentForm defaultService={defaultService} />
          </div>
          <aside aria-labelledby="urgence-titre" className="h-fit rounded-card border border-emergency/30 bg-emergency-soft p-6">
            <h2 id="urgence-titre" className="text-lg font-semibold text-emergency">
              Une urgence ?
            </h2>
            <p className="mt-2 text-sm">
              Ce formulaire ne convient pas aux situations urgentes. Contactez immédiatement le service des urgences :
            </p>
            <p className="mt-3 text-xl font-bold text-emergency">
              <PhoneLink phone={siteConfig.contact.emergencyPhone} />
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

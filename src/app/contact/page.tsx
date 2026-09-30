import { formatAddress, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneLink } from "@/components/layout/PhoneLink";

export const metadata = pageMetadata({
  title: "Contact et accès",
  description: "Adresse, téléphone, horaires et plan d'accès de l'établissement.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, hours } = siteConfig;
  return (
    <>
      <PageHeader title="Contact et accès" breadcrumbs={[{ label: "Contact" }]} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Coordonnées</h2>
              <address className="mt-3 space-y-2 not-italic text-muted">
                <p>{formatAddress()}</p>
                <p>
                  Standard : <PhoneLink phone={contact.phone} className="font-medium text-primary underline" />
                </p>
                <p>
                  Urgences : <PhoneLink phone={contact.emergencyPhone} className="font-medium text-emergency underline" />
                </p>
                <p>
                  E-mail :{" "}
                  <a href={`mailto:${contact.email}`} className="font-medium text-primary underline">
                    {contact.email}
                  </a>
                </p>
              </address>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Horaires</h2>
              <dl className="mt-3 divide-y divide-border rounded-card border border-border">
                {hours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="font-medium">{h.label}</dt>
                    <dd className="text-muted">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Accès</h2>
              <p className="mt-3 text-muted">[Transports en commun, parking, accès routier à préciser.]</p>
            </div>
          </div>
          <ImagePlaceholder label="Carte / plan d'accès" className="min-h-80 rounded-card" />
        </div>
      </Section>
    </>
  );
}

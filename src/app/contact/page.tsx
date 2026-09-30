import { Mail, MapPin, MessageCircle, Navigation, Phone, Siren } from "lucide-react";
import { formatAddress, siteConfig, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ButtonAnchor } from "@/components/ui/Button";
import { MapPlaceholder } from "@/components/illustrations/MapPlaceholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/contact/CopyButton";
import { HoursCard } from "@/components/sections/HoursCard";
import { ExtraHours, PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Téléphone, urgences, WhatsApp, e-mail, adresse et horaires de l'hôpital. Envoyez-nous un message.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const address = formatAddress();
  const channels = [
    { icon: Phone, label: "Accueil / standard", value: contact.phone.display, href: telHref(contact.phone), cta: "Appeler" },
    {
      icon: Siren,
      label: `Urgences ${siteConfig.emergencyAvailability.split(" · ")[0]}`,
      value: contact.emergencyPhone.display,
      href: telHref(contact.emergencyPhone),
      cta: "Appeler",
      urgent: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp.display,
      href: contact.whatsapp.href ? `https://wa.me/${contact.whatsapp.href.replace(/\D/g, "")}` : undefined,
      cta: "Écrire",
    },
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}`, cta: "Écrire" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contactez-nous"
        text="Une question, un renseignement ? Appelez-nous, écrivez-nous ou passez nous voir."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Canaux de contact rapides */}
      <section aria-label="Nous joindre" className="container-x pt-10 sm:pt-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: I, label, value, href, cta, urgent }) => (
            <li
              key={label}
              className={`flex flex-col rounded-2xl border p-5 ${urgent ? "border-alert-100 bg-alert-50" : "border-slate-200 bg-white shadow-card"}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl ${urgent ? "bg-alert-600 text-white" : "bg-brand-50 text-brand-600"}`}
                >
                  <I aria-hidden="true" className="h-6 w-6" />
                </span>
                <CopyButton text={value} />
              </div>
              <p className="mt-4 text-sm text-ink-500">{label}</p>
              <p className="tabular mt-0.5 flex-1 font-semibold break-words text-navy-900 select-all">{value}</p>
              <ButtonAnchor href={href} variant={urgent ? "danger" : "outline"} size="sm" className="mt-4 min-h-[46px]! w-full">
                {cta}
                <span className="sr-only"> : {label}</span>
              </ButtonAnchor>
            </li>
          ))}
        </ul>
      </section>

      <section className="section pt-12!">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="card overflow-hidden">
              {/* Carte : remplacer MapPlaceholder par un <iframe> Google Maps en production. */}
              <div className="relative aspect-[16/10]">
                <MapPlaceholder className="h-full w-full" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-500">
                  Emplacement de la carte
                </span>
              </div>
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <address className="flex gap-3 not-italic">
                  <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span>
                    <span className="font-semibold text-navy-900">{address.line1}</span>
                    <br />
                    <span className="text-ink-500">{address.line2}</span>
                  </span>
                </address>
                <ButtonAnchor href={contact.mapUrl || undefined} variant="outline" size="sm" className="min-h-[46px]! shrink-0">
                  <Navigation aria-hidden="true" className="h-4 w-4" /> Itinéraire
                </ButtonAnchor>
              </div>
            </div>
            <HoursCard />
          </div>
        </div>
        <div className="container-x mt-10">
          <ExtraHours />
        </div>
      </section>
    </>
  );
}

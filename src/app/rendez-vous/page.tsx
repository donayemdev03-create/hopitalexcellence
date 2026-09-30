import { ClipboardList, PhoneCall, ShieldCheck, Siren, Stethoscope } from "lucide-react";
import { siteConfig, telHref } from "@/config/site";
import { bookableServices } from "@/content/services";
import { getDoctorById } from "@/content/doctors";
import { pageMetadata } from "@/lib/seo";
import { ButtonAnchor } from "@/components/ui/Button";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Demander un rendez-vous",
  description: "Demandez un rendez-vous en ligne : notre secrétariat vous rappelle pour confirmer la date et l'heure.",
  path: "/rendez-vous",
});

const steps = [
  { icon: ClipboardList, t: "Vous envoyez votre demande", d: "En 2 minutes, depuis votre téléphone." },
  { icon: PhoneCall, t: "Nous vous rappelons", d: "Sous 2 heures ouvrées pour confirmer le créneau." },
  { icon: Stethoscope, t: "Vous êtes reçu(e)", d: "Présentez-vous 15 min avant avec vos examens." },
];

export default async function AppointmentPage(props: PageProps<"/rendez-vous">) {
  const { service, medecin } = await props.searchParams;
  const doctor = typeof medecin === "string" ? getDoctorById(medecin) : undefined;
  const serviceSlug =
    doctor?.service ?? (typeof service === "string" && bookableServices.some((s) => s.slug === service) ? service : "");
  const { emergencyPhone } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Rendez-vous"
        title="Demander un rendez-vous"
        text="Remplissez le formulaire : notre secrétariat vous rappelle pour confirmer la date et l’heure."
        crumbs={[{ label: "Rendez-vous" }]}
      />

      <section className="section pt-10! sm:pt-14!">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <p role="note" className="mb-6 rounded-xl bg-brand-50 px-4 py-3 text-sm text-ink-600 ring-1 ring-brand-100">
              <strong className="text-navy-900">Formulaire de démonstration :</strong> les demandes ne sont pas encore
              transmises à l’hôpital.
            </p>
            <AppointmentForm defaultService={serviceSlug} defaultDoctor={doctor?.id ?? ""} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Comment ça marche ?</h2>
              <ol className="mt-5 space-y-5">
                {steps.map(({ icon: I, t, d }, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <I aria-hidden="true" className="h-5 w-5" />
                      <span
                        aria-hidden="true"
                        className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-navy-900 text-[0.7rem] font-bold text-white"
                      >
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <p className="font-semibold text-navy-900">{t}</p>
                      <p className="text-[0.95rem] text-ink-500">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-alert-100 bg-alert-50 p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-semibold text-alert-700!">
                <Siren aria-hidden="true" className="h-5 w-5" /> En cas d’urgence
              </h2>
              <p className="mt-2 text-[0.95rem] text-ink-600">N’utilisez pas ce formulaire. Appelez directement les urgences :</p>
              <p className="tabular mt-2 font-display text-xl font-semibold text-navy-900 select-all">{emergencyPhone.display}</p>
              <ButtonAnchor href={telHref(emergencyPhone)} variant="danger" className="mt-4 w-full">
                Appeler les urgences
              </ButtonAnchor>
            </div>
            <p className="flex gap-2 px-1 text-sm text-ink-400">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" /> Vos données restent confidentielles et couvertes par
              le secret médical.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

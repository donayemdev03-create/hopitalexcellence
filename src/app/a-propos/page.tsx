import { ArrowRight, CheckCircle2, Eye, Target } from "lucide-react";
import { siteConfig } from "@/config/site";
import { images } from "@/config/images";
import { equipment, history, quality, stats, values } from "@/content/content";
import { doctors } from "@/content/doctors";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { DoctorImage } from "@/components/doctors/DoctorCard";
import { HospitalScene } from "@/components/illustrations/HospitalScene";
import { CtaBand, PageHero, StatsBand } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "À propos",
  description: `Présentation de ${siteConfig.name} : histoire, mission, valeurs, équipements et équipe médicale.`,
  path: "/a-propos",
});

export default function AboutPage() {
  const { city } = siteConfig.contact.address;
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={`${siteConfig.name}, au service des patients depuis ${siteConfig.foundedYear}`}
        text="Un établissement de santé pluridisciplinaire qui associe compétences médicales, équipements modernes et accueil humain."
        crumbs={[{ label: "À propos" }]}
      />

      {/* Histoire */}
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Photo
            src={images.about}
            alt={`Bâtiment de ${siteConfig.name}`}
            className="aspect-[4/3.2] rounded-[1.75rem] shadow-lift ring-1 ring-slate-200/70"
            fallback={<HospitalScene className="h-full w-full" label={siteConfig.shortName} idPrefix="about" />}
          />
          <div>
            <SectionHeading eyebrow="Notre histoire" title="D’un centre de santé de quartier à un hôpital de référence" />
            <p className="text-lg text-ink-600">
              [Historique de l’établissement à rédiger : fondation en {siteConfig.foundedYear}, grandes étapes de son développement.]
            </p>
            <ol className="mt-8 space-y-0 border-l-2 border-brand-100">
              {history.map((h, i) => (
                <li key={i} className="relative pb-6 pl-6 last:pb-0">
                  <span aria-hidden="true" className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-4 border-white bg-brand-600 shadow-sm" />
                  <p className="tabular font-display font-semibold text-brand-700">{h.year}</p>
                  <p className="text-ink-600">{h.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section bg-mist">
        <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Notre mission",
              text: "Offrir à chaque patient des soins de qualité, sûrs et accessibles, dans le respect de sa dignité, quelle que soit sa situation.",
            },
            {
              icon: Eye,
              title: "Notre vision",
              text: `Devenir l’hôpital de référence de ${city} pour la qualité des soins, l’innovation médicale et l’expérience patient.`,
            },
          ].map(({ icon: I, title, text }) => (
            <div key={title} className="card p-8 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white">
                <I aria-hidden="true" className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-lg text-ink-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Valeurs */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Nos valeurs" title="Ce qui guide chacun de nos gestes" align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-care-50 text-care-600">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-ink-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="section bg-navy-900">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="Chiffres clés"
            title="L’hôpital en quelques chiffres"
            text="Chiffres à mettre à jour avec les données réelles de l’établissement."
          />
          <StatsBand />
        </div>
      </section>

      {/* Équipements + qualité */}
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Équipements" title="Un plateau technique moderne" />
            <div className="grid gap-4 sm:grid-cols-2">
              {equipment.map((e) => (
                <div key={e.name} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={e.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{e.name}</h3>
                    <p className="text-[0.95rem] text-ink-500">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-brand-50 p-8 sm:p-10">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-brand-500" />
              Qualité des soins
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">La sécurité du patient avant tout</h2>
            <ul className="mt-6 space-y-4">
              {quality.map((q) => (
                <li key={q} className="flex gap-3 text-ink-700">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-care-600" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section bg-mist">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Équipe médicale"
              title={`${stats[0].value} médecins et [—] soignants`}
              text="Médecins généralistes et spécialistes, sages-femmes, infirmiers, techniciens de laboratoire et d’imagerie : une équipe pluridisciplinaire qui se coordonne autour de chaque patient."
            />
            <ButtonLink href="/medecins" size="lg">
              Rencontrer nos médecins <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4" aria-hidden="true">
            {doctors.slice(0, 6).map((d, i) => (
              <DoctorImage
                key={d.id}
                doctor={d}
                className={`aspect-[4/5] rounded-2xl shadow-card ${i % 3 === 1 ? "translate-y-6" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16 sm:pt-20" />
      <CtaBand />
    </>
  );
}

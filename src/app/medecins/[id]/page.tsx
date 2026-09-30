import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, CalendarCheck, CalendarDays, GraduationCap, Languages, Stethoscope } from "lucide-react";
import { doctors, getDoctorById } from "@/content/doctors";
import { getServiceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoctorCard, DoctorImage } from "@/components/doctors/DoctorCard";
import { PageHero } from "@/components/sections/Sections";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/medecins/[id]">) {
  const { id } = await props.params;
  const doctor = getDoctorById(id);
  if (!doctor) return {};
  return pageMetadata({ title: `${doctor.specialty} — ${doctor.name}`, description: doctor.summary, path: `/medecins/${doctor.id}` });
}

export default async function DoctorProfilePage(props: PageProps<"/medecins/[id]">) {
  const { id } = await props.params;
  const doctor = getDoctorById(id);
  if (!doctor) notFound();

  const service = getServiceBySlug(doctor.service);
  const others = doctors.filter((d) => d.id !== id).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={doctor.specialty}
        title={doctor.name}
        crumbs={[{ label: "Nos médecins", href: "/medecins" }, { label: doctor.specialty }]}
      />
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr]">
          <div>
            <DoctorImage doctor={doctor} className="aspect-[4/5] w-full rounded-[1.75rem] shadow-lift" />
            <p className="mt-3 text-center text-sm text-ink-400">Profil d’exemple — portrait à remplacer</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {service && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
                  <Stethoscope aria-hidden="true" className="h-4 w-4" /> {service.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-care-50 px-3 py-1.5 text-sm font-semibold text-care-700">
                <BadgeCheck aria-hidden="true" className="h-4 w-4" /> {doctor.experience} ans d’expérience
              </span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Présentation</h2>
            <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-ink-600">{doctor.bio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-5">
                <GraduationCap aria-hidden="true" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-semibold">Formation</h3>
                <ul className="mt-2 space-y-1 text-[0.95rem] text-ink-500">
                  {doctor.education.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <Languages aria-hidden="true" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-semibold">Langues</h3>
                <p className="mt-2 text-[0.95rem] text-ink-500">{doctor.languages.join(", ")}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <CalendarDays aria-hidden="true" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-semibold">Consultations</h3>
                <p className="mt-2 text-[0.95rem] text-ink-500">{doctor.availability.join(", ")}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/rendez-vous?medecin=${doctor.id}`} size="lg">
                <CalendarCheck aria-hidden="true" className="h-5 w-5" /> Prendre rendez-vous
              </ButtonLink>
              {service && (
                <ButtonLink href={`/services/${service.slug}`} variant="outline" size="lg">
                  Voir le service {service.name.toLowerCase()}
                </ButtonLink>
              )}
            </div>
            <Link href="/medecins" className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-700">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Tous les médecins
            </Link>
          </div>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading eyebrow="L’équipe" title="Autres médecins" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

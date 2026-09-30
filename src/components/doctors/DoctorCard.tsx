import Link from "next/link";
import { BadgeCheck, CalendarCheck, Languages } from "lucide-react";
import { doctors, type Doctor } from "@/content/doctors";
import { Photo } from "@/components/ui/Photo";
import { DoctorPortrait } from "@/components/illustrations/DoctorPortrait";

export function DoctorImage({ doctor, className = "" }: { doctor: Doctor; className?: string }) {
  const seed = doctors.findIndex((d) => d.id === doctor.id);
  return (
    <Photo
      src={doctor.photo}
      alt={`Portrait : ${doctor.name}`}
      className={className}
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      fallback={<DoctorPortrait tone={doctor.tone} variant={doctor.portrait} seed={seed} className="h-full w-full" />}
    />
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <DoctorImage doctor={doctor} className="aspect-[5/4] w-full" />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-600 backdrop-blur">
          Profil d’exemple
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold tracking-[0.1em] text-brand-600 uppercase">{doctor.specialty}</p>
        <h3 className="mt-1.5 text-xl font-semibold">{doctor.name}</h3>
        <p className="mt-2 flex-1 text-ink-500">{doctor.summary}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-600">
          <li className="flex items-center gap-2">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-care-600" /> {doctor.experience} ans d’expérience
          </li>
          <li className="flex items-center gap-2">
            <Languages aria-hidden="true" className="h-4 w-4 text-care-600" /> {doctor.languages.join(", ")}
          </li>
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            href={`/medecins/${doctor.id}`}
            className="flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 px-2 text-sm font-semibold whitespace-nowrap text-navy-800 transition hover:border-brand-400 hover:text-brand-700"
          >
            Voir le profil<span className="sr-only"> : {doctor.specialty}</span>
          </Link>
          <Link
            href={`/rendez-vous?medecin=${doctor.id}`}
            className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full bg-care-600 px-2 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-care-700"
          >
            <CalendarCheck aria-hidden="true" className="h-4 w-4" /> Rendez-vous
            <span className="sr-only"> : {doctor.specialty}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

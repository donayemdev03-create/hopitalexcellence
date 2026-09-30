import type { Doctor } from "@/content/doctors";
import { getServiceBySlug } from "@/content/services";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const service = getServiceBySlug(doctor.serviceSlug);
  return (
    <article className="flex h-full items-center gap-4 rounded-card border border-border bg-surface p-5 shadow-sm">
      <ImagePlaceholder label="Portrait" className="size-20 shrink-0 rounded-full !p-1 !text-[0.6rem]" />
      <div>
        <h3 className="font-semibold">{doctor.name}</h3>
        <p className="text-sm text-muted">{doctor.title}</p>
        {service && <p className="mt-1 text-sm font-medium text-secondary">{service.name}</p>}
      </div>
    </article>
  );
}

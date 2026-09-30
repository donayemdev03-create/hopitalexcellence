import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { siteConfig } from "@/config/site";
import { Icon } from "./Icon";

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  const urgent = service.slug === "urgences";
  return (
    <article className="card group relative flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div
        className={`grid h-14 w-14 place-items-center rounded-2xl transition ${
          urgent ? "bg-alert-50 text-alert-600" : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white"
        }`}
      >
        <Icon name={service.icon} className="h-7 w-7" strokeWidth={1.7} />
      </div>
      <h3 className="mt-5 text-xl font-semibold">{service.name}</h3>
      <p className="mt-2 flex-1 text-ink-500">{service.short}</p>
      {!compact && urgent && (
        <p className="mt-3 inline-flex w-fit rounded-full bg-alert-50 px-3 py-1 text-sm font-semibold text-alert-700">
          Ouvert {siteConfig.emergencyAvailability.split(" · ")[0]}
        </p>
      )}
      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-700 after:absolute after:inset-0 after:content-['']"
      >
        En savoir plus<span className="sr-only"> : {service.name}</span>{" "}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

"use client";

import { Clock } from "lucide-react";
import { mondayBasedDay, openingHours } from "@/config/hours";
import { useNow } from "@/lib/useNow";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function HoursCard({ className = "" }: { className?: string }) {
  const now = useNow();
  const idx = now ? mondayBasedDay(now) : -1;
  const today = idx >= 0 ? openingHours[idx] : null;
  const mins = now ? now.getHours() * 60 + now.getMinutes() : 0;
  const isOpen = !!(today?.open && today.close && mins >= toMin(today.open) && mins < toMin(today.close));

  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <Clock aria-hidden="true" className="h-5 w-5 text-brand-600" /> Consultations
        </h3>
        {now && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              isOpen ? "bg-care-50 text-care-700" : "bg-slate-100 text-ink-600"
            }`}
          >
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${isOpen ? "bg-care-500" : "bg-ink-400"}`} />
            {isOpen ? "Ouvert maintenant" : "Fermé actuellement"}
          </span>
        )}
      </div>
      <dl className="mt-5 divide-y divide-slate-100">
        {openingHours.map((h, i) => (
          <div
            key={h.day}
            className={`flex items-center justify-between gap-4 py-3 ${
              i === idx ? "-mx-3 rounded-lg bg-brand-50 px-3 font-semibold text-navy-900" : ""
            }`}
          >
            <dt>
              {h.day}
              {i === idx && <span className="ml-2 text-xs font-semibold tracking-wider text-brand-600 uppercase">aujourd’hui</span>}
            </dt>
            <dd className="tabular">
              {h.open ? `${h.open} – ${h.close}` : <span className="text-ink-400">Fermé · urgences ouvertes</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

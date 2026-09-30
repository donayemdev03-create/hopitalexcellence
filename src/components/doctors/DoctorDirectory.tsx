"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import type { Doctor } from "@/content/doctors";
import type { Service } from "@/content/services";

/**
 * Annuaire filtrable par spécialité + recherche.
 * Les cartes sont rendues côté serveur et passées ici par identifiant.
 */
export function DoctorDirectory({
  doctors,
  services,
  cards,
}: {
  doctors: Doctor[];
  services: Service[];
  cards: Record<string, ReactNode>;
}) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const usedServices = services.filter((s) => doctors.some((d) => d.service === s.slug));

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return doctors.filter(
      (d) =>
        (filter === "all" || d.service === filter) &&
        (!term || `${d.name} ${d.specialty}`.toLowerCase().includes(term)),
    );
  }, [doctors, filter, q]);

  const chip = (active: boolean) =>
    `min-h-[44px] shrink-0 rounded-full px-4 text-[0.95rem] font-semibold transition ${
      active ? "bg-navy-900 text-white" : "bg-white text-ink-600 ring-1 ring-slate-200 hover:ring-brand-300"
    }`;

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0"
          role="group"
          aria-label="Filtrer par spécialité"
        >
          <button type="button" className={chip(filter === "all")} onClick={() => setFilter("all")} aria-pressed={filter === "all"}>
            Tous
          </button>
          {usedServices.map((s) => (
            <button
              type="button"
              key={s.slug}
              className={chip(filter === s.slug)}
              onClick={() => setFilter(s.slug)}
              aria-pressed={filter === s.slug}
            >
              {s.name}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Rechercher un médecin</span>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nom ou spécialité…"
            className="field pl-12"
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} médecin{list.length > 1 ? "s" : ""} affiché{list.length > 1 ? "s" : ""}
      </p>
      {list.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((d) => (
            <li key={d.id}>{cards[d.id]}</li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-ink-500">
          Aucun médecin ne correspond à votre recherche.
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import type { Doctor } from "@/content/doctors";
import type { Service } from "@/content/services";
import { inputClasses } from "@/components/appointment/FormField";
import { DoctorCard } from "./DoctorCard";

/** Annuaire filtrable par spécialité. */
export function DoctorDirectory({ doctors, services }: { doctors: Doctor[]; services: Service[] }) {
  const [serviceSlug, setServiceSlug] = useState("");
  const filtered = serviceSlug ? doctors.filter((d) => d.serviceSlug === serviceSlug) : doctors;

  return (
    <div>
      <div className="max-w-sm">
        <label htmlFor="filtre-service" className="block text-sm font-medium">
          Filtrer par spécialité
        </label>
        <select
          id="filtre-service"
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
          className={inputClasses}
        >
          <option value="">Toutes les spécialités</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} praticien{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <li key={d.id}>
              <DoctorCard doctor={d} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-card bg-surface-alt p-6 text-muted">Aucun praticien pour cette spécialité.</p>
      )}
    </div>
  );
}

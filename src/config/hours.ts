/**
 * Horaires — EXEMPLES repris de la maquette, à confirmer par l'établissement.
 * `open`/`close` au format 24 h ; `null` = fermé (sauf urgences).
 * Les jours fermés sont automatiquement refusés dans le formulaire de rendez-vous.
 */
export type OpeningHour = { day: string; open: string | null; close: string | null };

/** Du lundi au dimanche. */
export const openingHours: OpeningHour[] = [
  { day: "Lundi", open: "07:30", close: "19:00" },
  { day: "Mardi", open: "07:30", close: "19:00" },
  { day: "Mercredi", open: "07:30", close: "19:00" },
  { day: "Jeudi", open: "07:30", close: "19:00" },
  { day: "Vendredi", open: "07:30", close: "19:00" },
  { day: "Samedi", open: "08:00", close: "14:00" },
  { day: "Dimanche", open: null, close: null },
];

/** Résumé affiché dans la barre supérieure. */
export const hoursSummary = "Lun – Ven 07:30 – 19:00 · Sam 08:00 – 14:00";

/** Horaires complémentaires. */
export const extraHours = [
  { label: "Urgences", value: "24 h/24 · 7 j/7" },
  { label: "Laboratoire (prélèvements)", value: "06:30 – 12:00" },
  { label: "Pharmacie", value: "24 h/24" },
  { label: "Visites aux patients", value: "12:00 – 14:00 · 17:00 – 20:00" },
];

/** Créneaux proposés dans le formulaire de rendez-vous. */
export const appointmentSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
] as const;

/** Index du jour (0 = lundi … 6 = dimanche) pour une date. */
export function mondayBasedDay(date: Date) {
  return (date.getDay() + 6) % 7;
}

/** Jours fermés (0 = lundi) déduits des horaires. */
export const closedDays = openingHours.flatMap((h, i) => (h.open ? [] : [i]));

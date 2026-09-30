import { z } from "zod";
import { bookableServices } from "@/content/services";
import { doctors } from "@/content/doctors";
import { appointmentSlots, closedDays, mondayBasedDay, openingHours } from "@/config/hours";

/**
 * Schéma de validation de la demande de rendez-vous (champs de la maquette).
 * Partagé entre le navigateur (retour immédiat) et le serveur (source de vérité).
 */

const serviceSlugs = bookableServices.map((s) => s.slug) as [string, ...string[]];
const doctorIds = doctors.map((d) => d.id);

/** Date AAAA-MM-JJ dans le fuseau de l'environnement d'exécution. */
export function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function tomorrowIso(now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + 1);
  return isoDate(d);
}

/** Jour de la semaine (0 = lundi) d'une date AAAA-MM-JJ, sans effet de fuseau. */
function dayOf(iso: string) {
  return mondayBasedDay(new Date(`${iso}T12:00:00`));
}

export const appointmentSchema = z
  .object({
    name: z.string().trim().min(3, "Indiquez votre nom et votre prénom.").max(120, "Nom trop long."),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s.-]{8,20}$/, "Numéro invalide. Exemple : 06 12 34 56 78"),
    email: z
      .preprocess((v) => (typeof v === "string" ? v.trim() : v), z.union([z.literal(""), z.email("Adresse e-mail invalide.").max(254)]))
      .default(""),
    service: z.enum(serviceSlugs, "Choisissez un service."),
    doctor: z
      .string()
      .default("")
      .refine((v) => v === "" || doctorIds.includes(v), "Médecin inconnu."),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choisissez une date.")
      .superRefine((d, ctx) => {
        if (d < tomorrowIso()) {
          ctx.addIssue({ code: "custom", message: "Choisissez une date à partir de demain." });
        } else if (closedDays.includes(dayOf(d))) {
          const day = openingHours[dayOf(d)].day.toLowerCase();
          ctx.addIssue({ code: "custom", message: `Pas de consultation le ${day}. Choisissez un autre jour.` });
        }
      }),
    time: z.enum(appointmentSlots, "Choisissez une heure."),
    reason: z.string().trim().min(5, "Décrivez brièvement le motif de votre visite.").max(1000, "1000 caractères maximum."),
    consent: z.literal("on", "Votre accord est nécessaire pour traiter la demande."),
  })
  .refine((v) => !v.doctor || doctors.find((d) => d.id === v.doctor)?.service === v.service, {
    path: ["doctor"],
    message: "Ce médecin n'exerce pas dans le service choisi.",
  });

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type AppointmentField = keyof AppointmentInput;
export type FieldErrors = Partial<Record<AppointmentField, string>>;

export const appointmentFields: AppointmentField[] = [
  "name", "phone", "email", "service", "doctor", "date", "time", "reason", "consent",
];

/** Convertit les champs d'un formulaire en objet brut (chaînes) à valider. */
export function formDataToObject(formData: FormData) {
  return Object.fromEntries(
    appointmentFields.map((f) => {
      const v = formData.get(f);
      return [f, typeof v === "string" ? v : undefined];
    }),
  ) as Record<AppointmentField, string | undefined>;
}

/** Première erreur de chaque champ, prête à afficher. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as AppointmentField | undefined;
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}

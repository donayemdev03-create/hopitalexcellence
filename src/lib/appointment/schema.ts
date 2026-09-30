import { z } from "zod";
import { services } from "@/content/services";

/**
 * Schéma de validation de la demande de rendez-vous.
 * Partagé entre le navigateur (retour immédiat) et le serveur (source de vérité).
 */

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const timeSlots = [
  { value: "matin", label: "Matin" },
  { value: "apres-midi", label: "Après-midi" },
  { value: "indifferent", label: "Indifférent" },
] as const;

const timeSlotValues = timeSlots.map((t) => t.value) as [string, ...string[]];

/** Date du jour au format AAAA-MM-JJ (fuseau local). */
export function todayIso(now = new Date()) {
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export const appointmentSchema = z.object({
  lastName: z.string().trim().min(2, "Veuillez indiquer votre nom.").max(80, "Nom trop long."),
  firstName: z.string().trim().min(2, "Veuillez indiquer votre prénom.").max(80, "Prénom trop long."),
  email: z.email("Adresse e-mail invalide.").trim().max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9 .-]{7,18}[0-9]$/, "Numéro de téléphone invalide."),
  service: z.enum(serviceSlugs, "Veuillez choisir un service."),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Veuillez choisir une date.")
    .refine((d) => d >= todayIso(), "La date doit être aujourd'hui ou plus tard."),
  timeSlot: z.enum(timeSlotValues, "Veuillez choisir un créneau."),
  message: z.string().trim().max(1000, "1000 caractères maximum.").optional().default(""),
  consent: z.literal("on", "Votre accord est nécessaire pour traiter la demande."),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type AppointmentField = keyof AppointmentInput;
export type FieldErrors = Partial<Record<AppointmentField, string>>;

/** Convertit les champs d'un formulaire en objet brut à valider. */
export function formDataToObject(formData: FormData) {
  const fields: AppointmentField[] = [
    "lastName",
    "firstName",
    "email",
    "phone",
    "service",
    "preferredDate",
    "timeSlot",
    "message",
    "consent",
  ];
  return Object.fromEntries(
    fields.map((f) => [f, formData.get(f) ?? undefined]),
  ) as Record<AppointmentField, FormDataEntryValue | undefined>;
}

/** Première erreur de chaque champ, prête à afficher. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  const result: FieldErrors = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages?.[0]) result[key as AppointmentField] = messages[0];
  }
  return result;
}

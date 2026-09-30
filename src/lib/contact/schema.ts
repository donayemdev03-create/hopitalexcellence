import { z } from "zod";

/** Objets proposés dans le formulaire de contact (repris de la maquette). */
export const contactSubjects = [
  "Renseignement général",
  "Rendez-vous",
  "Résultats d’examens",
  "Facturation / assurance",
  "Réclamation",
  "Autre",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120, "Nom trop long."),
  email: z.email("Adresse e-mail invalide.").max(254),
  phone: z
    .string()
    .trim()
    .max(20, "Numéro trop long.")
    .refine((v) => v === "" || /^\+?[\d\s.-]{8,20}$/.test(v), "Numéro invalide.")
    .default(""),
  subject: z.enum(contactSubjects, "Choisissez un objet."),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères.").max(3000, "3000 caractères maximum."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactFields: ContactField[] = ["name", "email", "phone", "subject", "message"];

export function contactFormDataToObject(formData: FormData) {
  return Object.fromEntries(
    contactFields.map((f) => {
      const v = formData.get(f);
      return [f, typeof v === "string" ? (f === "email" ? v.trim() : v) : undefined];
    }),
  ) as Record<ContactField, string | undefined>;
}

export function toContactErrors(error: z.ZodError): ContactErrors {
  const result: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}

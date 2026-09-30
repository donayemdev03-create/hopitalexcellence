"use server";

import { appointmentSchema, formDataToObject, toFieldErrors, type FieldErrors } from "./schema";
import { submitAppointmentRequest } from "./submit";

export type AppointmentState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: FieldErrors;
  /** Valeurs saisies : pré-remplissage en cas d'erreur, récapitulatif en cas de succès. */
  values?: Record<string, string>;
  reference?: string;
};

export async function requestAppointment(_prev: AppointmentState, formData: FormData): Promise<AppointmentState> {
  const raw = formDataToObject(formData);
  const values = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v ?? ""]));

  // Champ piège anti-robots : invisible pour les humains.
  if (formData.get("website")) {
    return { status: "success", values, reference: "—" };
  }

  const parsed = appointmentSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont invalides. Merci de les corriger.",
      fieldErrors: toFieldErrors(parsed.error),
      values,
    };
  }

  const result = await submitAppointmentRequest(parsed.data);
  if (!result.ok) {
    return { status: "error", message: result.reason, values };
  }

  return { status: "success", reference: result.reference, values };
}

"use server";

import { appointmentSchema, formDataToObject, toFieldErrors, type FieldErrors } from "./schema";
import { submitAppointmentRequest } from "./submit";

export type AppointmentState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: FieldErrors;
  /** Valeurs renvoyées pour pré-remplir le formulaire en cas d'erreur. */
  values?: Record<string, string>;
  reference?: string;
};

export async function requestAppointment(
  _prev: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  // Champ piège anti-robots : invisible pour les humains.
  if (formData.get("website")) {
    return { status: "success", message: "Demande reçue." };
  }

  const raw = formDataToObject(formData);
  const parsed = appointmentSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont invalides. Merci de les corriger.",
      fieldErrors: toFieldErrors(parsed.error),
      values: Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v : ""]),
      ),
    };
  }

  const result = await submitAppointmentRequest(parsed.data);
  if (!result.ok) {
    return { status: "error", message: result.reason };
  }

  return {
    status: "success",
    reference: result.reference,
    message:
      "Démonstration : votre demande a été validée, mais elle n'a pas été transmise à l'hôpital.",
  };
}

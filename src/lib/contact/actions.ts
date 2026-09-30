"use server";

import { contactFormDataToObject, contactSchema, toContactErrors, type ContactErrors } from "./schema";
import { submitContactMessage } from "./submit";

export type ContactState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: ContactErrors;
  values?: Record<string, string>;
};

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = contactFormDataToObject(formData);
  const values = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v ?? ""]));

  if (formData.get("website")) return { status: "success", values };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont invalides. Merci de les corriger.",
      fieldErrors: toContactErrors(parsed.error),
      values,
    };
  }

  const result = await submitContactMessage(parsed.data);
  if (!result.ok) return { status: "error", message: result.reason, values };
  return { status: "success", values };
}

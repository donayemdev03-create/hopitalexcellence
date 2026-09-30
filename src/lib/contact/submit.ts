import "server-only";
import type { ContactInput } from "./schema";

/**
 * Point d'intégration unique pour transmettre un message de contact.
 * MODE DÉMONSTRATION : rien n'est envoyé. À remplacer par un envoi d'e-mail
 * ou un enregistrement, comme pour `src/lib/appointment/submit.ts`.
 */
export async function submitContactMessage(input: ContactInput): Promise<{ ok: true } | { ok: false; reason: string }> {
  void input;
  return { ok: true };
}

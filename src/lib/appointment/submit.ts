import "server-only";
import type { AppointmentInput } from "./schema";

export type SubmitResult = { ok: true; reference: string } | { ok: false; reason: string };

/**
 * Point d'intégration unique pour transmettre une demande de rendez-vous.
 *
 * MODE DÉMONSTRATION : aucune donnée n'est envoyée ni enregistrée.
 *
 * Pour brancher un vrai canal plus tard, remplacer le corps de cette fonction,
 * par exemple par :
 *   - un envoi d'e-mail (Resend, SMTP via Nodemailer, …) ;
 *   - une insertion en base de données (PostgreSQL, Supabase, …) ;
 *   - un appel à l'API du logiciel de prise de rendez-vous de l'hôpital.
 * Les secrets (clés API, mots de passe) iront dans des variables d'environnement.
 * Attention : il s'agit de données de santé, soumises à des exigences
 * réglementaires strictes (protection des données, hébergement agréé, etc.).
 */
export async function submitAppointmentRequest(input: AppointmentInput): Promise<SubmitResult> {
  void input; // Volontairement ignoré en mode démonstration.
  const n = String(Math.floor(1000 + Math.random() * 9000));
  return { ok: true, reference: `RDV-${new Date().getFullYear()}-${n}` };
}

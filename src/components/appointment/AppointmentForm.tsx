"use client";

import Link from "next/link";
import { useActionState, useRef, useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { requestAppointment, type AppointmentState } from "@/lib/appointment/actions";
import {
  appointmentSchema,
  formDataToObject,
  timeSlots,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/appointment/schema";
import { Button } from "@/components/ui/Button";
import { FormField, inputClasses } from "./FormField";

const initialState: AppointmentState = { status: "idle" };

export function AppointmentForm({ defaultService }: { defaultService?: string }) {
  // Changer la clé remonte le formulaire à neuf (bouton « Nouvelle demande »).
  const [formKey, setFormKey] = useState(0);
  return (
    <AppointmentFormInner
      key={formKey}
      defaultService={defaultService}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

function AppointmentFormInner({
  defaultService,
  onReset,
}: {
  defaultService?: string;
  onReset: () => void;
}) {
  const [state, formAction, pending] = useActionState(requestAppointment, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const values = state.values ?? {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const parsed = appointmentSchema.safeParse(formDataToObject(new FormData(event.currentTarget)));
    if (parsed.success) {
      setClientErrors(null);
      return; // Laisse l'action serveur s'exécuter.
    }
    event.preventDefault();
    const fieldErrors = toFieldErrors(parsed.error);
    setClientErrors(fieldErrors);
    const first = Object.keys(fieldErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-card border border-success/30 bg-secondary-soft p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Demande enregistrée (démonstration)</h2>
        <p className="mt-2 text-muted">{state.message}</p>
        {state.reference && (
          <p className="mt-2 text-sm">
            Référence de test : <strong>{state.reference}</strong>
          </p>
        )}
        <Button variant="secondary" className="mt-6" onClick={onReset}>
          Nouvelle demande
        </Button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-describedby="form-rdv-info"
    >
      <p id="form-rdv-info" className="text-sm text-muted">
        Les champs marqués d&apos;un <span className="text-emergency">*</span> sont obligatoires.
      </p>

      <div aria-live="assertive">
        {hasErrors && (
          <p className="rounded-lg bg-emergency-soft px-4 py-3 text-sm font-medium text-emergency">
            {state.message && !clientErrors ? state.message : "Certains champs sont invalides. Merci de les corriger."}
          </p>
        )}
        {state.status === "error" && !hasErrors && state.message && (
          <p className="rounded-lg bg-emergency-soft px-4 py-3 text-sm font-medium text-emergency">{state.message}</p>
        )}
      </div>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-semibold">Vos coordonnées</legend>
        <FormField id="lastName" label="Nom" required error={errors.lastName}>
          {(d) => (
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required
              defaultValue={values.lastName} aria-invalid={!!errors.lastName} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
        <FormField id="firstName" label="Prénom" required error={errors.firstName}>
          {(d) => (
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required
              defaultValue={values.firstName} aria-invalid={!!errors.firstName} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
        <FormField id="email" label="Adresse e-mail" required error={errors.email}>
          {(d) => (
            <input id="email" name="email" type="email" autoComplete="email" required
              defaultValue={values.email} aria-invalid={!!errors.email} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
        <FormField id="phone" label="Téléphone" required error={errors.phone} hint="Exemple : 06 12 34 56 78">
          {(d) => (
            <input id="phone" name="phone" type="tel" autoComplete="tel" required
              defaultValue={values.phone} aria-invalid={!!errors.phone} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-semibold">Votre rendez-vous</legend>
        <FormField id="service" label="Service" required error={errors.service} className="sm:col-span-2">
          {(d) => (
            <select id="service" name="service" required defaultValue={values.service ?? defaultService ?? ""}
              aria-invalid={!!errors.service} aria-describedby={d} className={inputClasses}>
              <option value="" disabled>
                Choisir un service…
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id="preferredDate" label="Date souhaitée" required error={errors.preferredDate}>
          {(d) => (
            <input id="preferredDate" name="preferredDate" type="date" required
              defaultValue={values.preferredDate} aria-invalid={!!errors.preferredDate} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
        <FormField id="timeSlot" label="Créneau préféré" required error={errors.timeSlot}>
          {(d) => (
            <select id="timeSlot" name="timeSlot" required defaultValue={values.timeSlot ?? ""}
              aria-invalid={!!errors.timeSlot} aria-describedby={d} className={inputClasses}>
              <option value="" disabled>
                Choisir un créneau…
              </option>
              {timeSlots.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id="message" label="Motif de la demande (facultatif)" error={errors.message}
          hint="Ne communiquez pas d'informations médicales détaillées via ce formulaire." className="sm:col-span-2">
          {(d) => (
            <textarea id="message" name="message" rows={4} maxLength={1000}
              defaultValue={values.message} aria-invalid={!!errors.message} aria-describedby={d} className={inputClasses} />
          )}
        </FormField>
      </fieldset>

      {/* Champ piège anti-robots, masqué aux utilisateurs et aux lecteurs d'écran. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id="consent" name="consent" type="checkbox" required
            defaultChecked={values.consent === "on"} aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-erreur" : undefined}
            className="mt-1 size-5 shrink-0 accent-primary" />
          <label htmlFor="consent" className="text-sm">
            J&apos;accepte que mes données soient utilisées pour traiter ma demande de rendez-vous, conformément à la{" "}
            <Link href="/confidentialite" className="text-primary underline">
              politique de confidentialité
            </Link>
            . <span className="text-emergency" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-erreur" className="mt-1 text-sm font-medium text-emergency">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Envoi en cours…" : "Envoyer la demande"}
      </Button>
    </form>
  );
}

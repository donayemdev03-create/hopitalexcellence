"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { appointmentSlots, openingHours } from "@/config/hours";
import { bookableServices, getServiceBySlug } from "@/content/services";
import { doctors, getDoctorById } from "@/content/doctors";
import { requestAppointment, type AppointmentState } from "@/lib/appointment/actions";
import { appointmentSchema, tomorrowIso, toFieldErrors, type FieldErrors } from "@/lib/appointment/schema";
import { useNow } from "@/lib/useNow";
import { Button, ButtonLink } from "@/components/ui/Button";
import { FormField, fieldAria, fieldClass } from "@/components/ui/FormField";

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  consent: boolean;
};

const EMPTY: Values = { name: "", phone: "", email: "", service: "", doctor: "", date: "", time: "", reason: "", consent: false };
const initialState: AppointmentState = { status: "idle" };

const openDays = openingHours.filter((h) => h.open);
const dateHint =
  openDays.length > 0 && openDays.length < 7
    ? `Du ${openDays[0].day.toLowerCase()} au ${openDays[openDays.length - 1].day.toLowerCase()}.`
    : undefined;

const frDate = (s: string) =>
  new Date(`${s}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function AppointmentForm({ defaultService = "", defaultDoctor = "" }: { defaultService?: string; defaultDoctor?: string }) {
  // Changer la clé remonte le formulaire à neuf (bouton « Nouvelle demande »).
  const [formKey, setFormKey] = useState(0);
  return (
    <AppointmentFormInner
      key={formKey}
      defaults={formKey === 0 ? { ...EMPTY, service: defaultService, doctor: defaultDoctor } : EMPTY}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

function AppointmentFormInner({ defaults, onReset }: { defaults: Values; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(requestAppointment, initialState);
  const [values, setValues] = useState<Values>(() =>
    state.values ? { ...EMPTY, ...state.values, consent: state.values.consent === "on" } : defaults,
  );
  const [errors, setErrors] = useState<FieldErrors>(state.fieldErrors ?? {});
  const formRef = useRef<HTMLFormElement>(null);
  const now = useNow();
  const minDate = now ? tomorrowIso(now) : undefined;

  // Reprend les erreurs renvoyées par le serveur à chaque nouvelle réponse.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setErrors(state.fieldErrors ?? {});
  }

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const val = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setValues((v) => {
      const next = { ...v, [k]: val } as Values;
      if (k === "service" && v.doctor && getDoctorById(v.doctor)?.service !== val) next.doctor = "";
      if (k === "doctor" && val) next.service = getDoctorById(String(val))?.service ?? v.service;
      return next;
    });
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function focusField(name: string) {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`);
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = appointmentSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      const errs = toFieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) focusField(first);
      return;
    }
    setErrors({});
    startTransition(() => formAction(formData));
  }

  if (state.status === "success" && state.values) {
    const v = state.values;
    const svc = getServiceBySlug(v.service);
    const doc = getDoctorById(v.doctor);
    return (
      <div className="card animate-fade-up overflow-hidden" role="status" aria-live="polite">
        <div className="bg-care-50 p-8 text-center sm:p-10">
          <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-care-600 text-white">
            <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-care-500/40" />
            <CheckCircle2 aria-hidden="true" className="relative h-10 w-10" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">Demande envoyée</h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-ink-600">
            Merci {v.name.split(" ")[0]}. Nous vous rappelons au <strong className="tabular text-navy-900">{v.phone}</strong> pour
            confirmer votre rendez-vous.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-care-700 ring-1 ring-care-100">
            Référence : <span className="tabular ml-1">{state.reference}</span>
          </p>
        </div>
        <dl className="grid gap-px bg-slate-100 sm:grid-cols-2">
          {[
            ["Service", svc?.name],
            ["Médecin", doc ? `${doc.name} — ${doc.specialty}` : "Pas de préférence"],
            ["Date souhaitée", v.date ? frDate(v.date) : ""],
            ["Heure souhaitée", v.time],
          ].map(([k, val]) => (
            <div key={k} className="bg-white p-5">
              <dt className="text-sm text-ink-500">{k}</dt>
              <dd className="mt-1 font-semibold text-navy-900 first-letter:uppercase">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:p-8">
          <Button onClick={onReset} variant="outline" size="lg">
            Nouvelle demande
          </Button>
          <ButtonLink href="/" variant="brand" size="lg">
            Retour à l’accueil
          </ButtonLink>
        </div>
        <p className="px-6 pb-6 text-sm text-ink-400 sm:px-8">Démonstration : aucune donnée n’a été transmise à l’hôpital.</p>
      </div>
    );
  }

  const doctorOptions = values.service ? doctors.filter((d) => d.service === values.service) : doctors;
  const stepBadge = "grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-sm text-white";

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8 lg:p-10">
      {state.status === "error" && state.message && Object.keys(errors).length === 0 && (
        <p role="alert" className="mb-6 rounded-xl bg-alert-50 px-4 py-3 text-sm font-medium text-alert-700">
          {state.message}
        </p>
      )}

      <fieldset>
        <legend className="flex items-center gap-2 font-display text-xl font-semibold text-navy-900">
          <span aria-hidden="true" className={stepBadge}>
            1
          </span>{" "}
          Vos coordonnées
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField id="rdv-name" label="Nom et prénom" required error={errors.name} className="sm:col-span-2">
            <input id="rdv-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")}
              className={fieldClass(errors.name)} placeholder="Ex. Marie Dupont" {...fieldAria("rdv-name", errors.name)} />
          </FormField>
          <FormField id="rdv-phone" label="Téléphone" required error={errors.phone} hint="Nous vous appellerons sur ce numéro.">
            <input id="rdv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone}
              onChange={set("phone")} className={fieldClass(errors.phone)} placeholder="06 12 34 56 78"
              {...fieldAria("rdv-phone", errors.phone, "hint")} />
          </FormField>
          <FormField id="rdv-email" label="Adresse e-mail" error={errors.email} hint="Facultatif — pour recevoir un récapitulatif.">
            <input id="rdv-email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email}
              onChange={set("email")} className={fieldClass(errors.email)} placeholder="vous@exemple.com"
              {...fieldAria("rdv-email", errors.email, "hint")} />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="mt-10 border-t border-slate-100 pt-8">
        <legend className="float-left flex w-full items-center gap-2 font-display text-xl font-semibold text-navy-900">
          <span aria-hidden="true" className={stepBadge}>
            2
          </span>{" "}
          Votre rendez-vous
        </legend>
        <div className="clear-both grid gap-5 pt-6 sm:grid-cols-2">
          <FormField id="rdv-service" label="Service souhaité" required error={errors.service}>
            <select id="rdv-service" name="service" required value={values.service} onChange={set("service")}
              className={fieldClass(errors.service)} {...fieldAria("rdv-service", errors.service)}>
              <option value="">Choisir un service…</option>
              {bookableServices.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="rdv-doctor" label="Médecin souhaité" error={errors.doctor}
            hint={values.service && !doctorOptions.length ? "Un médecin du service vous sera attribué." : undefined}>
            <select id="rdv-doctor" name="doctor" value={values.doctor} onChange={set("doctor")}
              className={fieldClass(errors.doctor)}
              {...fieldAria("rdv-doctor", errors.doctor, values.service && !doctorOptions.length ? "hint" : undefined)}>
              <option value="">Pas de préférence</option>
              {doctorOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialty}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="rdv-date" label="Date souhaitée" required error={errors.date} hint={dateHint}>
            <input id="rdv-date" name="date" type="date" required min={minDate} value={values.date} onChange={set("date")}
              className={fieldClass(errors.date)} {...fieldAria("rdv-date", errors.date, dateHint)} />
          </FormField>

          <fieldset className="sm:col-span-2" {...fieldAria("rdv-time", errors.time)}>
            <legend className="field-label">
              Heure souhaitée{" "}
              <span className="text-alert-600" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {appointmentSlots.map((t) => (
                <label key={t} className="relative">
                  <input type="radio" name="time" value={t} checked={values.time === t} onChange={set("time")}
                    className="peer absolute inset-0 opacity-0" />
                  <span className="tabular grid min-h-[48px] cursor-pointer place-items-center rounded-xl bg-white text-[0.95rem] font-semibold text-navy-800 ring-1 ring-slate-300 transition peer-checked:bg-brand-600 peer-checked:text-white peer-checked:shadow-md peer-checked:ring-brand-600 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-400 hover:ring-brand-400">
                    {t}
                  </span>
                </label>
              ))}
            </div>
            {errors.time && (
              <p id="rdv-time-error" className="mt-1.5 text-sm font-medium text-alert-600">
                {errors.time}
              </p>
            )}
          </fieldset>

          <FormField id="rdv-reason" label="Motif du rendez-vous" required error={errors.reason} className="sm:col-span-2">
            <textarea id="rdv-reason" name="reason" rows={4} required maxLength={1000} value={values.reason} onChange={set("reason")}
              className={fieldClass(errors.reason, "resize-y")} placeholder="Ex. Consultation de suivi, douleurs, bilan annuel…"
              {...fieldAria("rdv-reason", errors.reason)} />
          </FormField>
        </div>
      </fieldset>

      {/* Champ piège anti-robots, masqué aux utilisateurs et aux lecteurs d'écran. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="rdv-website">Ne pas remplir</label>
        <input id="rdv-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="rdv-consent" className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl bg-mist p-4">
        <input id="rdv-consent" name="consent" type="checkbox" required checked={values.consent} onChange={set("consent")}
          className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-brand-600" {...fieldAria("rdv-consent", errors.consent)} />
        <span className="text-[0.95rem] text-ink-600">
          J’accepte que {siteConfig.name} utilise ces informations pour me recontacter au sujet de ma demande de rendez-vous,
          conformément à la{" "}
          <Link href="/confidentialite" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {errors.consent && (
        <p id="rdv-consent-error" className="mt-1.5 text-sm font-medium text-alert-600">
          {errors.consent}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" /> Envoi en cours…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-5 w-5" /> Envoyer la demande
            </>
          )}
        </Button>
        <p className="text-sm text-ink-400">
          <span className="text-alert-600">*</span> Champs obligatoires
        </p>
      </div>
    </form>
  );
}

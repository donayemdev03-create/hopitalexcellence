"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/lib/contact/actions";
import { contactSchema, contactSubjects, toContactErrors, type ContactErrors, type ContactField } from "@/lib/contact/schema";
import { Button } from "@/components/ui/Button";
import { FormField, fieldAria, fieldClass } from "@/components/ui/FormField";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [errors, setErrors] = useState<ContactErrors>(state.fieldErrors ?? {});
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};

  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setErrors(state.fieldErrors ?? {});
  }

  const clear = (k: ContactField) => () => errors[k] && setErrors((er) => ({ ...er, [k]: undefined }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      const errs = toContactErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    // Appel manuel : évite la réinitialisation automatique du formulaire en cas d'erreur serveur.
    startTransition(() => formAction(formData));
  }

  if (state.status === "success") {
    return (
      <div className="card animate-fade-up p-8 text-center sm:p-12" role="status">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-14 w-14 text-care-600" />
        <h2 className="mt-5 text-2xl font-semibold">Message envoyé</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-600">
          Merci {v.name?.split(" ")[0]}, nous vous répondrons à l’adresse <strong>{v.email}</strong> sous 24 h ouvrées.
        </p>
        <Button className="mt-6" variant="outline" onClick={onReset}>
          Envoyer un autre message
        </Button>
        <p className="mt-6 text-sm text-ink-400">Démonstration : aucune donnée n’a été transmise.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">Envoyer un message</h2>
      <p className="mt-2 text-ink-500">
        Pour une demande de rendez-vous, utilisez plutôt le{" "}
        <Link href="/rendez-vous" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
          formulaire dédié
        </Link>
        .
      </p>
      {state.status === "error" && state.message && Object.keys(errors).length === 0 && (
        <p role="alert" className="mt-4 rounded-xl bg-alert-50 px-4 py-3 text-sm font-medium text-alert-700">
          {state.message}
        </p>
      )}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField id="ct-name" label="Nom et prénom" required error={errors.name}>
          <input id="ct-name" name="name" autoComplete="name" required defaultValue={v.name} onChange={clear("name")}
            className={fieldClass(errors.name)} {...fieldAria("ct-name", errors.name)} />
        </FormField>
        <FormField id="ct-email" label="E-mail" required error={errors.email}>
          <input id="ct-email" name="email" type="email" autoComplete="email" required defaultValue={v.email} onChange={clear("email")}
            className={fieldClass(errors.email)} {...fieldAria("ct-email", errors.email)} />
        </FormField>
        <FormField id="ct-phone" label="Téléphone" error={errors.phone}>
          <input id="ct-phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} onChange={clear("phone")}
            className={fieldClass(errors.phone)} {...fieldAria("ct-phone", errors.phone)} />
        </FormField>
        <FormField id="ct-subject" label="Objet" error={errors.subject}>
          <select id="ct-subject" name="subject" defaultValue={v.subject || contactSubjects[0]} className={fieldClass(errors.subject)}
            {...fieldAria("ct-subject", errors.subject)}>
            {contactSubjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </FormField>
        <FormField id="ct-message" label="Message" required error={errors.message} className="sm:col-span-2">
          <textarea id="ct-message" name="message" rows={5} required maxLength={3000} defaultValue={v.message} onChange={clear("message")}
            className={fieldClass(errors.message, "resize-y")} {...fieldAria("ct-message", errors.message)} />
        </FormField>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="ct-website">Ne pas remplir</label>
        <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" variant="brand" className="mt-6 w-full sm:w-auto" disabled={pending}>
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" /> Envoi…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-5 w-5" /> Envoyer le message
          </>
        )}
      </Button>
    </form>
  );
}

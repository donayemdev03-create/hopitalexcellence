import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/** Champ de formulaire avec libellé, aide et message d'erreur reliés pour les lecteurs d'écran. */
export function FormField({
  id,
  label,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="field-label">
        {label}{" "}
        {required && (
          <span className="text-alert-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-alert-600">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Attributs ARIA d'un champ selon son état. */
export function fieldAria(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}

export function fieldClass(error?: string, extra = "") {
  return `field ${error ? "field-error" : ""} ${extra}`;
}

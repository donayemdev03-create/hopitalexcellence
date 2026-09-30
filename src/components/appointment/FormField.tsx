import type { ReactNode } from "react";

export const inputClasses =
  "mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-foreground shadow-sm aria-invalid:border-emergency focus-visible:border-primary";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

/** Libellé + champ + message d'aide / d'erreur reliés pour les lecteurs d'écran. */
export function FormField({ id, label, required, error, hint, className = "", children }: FormFieldProps) {
  const hintId = hint ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-erreur` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="text-emergency" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children(describedBy)}
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm font-medium text-emergency">
          {error}
        </p>
      )}
    </div>
  );
}

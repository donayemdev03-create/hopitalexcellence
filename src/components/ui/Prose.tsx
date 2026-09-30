import type { ReactNode } from "react";

/** Mise en forme des pages de texte long (mentions légales, confidentialité…). */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg text-ink-600 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_strong]:text-navy-900 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
      {children}
    </div>
  );
}

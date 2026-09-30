"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* copie non autorisée par le navigateur */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-400 transition hover:bg-slate-100 hover:text-brand-700"
      aria-label={done ? "Copié" : `Copier ${text}`}
    >
      {done ? <Check aria-hidden="true" className="h-4 w-4 text-care-600" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
    </button>
  );
}

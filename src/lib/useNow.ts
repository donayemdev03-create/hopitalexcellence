"use client";

import { useSyncExternalStore } from "react";

// Rafraîchit la valeur chaque minute.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

let cached = { minute: -1, date: new Date(0) };
function getSnapshot() {
  const now = Date.now();
  const minute = Math.floor(now / 60_000);
  if (minute !== cached.minute) cached = { minute, date: new Date(now) };
  return cached.date;
}

/**
 * Date courante côté navigateur (fuseau du visiteur), `null` pendant le rendu serveur.
 * Évite les écarts d'hydratation pour l'affichage « aujourd'hui / ouvert maintenant ».
 */
export function useNow(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

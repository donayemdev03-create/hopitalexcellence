/**
 * Plan stylisé servant d'emplacement pour la carte (repris de la maquette).
 * Pour une vraie carte : remplacer par un <iframe> Google Maps (Partager > Intégrer une carte).
 */
export function MapPlaceholder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} role="img" aria-label="Plan de localisation (emplacement de la carte)" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="400" fill="#EAF1FA" />
      <path d="M-20 300 C 120 250, 180 360, 330 320 S 520 250, 640 300 L640 420 L-20 420Z" fill="#CFE2F7" />
      <g fill="#DCE7F4">
        <rect x="30" y="30" width="120" height="80" rx="6" />
        <rect x="180" y="30" width="90" height="80" rx="6" />
        <rect x="300" y="30" width="140" height="60" rx="6" />
        <rect x="470" y="30" width="110" height="100" rx="6" />
        <rect x="30" y="140" width="80" height="110" rx="6" />
        <rect x="140" y="140" width="130" height="70" rx="6" />
        <rect x="470" y="160" width="110" height="70" rx="6" />
        <rect x="300" y="120" width="60" height="100" rx="6" />
      </g>
      <rect x="380" y="118" width="70" height="64" rx="6" fill="#CDEBDD" />
      <g stroke="#FFFFFF" strokeLinecap="round">
        <path d="M0 125 H600" strokeWidth="14" />
        <path d="M165 0 V400" strokeWidth="12" />
        <path d="M455 0 V300" strokeWidth="10" />
        <path d="M285 0 V260" strokeWidth="8" />
        <path d="M0 265 C 150 235, 300 250, 600 240" strokeWidth="10" />
      </g>
      <g transform="translate(372 222)">
        <circle r="26" fill="#1A56CF" opacity=".15" />
        <path d="M0 -44c-13 0-22 9-22 21 0 16 22 35 22 35s22-19 22-35c0-12-9-21-22-21z" fill="#1A56CF" />
        <circle cx="0" cy="-23" r="8" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

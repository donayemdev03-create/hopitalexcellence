/**
 * Illustration vectorielle d'un bâtiment hospitalier (reprise de la maquette).
 * Utilisée tant qu'aucune photo n'est définie dans src/config/images.ts.
 * Les couleurs de l'illustration sont propres au dessin et ne dépendent pas des jetons.
 */
export function HospitalScene({ className = "", label = "H", idPrefix = "hs" }: { className?: string; label?: string; idPrefix?: string }) {
  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const lit = new Set(["0-2", "1-6", "2-1", "2-4", "3-7", "4-3", "1-0", "3-2"]);
  const sky = `${idPrefix}-sky`;
  const glass = `${idPrefix}-glass`;
  const facade = `${idPrefix}-facade`;
  return (
    <svg viewBox="0 0 640 480" className={className} role="img" aria-label="Illustration du bâtiment de l'hôpital" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE3FF" />
          <stop offset="1" stopColor="#F4F8FD" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9C9F5" />
          <stop offset="1" stopColor="#6E9FE6" />
        </linearGradient>
        <linearGradient id={facade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF4FC" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill={`url(#${sky})`} />
      <circle cx="520" cy="92" r="46" fill="#FFFFFF" opacity=".7" />
      <g fill="#FFFFFF" opacity=".85">
        <ellipse cx="118" cy="86" rx="46" ry="12" />
        <ellipse cx="150" cy="76" rx="30" ry="12" />
        <ellipse cx="430" cy="150" rx="36" ry="9" />
      </g>

      {/* Aile gauche */}
      <rect x="40" y="236" width="140" height="170" rx="4" fill={`url(#${facade})`} stroke="#C9D8EE" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`l${r}${c}`} x={58 + c * 40} y={256 + r * 36} width="26" height="20" rx="3" fill={(r + c) % 3 === 0 ? "#9CC0F0" : "#D6E5F8"} />
        )),
      )}

      {/* Aile droite */}
      <rect x="462" y="206" width="140" height="200" rx="4" fill={`url(#${facade})`} stroke="#C9D8EE" />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`r${r}${c}`} x={480 + c * 40} y={224 + r * 36} width="26" height="20" rx="3" fill={(r * c) % 4 === 1 ? "#9CC0F0" : "#D6E5F8"} />
        )),
      )}

      {/* Bâtiment principal */}
      <rect x="160" y="146" width="320" height="260" rx="6" fill={`url(#${facade})`} stroke="#BCD0EC" />
      <rect x="160" y="146" width="320" height="10" rx="4" fill="#1A56CF" opacity=".9" />
      {rows.map((r) =>
        cols.map((c) => (
          <rect key={`${r}-${c}`} x={178 + c * 33.5} y={172 + r * 30} width="22" height="18" rx="3" fill={lit.has(`${r}-${c}`) ? "#7FAEEF" : "#D6E5F8"} />
        )),
      )}

      {/* Tour + croix */}
      <rect x="268" y="84" width="104" height="68" rx="6" fill="#FFFFFF" stroke="#BCD0EC" />
      <rect x="298" y="94" width="44" height="44" rx="10" fill="#1A56CF" />
      <path d="M315 102h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="#FFFFFF" />

      {/* Entrée */}
      <rect x="246" y="330" width="148" height="14" rx="3" fill="#12305A" />
      <text x="320" y="341" textAnchor="middle" fontFamily="var(--font-lexend), sans-serif" fontSize="9" letterSpacing="2" fill="#FFFFFF">
        {label.toUpperCase()}
      </text>
      <rect x="270" y="344" width="100" height="62" fill={`url(#${glass})`} />
      <path d="M320 344v62M295 344v62M345 344v62" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="2" />

      {/* Sol */}
      <rect x="0" y="404" width="640" height="76" fill="#E3ECF8" />
      <path d="M0 440 H640" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="18 14" />

      {/* Arbres */}
      {[
        [26, 380, 30],
        [196, 386, 22],
        [446, 386, 22],
        [618, 376, 32],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <rect x={x - 3} y={y} width="6" height="26" rx="2" fill="#7A6B5A" />
          <circle cx={x} cy={y - r / 2} r={r} fill={i % 2 ? "#5DB592" : "#79C6A5"} />
        </g>
      ))}

      {/* Ambulance */}
      <g transform="translate(470 404)">
        <rect x="0" y="-38" width="86" height="32" rx="6" fill="#FFFFFF" stroke="#BCD0EC" />
        <path d="M86 -30h16l12 14v10H86z" fill="#FFFFFF" stroke="#BCD0EC" />
        <rect x="90" y="-27" width="12" height="10" rx="2" fill="#A9C9F5" />
        <rect x="0" y="-22" width="114" height="5" fill="#E03B3B" />
        <path d="M34 -34h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill="#E03B3B" />
        <rect x="10" y="-43" width="16" height="5" rx="2" fill="#2A6DE8" />
        <circle cx="22" cy="-4" r="8" fill="#12305A" />
        <circle cx="22" cy="-4" r="3" fill="#FFFFFF" />
        <circle cx="94" cy="-4" r="8" fill="#12305A" />
        <circle cx="94" cy="-4" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

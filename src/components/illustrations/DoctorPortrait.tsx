/**
 * Portrait illustré d'un médecin (reprise de la maquette),
 * utilisé quand `photo` vaut null dans src/content/doctors.ts.
 */
const tones = {
  brand: ["#DCE9FF", "#B7D0FB", "#1A56CF"],
  care: ["#DDF6EE", "#B5EBDA", "#0B8E74"],
  navy: ["#E1E7F2", "#C3CEE2", "#12305A"],
  sky: ["#E3F1FB", "#C2E0F5", "#2A86C9"],
} as const;
const skins = ["#8A5636", "#6E4329", "#A36A45", "#7C4B2F"];
const hairs = ["#1E1612", "#2A1D16", "#16110E"];

export function DoctorPortrait({
  tone = "brand",
  variant = "a",
  seed = 0,
  className = "",
}: {
  tone?: keyof typeof tones;
  variant?: "a" | "b";
  seed?: number;
  className?: string;
}) {
  const [bg1, bg2, scrub] = tones[tone];
  const skin = skins[seed % skins.length];
  const hair = hairs[seed % hairs.length];
  const id = `dp-${tone}-${seed}`;
  const long = variant === "b";
  return (
    <svg viewBox="0 30 200 210" className={className} role="img" aria-label="Portrait illustré (photo à remplacer)" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg1} />
          <stop offset="1" stopColor={bg2} />
        </linearGradient>
      </defs>
      <rect y="0" width="200" height="240" fill={`url(#${id})`} />
      <circle cx="160" cy="44" r="54" fill="#FFFFFF" opacity=".35" />

      {long && <path d="M58 112c0-40 18-64 42-64s42 24 42 64c0 26-4 48-10 60H68c-6-12-10-34-10-60z" fill={hair} />}

      {/* Cou */}
      <rect x="88" y="138" width="24" height="36" rx="10" fill={skin} />
      <path d="M88 158c6 6 18 6 24 0v10H88z" fill="#000" opacity=".12" />

      {/* Blouse */}
      <path d="M22 240c2-44 26-66 78-70 52 4 76 26 78 70z" fill="#FFFFFF" />
      <path d="M78 172l22 40 22-40c-8-3-15-4-22-4s-14 1-22 4z" fill={scrub} />
      <path d="M78 172l-10 68M122 172l10 68" stroke="#DCE4EF" strokeWidth="2" />
      <path d="M78 172l14 34-10 6zM122 172l-14 34 10 6z" fill="#EEF3F9" />
      <rect x="130" y="206" width="20" height="4" rx="2" fill={scrub} opacity=".8" />

      {/* Stéthoscope */}
      <path d="M84 174c-14 10-16 34-6 44" stroke="#3B4A63" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M116 174c10 8 12 22 8 32" stroke="#3B4A63" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="124" cy="210" r="7" fill="#3B4A63" />
      <circle cx="124" cy="210" r="3" fill="#B8C4D6" />

      {/* Tête */}
      <ellipse cx="100" cy="108" rx="31" ry="37" fill={skin} />
      <ellipse cx="69" cy="112" rx="5" ry="8" fill={skin} />
      <ellipse cx="131" cy="112" rx="5" ry="8" fill={skin} />
      {long ? (
        <path d="M68 104c0-26 14-42 32-42s34 14 34 40c-12-4-22-14-28-24-6 12-20 22-38 26z" fill={hair} />
      ) : (
        <path d="M69 102c-2-24 12-38 31-38s33 12 31 38c-4-10-10-16-14-18-10 4-26 4-36 0-5 3-9 9-12 18z" fill={hair} />
      )}
    </svg>
  );
}

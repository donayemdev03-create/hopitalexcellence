/**
 * Icônes des contenus (bibliothèque Lucide : https://lucide.dev/icons).
 * Pour utiliser une nouvelle icône dans les données : l'importer et l'ajouter au registre.
 */
import {
  Activity, Ambulance, Award, Baby, BedDouble, CalendarCheck, Clock, FlaskConical, Flower2,
  HeartHandshake, HeartPulse, Lock, MonitorCheck, Pill, ScanLine, Scissors, ShieldCheck, Siren,
  Smile, Stethoscope, UserRoundCheck, Waves, type LucideProps,
} from "lucide-react";

const registry = {
  Activity, Ambulance, Award, Baby, BedDouble, CalendarCheck, Clock, FlaskConical, Flower2,
  HeartHandshake, HeartPulse, Lock, MonitorCheck, Pill, ScanLine, Scissors, ShieldCheck, Siren,
  Smile, Stethoscope, UserRoundCheck, Waves,
};

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = registry[name] ?? Stethoscope;
  return <Cmp aria-hidden="true" {...props} />;
}

/** Icônes des réseaux sociaux (dessinées à la main, Lucide ne les fournit plus). */
export function SocialIcon({ network, className = "h-5 w-5" }: { network: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (network === "facebook")
    return (
      <svg {...common}>
        <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
      </svg>
    );
  if (network === "instagram")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M11.5 10.5V16" />
    </svg>
  );
}

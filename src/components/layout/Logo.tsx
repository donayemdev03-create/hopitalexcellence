import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Logo provisoire (pictogramme + nom). À remplacer par le logo officiel (SVG dans /public). */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} — accueil`}>
      <span
        aria-hidden="true"
        className={`flex size-10 items-center justify-center rounded-lg text-2xl font-bold ${
          inverted ? "bg-on-primary text-primary" : "bg-primary text-on-primary"
        }`}
      >
        +
      </span>
      <span className={`text-lg font-bold leading-tight ${inverted ? "text-on-primary" : "text-foreground"}`}>
        {siteConfig.name}
      </span>
    </Link>
  );
}

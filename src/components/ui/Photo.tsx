import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Affiche une photo si `src` est défini, sinon l'illustration passée dans `fallback`.
 * Le conteneur doit avoir des dimensions (ex. `aspect-[4/3]`).
 */
export function Photo({
  src,
  alt = "",
  fallback,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string | null;
  alt?: string;
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" /> : fallback}
    </div>
  );
}

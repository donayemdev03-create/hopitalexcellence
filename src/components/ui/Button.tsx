import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const base =
  "items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition duration-200 " +
  "focus-visible:outline-hidden focus-visible:ring-4 disabled:opacity-60 disabled:pointer-events-none select-none";

const variants = {
  /** Vert : réservé aux actions clés (Prendre rendez-vous). */
  primary:
    "bg-care-600 text-white shadow-[0_8px_20px_-8px_rgba(11,142,116,.7)] hover:bg-care-700 hover:-translate-y-0.5 focus-visible:ring-care-100",
  brand: "bg-brand-600 text-white hover:bg-brand-700 hover:-translate-y-0.5 focus-visible:ring-brand-100",
  outline:
    "border border-slate-300 bg-white text-navy-800 hover:border-brand-400 hover:text-brand-700 focus-visible:ring-brand-100",
  light: "bg-white text-navy-900 hover:bg-brand-50 focus-visible:ring-white/40",
  ghostLight: "border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/30",
  danger:
    "bg-alert-600 text-white shadow-[0_8px_20px_-8px_rgba(198,40,40,.7)] hover:bg-alert-700 hover:-translate-y-0.5 focus-visible:ring-alert-100",
} as const;

const sizes = {
  sm: "min-h-[40px] px-4 text-sm",
  md: "min-h-[48px] px-6 text-[0.975rem]",
  lg: "min-h-[56px] px-7 text-base sm:text-[1.05rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  // `hidden` passé par l'appelant (ex. "hidden sm:inline-flex") doit l'emporter sur l'affichage par défaut.
  const display = /(^|\s)hidden(\s|$)/.test(className) ? "" : "inline-flex";
  return `${display} ${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

/** Lien interne (next/link) stylé en bouton. */
export function ButtonLink({ variant, size, className, ...props }: StyleProps & ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

/**
 * Lien externe / tel: / mailto: stylé en bouton.
 * Si `href` est vide (coordonnée pas encore renseignée), rend un élément inactif.
 */
export function ButtonAnchor({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: StyleProps & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string | undefined }) {
  const cls = buttonClasses(variant, size, className);
  if (!href) {
    return (
      <span className={`${cls} cursor-not-allowed`} aria-disabled="true" title="Coordonnée à renseigner">
        {children}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ComponentPropsWithoutRef<"button">) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

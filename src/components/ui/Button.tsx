import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "emergency" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-primary text-primary bg-surface hover:bg-primary-soft",
  emergency: "bg-emergency text-on-emergency hover:opacity-90",
  ghost: "text-primary hover:bg-primary-soft",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  variant,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

export function Button({
  variant,
  className,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}

import type { ReactNode } from "react";

/** Lien d'appel ; affiché en texte simple tant que le numéro n'est pas renseigné. */
export function PhoneLink({
  phone,
  className,
  children,
}: {
  phone: { display: string; href: string };
  className?: string;
  children?: ReactNode;
}) {
  const content = children ?? phone.display;
  if (!phone.href) return <span className={className}>{content}</span>;
  return (
    <a href={`tel:${phone.href}`} className={className}>
      {content}
    </a>
  );
}

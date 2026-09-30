import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
  href?: string;
  linkLabel?: string;
  media?: ReactNode;
};

export function Card({ title, children, href, linkLabel = "En savoir plus", media }: CardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      {media}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children && <div className="mt-2 flex-1 text-sm text-muted">{children}</div>}
        {href && (
          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {linkLabel}
            <span className="sr-only"> : {title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

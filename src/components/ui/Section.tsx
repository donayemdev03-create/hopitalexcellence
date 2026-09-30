import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  title?: string;
  intro?: ReactNode;
  tone?: "default" | "alt";
  children: ReactNode;
};

export function Section({ id, title, intro, tone = "default", children }: SectionProps) {
  const headingId = id ? `${id}-titre` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-16 sm:py-20 ${tone === "alt" ? "bg-surface-alt" : ""}`}
    >
      <Container>
        {(title || intro) && (
          <header className="mb-10 max-w-2xl">
            {title && (
              <h2 id={headingId} className="text-2xl font-bold sm:text-3xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-3 text-muted">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

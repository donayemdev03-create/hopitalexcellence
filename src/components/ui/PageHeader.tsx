import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
};

/** En-tête commun des pages intérieures (fil d'Ariane + titre H1). */
export function PageHeader({ title, intro, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-primary-soft">
      <Container className="py-10 sm:py-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </Container>
    </div>
  );
}

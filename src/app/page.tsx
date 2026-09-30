import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { news } from "@/content/news";
import { hospitalJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { NewsList } from "@/components/NewsList";

const quickLinks = [
  { title: "Prendre rendez-vous", text: "Faire une demande de consultation en ligne.", href: "/rendez-vous" },
  { title: "Trouver un médecin", text: "Consulter l'annuaire des praticiens.", href: "/medecins" },
  { title: "Préparer ma venue", text: "Admission, documents, visites.", href: "/informations-patients" },
  { title: "Nous trouver", text: "Adresse, accès et horaires.", href: "/contact" },
];

const keyFigures = [
  { value: "[—]", label: "lits" },
  { value: "[—]", label: "professionnels de santé" },
  { value: "[—]", label: "spécialités" },
  { value: "24h/24", label: "service d'urgences" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd()).replace(/</g, "\\u003c") }}
      />

      {/* Bannière principale */}
      <section className="bg-primary-soft">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{siteConfig.name}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              [Titre d&apos;accroche de la page d&apos;accueil]
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{siteConfig.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/rendez-vous">Prendre rendez-vous</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Découvrir nos services
              </ButtonLink>
            </div>
          </div>
          <ImagePlaceholder label="Photo principale de l'hôpital" className="aspect-[4/3] rounded-card" />
        </Container>
      </section>

      {/* Accès rapides */}
      <section aria-labelledby="acces-rapides-titre" className="-mt-px border-b border-border">
        <Container className="py-10">
          <h2 id="acces-rapides-titre" className="sr-only">
            Accès rapides
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((q) => (
              <li key={q.href}>
                <Link
                  href={q.href}
                  className="block h-full rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-primary-soft"
                >
                  <span className="font-semibold text-primary">{q.title}</span>
                  <span className="mt-1 block text-sm text-muted">{q.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section id="services" title="Nos services" intro="[Texte d'introduction des services à rédiger.]">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Card title={s.name} href={`/services/${s.slug}`}>
                {s.summary}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="chiffres" title="L'hôpital en chiffres" tone="alt">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keyFigures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse rounded-card bg-surface p-6 text-center shadow-sm">
              <dt className="mt-1 text-sm text-muted">{f.label}</dt>
              <dd className="text-3xl font-bold text-primary">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="actualites" title="Actualités">
        <NewsList items={news} />
        <div className="mt-8">
          <ButtonLink href="/actualites" variant="secondary">
            Toutes les actualités
          </ButtonLink>
        </div>
      </Section>

      {/* Bandeau d'appel à l'action */}
      <section className="bg-primary text-on-primary">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Besoin d&apos;un rendez-vous ?</h2>
            <p className="mt-2 opacity-90">
              Faites votre demande en ligne ou appelez le standard au{" "}
              <PhoneLink phone={siteConfig.contact.phone} className="font-semibold underline" />.
            </p>
          </div>
          <ButtonLink href="/rendez-vous" variant="secondary">
            Prendre rendez-vous
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}

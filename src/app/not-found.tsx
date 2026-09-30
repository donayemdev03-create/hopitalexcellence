import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-primary">Erreur 404</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Page introuvable</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Nous contacter
        </ButtonLink>
      </div>
    </Container>
  );
}

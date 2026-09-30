/**
 * Liste PROVISOIRE des services / spécialités.
 * Les intitulés sont des exemples génériques ; les descriptions sont des
 * textes de remplissage. À remplacer par la liste réelle validée par l'hôpital.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
};

const placeholderSummary = "[Résumé du service à rédiger par l'établissement.]";
const placeholderDescription = [
  "[Présentation détaillée du service : équipe, prises en charge proposées, équipements.]",
  "[Informations pratiques : localisation dans l'établissement, modalités d'accès, contacts du secrétariat.]",
];

function service(slug: string, name: string): Service {
  return {
    slug,
    name,
    summary: placeholderSummary,
    description: placeholderDescription,
  };
}

export const services: Service[] = [
  service("urgences", "Urgences"),
  service("medecine-generale", "Médecine générale"),
  service("cardiologie", "Cardiologie"),
  service("pediatrie", "Pédiatrie"),
  service("maternite", "Maternité"),
  service("chirurgie", "Chirurgie"),
  service("imagerie-medicale", "Imagerie médicale"),
  service("laboratoire", "Laboratoire d'analyses"),
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

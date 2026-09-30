/**
 * Configuration centrale de l'établissement.
 *
 * ⚠️ TOUTES les valeurs ci-dessous sont PROVISOIRES (placeholders).
 * Elles doivent être remplacées par les informations officielles de l'hôpital
 * avant toute mise en production. Tant que `isDraft` vaut `true` :
 *   - un bandeau « contenu provisoire » est affiché en haut du site ;
 *   - les moteurs de recherche sont invités à ne pas indexer le site.
 */
export const siteConfig = {
  /** Passer à `false` uniquement quand tous les contenus réels sont en place. */
  isDraft: true,

  /** Nom provisoire (reprend le nom du dépôt). */
  name: "Hôpital Excellence",
  shortName: "H. Excellence",
  tagline: "[Slogan de l'établissement à définir]",
  description:
    "[Description de l'établissement à rédiger : présentation courte de l'hôpital, de ses missions et de ses spécialités.]",

  /** URL publique du site. Définie via la variable d'environnement NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",

  contact: {
    /** Numéros fictifs — format affiché et format « tel: ». */
    phone: { display: "00 00 00 00 00", href: "+33000000000" },
    emergencyPhone: { display: "[Numéro d'urgence]", href: "" },
    /** Domaine « example.org » réservé : aucune adresse réelle. */
    email: "contact@example.org",
    address: {
      street: "[Adresse à compléter]",
      postalCode: "[Code postal]",
      city: "[Ville]",
      country: "[Pays]",
    },
  },

  hours: [
    { label: "Urgences", value: "[Horaires à confirmer]" },
    { label: "Consultations", value: "[Horaires à confirmer]" },
    { label: "Visites", value: "[Horaires à confirmer]" },
  ],

  social: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof siteConfig;

export function formatAddress(separator = ", ") {
  const { street, postalCode, city, country } = siteConfig.contact.address;
  return [street, `${postalCode} ${city}`, country].join(separator);
}

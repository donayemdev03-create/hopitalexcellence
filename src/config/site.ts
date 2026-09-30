/**
 * Configuration centrale de l'établissement.
 *
 * ⚠️ Les coordonnées, l'année de création et la ville sont des PLACEHOLDERS
 * (entre crochets) à remplacer par les informations officielles.
 * Les textes et horaires repris de la maquette sont des EXEMPLES à valider.
 *
 * Tant que `isDraft` vaut `true` :
 *   - une mention « contenus provisoires » est affichée dans le pied de page ;
 *   - les moteurs de recherche sont invités à ne pas indexer le site.
 */

export type Phone = {
  /** Texte affiché. */
  display: string;
  /** Numéro au format international pour les liens `tel:` ; vide = pas de lien. */
  href: string;
};

export const siteConfig = {
  /** Passer à `false` uniquement quand tous les contenus réels sont en place. */
  isDraft: true,

  name: "Hôpital Excellence",
  shortName: "Excellence",
  /** Slogan repris de la maquette. */
  tagline: "Votre santé, notre priorité",
  description:
    "Hôpital général : médecins spécialistes, urgences 24 h/24, laboratoire et imagerie sous un même toit, pour des soins sûrs et humains.",
  foundedYear: "[année]",

  /** URL publique du site. Définie via la variable d'environnement NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",

  /** Logo : `null` = logo généré (croix + nom). Sinon chemin dans /public, ex. "/images/logo.svg". */
  logo: null as string | null,

  /** Disponibilité des urgences, affichée dans tout le site (à confirmer). */
  emergencyAvailability: "24 h/24 · 7 j/7",

  contact: {
    phone: { display: "[Numéro du standard]", href: "" } as Phone,
    emergencyPhone: { display: "[Numéro des urgences]", href: "" } as Phone,
    whatsapp: { display: "[Numéro WhatsApp]", href: "" } as Phone,
    /** Domaine « example.org » réservé : aucune adresse réelle. */
    email: "contact@example.org",
    address: {
      street: "[Adresse]",
      district: "[Quartier]",
      city: "[Ville]",
      country: "[Pays]",
    },
    /** Lien Google Maps (itinéraire) ; vide = bouton masqué. */
    mapUrl: "",
  },

  /** Réseaux sociaux : laisser vide pour masquer l'icône. */
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function formatAddress() {
  const { street, district, city, country } = siteConfig.contact.address;
  return { line1: street, line2: `${district}, ${city}, ${country}` };
}

/** Lien `tel:` ou `undefined` si le numéro n'est pas encore renseigné. */
export function telHref(phone: Phone) {
  return phone.href ? `tel:${phone.href}` : undefined;
}

export type NavItem = { label: string; href: string };

/** Menu principal — ordre de la maquette. */
export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Nos services", href: "/services" },
  { label: "Nos médecins", href: "/medecins" },
  { label: "Rendez-vous", href: "/rendez-vous" },
  { label: "Contact", href: "/contact" },
];

/** Liens secondaires (pied de page). */
export const secondaryNav: NavItem[] = [
  { label: "Informations patients", href: "/informations-patients" },
  { label: "Actualités", href: "/actualites" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "L'hôpital", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Médecins", href: "/medecins" },
  { label: "Patients", href: "/informations-patients" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

export const appointmentCta: NavItem = {
  label: "Prendre rendez-vous",
  href: "/rendez-vous",
};

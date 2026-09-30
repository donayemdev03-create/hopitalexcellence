/**
 * Services et spécialités.
 * Textes repris de la maquette : EXEMPLES à faire valider par l'établissement.
 *  - slug     : identifiant utilisé dans l'adresse (sans accents ni espaces)
 *  - icon     : nom d'une icône du registre (src/components/ui/Icon.tsx)
 *  - featured : affiché sur la page d'accueil
 */
import type { IconName } from "@/components/ui/Icon";

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  featured: boolean;
  short: string;
  description: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "medecine-generale",
    name: "Médecine générale",
    icon: "Stethoscope",
    featured: true,
    short: "Consultations, bilans de santé et suivi des maladies chroniques pour toute la famille.",
    description:
      "Notre équipe de médecins généralistes vous accueille pour les consultations de premier recours, les certificats médicaux, les bilans de santé annuels et le suivi des pathologies chroniques (hypertension, diabète, asthme). Ils coordonnent votre parcours avec les spécialistes de l'hôpital.",
    highlights: ["Consultations sans rendez-vous le matin", "Bilans de santé complets", "Suivi hypertension et diabète", "Certificats médicaux et vaccinations"],
  },
  {
    slug: "urgences",
    name: "Urgences",
    icon: "Siren",
    featured: true,
    short: "Accueil 24 h/24 et 7 j/7 des urgences adultes et pédiatriques, avec déchocage équipé.",
    description:
      "Le service des urgences reçoit les patients jour et nuit, tous les jours de l'année. Un médecin urgentiste et une équipe infirmière évaluent chaque patient dès son arrivée (tri selon la gravité). Le service dispose d'une salle de déchocage, d'un accès direct au bloc opératoire, à l'imagerie et au laboratoire.",
    highlights: ["Ouvert 24 h/24, 7 j/7", "Tri infirmier à l'arrivée", "Salle de déchocage équipée", "Ambulance médicalisée"],
  },
  {
    slug: "pediatrie",
    name: "Pédiatrie",
    icon: "Baby",
    featured: true,
    short: "Soins des nouveau-nés, enfants et adolescents, suivi de croissance et vaccinations.",
    description:
      "Le service de pédiatrie prend en charge les enfants de la naissance à 15 ans : consultations, vaccinations selon le calendrier national, suivi de croissance et hospitalisation pédiatrique dans des chambres adaptées où un parent peut rester.",
    highlights: ["Calendrier vaccinal complet", "Suivi de croissance", "Néonatologie", "Chambres parent-enfant"],
  },
  {
    slug: "maternite",
    name: "Maternité",
    icon: "HeartHandshake",
    featured: true,
    short: "Suivi de grossesse, accouchement et accompagnement de la mère et du bébé.",
    description:
      "De la première échographie au retour à la maison, notre maternité accompagne les futures mamans : consultations prénatales, préparation à l'accouchement, salles de naissance, césarienne programmée ou en urgence, et suivi post-natal.",
    highlights: ["Consultations prénatales", "Préparation à l'accouchement", "Salles de naissance modernes", "Suivi post-natal"],
  },
  {
    slug: "gynecologie",
    name: "Gynécologie",
    icon: "Flower2",
    featured: false,
    short: "Santé de la femme à tous les âges : dépistage, contraception, fertilité.",
    description:
      "Consultations de gynécologie médicale et chirurgicale : dépistage du cancer du col et du sein, contraception, suivi de la ménopause, bilan d'infertilité et chirurgie gynécologique.",
    highlights: ["Dépistage (frottis, échographie)", "Contraception", "Bilan de fertilité", "Chirurgie gynécologique"],
  },
  {
    slug: "chirurgie",
    name: "Chirurgie",
    icon: "Scissors",
    featured: true,
    short: "Chirurgie générale, orthopédique et viscérale en bloc opératoire moderne.",
    description:
      "Notre plateau chirurgical compte plusieurs salles d'opération et une salle de réveil surveillée. Nos chirurgiens réalisent des interventions programmées et urgentes, y compris en chirurgie mini-invasive (cœlioscopie).",
    highlights: ["Chirurgie générale et viscérale", "Orthopédie et traumatologie", "Cœlioscopie", "Chirurgie ambulatoire"],
  },
  {
    slug: "cardiologie",
    name: "Cardiologie",
    icon: "HeartPulse",
    featured: true,
    short: "Diagnostic et suivi des maladies du cœur : ECG, échocardiographie, Holter.",
    description:
      "Le service de cardiologie assure le dépistage, le diagnostic et le suivi des maladies cardiovasculaires. Examens disponibles sur place : électrocardiogramme (ECG), échocardiographie, Holter tensionnel et rythmique, épreuve d'effort.",
    highlights: ["ECG et échocardiographie", "Holter 24 h", "Épreuve d'effort", "Suivi de l'hypertension"],
  },
  {
    slug: "dentisterie",
    name: "Dentisterie",
    icon: "Smile",
    featured: false,
    short: "Soins dentaires, détartrage, extractions et prothèses pour adultes et enfants.",
    description:
      "Le cabinet dentaire propose des soins conservateurs, détartrages, extractions, prothèses et soins d'orthodontie simples, pour les adultes comme pour les enfants.",
    highlights: ["Soins et détartrage", "Extractions", "Prothèses dentaires", "Radiographie dentaire"],
  },
  {
    slug: "laboratoire",
    name: "Laboratoire",
    icon: "FlaskConical",
    featured: true,
    short: "Analyses médicales sur place, la plupart des résultats disponibles sous 24 h.",
    description:
      "Notre laboratoire réalise les analyses de biologie médicale : hématologie, biochimie, parasitologie (paludisme), sérologies, bactériologie. Prélèvements le matin, la plupart des résultats sont disponibles en moins de 24 heures.",
    highlights: ["Prélèvements dès 06:30", "Résultats sous 24 h", "Test rapide paludisme", "Bilans prénatals"],
  },
  {
    slug: "imagerie-medicale",
    name: "Imagerie médicale",
    icon: "ScanLine",
    featured: true,
    short: "Radiographie numérique, échographie et scanner pour un diagnostic précis.",
    description:
      "Le service d'imagerie dispose d'une radiographie numérique, d'échographes dernière génération et d'un scanner. Les comptes rendus sont remis rapidement à votre médecin.",
    highlights: ["Radiographie numérique", "Échographie", "Scanner", "Mammographie"],
  },
  {
    slug: "pharmacie",
    name: "Pharmacie",
    icon: "Pill",
    featured: false,
    short: "Pharmacie hospitalière ouverte 24 h/24 pour les patients et les urgences.",
    description:
      "La pharmacie de l'hôpital délivre les médicaments prescrits aux patients hospitalisés et en consultation. Elle est ouverte en permanence et garantit la disponibilité des traitements d'urgence.",
    highlights: ["Ouverte 24 h/24", "Médicaments essentiels", "Conseils pharmaceutiques", "Stock d'urgence"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Services proposés dans le formulaire de rendez-vous (les urgences ne se réservent pas). */
export const bookableServices = services.filter((s) => s.slug !== "urgences");

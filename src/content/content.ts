/**
 * Contenus éditoriaux.
 * - Textes descriptifs (atouts, valeurs, équipements, qualité) : repris de la maquette, à valider.
 * - Chiffres, historique et témoignages : PLACEHOLDERS à remplacer par des données réelles
 *   (témoignages uniquement avec l'accord écrit des patients).
 */
import type { IconName } from "@/components/ui/Icon";
import { services } from "./services";

export const stats = [
  { value: "[—]", suffix: "", label: "Médecins et spécialistes" },
  { value: String(services.length), suffix: "", label: "Services médicaux" },
  { value: "[—]", suffix: "", label: "Patients pris en charge" },
  { value: "[—]", suffix: " ans", label: "D'expérience" },
];

export const whyUs: { icon: IconName; title: string; text: string }[] = [
  { icon: "Clock", title: "Urgences 24 h/24", text: "Une équipe médicale présente jour et nuit, 7 jours sur 7, toute l'année." },
  { icon: "UserRoundCheck", title: "Médecins qualifiés", text: "Des spécialistes expérimentés qui travaillent ensemble autour de chaque patient." },
  { icon: "MonitorCheck", title: "Équipements modernes", text: "Scanner, radiographie numérique, laboratoire et bloc opératoire sur place." },
  { icon: "CalendarCheck", title: "Rendez-vous rapides", text: "Demandez un rendez-vous en ligne, nous vous rappelons pour le confirmer." },
];

export const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "HeartHandshake", title: "Humanité", text: "Chaque patient est accueilli avec respect, écoute et bienveillance." },
  { icon: "ShieldCheck", title: "Sécurité", text: "Protocoles d'hygiène stricts et traçabilité de chaque soin." },
  { icon: "Award", title: "Excellence", text: "Formation continue des équipes et amélioration permanente des pratiques." },
  { icon: "Lock", title: "Confidentialité", text: "Le secret médical et vos données personnelles sont protégés." },
];

export const equipment: { icon: IconName; name: string; text: string }[] = [
  { icon: "ScanLine", name: "Scanner", text: "Imagerie en coupe pour un diagnostic rapide." },
  { icon: "Activity", name: "Radiographie numérique", text: "Images nettes, moins d'irradiation." },
  { icon: "Waves", name: "Échographes", text: "Obstétrique, cardiologie et abdomen." },
  { icon: "FlaskConical", name: "Laboratoire automatisé", text: "Analyses fiables, résultats sous 24 h." },
  { icon: "BedDouble", name: "[Nombre] lits", text: "Chambres individuelles et doubles." },
  { icon: "Ambulance", name: "Ambulance médicalisée", text: "Transport sécurisé des patients." },
];

export const quality = [
  "Protocoles d'hygiène et de stérilisation contrôlés chaque jour",
  "Dossier patient partagé entre les services",
  "Comité qualité et enquêtes de satisfaction trimestrielles",
  "Formation continue des soignants aux gestes d'urgence",
];

export const history = [
  { year: "[Année]", text: "[Étape clé de l'histoire de l'établissement.]" },
  { year: "[Année]", text: "[Étape clé de l'histoire de l'établissement.]" },
  { year: "[Année]", text: "[Étape clé de l'histoire de l'établissement.]" },
  { year: "[Année]", text: "[Étape clé de l'histoire de l'établissement.]" },
];

export type Testimonial = {
  name: string;
  context: string;
  /** Note sur 5 ; `null` = étoiles masquées. */
  rating: number | null;
  text: string;
};

export const testimonials: Testimonial[] = [
  { name: "[Prénom N.]", context: "Maternité", rating: null, text: "[Témoignage à recueillir auprès d'une patiente, avec son accord écrit.]" },
  { name: "[Prénom N.]", context: "Urgences", rating: null, text: "[Témoignage à recueillir auprès d'un patient, avec son accord écrit.]" },
  { name: "[Prénom N.]", context: "Pédiatrie", rating: null, text: "[Témoignage à recueillir auprès d'un parent, avec son accord écrit.]" },
];

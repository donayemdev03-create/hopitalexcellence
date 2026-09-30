/**
 * Annuaire des médecins — PROVISOIRE.
 * Aucune identité réelle : noms, parcours et disponibilités sont à renseigner
 * (avec l'accord de chaque praticien). Les spécialités reprennent la maquette.
 *  - photo   : chemin d'une photo dans /public/images/ ; `null` = portrait illustré
 *  - service : `slug` d'un service (src/content/services.ts)
 *  - tone / portrait : couleur et variante du portrait illustré
 *  - featured : affiché sur la page d'accueil
 */
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  service: string;
  photo: string | null;
  tone: "brand" | "care" | "navy" | "sky";
  portrait: "a" | "b";
  featured: boolean;
  experience: string;
  languages: string[];
  summary: string;
  bio: string;
  education: string[];
  availability: string[];
};

function placeholderDoctor(
  n: number,
  specialty: string,
  service: string,
  tone: Doctor["tone"],
  portrait: Doctor["portrait"],
  featured: boolean,
): Doctor {
  return {
    id: `medecin-${n}`,
    name: "[Nom du médecin]",
    specialty,
    service,
    photo: null,
    tone,
    portrait,
    featured,
    experience: "[—]",
    languages: ["[Langues]"],
    summary: "[Présentation courte du médecin.]",
    bio: "[Présentation détaillée : parcours, domaines d'expertise, activités au sein de l'hôpital.]",
    education: ["[Diplôme]", "[Spécialisation]"],
    availability: ["[Jours de consultation]"],
  };
}

export const doctors: Doctor[] = [
  placeholderDoctor(1, "Cardiologue", "cardiologie", "brand", "a", true),
  placeholderDoctor(2, "Pédiatre", "pediatrie", "care", "b", true),
  placeholderDoctor(3, "Chirurgien", "chirurgie", "navy", "a", true),
  placeholderDoctor(4, "Gynécologue-obstétricien", "maternite", "sky", "b", true),
  placeholderDoctor(5, "Médecin généraliste", "medecine-generale", "care", "a", false),
  placeholderDoctor(6, "Médecin urgentiste", "urgences", "brand", "b", false),
  placeholderDoctor(7, "Chirurgien-dentiste", "dentisterie", "sky", "a", false),
  placeholderDoctor(8, "Radiologue", "imagerie-medicale", "navy", "b", false),
];

export function getDoctorById(id: string) {
  return doctors.find((d) => d.id === id);
}

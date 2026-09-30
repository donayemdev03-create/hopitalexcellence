/**
 * Annuaire PROVISOIRE. Aucune de ces personnes n'existe :
 * remplacer par la liste réelle des praticiens (avec leur accord).
 */
export type Doctor = {
  id: string;
  name: string;
  title: string;
  serviceSlug: string;
};

export const doctors: Doctor[] = [
  { id: "medecin-1", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "medecine-generale" },
  { id: "medecin-2", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "cardiologie" },
  { id: "medecin-3", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "pediatrie" },
  { id: "medecin-4", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "maternite" },
  { id: "medecin-5", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "chirurgie" },
  { id: "medecin-6", name: "[Nom du médecin]", title: "[Fonction]", serviceSlug: "imagerie-medicale" },
];

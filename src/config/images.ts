/**
 * Images du site.
 * Pour remplacer une illustration : copier la photo dans /public/images/
 * puis indiquer son chemin, ex. hero: "/images/facade.jpg".
 * Tant qu'une valeur vaut `null`, une illustration intégrée s'affiche.
 *
 * Formats conseillés :
 *  - hero, about : 1600 × 1100 px, JPG/WebP, < 300 Ko
 *  - photos des médecins : 800 × 1000 px (portrait)
 */
export const images: Record<"hero" | "about", string | null> = {
  hero: null,
  about: null,
};

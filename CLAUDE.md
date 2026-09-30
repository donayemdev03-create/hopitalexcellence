@AGENTS.md

# Conventions du projet

- Site en français uniquement (`lang="fr"`), textes de l'interface en français.
- Aucun contenu inventé : identités, coordonnées, chiffres, historique et témoignages restent des placeholders
  entre crochets `[…]`. Les textes repris de la maquette sont des exemples à valider.
- Identité et coordonnées : `src/config/site.ts`. Horaires : `src/config/hours.ts`.
  Données (services, médecins, chiffres, témoignages, actualités) : `src/content/`.
- Le design suit la maquette du client (React + Vite) : palette `brand` / `navy` / `care` (actions clés) /
  `alert` (urgences) / `ink` / `mist`, polices Lexend (titres) et Source Sans 3 (texte), icônes Lucide.
- Couleurs : uniquement via les jetons de `src/app/globals.css` (`@theme`). Exception : les illustrations SVG
  de `src/components/illustrations/`.
- Tailwind v4 : ne pas combiner `hidden` et `inline-flex` sur un même élément (voir `buttonClasses`).
- Accessibilité : libellés de formulaire, `aria-*`, contrastes suffisants, navigation clavier.
- Vérifications avant commit : `npm run lint`, `npm run typecheck`, `npm run build`.

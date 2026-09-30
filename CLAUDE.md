@AGENTS.md

# Conventions du projet

- Site en français uniquement (`lang="fr"`), textes de l'interface en français.
- Aucun contenu réel inventé : les informations inconnues restent des placeholders entre crochets `[…]`.
- Identité et coordonnées : `src/config/site.ts`. Données (services, médecins, actualités) : `src/content/`.
- Couleurs et polices : uniquement via les jetons de `src/app/globals.css` (`@theme`), jamais codées en dur.
  Le design final doit suivre la maquette fournie par le client.
- Accessibilité : libellés de formulaire, `aria-*`, contrastes suffisants, navigation clavier.
- Vérifications avant commit : `npm run lint`, `npm run typecheck`, `npm run build`.

# Hôpital Excellence — site web

Site vitrine de l'établissement, construit avec **Next.js 16 (App Router)**, **TypeScript** et **Tailwind CSS v4**.

> ⚠️ **Contenus provisoires.** Le nom, les coordonnées, les services, les médecins, les textes et les images sont des
> _placeholders_ (repérés par des crochets `[…]`). Tant que `isDraft` vaut `true` dans `src/config/site.ts`, un
> bandeau d'avertissement s'affiche et l'indexation par les moteurs de recherche est bloquée.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commande            | Rôle                                   |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Serveur de développement               |
| `npm run build`     | Build de production                    |
| `npm start`         | Lance le build de production           |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | Vérification TypeScript                |

Variable d'environnement (voir `.env.example`) : `NEXT_PUBLIC_SITE_URL`, l'URL publique du site (balises canoniques,
sitemap, Open Graph).

## Structure

```
src/
├── app/                      Pages (App Router)
│   ├── page.tsx              Accueil
│   ├── a-propos/             L'hôpital
│   ├── services/             Liste + page de chaque service ([slug])
│   ├── medecins/             Annuaire filtrable
│   ├── rendez-vous/          Formulaire de demande (démonstration)
│   ├── informations-patients/
│   ├── actualites/
│   ├── contact/
│   ├── mentions-legales/  confidentialite/
│   ├── sitemap.ts  robots.ts  manifest.ts  not-found.tsx
│   ├── layout.tsx            Gabarit global (en-tête, bandeau urgences, pied de page, SEO)
│   └── globals.css           Jetons de design (couleurs, polices, rayons)
├── components/
│   ├── layout/               Header, Footer, EmergencyBar, Logo…
│   ├── ui/                   Container, Button, Section, Card, PageHeader, ImagePlaceholder…
│   ├── appointment/          Formulaire de rendez-vous
│   └── doctors/              Carte et annuaire des médecins
├── config/
│   ├── site.ts               ★ Identité et coordonnées de l'hôpital
│   └── navigation.ts         Menus
├── content/                  ★ Services, médecins, actualités
└── lib/
    ├── seo.ts                Métadonnées et JSON-LD schema.org « Hospital »
    └── appointment/          Schéma de validation (Zod), action serveur, point d'envoi
```

## Remplacer les contenus provisoires

1. **Identité et coordonnées** : `src/config/site.ts` (nom, téléphone, urgences, adresse, e-mail, horaires).
2. **Services, médecins, actualités** : fichiers de `src/content/`.
3. **Textes des pages** : rechercher `[` dans `src/app/` pour trouver les zones à rédiger.
4. **Images** : déposer les fichiers dans `public/images/` et remplacer chaque `<ImagePlaceholder>` par `next/image`.
5. **Logo** : `src/components/layout/Logo.tsx`.
6. **Design d'après la maquette** : couleurs et polices dans `src/app/globals.css` (bloc `@theme`) et police dans
   `src/app/layout.tsx`. Les composants n'utilisent que ces jetons (`bg-primary`, `text-muted`…).
7. Une fois tout validé : passer `isDraft` à `false`.

## Formulaire de rendez-vous

- Validation côté navigateur **et** côté serveur, avec le même schéma (`src/lib/appointment/schema.ts`).
- Fonctionne aussi sans JavaScript (action serveur React).
- **Mode démonstration** : aucune donnée n'est envoyée ni stockée. Pour brancher un e-mail ou une base de données,
  modifier uniquement `submitAppointmentRequest` dans `src/lib/appointment/submit.ts`.
- Les données de santé sont soumises au RGPD et à des règles d'hébergement spécifiques : à valider avant la mise en
  production.

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

Le design reproduit la maquette fournie (prototype React + Vite) : palette, polices (Lexend / Source Sans 3),
icônes Lucide, illustrations, mise en page et comportements (menu tiroir mobile, barre d'actions mobile, horaires
« ouvert maintenant », filtres des médecins, créneaux horaires…).

```
src/
├── app/                      Pages (App Router)
│   ├── page.tsx              Accueil
│   ├── a-propos/             À propos
│   ├── services/             Liste + page de chaque service ([slug])
│   ├── medecins/             Annuaire filtrable + profil de chaque médecin ([id])
│   ├── rendez-vous/          Formulaire de demande (démonstration)
│   ├── contact/              Coordonnées, carte, horaires, formulaire de contact (démonstration)
│   ├── informations-patients/  actualites/  mentions-legales/  confidentialite/
│   ├── sitemap.ts  robots.ts  manifest.ts  not-found.tsx  template.tsx
│   ├── layout.tsx            Gabarit global (polices, en-tête, pied de page, barre mobile, SEO)
│   └── globals.css           Jetons de design de la maquette (couleurs, ombres, animations)
├── components/
│   ├── layout/               Header (barre infos + menu tiroir), Footer, MobileActionBar
│   ├── sections/             PageHero, horaires, urgences, témoignages, contact rapide, chiffres, CTA
│   ├── ui/                   Button, Logo, Icon, SectionHeading, ServiceCard, FormField, Photo…
│   ├── illustrations/        Bâtiment, portraits, plan (emplacements d'images)
│   ├── appointment/  contact/  doctors/
├── config/
│   ├── site.ts               ★ Identité, coordonnées, réseaux sociaux
│   ├── hours.ts              ★ Horaires, créneaux de rendez-vous
│   ├── images.ts             ★ Photos (hero, à propos)
│   └── navigation.ts         Menus
├── content/                  ★ Services, médecins, chiffres/valeurs/témoignages, actualités
└── lib/
    ├── seo.ts                Métadonnées et JSON-LD schema.org « Hospital »
    ├── appointment/  contact/  Schémas de validation (Zod), actions serveur, points d'envoi
```

## Remplacer les contenus provisoires

1. **Identité et coordonnées** : `src/config/site.ts` (téléphones, WhatsApp, e-mail, adresse, lien Maps, réseaux sociaux).
   Tant qu'un numéro est vide, les boutons d'appel correspondants sont inactifs.
2. **Horaires et créneaux** : `src/config/hours.ts` (repris de la maquette, à confirmer).
3. **Services, médecins, chiffres, historique, témoignages** : fichiers de `src/content/`.
   Les témoignages ne doivent être publiés qu'avec l'accord écrit des patients.
4. **Textes des pages** : rechercher `[` dans `src/` pour trouver les zones à compléter.
5. **Photos** : déposer les fichiers dans `public/images/` puis renseigner `src/config/images.ts`
   (et `photo` pour chaque médecin). Tant qu'une valeur vaut `null`, une illustration s'affiche.
6. **Logo** : `siteConfig.logo` dans `src/config/site.ts`.
7. **Carte** : remplacer `MapPlaceholder` (page Contact) par un `<iframe>` Google Maps.
8. Une fois tout validé : passer `isDraft` à `false`.

## Formulaires (rendez-vous et contact)

- Validation côté navigateur **et** côté serveur, avec le même schéma (`src/lib/appointment/schema.ts`).
- Fonctionne aussi sans JavaScript (action serveur React).
- **Mode démonstration** : aucune donnée n'est envoyée ni stockée. Pour brancher un e-mail ou une base de données,
  modifier uniquement `submitAppointmentRequest` dans `src/lib/appointment/submit.ts`
  (et `submitContactMessage` dans `src/lib/contact/submit.ts` pour le formulaire de contact).
- Les données de santé sont soumises au RGPD et à des règles d'hébergement spécifiques : à valider avant la mise en
  production.

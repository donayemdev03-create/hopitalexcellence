/** Actualités PROVISOIRES — à remplacer (ou brancher sur un CMS). */
export type NewsItem = {
  slug: string;
  title: string;
  date: string; // ISO AAAA-MM-JJ
  excerpt: string;
};

export const news: NewsItem[] = [
  {
    slug: "actualite-1",
    title: "[Titre de l'actualité]",
    date: "2026-01-01",
    excerpt: "[Résumé de l'actualité à rédiger.]",
  },
  {
    slug: "actualite-2",
    title: "[Titre de l'actualité]",
    date: "2026-01-01",
    excerpt: "[Résumé de l'actualité à rédiger.]",
  },
  {
    slug: "actualite-3",
    title: "[Titre de l'actualité]",
    date: "2026-01-01",
    excerpt: "[Résumé de l'actualité à rédiger.]",
  },
];

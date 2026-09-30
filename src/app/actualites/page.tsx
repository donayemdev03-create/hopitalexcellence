import { news } from "@/content/news";
import { pageMetadata } from "@/lib/seo";
import { NewsList } from "@/components/NewsList";
import { CtaBand, PageHero } from "@/components/sections/Sections";

export const metadata = pageMetadata({
  title: "Actualités",
  description: "Les dernières actualités et événements de l'établissement.",
  path: "/actualites",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Actualités de l’hôpital"
        text="Nouveaux services, campagnes de dépistage, événements."
        crumbs={[{ label: "Actualités" }]}
      />
      <section className="section">
        <div className="container-x">
          <NewsList items={news} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import { news } from "@/content/news";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { NewsList } from "@/components/NewsList";

export const metadata = pageMetadata({
  title: "Actualités",
  description: "Les dernières actualités et événements de l'établissement.",
  path: "/actualites",
});

export default function NewsPage() {
  return (
    <>
      <PageHeader title="Actualités" breadcrumbs={[{ label: "Actualités" }]} />
      <Section>
        <NewsList items={news} />
      </Section>
    </>
  );
}

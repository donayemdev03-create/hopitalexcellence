import type { NewsItem } from "@/content/news";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug}>
          <Card title={item.title} media={<ImagePlaceholder label="Illustration de l'actualité" className="aspect-video" />}>
            <time dateTime={item.date} className="block text-xs font-medium uppercase tracking-wide text-secondary">
              {dateFormatter.format(new Date(item.date))}
            </time>
            <p className="mt-2">{item.excerpt}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

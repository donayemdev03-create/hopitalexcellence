import type { NewsItem } from "@/content/news";
import { HospitalScene } from "@/components/illustrations/HospitalScene";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.slug}>
          <article className="card flex h-full flex-col overflow-hidden">
            <div className="aspect-video" aria-hidden="true">
              <HospitalScene className="h-full w-full" idPrefix={`news-${i}`} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <time dateTime={item.date} className="text-sm font-semibold tracking-[0.1em] text-brand-600 uppercase">
                {dateFormatter.format(new Date(item.date))}
              </time>
              <h2 className="mt-1.5 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 flex-1 text-ink-500">{item.excerpt}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

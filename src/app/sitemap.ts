import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { legalNav, mainNav } from "@/config/navigation";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...mainNav.map((n) => n.href),
    "/rendez-vous",
    ...services.map((s) => `/services/${s.slug}`),
    ...legalNav.map((n) => n.href),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

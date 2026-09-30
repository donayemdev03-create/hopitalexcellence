import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { mainNav, secondaryNav } from "@/config/navigation";
import { services } from "@/content/services";
import { doctors } from "@/content/doctors";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...mainNav.map((n) => n.href),
    ...services.map((s) => `/services/${s.slug}`),
    ...doctors.map((d) => `/medecins/${d.id}`),
    ...secondaryNav.map((n) => n.href),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

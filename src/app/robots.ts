import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Tant que le site contient des contenus provisoires, on bloque l'indexation.
  if (siteConfig.isDraft) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}

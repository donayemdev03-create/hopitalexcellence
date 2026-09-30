import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

/** Métadonnées standard d'une page (titre, description, URL canonique, Open Graph). */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
    },
  };
}

/** Données structurées schema.org de l'établissement (JSON-LD). */
export function hospitalJsonLd() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phone.href,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
  };
}

import Link from "next/link";
import { formatAddress, siteConfig } from "@/config/site";
import { legalNav, mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { PhoneLink } from "./PhoneLink";

export function Footer() {
  const { contact, hours } = siteConfig;
  return (
    <footer className="bg-primary text-on-primary">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 text-sm opacity-90">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Navigation</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="opacity-90 hover:underline hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic opacity-90">
            <p>{formatAddress()}</p>
            <p>
              Standard : <PhoneLink phone={contact.phone} className="hover:underline" />
            </p>
            <p>
              Urgences : <PhoneLink phone={contact.emergencyPhone} className="hover:underline" />
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Horaires</h2>
          <dl className="mt-4 space-y-2 text-sm opacity-90">
            {hours.map((h) => (
              <div key={h.label}>
                <dt className="font-medium">{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/20">
        <Container className="flex flex-col gap-3 py-6 text-xs opacity-90 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

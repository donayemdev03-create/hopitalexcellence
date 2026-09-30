import Link from "next/link";
import { Mail, MapPin, Phone, Siren } from "lucide-react";
import { formatAddress, siteConfig, telHref } from "@/config/site";
import { openingHours } from "@/config/hours";
import { mainNav, secondaryNav } from "@/config/navigation";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;
  const address = formatAddress();
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  const emergencyHref = telHref(contact.emergencyPhone);
  const phoneHref = telHref(contact.phone);

  return (
    <footer className="bg-navy-950 text-brand-100/80">
      <div className="container-x grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-5 text-[0.95rem] leading-relaxed">
            {siteConfig.name} accompagne les patients de {contact.address.city} et de sa région depuis {siteConfig.foundedYear}, avec
            des soins de qualité, accessibles et humains.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([network, url]) => (
                <a
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={network}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand-400 hover:bg-white/5"
                >
                  <SocialIcon network={network} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-white! uppercase">Navigation</h2>
          <ul className="mt-5 space-y-2.5">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-white! uppercase">Services</h2>
          <ul className="mt-5 space-y-2.5">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-white! uppercase">Nous contacter</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <span>
                {address.line1}
                <br />
                {contact.address.district}, {contact.address.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              {phoneHref ? (
                <a href={phoneHref} className="tabular hover:text-white">
                  {contact.phone.display}
                </a>
              ) : (
                <span>{contact.phone.display}</span>
              )}
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3 rounded-xl bg-alert-600/15 p-3 text-white">
              <Siren aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-alert-500" />
              <span>
                Urgences {siteConfig.emergencyAvailability.split(" · ")[0]}
                <br />
                {emergencyHref ? (
                  <a href={emergencyHref} className="tabular font-semibold">
                    {contact.emergencyPhone.display}
                  </a>
                ) : (
                  <span className="font-semibold">{contact.emergencyPhone.display}</span>
                )}
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Consultations : lun – ven {openingHours[0].open} – {openingHours[0].close}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {secondaryNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {siteConfig.isDraft && <p className="text-brand-100/50">Site en construction — contenus provisoires à valider.</p>}
        </div>
      </div>
    </footer>
  );
}

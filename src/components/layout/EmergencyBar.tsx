import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "./PhoneLink";

export function EmergencyBar() {
  const { emergencyPhone, phone } = siteConfig.contact;
  return (
    <div className="bg-emergency text-on-emergency">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-sm">
        <p className="font-semibold">
          Urgences 24h/24 :{" "}
          <PhoneLink phone={emergencyPhone} className="underline underline-offset-2" />
        </p>
        <p className="hidden sm:block">
          Standard : <PhoneLink phone={phone} className="underline underline-offset-2" />
          <span aria-hidden="true"> · </span>
          <Link href="/contact" className="underline underline-offset-2">
            Accès &amp; horaires
          </Link>
        </p>
      </Container>
    </div>
  );
}

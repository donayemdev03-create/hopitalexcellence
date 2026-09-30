import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
  /** Niveau du titre (h2 par défaut). */
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", light = false, action, as: Tag = "h2", id }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-6 sm:mb-12 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`eyebrow ${light ? "text-brand-200" : ""}`}>
            <span aria-hidden="true" className={`h-px w-6 ${light ? "bg-brand-200" : "bg-brand-500"}`} />
            {eyebrow}
          </p>
        )}
        <Tag id={id} className={`mt-3 text-[1.85rem] leading-tight font-semibold sm:text-4xl ${light ? "text-white!" : ""}`}>
          {title}
        </Tag>
        {text && <p className={`mt-4 text-lg ${light ? "text-brand-100/90" : "text-ink-500"}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Emplacement réservé pour une image de la maquette.
 * À remplacer par `next/image` (fichier dans /public/images) une fois les visuels fournis.
 */
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Image provisoire : ${label}`}
      className={`flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-primary-soft),var(--color-primary-soft)_12px,var(--color-surface-alt)_12px,var(--color-surface-alt)_24px)] p-4 text-center text-xs font-medium uppercase tracking-wide text-muted ${className}`}
    >
      <span aria-hidden="true">Image à venir · {label}</span>
    </div>
  );
}

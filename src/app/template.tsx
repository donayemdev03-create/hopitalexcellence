/** Rejoué à chaque navigation : apparition en fondu du contenu (comme dans la maquette). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}

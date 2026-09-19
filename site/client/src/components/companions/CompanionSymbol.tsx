import { BookOpen, Flag, Footprints, Heart, House, Mountain, Route, Scale, ShieldCheck, Store } from "lucide-react";
const symbols = { book: BookOpen, flag: Flag, footprints: Footprints, heart: Heart, home: House, mountain: Mountain, route: Route, scale: Scale, shield: ShieldCheck, store: Store };
export function CompanionSymbol({ symbol }: { symbol: string }) {
  const Icon = symbols[symbol as keyof typeof symbols] ?? BookOpen;
  return <span className="companion-symbol" aria-hidden="true"><Icon size={36} strokeWidth={1.4} /></span>;
}

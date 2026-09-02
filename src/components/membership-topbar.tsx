import { Globe, MapPin, ChevronDown } from "lucide-react";

const topbarItems = [
  { icon: MapPin, label: "Miraflores" },
  { icon: Globe, label: "Guatemala" },
  { icon: Globe, label: "English" },
];

export function MembershipTopbar() {
  return (
    <header className="w-full">
      <div className="bg-brand-navy text-white">
        <div className="mx-auto flex h-[60px] max-w-[1190px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[19px] font-bold tracking-[-0.02em]">
            <span className="text-[20px] leading-none text-warning">✶</span>
            <span>PriceSmart</span>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {topbarItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/95">
                <Icon className="size-4" strokeWidth={1.8} />
                <span>{label}</span>
                <ChevronDown className="size-4" strokeWidth={1.8} />
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="h-[38px] bg-brand-blue" />
    </header>
  );
}

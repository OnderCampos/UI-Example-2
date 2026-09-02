import { Globe, MapPin, ChevronDown } from "lucide-react";

const locationItems = [
  { icon: MapPin, label: "Miraflores" },
  { icon: Globe, label: "Guatemala" },
  { icon: Globe, label: "English" },
] as const;

export function MembershipHeader() {
  return (
    <header className="w-full">
      <div className="bg-[var(--brand-header)] text-[var(--brand-header-foreground)]">
        <div className="mx-auto flex h-[60px] w-full max-w-[1080px] items-center justify-between px-6 md:px-8">
          <div className="text-[35px] font-black leading-none tracking-[-0.04em]">
            <span>Price</span>
            <span className="text-[var(--brand-accent)]">Smart</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            {locationItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-2 text-[13px] text-white/95 transition-opacity hover:opacity-80"
              >
                <Icon className="size-4" strokeWidth={2.1} />
                <span>{label}</span>
                <ChevronDown className="size-3.5" strokeWidth={2.1} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[var(--brand-header-secondary)]" />
    </header>
  );
}

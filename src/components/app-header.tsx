import { ChevronDown, Globe, MapPin } from "lucide-react";

type AppHeaderProps = {
  location?: string;
  country?: string;
  language?: string;
};

export function AppHeader({
  location = "Miraflores",
  country = "Guatemala",
  language = "English",
}: AppHeaderProps) {
  return (
    <header className="w-full">
      <div className="bg-[color:var(--header-background)] text-[color:var(--header-foreground)]">
        <div className="mx-auto flex h-[60px] w-full max-w-[1120px] items-center justify-between px-8 lg:px-6">
          <div className="flex items-center gap-2.5 text-sm font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex h-5 w-5 items-center justify-center text-[color:var(--brand-orange)]">
              <span className="absolute text-[18px] leading-none">✶</span>
            </span>
            <span className="text-[15px]">PriceSmart</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-[color:var(--header-foreground)]/95">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{country}</span>
              <ChevronDown className="h-4 w-4 text-[color:var(--header-foreground)]/70" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{language}</span>
              <ChevronDown className="h-4 w-4 text-[color:var(--header-foreground)]/70" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[color:var(--header-accent)]" />
    </header>
  );
}

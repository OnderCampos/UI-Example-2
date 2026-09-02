import Image from "next/image";
import { Globe, MapPin, ChevronDown } from "lucide-react";

function TopbarItem({
  icon,
  label,
  flag,
}: {
  icon: React.ReactNode;
  label: string;
  flag?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/95">
      {icon}
      {flag ? (
        <span className="flex size-4 items-center justify-center overflow-hidden rounded-full bg-white/20 text-[11px] leading-none">
          {flag}
        </span>
      ) : null}
      <span>{label}</span>
      <ChevronDown className="size-4 opacity-80" />
    </div>
  );
}

export function MembershipTopbar() {
  return (
    <header className="w-full bg-[#122b68] text-white">
      <div className="mx-auto flex h-[60px] w-full max-w-[1120px] items-center justify-between px-6 lg:px-8">
        <Image
          src="/next.svg"
          alt="PriceSmart"
          width={141}
          height={32}
          className="h-8 w-auto brightness-0 invert"
          priority
        />
        <div className="flex items-center gap-6">
          <TopbarItem
            icon={<MapPin className="size-4" />}
            label="Miraflores"
          />
          <TopbarItem
            icon={<span className="text-[10px]">🌐</span>}
            label="Guatemala"
          />
          <TopbarItem icon={<Globe className="size-4" />} label="English" />
        </div>
      </div>
      <div className="h-[38px] w-full bg-[#1346c5]" />
    </header>
  );
}

import { ChevronDown, Globe, MapPin } from "lucide-react";

function PriceSmartLogo() {
  return (
    <div className="flex items-center gap-1.5 text-white">
      <div className="flex flex-col items-center leading-none">
        <span className="-mb-0.5 text-[13px] font-black tracking-tight text-[#f97316]">
          ✳
        </span>
      </div>
      <span className="text-[19px] font-semibold tracking-[-0.03em]">PriceSmart</span>
    </div>
  );
}

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
        <span className="flex size-4 items-center justify-center rounded-full bg-white text-[10px] leading-none text-[#0f172a]">
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
    <header className="w-full bg-[#192a63] text-white">
      <div className="mx-auto flex h-[60px] w-full max-w-[1120px] items-center justify-between px-6 lg:px-8">
        <PriceSmartLogo />
        <div className="flex items-center gap-7">
          <TopbarItem
            icon={<MapPin className="size-4" strokeWidth={2.1} />}
            label="Miraflores"
          />
          <TopbarItem icon={<span className="text-[10px]">🌐</span>} label="Guatemala" flag="🌐" />
          <TopbarItem icon={<Globe className="size-4" strokeWidth={2.1} />} label="English" />
        </div>
      </div>
      <div className="h-[39px] w-full bg-[#1847b8]" />
    </header>
  );
}

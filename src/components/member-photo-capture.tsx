import Image from "next/image";
import { Camera, ChevronDown, Globe, House, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cameraOptions = ["Select camera", "Integrated webcam", "External camera"];

function TopBar() {
  return (
    <header>
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-8">
          <Image
            src="/next.svg"
            alt="PriceSmart"
            width={118}
            height={24}
            className="h-auto w-[118px] brightness-0 invert"
          />
          <div className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full bg-white/15 text-[10px]">🌐</div>
              <span>Guatemala</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <span>English</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[var(--brand-button)]" />
    </header>
  );
}

function InstructionCard() {
  return (
    <aside className="rounded-[var(--radius-lg)] border border-transparent bg-[#f5f5f7] px-6 pb-7 pt-5 shadow-none">
      <div className="-mx-6 -mt-5 mb-5 h-1 rounded-t-[var(--radius-lg)] bg-[var(--brand-button)]" />
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--brand-button)]">
        Profile photo capture
      </h2>
      <ol className="mt-3 space-y-4 pl-5 text-[15px] leading-[1.45] text-[var(--brand-label)] marker:text-[var(--brand-label)]">
        <li>Have the member stand in front of the camera, facing forward. Ensure the member&apos;s face and shoulders are fully visible and centered within the frame.</li>
        <li>Check for adequate lighting, avoiding harsh shadows or glares.</li>
        <li>Confirm the capture is sharp and meets all requirements.</li>
      </ol>
      <Button
        variant="outline"
        className="mt-6 h-[36px] w-full rounded-[8px] border-[var(--primary)] bg-white text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
      >
        Take photo
      </Button>
    </aside>
  );
}

export function MemberPhotoCapture() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1200px] px-[60px] pb-10 pt-[22px]">
        <div className="max-w-[900px]">
          <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[var(--brand-button)]">
            Member profile photo
          </h1>
          <p className="mt-1 text-[14px] text-[var(--brand-button)]/85">
            Ask the member to look directly at the camera to capture their profile picture for verification and digital use.
          </p>
        </div>

        <section className="mt-12 grid grid-cols-[211px_368px_290px] items-start gap-[24px]">
          <div>
            <label className="block text-[13px] font-medium text-[var(--brand-label)]">Camera</label>
            <Select defaultValue="Select camera">
              <SelectTrigger className="mt-2 h-[34px] w-full rounded-[8px] border-[var(--border-strong)] bg-surface px-3 text-[14px] text-muted-foreground shadow-none focus-visible:ring-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cameraOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex h-[370px] items-center justify-center rounded-[6px] bg-[#f2f2f4] text-muted-foreground">
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-full border border-border bg-white">
                <Camera className="size-6" />
              </div>
              <p className="text-[14px]">Camera preview</p>
            </div>
          </div>

          <InstructionCard />
        </section>

        <div className="mt-[112px] border-t border-border pt-[24px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                className="h-[36px] rounded-[8px] border-[var(--primary)] bg-white px-[14px] text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
              >
                <House className="size-4" />
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-[36px] rounded-[8px] border-[var(--primary)] bg-white px-[48px] text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
              >
                Cancel
              </Button>
            </div>

            <Button
              disabled
              className="h-[36px] rounded-[8px] bg-[var(--disabled-surface)] px-[28px] text-[14px] font-semibold text-[var(--disabled-text)] shadow-none hover:bg-[var(--disabled-surface)]"
            >
              Use this photo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

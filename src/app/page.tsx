import Image from "next/image";
import { Camera, Check, ChevronDown, Globe, House, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";

function HeaderSelection({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/95">
      {icon}
      <span>{label}</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  );
}

function CaptureInstructions() {
  return (
    <Card className="gap-0 rounded-2xl border-0 bg-[#f2f2f5] px-6 py-6 shadow-none">
      <div className="-mx-6 -mt-6 mb-5 h-1 rounded-t-2xl bg-[#2f5edb]" />
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#233f8c]">
        Profile photo capture
      </h2>
      <ol className="mt-5 space-y-5 pl-5 text-[15px] leading-8 text-[#59657e]">
        <li>
          Have the member stand in front of the camera, facing forward. Ensure the
          member&apos;s face and shoulders are fully visible and centered within the frame.
        </li>
        <li>
          Check for adequate lighting, avoiding harsh shadows or glares.
        </li>
        <li>
          Confirm the capture is sharp and meets all requirements.
        </li>
      </ol>
      <Button
        variant="outline"
        className="mt-6 h-11 rounded-lg border-[#5d88ef] bg-white text-[14px] font-semibold text-[#3d82f6] hover:bg-white hover:text-[#3d82f6]"
      >
        Take photo
      </Button>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f7] text-[#233f8c]">
      <header className="w-full">
        <div className="bg-[#16295f] text-white">
          <div className="mx-auto flex h-[58px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
            <Image
              src="/Frida.png"
              alt="PriceSmart"
              width={155}
              height={36}
              className="h-auto w-[128px] object-contain brightness-0 invert"
              priority
            />

            <div className="flex items-center gap-7">
              <HeaderSelection icon={<MapPin className="h-4 w-4" />} label="Miraflores" />
              <HeaderSelection
                icon={<div className="h-4 w-4 rounded-full bg-white/85 ring-1 ring-white/50" />}
                label="Guatemala"
              />
              <HeaderSelection icon={<Globe className="h-4 w-4" />} label="English" />
            </div>
          </div>
        </div>
        <div className="h-[39px] bg-[#1f47b8]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-6 pb-6 pt-6 lg:px-8">
        <div className="ml-4 max-w-[980px]">
          <h1 className="text-[22px] font-medium tracking-[-0.02em] text-[#2a438b]">
            Member profile photo
          </h1>
          <p className="mt-2 text-[14px] leading-6 text-[#49608e]">
            Ask the member to look directly at the camera to capture their profile picture
            for verification and digital use.
          </p>

          <div className="mt-10 grid grid-cols-[210px_1fr_292px] gap-6">
            <div>
              <label
                htmlFor="camera"
                className="mb-2 block text-[13px] font-medium text-[#49566d]"
              >
                Camera
              </label>
              <NativeSelect
                id="camera"
                defaultValue=""
                className="h-11 w-full rounded-lg border-[#cfd6e2] bg-white text-[15px] text-[#7b879d] shadow-none focus-visible:ring-0"
              >
                <NativeSelectOption value="" disabled>
                  Select camera
                </NativeSelectOption>
                <NativeSelectOption value="front">Front camera</NativeSelectOption>
                <NativeSelectOption value="usb">USB camera</NativeSelectOption>
                <NativeSelectOption value="built-in">Built-in webcam</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="h-[370px] rounded-md bg-[#f0f1f4]" />

            <CaptureInstructions />
          </div>
        </div>

        <Separator className="mt-28 bg-[#d6dbe4]" />

        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              className="h-[37px] rounded-lg border-[#4f85ea] px-4 text-[14px] font-semibold text-[#3d82f6] hover:bg-white hover:text-[#3d82f6]"
            >
              <House className="h-4 w-4" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-[37px] min-w-[132px] rounded-lg border-[#4f85ea] text-[14px] font-semibold text-[#3d82f6] hover:bg-white hover:text-[#3d82f6]"
            >
              Cancel
            </Button>
          </div>

          <Button
            disabled
            className="h-[37px] rounded-lg bg-[#eef0f4] px-7 text-[14px] font-semibold text-[#aab3c2] hover:bg-[#eef0f4]"
          >
            <Check className="h-4 w-4" />
            Use this photo
          </Button>
        </div>
      </section>
    </main>
  );
}

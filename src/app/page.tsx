import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Camera, ChevronDown, Globe, House, MapPin } from "lucide-react";

const captureSteps = [
  "Have the member stand in front of the camera, facing forward. Ensure the member's face and shoulders are fully visible and centered within the frame.",
  "Check for adequate lighting, avoiding harsh shadows or glares.",
  "Confirm the capture is sharp and meets all requirements.",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#243b7b]">
      <header className="bg-[#162b69] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-10">
          <div className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex size-5 items-center justify-center">
              <span className="absolute text-[20px] leading-none text-[#f26722]">✶</span>
            </span>
            <span>PriceSmart</span>
          </div>

          <div className="flex items-center gap-8 text-[14px] font-medium text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-white/20 text-[10px]">
                🌐
              </span>
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
        <div className="h-[38px] bg-[#1f44ba]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-[60px] pt-[22px] pb-10">
        <h1 className="text-[24px] font-normal tracking-[0.01em] text-[#253f82]">
          Member profile photo
        </h1>
        <p className="mt-2 max-w-[900px] text-[15px] leading-6 text-[#41598f]">
          Ask the member to look directly at the camera to capture their profile picture for verification and digital use.
        </p>

        <div className="mt-6 grid grid-cols-[210px_1fr_290px] gap-6">
          <div>
            <label
              htmlFor="camera-select"
              className="mb-2 block text-[14px] font-medium text-[#42557f]"
            >
              Camera
            </label>
            <Select defaultValue="front-desk-camera">
              <SelectTrigger
                id="camera-select"
                className="h-[34px] w-full rounded-[7px] border-[#d2d8e4] bg-white px-3 text-[14px] text-[#65748d] shadow-none focus-visible:ring-0"
              >
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="front-desk-camera">Front desk camera</SelectItem>
                <SelectItem value="webcam-1">Webcam 1</SelectItem>
                <SelectItem value="usb-camera">USB camera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <div className="flex h-[370px] w-full max-w-[368px] items-center justify-center rounded-[6px] bg-[#ededf0]">
              <div className="flex flex-col items-center gap-3 text-[#b8beca]">
                <Camera className="size-10 stroke-[1.5]" />
                <span className="text-[14px]">Photo preview</span>
              </div>
            </div>
          </div>

          <aside className="rounded-[12px] bg-[#f1f1f3] px-6 pt-5 pb-7 shadow-[0_0_0_1px_rgba(214,220,230,0.35)]">
            <div className="-mx-6 -mt-5 mb-5 h-1 rounded-t-[12px] bg-[#2f57d6]" />
            <h2 className="text-[20px] font-semibold text-[#223f80]">
              Profile photo capture
            </h2>
            <ol className="mt-4 space-y-4 pl-5 text-[14px] leading-8 text-[#5a6783] marker:text-[#5a6783]">
              {captureSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Button
              type="button"
              variant="outline"
              className="mt-5 h-[36px] w-full rounded-[7px] border-[#5d86ea] bg-white text-[14px] font-semibold text-[#3f7bf3] shadow-none hover:bg-[#f7faff] hover:text-[#3f7bf3]"
            >
              Take photo
            </Button>
          </aside>
        </div>

        <Separator className="mt-[112px] bg-[#d4d9e3]" />

        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-6">
            <Button
              type="button"
              variant="outline"
              className="h-[36px] rounded-[8px] border-[#5d86ea] bg-white px-4 text-[14px] font-semibold text-[#3f7bf3] shadow-none hover:bg-[#f7faff] hover:text-[#3f7bf3]"
            >
              <House className="size-4" />
              Go back home
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[36px] min-w-[132px] rounded-[8px] border-[#5d86ea] bg-white px-6 text-[14px] font-semibold text-[#3f7bf3] shadow-none hover:bg-[#f7faff] hover:text-[#3f7bf3]"
            >
              Cancel
            </Button>
          </div>

          <Button
            type="button"
            disabled
            className="h-[36px] rounded-[8px] bg-[#ebedf1] px-6 text-[14px] font-semibold text-[#a0acbd] shadow-none hover:bg-[#ebedf1]"
          >
            Use this photo
          </Button>
        </div>
      </section>
    </main>
  );
}

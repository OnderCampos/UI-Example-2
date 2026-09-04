import { Camera, House } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const instructions = [
  "Have the member stand in front of the camera, facing forward. Ensure the member's face and shoulders are fully visible and centered within the frame.",
  "Check for adequate lighting, avoiding harsh shadows or glares.",
  "Confirm the capture is sharp and meets all requirements.",
];

function PhotoGuidanceCard() {
  return (
    <Card className="gap-0 rounded-[var(--radius-panel)] border-0 bg-[color:var(--panel-background)] p-0 shadow-none">
      <div className="h-1 w-full rounded-t-[var(--radius-panel)] bg-[color:var(--header-accent)]" />
      <div className="space-y-5 px-6 py-6">
        <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[color:var(--brand-blue-deep)]">
          Profile photo capture
        </h2>
        <ol className="space-y-4 pl-5 text-[15px] leading-8 text-muted-foreground marker:text-[color:var(--text-muted)]">
          {instructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ol>
        <Button
          variant="outline"
          className="mt-6 h-[36px] w-full rounded-[var(--radius-sm-token)] border-[color:var(--header-accent)] bg-transparent text-[15px] font-semibold text-[color:var(--header-accent)] shadow-none hover:bg-[color:var(--accent)] hover:text-[color:var(--header-accent)]"
        >
          Take photo
        </Button>
      </div>
    </Card>
  );
}

export default function ReferencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader />

      <section className="mx-auto max-w-[1120px] px-8 pb-10 pt-7 lg:px-6">
        <div className="max-w-[760px]">
          <h1 className="text-[22px] font-normal tracking-[-0.02em] text-[color:var(--brand-blue-deep)]">
            Member profile photo
          </h1>
          <p className="mt-2 text-[15px] text-[color:var(--brand-blue-deep)]/82">
            Ask the member to look directly at the camera to capture their profile picture for verification and digital use.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[210px_minmax(0,368px)_290px] lg:items-start">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-[color:var(--brand-blue-deep)]">Camera</label>
            <Select>
              <SelectTrigger className="h-[34px] w-full rounded-[var(--radius-sm-token)] border-border bg-card text-[15px] text-muted-foreground shadow-none focus-visible:ring-0">
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="front-desk">Front desk camera</SelectItem>
                <SelectItem value="laptop">Laptop webcam</SelectItem>
                <SelectItem value="usb">USB camera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex h-[370px] items-center justify-center rounded-[var(--radius-panel)] bg-[color:var(--capture-surface)]">
            <Camera className="h-12 w-12 text-[color:var(--capture-icon)]" strokeWidth={1.5} />
          </div>

          <PhotoGuidanceCard />
        </div>

        <Separator className="mt-28" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="h-[36px] rounded-[var(--radius-sm-token)] border-[color:var(--header-accent)] bg-card px-4 text-[15px] font-semibold text-[color:var(--header-accent)] shadow-none hover:bg-[color:var(--accent)] hover:text-[color:var(--header-accent)]"
            >
              <House className="h-4 w-4" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-[36px] rounded-[var(--radius-sm-token)] border-[color:var(--header-accent)] bg-card px-12 text-[15px] font-semibold text-[color:var(--header-accent)] shadow-none hover:bg-[color:var(--accent)] hover:text-[color:var(--header-accent)]"
            >
              Cancel
            </Button>
          </div>

          <Button
            disabled
            className="h-[36px] rounded-[var(--radius-sm-token)] border border-[color:var(--border)] bg-[color:var(--disabled-surface)] px-6 text-[15px] font-semibold text-[color:var(--disabled-foreground)] shadow-none hover:bg-[color:var(--disabled-surface)]"
          >
            Use this photo
          </Button>
        </div>
      </section>
    </main>
  );
}

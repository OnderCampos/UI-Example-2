import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard · GitHub",
  description: "Repository activity dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

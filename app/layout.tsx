import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth", "opsz"], variable: "--f-display" });
const serif = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-serif" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--f-sans" });

export const metadata: Metadata = {
  title: "The Wed Plans: coming soon",
  description: "Every ceremony, one calm plan. The Wed Plans is launching soon.",
};

export const viewport: Viewport = {
  themeColor: "#7b1e3a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

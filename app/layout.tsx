import "./globals.css";
import type { Metadata } from "next";

const defaultMetadata: Metadata = {
  title: "Reel Crater Agent",
  description:
    "An autonomous creative strategist that transforms ideas into high-impact social reels."
};

export const metadata = defaultMetadata;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}

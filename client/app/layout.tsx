import type { Metadata } from "next";
import "./globals.css";
import Toaster from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "QuickHire — Discover 5000+ Jobs",
  description:
    "Great platform for job seekers searching for new career heights and passionate about startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

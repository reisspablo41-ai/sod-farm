import type { Metadata } from "next";
import { Inter, Roboto, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cut Sod | Farm Direct Premium Turfgrass",
  description: "High-performance, SEO-optimized e-commerce platform for selling turfgrass directly from the farm to consumers and landscapers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, roboto.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

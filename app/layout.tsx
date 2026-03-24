import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

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
  title: "FreshCut Sod Farms | Farm Direct Premium Turfgrass",
  description: "High-performance, farm-direct premium turfgrass. We harvest fresh every morning and deliver same-day to your door. Order your sod today!",
  keywords: "sod, turfgrass, freshcut sod, lawn replacement, Bermuda sod, St. Augustine sod, Zoysia sod",
  openGraph: {
    title: "FreshCut Sod Farms | Farm Direct Premium Turfgrass",
    description: "Harvested fresh at dawn. Delivered same-day. The greenest lawn on the block starts here.",
    type: "website",
    locale: "en_US",
    url: "https://freshcutsodfarms.com",
    siteName: "FreshCut Sod Farms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script src="//code.jivosite.com/widget/X96g5goQJR" strategy="afterInteractive" />
      </body>
    </html>
  );
}

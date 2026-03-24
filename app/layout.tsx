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
      className={`${inter.variable} ${roboto.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script src="//code.jivosite.com/widget/X96g5goQJR" strategy="afterInteractive" />
      </body>
    </html>
  );
}

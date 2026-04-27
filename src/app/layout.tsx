import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joyzen | A New Health System for Reproductive Care",
  description:
    "Joyzen replaces fragmented care with a continuous system where hormones, fertility, and long-term health are managed together. Built for healthcare. Designed for trust.",
  keywords: [
    "reproductive health",
    "healthcare",
    "fertility",
    "hormones",
    "continuous care",
    "Joyzen",
  ],
  openGraph: {
    title: "Joyzen | A New Health System",
    description:
      "A new way of delivering reproductive healthcare. Online or in clinic, it's the same person guiding your care.",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${satoshi.variable} antialiased`}
      >
        <SmoothScroll>
          <Preloader />
          <NoiseOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

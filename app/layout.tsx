import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Little Love — A Cute Gift",
  description: "A cozy, wholesome, playful single-page gift site.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}



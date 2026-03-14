import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madism — Bookings",
  description:
    "Official booking page for Madism. Download press assets, EPK, and get in touch.",
  openGraph: {
    title: "Madism — Bookings",
    description:
      "Official booking page for Madism. Download press assets, EPK, and get in touch.",
    // TODO: Add OG image when ready
    // images: [{ url: "/images/og.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "The Oafs' Adventure | A Pizza Quest Gone Wrong",
  description: "Join Josiah and Graham on their hilariously disastrous quest for pizza. A choose-your-own-adventure interactive story where every decision leads to chaos.",
  keywords: ["interactive story", "choose your own adventure", "comedy", "pizza", "game"],
  openGraph: {
    title: "The Oafs' Adventure",
    description: "Two lovable idiots. One simple pizza craving. Infinite ways to mess it up.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}

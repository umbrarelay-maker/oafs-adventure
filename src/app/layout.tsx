import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Oafs' Adventure — An Interactive Tale",
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
        className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

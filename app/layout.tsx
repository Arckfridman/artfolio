import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Libre_Franklin,
} from "next/font/google";
import { LayoutClient } from "@/components/layout-client";
import "./globals.css";

const foundersGrotesk = Libre_Franklin({
  variable: "--font-founders",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const domaineDisplay = Cormorant_Garamond({
  variable: "--font-domaine",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const rlUnno = Bricolage_Grotesque({
  variable: "--font-unno",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Artur",
  description: "Strategy, identities, websites, and a whole mess of other stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${foundersGrotesk.variable} ${domaineDisplay.variable} ${rlUnno.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

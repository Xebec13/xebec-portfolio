import type { Metadata } from "next";
import { Sansation, Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

const sansation = Sansation({
  subsets: ["latin"],
  variable: "--font-sansation",
  weight: ["400", "700"],
  fallback: ["ui-sans-serif", "system-ui"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "DH Portfolio | Front-End Developer",
  description: "Developer Portfolio",
  metadataBase: new URL("https://xebec13.netlify.app")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansation.variable} ${inter.variable} ${workSans.variable} antialiased`}
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
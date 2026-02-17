import type { Metadata, Viewport } from "next"; // Dodano Viewport
import { Sansation, Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

// Fonty bez zmian...
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

// 5. Theme Color przeniesione do eksportu viewport (standard Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#000", 
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // 3. Title Template - pozwala na dynamiczne tytuły podstron
  title: {
    default: "DH Portfolio | Front-End Developer",
    template: "%s | DH Portfolio",
  },
  description: "Creative Front-End Developer focused on building high-performance, responsive, and visually sharp web interfaces with React and Next.js.",
  metadataBase: new URL("https://dh-portfolio.netlify.app"),

  // 4. Keywords & Robots
  keywords: ["Front-End Developer", "React Developer", "Next.js", "TypeScript"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // 1. Open Graph (Messenger, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dh-portfolio.netlify.app",
    title: "DH Portfolio | Front-End Developer",
    description: "Building high-performance, responsive, and visually sharp web interfaces with React and Next.js.",
    siteName: "DH Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DH Portfolio",
      },
    ],
  },

  // 1. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DH Portfolio | Front-End Developer",
    description: "Creative Front-End Developer Portfolio",
    images: ["/opengraph-image.png"],
  },

  // 2. Icons (Favicon & Apple Touch Icon)
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png", // Dla urządzeń iOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 6. Lang pozostaje "en", dopóki nie wdrożymy i18n routing (np. /[lang]/layout.tsx)
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
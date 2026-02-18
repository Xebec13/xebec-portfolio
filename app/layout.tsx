import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0a0a0a", 
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  // 1. Zmiana nazwy z "DH Portfolio" na Twoją markę osobistą
  title: {
    default: "Dawid Hoesen | Creative Front-End Developer",
    template: "%s | Dawid Hoesen",
  },
  description: "Creative Front-End Developer focused on building high-performance, responsive, and visually sharp web interfaces with React and Next.js.",
  metadataBase: new URL("https://dhoesen.pl"),

  // 2. Dodanie autora i kanonicznego URL (SEO Best Practices)
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Dawid Hoesen" }],

  keywords: ["Dawid Hoesen", "Front-End Developer", "React Developer", "Next.js", "TypeScript", "UI/UX Design"],
  
  robots: {
    index: true,
    follow: true,
  },

  // 3. Open Graph z nową nazwą i domeną
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhoesen.pl",
    title: "Dawid Hoesen | Creative Front-End Developer",
    description: "Building high-performance, responsive, and visually sharp web interfaces.",
    siteName: "Dawid Hoesen",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Dawid Hoesen Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dawid Hoesen | Front-End Developer",
    images: ["/opengraph-image.png"],
  },

  // 4. Wykorzystanie logo.svg jako nowoczesnej ikony (SVG skaluje się idealnie)
  icons: {
    icon: [
      // Chrome, Firefox, Edge - wezmą SVG i dopasują kolor (Dark/Light)
      { url: "/logo.svg", type: "image/svg+xml" },
      // Zapasowy favicon dla bardzo starych systemów
      { url: "/favicon.png", sizes: "32x32" },
    ],
    apple: [
      // iPhone/Safari - potrzebują statycznego PNG
      { url: "/apple-touch-icon.png" }, 
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
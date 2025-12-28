import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Business Ranking AI – Check Your Google Visibility",
    template: "%s | Business Ranking AI",
  },

  description:
    "Free AI-powered SEO tool to check business ranking, website health, and Google visibility. Get actionable SEO insights instantly.",

  keywords: [
    "business ranking",
    "seo checker",
    "google ranking",
    "seo audit tool",
    "local seo",
    "website seo checker",
    "ai seo tool",
  ],

  metadataBase: new URL("https://business-ranking-ai.vercel.app"),

  openGraph: {
    title: "Business Ranking AI",
    description:
      "Check why your business is not ranking on Google. AI-powered SEO insights.",
    url: "https://business-ranking-ai.vercel.app",
    siteName: "Business Ranking AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Business Ranking AI",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Business Ranking AI",
    description:
      "AI tool to analyze your website SEO and Google ranking.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#070b1a] text-white`}>
        {children}
      </body>
    </html>
  );
}

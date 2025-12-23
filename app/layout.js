import "./globals.css";
import { Inter } from "next/font/google";

/**
 * ✅ Next.js 14 SAFE FONT
 * Geist ❌ (Next 15+ only)
 * Inter ✅ (Stable)
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* ✅ SINGLE METADATA EXPORT */
export const metadata = {
  title: "Business Ranking AI – Check Your Google Visibility",
  description:
    "Free tool to check business ranking, SEO health, and Google visibility. Actionable insights for business owners.",

  keywords: [
    "business ranking",
    "seo checker",
    "google ranking",
    "seo audit tool",
    "website ranking check",
    "local seo tool",
    "business seo analysis",
  ],

  metadataBase: new URL("https://business-ranking-ai.vercel.app"),

  openGraph: {
    title: "Business Ranking AI",
    description: "Check why your business is not ranking on Google.",
    url: "https://business-ranking-ai.vercel.app",
    siteName: "Business Ranking AI",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}

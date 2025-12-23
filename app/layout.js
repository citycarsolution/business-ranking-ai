import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ SINGLE METADATA EXPORT — THIS IS IMPORTANT */
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
    "business seo analysis"
  ],

  metadataBase: new URL("https://business-ranking-ai.vercel.app"),

  openGraph: {
    title: "Business Ranking AI",
    description: "Check why your business is not ranking on Google.",
    url: "https://business-ranking-ai.vercel.app",
    siteName: "Business Ranking AI",
    locale: "en_IN",
    type: "website"
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

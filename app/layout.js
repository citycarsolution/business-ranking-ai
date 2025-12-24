import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Business Ranking AI – Check Your Google Visibility",
  description:
    "Free tool to check business ranking, SEO health, and Google visibility. Actionable insights for business owners.",
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
      <body className={`${inter.variable} font-sans bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}

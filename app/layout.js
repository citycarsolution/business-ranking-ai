import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Business Ranking AI",
  description: "AI-powered SEO analysis for real business growth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050817] text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

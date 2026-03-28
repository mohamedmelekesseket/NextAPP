import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mon asso",
  description: "Site de l'association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="site-root">
      <body className="site-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { fontDisplay, fontSans } from "@/lib/fonts";
import logo from '../images/logo.png'
export const metadata: Metadata = {
  title: "Tamaguit",
  description: "Site de l'association",
  icons: {
    icon: "/logo.png", // put logo in /public
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`site-root ${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body
        className={`site-body ${fontSans.className}`}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="site-main">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}

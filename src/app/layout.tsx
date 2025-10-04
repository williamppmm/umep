import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://umep.vercel.app'),
  title: {
    default: "UMEP - Mantenimiento y Reparación Industrial | Valle del Cauca",
    template: "%s | UMEP"
  },
  description: "Mantenimiento y reparación profesional de equipos industriales: variadores, PLCs, HMIs, balanzas y más. Servicio técnico en Cali y Valle del Cauca.",
  keywords: ["mantenimiento industrial", "reparación equipos", "variadores", "PLCs", "balanzas", "Cali", "Valle del Cauca", "UMEP"],
  authors: [{ name: "UMEP - Unidad de Mantenimiento Electrónico Profesional" }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'UMEP',
    title: 'UMEP - Mantenimiento y Reparación Industrial',
    description: 'Devolvemos vida a tus equipos industriales. Servicio profesional en Valle del Cauca.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UMEP - Mantenimiento y Reparación Industrial',
    description: 'Devolvemos vida a tus equipos industriales. Servicio profesional en Valle del Cauca.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

export const metadata: Metadata = {
  title: "M ONE | Premium Silikon und Dichtstoffe",
  description: "Die offizielle Webseite für hochwertige M ONE Produkte.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon-black.webp" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-white.webp" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/favicon-black.webp" />
        <link rel="shortcut icon" href="/favicon-black.webp" />
      </head>
      <body className="bg-light text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 antialiased selection:bg-accent selection:text-white transition-colors duration-300">
        <Providers>
          <div className="font-sans text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <CookieBanner />
        </Providers>

      </body>
    </html>
  );
}

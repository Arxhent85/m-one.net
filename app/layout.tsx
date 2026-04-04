import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


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
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class', // Enable class-based dark mode
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['"DM Sans"', 'sans-serif'],
                      display: ['"DM Sans"', 'sans-serif'],
                    },
                    colors: {
                      primary: '#0a0a0a', // Neutral 950 (Almost Black)
                      accent: '#FF6B00', // Electric Orange (High Saturation)
                      light: '#fafafa', // Neutral 50 (Almost White)

                      // Extended Brand Palette
                      brand: {
                        50: '#fafafa', // Neutral 50
                        100: '#f5f5f5', // Neutral 100
                        200: '#e5e5e5', // Neutral 200
                        300: '#d4d4d4', // Neutral 300
                        400: '#FF8C33', // Orange 400 (Lighter Electric)
                        500: '#FF6B00', // Electric Orange (Base)
                        600: '#E55F00', // Orange 600
                        700: '#CC5500', // Orange 700
                        800: '#262626', // Neutral 800
                        900: '#171717', // Neutral 900
                        950: '#0a0a0a', // Neutral 950
                      }
                    },
                    keyframes: {
                      fadeInDown: {
                        '0%': { opacity: '0', transform: 'translateY(-10px)' },
                        '100%': { opacity: '1', transform: 'translateY(0)' },
                      }
                    },
                    animation: {
                      'fade-in-down': 'fadeInDown 0.3s ease-out',
                    }
                  }
                }
              }
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Smooth scrolling for anchor links */
              html {
                scroll-behavior: smooth;
              }

              .vertical-text {
                writing-mode: vertical-rl;
                text-orientation: mixed;
              }

              .glass-panel {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
              }

              .dark .glass-panel {
                background: rgba(10, 10, 10, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.05);
              }

              .premium-transition {
                transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
              }

              .glass-card {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1.5rem;
                transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
              }

              .dark .glass-card {
                background: rgba(255, 255, 255, 0.01);
                border: 1px solid rgba(255, 255, 255, 0.05);
              }

              .glass-card:hover {
                box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
                transform: translateY(-4px) scale(1.01);
                border-color: rgba(249, 115, 22, 0.3);
              }

              /* Hero Glassmorphism Panel */
              .hero-glass-panel {
                background: rgba(10, 10, 10, 0.35);
                backdrop-filter: blur(24px) saturate(150%);
                -webkit-backdrop-filter: blur(24px) saturate(150%);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 1.5rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.08);
              }
              .light .hero-glass-panel,
              :not(.dark) .hero-glass-panel {
                background: rgba(255, 255, 255, 0.45);
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
                            inset 0 1px 0 rgba(255, 255, 255, 0.3);
              }
              .dark .hero-glass-panel {
                background: rgba(10, 10, 10, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.08);
              }

              /* Category Card Frosted Glass Strip (Desktop) */
              .category-glass-panel {
                background: rgba(10, 10, 10, 0.55);
                backdrop-filter: blur(16px) saturate(140%);
                -webkit-backdrop-filter: blur(16px) saturate(140%);
                border-top: 1px solid rgba(255, 255, 255, 0.08);
              }

              /* Category Tile Solid Dark Band (Mobile) */
              .category-tile-band {
                background: rgba(15, 15, 15, 0.92);
                border-top: 1px solid rgba(255, 255, 255, 0.06);
              }
            `,
          }}
        />
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
        </Providers>

      </body>
    </html>
  );
}

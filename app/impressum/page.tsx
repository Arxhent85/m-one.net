"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-10 tracking-tight">
          Impressum
        </h1>
        
        <div className="space-y-12 text-brand-800 dark:text-neutral-300 leading-relaxed">
          {/* Main Info Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Angaben gemäß § 5 TMG</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p className="font-bold">M ONE SH.P.K.</p>
                <p>Veternik Z. Industriale</p>
                <p>10000 Prishtinë</p>
                <p>Kosovë</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Zweigstelle Deutschland</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p className="font-bold">M-ONE</p>
                <p>Am Kapellenberg 11</p>
                <p>Deutschland</p>
                <p>Deutschland</p>
              </div>
            </div>
          </section>

          {/* Contact & Representation */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Kontakt</h2>
              <div className="space-y-2">
                <p><span className="text-neutral-500 mr-2 italic">Telefon Kosovo:</span> <a href="tel:+38349819877" className="hover:text-brand-500 transition-colors">+383 49 819 877</a></p>
                <p><span className="text-neutral-500 mr-2 italic">Telefon Deutschland:</span> <a href="tel:+491704695306" className="hover:text-brand-500 transition-colors">+49 170 4 695 306</a></p>
                <p><span className="text-neutral-500 mr-2 italic">E-Mail:</span> <a href="mailto:info@m-one.net" className="text-brand-500 hover:underline">info@m-one.net</a></p>
                <p><span className="text-neutral-500 mr-2 italic">Internet:</span> <a href="https://www.m-one.net" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">www.m-one.net</a></p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Vertreten durch</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p>Arxhent Latifi (Geschäftsführer)</p>
                <p>Arjeta Latifi (Geschäftsführerin)</p>
              </div>
            </div>
          </section>

          {/* Registration */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-brand-100 dark:border-white/5 pt-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Registereintrag</h2>
              <div className="text-sm space-y-2">
                <p>Eintragung im Business Registration Agency (ARBK), Republik Kosovo.</p>
                <p><span className="text-neutral-500 italic">Identifikationsnummer:</span> 811437153</p>
                <p><span className="text-neutral-500 italic">Seriennummer:</span> 10080830</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">Umsatzsteuer-ID</h2>
              <p className="text-sm">Umsatzsteuer-Identifikationsnummer: 811437153</p>
            </div>
          </section>

          {/* Responsible Person */}
          <section className="border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="text-sm">
              <p className="font-bold">Arxhent Latifi</p>
              <p>Veternik Z. Industriale</p>
              <p>10000 Prishtinë, Kosovë</p>
            </div>
          </section>

          {/* Disclaimer Section */}
          <div className="pt-10 border-t border-brand-100 dark:border-white/5">
            <h2 className="text-2xl font-sans font-bold text-brand-900 dark:text-white mb-8 tracking-tight">Haftungsausschluss (Disclaimer)</h2>
            
            <div className="space-y-10 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">Haftung für Inhalte</h3>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
              </div>

              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">Haftung für Links</h3>
                <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
              </div>

              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">Urheberrecht</h3>
                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../components/LanguageContext';

const content = {
  de: {
    title: 'Impressum',
    s1Title: 'Angaben gemäß § 5 TMG',
    branchTitle: 'Zweigstelle',
    branch: 'Deutschland & Niederlande',
    contactTitle: 'Kontakt',
    phoneKosovo: 'Telefon Kosovo:',
    phoneGermany: 'Telefon Deutschland:',
    emailLabel: 'E-Mail:',
    internetLabel: 'Internet:',
    repTitle: 'Vertreten durch',
    rep1: 'Arxhent Latifi (Geschäftsführer)',
    rep2: 'Arjeta Latifi (Geschäftsführerin)',
    regTitle: 'Registereintrag',
    regText: 'Eintragung im Business Registration Agency (ARBK), Republik Kosovo.',
    regId: 'Identifikationsnummer:',
    regSerial: 'Seriennummer:',
    vatTitle: 'Umsatzsteuer-ID',
    vatText: 'Umsatzsteuer-Identifikationsnummer: 811437153',
    respTitle: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
    disclaimerTitle: 'Haftungsausschluss (Disclaimer)',
    liabilityContentTitle: 'Haftung für Inhalte',
    liabilityContentText: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    liabilityLinksTitle: 'Haftung für Links',
    liabilityLinksText: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    copyrightTitle: 'Urheberrecht',
    copyrightText: 'Die durch die Seitenbetreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.',
  },
  en: {
    title: 'Legal Notice',
    s1Title: 'Information pursuant to § 5 TMG',
    branchTitle: 'Branch Office',
    branch: 'Germany & Netherlands',
    contactTitle: 'Contact',
    phoneKosovo: 'Phone Kosovo:',
    phoneGermany: 'Phone Germany:',
    emailLabel: 'Email:',
    internetLabel: 'Website:',
    repTitle: 'Represented by',
    rep1: 'Arxhent Latifi (Managing Director)',
    rep2: 'Arjeta Latifi (Managing Director)',
    regTitle: 'Company Registration',
    regText: 'Registered with the Business Registration Agency (ARBK), Republic of Kosovo.',
    regId: 'Identification Number:',
    regSerial: 'Serial Number:',
    vatTitle: 'VAT ID',
    vatText: 'VAT Identification Number: 811437153',
    respTitle: 'Responsible for content pursuant to § 55 para. 2 RStV',
    disclaimerTitle: 'Disclaimer',
    liabilityContentTitle: 'Liability for Content',
    liabilityContentText: 'As a service provider, we are responsible for our own content on these pages in accordance with general laws. However, as a service provider, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard is only possible from the time of knowledge of a specific legal violation.',
    liabilityLinksTitle: 'Liability for Links',
    liabilityLinksText: 'Our offer contains links to external websites of third parties over whose content we have no influence. Therefore, we cannot assume any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. Upon becoming aware of legal violations, we will remove such links immediately.',
    copyrightTitle: 'Copyright',
    copyrightText: 'The content and works created by the site operators on these pages are subject to German copyright law. Downloads and copies of this site are only permitted for private, non-commercial use. If you notice a copyright infringement, please notify us accordingly.',
  },
  sq: {
    title: 'Të Dhënat Ligjore',
    s1Title: 'Të dhëna sipas § 5 TMG',
    branchTitle: 'Dega',
    branch: 'Gjermani & Holandë',
    contactTitle: 'Kontakti',
    phoneKosovo: 'Telefon Kosovë:',
    phoneGermany: 'Telefon Gjermani:',
    emailLabel: 'E-mail:',
    internetLabel: 'Faqja web:',
    repTitle: 'Përfaqësuar nga',
    rep1: 'Arxhent Latifi (Drejtor Ekzekutiv)',
    rep2: 'Arjeta Latifi (Drejtoreshë Ekzekutive)',
    regTitle: 'Regjistrimi i Kompanisë',
    regText: 'Regjistruar në Agjencinë për Regjistrim të Bizneseve (ARBK), Republika e Kosovës.',
    regId: 'Numri i Identifikimit:',
    regSerial: 'Numri Serial:',
    vatTitle: 'Numri i TVSH-së',
    vatText: 'Numri i Identifikimit të TVSH-së: 811437153',
    respTitle: 'Përgjegjës për përmbajtjen sipas § 55 paragrafi 2 RStV',
    disclaimerTitle: 'Mohim i Përgjegjësisë',
    liabilityContentTitle: 'Përgjegjësia për Përmbajtjen',
    liabilityContentText: 'Si ofrues shërbimi, jemi përgjegjës për përmbajtjen tonë në këto faqe sipas ligjeve të përgjithshme. Megjithatë, si ofrues shërbimi, nuk jemi të detyruar të monitorojmë informacionet e transmetuara ose të ruajtura të palëve të treta. Detyrimet për heqjen ose bllokimin e informacioneve sipas ligjeve të përgjithshme mbeten të paprekura.',
    liabilityLinksTitle: 'Përgjegjësia për Lidhjet',
    liabilityLinksText: 'Oferta jonë përmban lidhje me faqet e jashtme të palëve të treta mbi përmbajtjen e të cilave nuk kemi asnjë ndikim. Prandaj nuk mund të marrim asnjë përgjegjësi për këtë përmbajtje të palëve të treta. Pas njohjes së shkeljeve ligjore, do t\'i heqim menjëherë lidhjet e tilla.',
    copyrightTitle: 'E drejta e Autorit',
    copyrightText: 'Përmbajtja dhe veprat e krijuara nga operatorët e faqes janë subjekt i ligjit gjerman të të drejtës së autorit. Shkarkimet dhe kopjet e kësaj faqe lejohen vetëm për përdorim privat, jotregtar. Nëse vëreni ndonjë shkelje të të drejtës së autorit, ju lutemi na njoftoni.',
  },
} as const;

export default function ImpressumPage() {
  const { language } = useLanguage();
  const lang = (language === 'sq' ? 'sq' : language === 'en' ? 'en' : 'de') as keyof typeof content;
  const t = content[lang];

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-10 tracking-tight">
          {t.title}
        </h1>

        <div className="space-y-12 text-brand-800 dark:text-neutral-300 leading-relaxed">
          {/* Main Info Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.s1Title}</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p className="font-bold">M ONE SH.P.K.</p>
                <p>Veternik Z. Industriale</p>
                <p>10000 Prishtinë</p>
                <p>Kosovë</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.branchTitle}</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p>{t.branch}</p>
              </div>
            </div>
          </section>

          {/* Contact & Representation */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.contactTitle}</h2>
              <div className="space-y-2">
                <p><span className="text-neutral-500 mr-2 italic">{t.phoneKosovo}</span> <a href="tel:+38349819877" className="hover:text-brand-500 transition-colors">+383 49 819 877</a></p>
                <p><span className="text-neutral-500 mr-2 italic">{t.phoneGermany}</span> <a href="tel:+491704695306" className="hover:text-brand-500 transition-colors">+49 170 4 695 306</a></p>
                <p><span className="text-neutral-500 mr-2 italic">{t.emailLabel}</span> <a href="mailto:info@m-one.net" className="text-brand-500 hover:underline">info@m-one.net</a></p>
                <p><span className="text-neutral-500 mr-2 italic">{t.internetLabel}</span> <a href="https://www.m-one.net" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">www.m-one.net</a></p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.repTitle}</h2>
              <div className="text-brand-900 dark:text-neutral-200">
                <p>{t.rep1}</p>
                <p>{t.rep2}</p>
              </div>
            </div>
          </section>

          {/* Registration */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-brand-100 dark:border-white/5 pt-10">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.regTitle}</h2>
              <div className="text-sm space-y-2">
                <p>{t.regText}</p>
                <p><span className="text-neutral-500 italic">{t.regId}</span> 811437153</p>
                <p><span className="text-neutral-500 italic">{t.regSerial}</span> 10080830</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider">{t.vatTitle}</h2>
              <p className="text-sm">{t.vatText}</p>
            </div>
          </section>

          {/* Responsible Person */}
          <section className="border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-lg font-bold text-brand-500 uppercase tracking-wider mb-4">{t.respTitle}</h2>
            <div className="text-sm">
              <p className="font-bold">Arxhent Latifi</p>
              <p>Veternik Z. Industriale</p>
              <p>10000 Prishtinë, Kosovë</p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="pt-10 border-t border-brand-100 dark:border-white/5">
            <h2 className="text-2xl font-sans font-bold text-brand-900 dark:text-white mb-8 tracking-tight">{t.disclaimerTitle}</h2>
            <div className="space-y-10 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">{t.liabilityContentTitle}</h3>
                <p>{t.liabilityContentText}</p>
              </div>
              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">{t.liabilityLinksTitle}</h3>
                <p>{t.liabilityLinksText}</p>
              </div>
              <div>
                <h3 className="text-brand-900 dark:text-white font-bold mb-3 uppercase text-xs tracking-widest">{t.copyrightTitle}</h3>
                <p>{t.copyrightText}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

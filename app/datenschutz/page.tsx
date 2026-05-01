"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../components/LanguageContext';

const content = {
  de: {
    title: 'Datenschutzerklärung',
    s1Title: '1. Verantwortlicher',
    s1Resp: 'Verantwortlicher:', s1Branch: 'Zweigstelle:', s1Rep: 'Vertreten durch:', s1Phone: 'Telefon:',
    s2Title: '2. Erhebung personenbezogener Daten',
    s2aTitle: 'a) Beim Besuch der Website',
    s2aText: 'Beim Aufrufen unserer Website werden durch Ihren Browser automatisch Informationen an unseren Server gesendet und temporär gespeichert:',
    s2aItems: ['IP-Adresse des anfragenden Rechners', 'Datum und Uhrzeit des Zugriffs', 'Name und URL der abgerufenen Datei', 'Referrer-URL', 'verwendeter Browser und Betriebssystem'],
    s2aLegal: 'Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f DSGVO.',
    s2bTitle: 'b) Newsletter', s2bText: 'Sofern Sie eingewilligt haben, verwenden wir Ihre E-Mail-Adresse für unseren Newsletter. Die Abmeldung ist jederzeit möglich.',
    s2cTitle: 'c) Kontaktformular', s2cText: 'Bei Nutzung des Kontaktformulars ist eine gültige E-Mail-Adresse erforderlich. Die Daten werden nach Erledigung der Anfrage automatisch gelöscht.',
    s3Title: '3. Weitergabe von Daten', s3Text: 'Eine Übermittlung Ihrer Daten an Dritte findet nicht statt, außer bei ausdrücklicher Einwilligung, gesetzlicher Verpflichtung oder zur Vertragsabwicklung.',
    s4Title: '4. Cookies', s4Text: 'Wir setzen Cookies ein – kleine Dateien, die Ihr Browser erstellt. Cookies richten keinen Schaden an und enthalten keine Schadsoftware. Sie dienen der Optimierung unseres Angebots.',
    s5Title: '5. Analyse-Tools', s5Text: 'Tracking-Maßnahmen werden auf Grundlage von Art. 6 Abs. 1 S. 1 lit. f DSGVO durchgeführt. Wir nutzen Google Analytics (anonymisierte IP), Google Conversion Tracking und etracker.',
    s6Title: '6. Social Media', s6Text: 'Wir nutzen Social Plug-ins von Facebook und Twitter (Zwei-Klick-Methode). Bitte loggen Sie sich vorab aus, um eine direkte Zuordnung zu Ihrem Konto zu vermeiden.',
    s7Title: '7. Ihre Rechte',
    s7Items: ['Art. 15 DSGVO: Auskunft über Ihre Daten', 'Art. 16 DSGVO: Berichtigung unrichtiger Daten', 'Art. 17 DSGVO: Löschung Ihrer Daten', 'Art. 18 DSGVO: Einschränkung der Verarbeitung', 'Art. 20 DSGVO: Datenportabilität', 'Art. 7 Abs. 3 DSGVO: Widerruf Ihrer Einwilligung', 'Art. 77 DSGVO: Beschwerde bei einer Aufsichtsbehörde'],
    s8Title: '8. Widerspruchsrecht', s8Text: 'Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen. Eine E-Mail an info@m-one.net genügt.',
    s9Title: '9. Datensicherheit', s9Text: 'Wir verwenden SSL-Verschlüsselung in der jeweils höchsten Stufe, die von Ihrem Browser unterstützt wird.',
    s10Title: '10. Aktualität', s10Text: 'Diese Datenschutzerklärung ist aktuell gültig (Stand: April 2026).',
  },
  en: {
    title: 'Privacy Policy',
    s1Title: '1. Data Controller',
    s1Resp: 'Controller:', s1Branch: 'Branch:', s1Rep: 'Represented by:', s1Phone: 'Phone:',
    s2Title: '2. Collection of Personal Data',
    s2aTitle: 'a) When visiting the website',
    s2aText: 'When you visit our website, your browser automatically sends information to our server, which is temporarily stored:',
    s2aItems: ['IP address of the requesting computer', 'Date and time of access', 'Name and URL of the retrieved file', 'Referrer URL', 'Browser used and operating system'],
    s2aLegal: 'Legal basis: Art. 6(1)(f) GDPR.',
    s2bTitle: 'b) Newsletter', s2bText: 'If you have consented, we use your email address for our newsletter. You may unsubscribe at any time.',
    s2cTitle: 'c) Contact Form', s2cText: 'When using our contact form, a valid email address is required. Data is automatically deleted after your request has been handled.',
    s3Title: '3. Sharing of Data', s3Text: 'Your data will not be transferred to third parties except with your explicit consent, due to a legal obligation, or for processing a contract.',
    s4Title: '4. Cookies', s4Text: 'We use cookies – small files created by your browser. Cookies do no harm and contain no malware. They serve to optimize our services.',
    s5Title: '5. Analytics', s5Text: 'Tracking measures are carried out on the basis of Art. 6(1)(f) GDPR. We use Google Analytics (anonymized IP), Google Conversion Tracking, and etracker.',
    s6Title: '6. Social Media', s6Text: 'We use social plugins from Facebook and Twitter (two-click method). Please log out first to prevent direct association with your account.',
    s7Title: '7. Your Rights',
    s7Items: ['Art. 15 GDPR: Right of access to your data', 'Art. 16 GDPR: Rectification of inaccurate data', 'Art. 17 GDPR: Erasure of your data', 'Art. 18 GDPR: Restriction of processing', 'Art. 20 GDPR: Data portability', 'Art. 7(3) GDPR: Withdrawal of consent', 'Art. 77 GDPR: Right to lodge a complaint'],
    s8Title: '8. Right to Object', s8Text: 'You have the right to object to the processing of your data. An email to info@m-one.net is sufficient.',
    s9Title: '9. Data Security', s9Text: 'We use SSL encryption at the highest level supported by your browser.',
    s10Title: '10. Currency', s10Text: 'This privacy policy is currently valid (as of April 2026).',
  },
  sq: {
    title: 'Politika e Privatësisë',
    s1Title: '1. Kontrollori i të Dhënave',
    s1Resp: 'Kontrollori:', s1Branch: 'Dega:', s1Rep: 'Përfaqësuar nga:', s1Phone: 'Telefon:',
    s2Title: '2. Mbledhja e të Dhënave Personale',
    s2aTitle: 'a) Gjatë vizitës në faqen web',
    s2aText: 'Kur vizitoni faqen tonë web, shfletuesi juaj automatikisht dërgon informacione në serverin tonë, të cilat ruhen përkohësisht:',
    s2aItems: ['Adresa IP e kompjuterit kërkues', 'Data dhe ora e aksesit', 'Emri dhe URL-ja e skedarit të aksesuar', 'URL-ja referuese', 'Shfletuesi i përdorur dhe sistemi operativ'],
    s2aLegal: 'Baza ligjore: Neni 6(1)(f) GDPR.',
    s2bTitle: 'b) Buletini', s2bText: 'Nëse keni dhënë pëlqimin, e-mail adresën tuaj e përdorim për buletinin tonë. Mund të çabonoheni në çdo kohë.',
    s2cTitle: 'c) Formulari i Kontaktit', s2cText: 'Gjatë përdorimit të formularit të kontaktit kërkohet një adresë e vlefshme e-mail. Të dhënat fshihen automatikisht pas trajtimit të kërkesës suaj.',
    s3Title: '3. Ndarja e të Dhënave', s3Text: 'Të dhënat tuaja nuk do t\'u transferohen palëve të treta, përveç me pëlqimin tuaj të shprehur, detyrim ligjor, ose për ekzekutimin e kontratës.',
    s4Title: '4. Cookies', s4Text: 'Përdorim cookies – skedarë të vegjël të krijuar nga shfletuesi juaj. Cookies nuk shkaktojnë dëm dhe nuk përmbajnë malware. Ato shërbejnë për optimizimin e shërbimeve tona.',
    s5Title: '5. Mjetet e Analizës', s5Text: 'Masat e gjurmimit kryhen në bazë të Nenit 6(1)(f) GDPR. Përdorim Google Analytics (IP e anonimizuar), Google Conversion Tracking dhe etracker.',
    s6Title: '6. Rrjetet Sociale', s6Text: 'Përdorim shtojcat sociale nga Facebook dhe Twitter (metoda me dy klikime). Ju lutemi dilni nga llogaria juaj paraprakisht.',
    s7Title: '7. Të Drejtat Tuaja',
    s7Items: ['Neni 15 GDPR: E drejta e aksesit në të dhënat tuaja', 'Neni 16 GDPR: Korrigjimi i të dhënave të pasakta', 'Neni 17 GDPR: Fshirja e të dhënave tuaja', 'Neni 18 GDPR: Kufizimi i përpunimit', 'Neni 20 GDPR: Bartja e të dhënave', 'Neni 7(3) GDPR: Tërheqja e pëlqimit', 'Neni 77 GDPR: E drejta për të paraqitur ankesë'],
    s8Title: '8. E Drejta e Kundërshtimit', s8Text: 'Keni të drejtë të kundërshtoni përpunimin e të dhënave tuaja. Mjafton një e-mail në info@m-one.net.',
    s9Title: '9. Siguria e të Dhënave', s9Text: 'Përdorim enkriptim SSL në nivelin më të lartë të mbështetur nga shfletuesi juaj.',
    s10Title: '10. Aktualiteti', s10Text: 'Kjo politikë e privatësisë është aktualisht e vlefshme (Prill 2026).',
  },
} as const;

const sectionClass = "space-y-4 border-t border-brand-100 dark:border-white/5 pt-10";

export default function DatenschutzPage() {
  const { language } = useLanguage();
  const lang = (language === 'sq' ? 'sq' : language === 'en' ? 'en' : 'de') as keyof typeof content;
  const t = content[lang];

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-10 tracking-tight">{t.title}</h1>

        <div className="space-y-12 text-brand-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base">

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s1Title}</h2>
            <div className="dark:bg-white/5 bg-brand-50 p-6 rounded-xl border border-brand-100 dark:border-white/10 space-y-2 text-brand-900 dark:text-neutral-200">
              <p><span className="font-bold">{t.s1Resp}</span> M ONE SH.P.K., Veternik Z. Industriale, 10000 Prishtinë, Kosovë</p>
              <p><span className="font-bold">{t.s1Branch}</span> Deutschland &amp; Niederlande</p>
              <p><span className="font-bold">{t.s1Rep}</span> Arxhent Latifi, Arjeta Latifi</p>
              <p><span className="font-bold">E-Mail:</span> <a href="mailto:info@m-one.net" className="text-brand-500 hover:underline">info@m-one.net</a></p>
              <p><span className="font-bold">{t.s1Phone}</span> +49 170 4 695 306 (DE) / +383 49 819 877 (KS)</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s2Title}</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">{t.s2aTitle}</h3>
              <p>{t.s2aText}</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500 dark:text-neutral-400">
                {t.s2aItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="italic">{t.s2aLegal}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">{t.s2bTitle}</h3>
              <p>{t.s2bText}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">{t.s2cTitle}</h3>
              <p>{t.s2cText}</p>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s3Title}</h2>
            <p>{t.s3Text}</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s4Title}</h2>
            <p>{t.s4Text}</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s5Title}</h2>
            <p>{t.s5Text}</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s6Title}</h2>
            <p>{t.s6Text}</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s7Title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t.s7Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s8Title}</h2>
            <p>{t.s8Text}</p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">{t.s9Title}</h2>
            <p>{t.s9Text}</p>
          </section>

          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10 text-xs text-neutral-500 italic">
            <h2 className="text-sm font-bold text-brand-900 dark:text-white uppercase not-italic">{t.s10Title}</h2>
            <p>{t.s10Text}</p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

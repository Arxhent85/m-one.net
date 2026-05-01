"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../components/LanguageContext';

const content = {
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    subtitle: 'für gewerbliche Kunden der M ONE SH.P.K.',
    date: 'Stand: Mai 2026',
    sections: [
      { title: '1. Allgemeines', items: ['1.1 Für unsere Lieferungen gelten ausschließlich diese AGB. Entgegenstehende Bedingungen des Kunden erkennen wir nur bei ausdrücklicher schriftlicher Zustimmung an.', '1.2 Diese Regelung gilt auch für alle zukünftigen Geschäfte mit dem Kunden.', '1.3 Die Abtretung von Forderungen gegen uns an Dritte ist ausgeschlossen. § 354a HGB bleibt unberührt.', '1.4 Der Kunde ist zur Aufrechnung nur berechtigt, wenn seine Ansprüche rechtskräftig festgestellt oder anerkannt sind.', '1.5 Verkauf und Weiterverkauf können dem deutschen, EU- und US-Exportkontrollrecht unterliegen.'] },
      { title: '2. Angebot / Umfang der Lieferung', items: ['2.1 Unsere Angebote sind freibleibend.', '2.2 Mit seiner Bestellung gibt der Kunde ein verbindliches Angebot auf Abschluss eines Kaufvertrages ab.', '2.3 Wir können das Angebot innerhalb von 30 Kalendertagen per Auftragsbestätigung annehmen.', '2.4 Beschreibungen in Prospekten stellen keine Zusicherung bestimmter Eigenschaften dar.', '2.5 An Katalogen und Unterlagen behalten wir uns Eigentums- und Urheberrechte vor.'] },
      { title: '3. Auskünfte / Beratungen', items: ['Auskünfte und Beratungen erfolgen nach bestem Wissen. Alle Angaben sind unverbindlich und befreien den Kunden nicht von eigenen Prüfungen.'] },
      { title: '4. Preise', items: ['4.1 Preise gelten „ab Werk", zzgl. Verpackung, Fracht und ggf. Mindermengenzuschlag.', '4.2 Alle Preise sind Nettopreise ohne Umsatzsteuer.'] },
      { title: '5. Zahlungen', items: ['5.1 Zahlungen haben per Vorauskasse zu erfolgen, sofern nichts anderes vereinbart wurde.', '5.2 Bei Zahlungsverzug sind wir berechtigt, alle Forderungen fällig zu stellen.', '5.3 Ab Zahlungsverzug fordern wir Verzugszinsen von 9 Prozentpunkten über dem EZB-Basiszinssatz.', '5.4 Wechsel und Schecks gelten erst nach Einlösung als Zahlung.'] },
      { title: '6. Lieferzeit', items: ['6.1 Soweit nicht anders vereinbart, liefern wir ab Werk oder Lager.', '6.2 Liefertermine werden vorbehaltlich rechtzeitiger Selbstbelieferung vereinbart.', '6.3 Die Lieferfrist ist eingehalten, wenn der Liefergegenstand bis zu ihrem Ablauf zur Abholung bereitsteht.', '6.4 Höhere Gewalt befreit für die Dauer der Störung von der Lieferpflicht.', '6.5 Teillieferungen sind zulässig und bedingungsgemäß zu bezahlen.'] },
      { title: '7. Gefahrübergang', items: ['7.1 Die Abholung hat unverzüglich nach Bereitstellung zu erfolgen.', '7.2 Mit der Absendung geht die Gefahr des zufälligen Untergangs auf den Kunden über.', '7.3 Bei Annahmeverzug des Kunden können wir Ersatz unserer Aufwendungen verlangen.'] },
      { title: '8. Eigentumsvorbehalt', items: ['8.1 Die Liefergegenstände bleiben bis zur vollständigen Bezahlung unser Eigentum.', '8.4 Forderungen aus der Weiterveräußerung werden hiermit an uns abgetreten.'] },
      { title: '9. Gewährleistung', items: ['9.1 Gewährleistungsansprüche richten sich nach den gesetzlichen Bestimmungen.', '9.3 Bei neuen Liefergegenständen verjähren Ansprüche nach einem Jahr ab Erhalt.', '9.4 Bei gebrauchten Liefergegenständen sind Gewährleistungsansprüche ausgeschlossen.', '9.7 Der Kunde ist verpflichtet, die Ware bei Übergabe auf Mängel zu untersuchen.'] },
      { title: '10. Haftung', items: ['10.1 Unsere Haftung ist gemäß dieser Ziffer eingeschränkt.', '10.2 Wir haften nicht für einfache Fahrlässigkeit, außer bei Verletzung vertragswesentlicher Pflichten.', '10.4 Bei einfacher Fahrlässigkeit ist die Haftung für Sachschäden auf EUR 25.000 je Schadensfall begrenzt.', '10.7 Diese Einschränkungen gelten nicht bei Vorsatz oder Verletzung von Leben, Körper oder Gesundheit.'] },
      { title: '11. Sonstiges', items: ['11.1 Personenbezogene Daten werden ausschließlich zur Auftragsabwicklung gespeichert (Art. 6 DSGVO).', '11.2 Wir nehmen nicht an Streitbeilegungsverfahren teil (§§ 36, 37 VSBG).', '11.3 Es gilt deutsches Recht; das UN-Kaufrecht (CISG) ist ausgeschlossen.', '11.5 Gerichtsstand ist Würzburg, sofern der Kunde Kaufmann ist.'] },
    ],
  },
  en: {
    title: 'General Terms and Conditions',
    subtitle: 'for commercial customers of M ONE SH.P.K.',
    date: 'As of: May 2026',
    sections: [
      { title: '1. General', items: ['1.1 Our deliveries are governed exclusively by these Terms and Conditions. Conflicting customer conditions are only accepted with our express written consent.', '1.2 This provision also applies to all future transactions with the customer.', '1.3 The assignment of claims against us to third parties is excluded. Section 354a HGB remains unaffected.', '1.4 The customer may only offset claims that are legally established or recognized by us.', '1.5 Sale and resale may be subject to German, EU, and US export control law.'] },
      { title: '2. Offer / Scope of Delivery', items: ['2.1 Our offers are non-binding.', '2.2 By placing an order, the customer submits a binding offer to conclude a purchase contract.', '2.3 We may accept the offer within 30 calendar days by order confirmation.', '2.4 Descriptions in brochures do not constitute a guarantee of specific properties.', '2.5 We reserve ownership and copyright of all catalogs and documents.'] },
      { title: '3. Information / Advice', items: ['Information and technical advice are provided to the best of our knowledge. All details are non-binding and do not release the customer from their own verification obligations.'] },
      { title: '4. Prices', items: ['4.1 Prices are "ex works", excluding packaging, freight, and any minimum quantity surcharges.', '4.2 All prices are net prices excluding VAT.'] },
      { title: '5. Payments', items: ['5.1 Payments are to be made in advance unless otherwise agreed in writing.', '5.2 In case of default, we are entitled to make all claims immediately due.', '5.3 From the date of default, we charge default interest of 9 percentage points above the ECB base rate.', '5.4 Bills of exchange and checks are only deemed payment after being honored.'] },
      { title: '6. Delivery Time', items: ['6.1 Unless otherwise agreed, we deliver ex works or from warehouse.', '6.2 Delivery dates are agreed subject to timely delivery by our suppliers.', '6.3 The delivery period is met when the goods are ready for collection before its expiry.', '6.4 Force majeure releases us from the delivery obligation for the duration of the disruption.', '6.5 Partial deliveries are permitted and to be paid for in accordance with the conditions.'] },
      { title: '7. Transfer of Risk', items: ['7.1 Collection must take place immediately after the goods are made available.', '7.2 The risk of accidental loss passes to the customer upon dispatch.', '7.3 In the event of default of acceptance by the customer, we may claim compensation for our expenses.'] },
      { title: '8. Retention of Title', items: ['8.1 Delivered goods remain our property until all claims from the business relationship are fulfilled.', '8.4 Claims arising from resale of reserved goods are hereby assigned to us.'] },
      { title: '9. Warranty', items: ['9.1 Warranty claims are governed by the applicable legal provisions.', '9.3 For new goods, warranty claims expire one year after receipt.', '9.4 For used goods, warranty claims are excluded.', '9.7 The customer must inspect the goods for defects upon delivery and notify us immediately.'] },
      { title: '10. Liability', items: ['10.1 Our liability is limited in accordance with this clause.', '10.2 We are not liable for simple negligence, except in cases of breach of material contractual obligations.', '10.4 For simple negligence, liability for property damage is limited to EUR 25,000 per incident.', '10.7 These limitations do not apply to intentional conduct or injury to life, body, or health.'] },
      { title: '11. Miscellaneous', items: ['11.1 Personal data is stored exclusively for order processing (Art. 6 GDPR).', '11.2 We do not participate in dispute resolution proceedings.', '11.3 German law applies; the UN Convention on Contracts (CISG) is excluded.', '11.5 The exclusive place of jurisdiction is Würzburg, provided the customer is a merchant.'] },
    ],
  },
  sq: {
    title: 'Kushtet e Përgjithshme të Biznesit',
    subtitle: 'për klientët komercialë të M ONE SH.P.K.',
    date: 'Versioni: Maj 2026',
    sections: [
      { title: '1. Dispozitat e Përgjithshme', items: ['1.1 Dorëzimet tona rregullohen ekskluzivisht nga këto Kushte. Kushtet e kundërta të klientit pranohen vetëm me miratimin tonë të shprehur me shkrim.', '1.2 Kjo dispozitë zbatohet edhe për të gjitha transaksionet e ardhshme me klientin.', '1.3 Cesioni i pretendimeve ndaj nesh tek palët e treta është i përjashtuar.', '1.4 Klienti mund të kompensojë vetëm pretendimet e vërtetuara ligjërisht ose të njohura nga ne.', '1.5 Shitja dhe rishitja mund t\'i nënshtrohen ligjit gjerman, europian dhe amerikan të kontrollit të eksportit.'] },
      { title: '2. Oferta / Shtrirja e Dorëzimit', items: ['2.1 Ofertat tona janë pa detyrim.', '2.2 Duke bërë një porosi, klienti paraqet një ofertë detyruese për lidhjen e kontratës.', '2.3 Mund të pranojmë ofertën brenda 30 ditëve kalendarike me konfirmim porosie.', '2.4 Përshkrimet në broshura nuk përbëjnë garanci të vetive specifike.', '2.5 Rezervojmë të drejtat e pronësisë dhe të autorit mbi të gjitha katalogët dhe dokumentet.'] },
      { title: '3. Informacione / Këshilla', items: ['Informacioni dhe këshillat teknike jepen sipas njohurive tona më të mira. Të gjitha detajet janë pa detyrim dhe nuk e lironjnë klientin nga detyrimet e tij të verifikimit.'] },
      { title: '4. Çmimet', items: ['4.1 Çmimet janë "nga fabrika", pa paketim, transport dhe shtesa eventuale.', '4.2 Të gjitha çmimet janë çmime neto pa TVSH.'] },
      { title: '5. Pagesat', items: ['5.1 Pagesat duhet të bëhen paraprakisht nëse nuk është rënë dakord ndryshe me shkrim.', '5.2 Në rast vonese pagese, jemi të autorizuar t\'i bëjmë të gjitha pretendimet menjëherë të pagueshme.', '5.3 Nga data e vonesës, ngarkohen interesa default prej 9 pikë përqindje mbi normën bazë të BQE.', '5.4 Kambialët dhe çeqet konsiderohen pagesë vetëm pasi të jenë shlyer.'] },
      { title: '6. Koha e Dorëzimit', items: ['6.1 Nëse nuk është rënë dakord ndryshe, dorëzojmë nga fabrika ose magazina.', '6.2 Datat e dorëzimit bien dakord me rezervën e furnizimit në kohë nga furnitorët tanë.', '6.3 Afati i dorëzimit respektohet kur malli është gati për marrje para skadencës së tij.', '6.4 Forca madhore na liroi nga detyrimi i dorëzimit për kohëzgjatjen e ndërprerjes.', '6.5 Dorëzimet e pjesshme janë të lejuara dhe duhen paguar sipas kushteve.'] },
      { title: '7. Transferimi i Rrezikut', items: ['7.1 Marrja duhet të bëhet menjëherë pasi malli të jetë vënë në dispozicion.', '7.2 Rreziku i humbjes aksidentale kalon tek klienti me dërgimin e mallit.', '7.3 Në rast vonese pranimi nga klienti, mund të kërkojmë kompensim për shpenzimet tona.'] },
      { title: '8. Mbajtja e Pronësisë', items: ['8.1 Mallrat e dorëzuara mbeten pronë jonë derisa të paguhen të gjitha pretendimet.', '8.4 Pretendimet nga rishitja e mallrave të rezervuara cedohen me anë të kësaj kontrate.'] },
      { title: '9. Garancia', items: ['9.1 Pretendimet e garancisë rregullohen nga dispozitat ligjore në fuqi.', '9.3 Për mallrat e reja, pretendimet e garancisë parashkruhen pas një viti nga marrja.', '9.4 Për mallrat e përdorura, pretendimet e garancisë janë të përjashtuara.', '9.7 Klienti duhet të inspektojë mallrat për defekte gjatë dorëzimit dhe të na njoftojë menjëherë.'] },
      { title: '10. Përgjegjësia', items: ['10.1 Përgjegjësia jonë është e kufizuar në përputhje me këtë klauzolë.', '10.2 Nuk mbajmë përgjegjësi për neglizhencë të thjeshtë, përveç rasteve të shkeljes së detyrimeve thelbësore kontraktuale.', '10.4 Për neglizhencë të thjeshtë, përgjegjësia për dëmet materiale është e kufizuar në 25,000 EUR për rast.', '10.7 Këto kufizime nuk zbatohen për sjellje të qëllimshme ose lëndim të jetës, trupit ose shëndetit.'] },
      { title: '11. Të Tjera', items: ['11.1 Të dhënat personale ruhen ekskluzivisht për përpunimin e porosive (Neni 6 GDPR).', '11.2 Nuk marrim pjesë në procedurat e zgjidhjes së mosmarrëveshjeve.', '11.3 Zbatohet ligji gjerman; Konventa e OKB-së mbi shitjet (CISG) është e përjashtuar.', '11.5 Vendi ekskluziv i juridiksionit është Würzburg, me kusht që klienti të jetë tregtar.'] },
    ],
  },
} as const;

export default function AGBPage() {
  const { language } = useLanguage();
  const lang = (language === 'sq' ? 'sq' : language === 'en' ? 'en' : 'de') as keyof typeof content;
  const t = content[lang];

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-6 tracking-tight leading-tight">
          {t.title}
        </h1>
        <p className="text-brand-500 font-bold mb-4 italic">{t.subtitle}</p>
        <p className="text-xs text-neutral-500 uppercase tracking-widest border-b border-brand-100 dark:border-white/5 pb-4 mb-12">{t.date}</p>

        <div className="space-y-10 text-brand-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base text-justify">
          {t.sections.map((sec, i) => (
            <section key={i} className={i > 0 ? 'space-y-3 border-t border-brand-100 dark:border-white/5 pt-10' : 'space-y-3'}>
              <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">{sec.title}</h2>
              <div className="space-y-3">
                {sec.items.map((item, j) => <p key={j}>{item}</p>)}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

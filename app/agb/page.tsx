"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function AGBPage() {
  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-6 tracking-tight leading-tight">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-brand-500 font-bold mb-12 italic">für gewerbliche Kunden der M ONE SH.P.K.</p>
        
        <div className="space-y-12 text-brand-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base text-justify">
          <p className="text-xs text-neutral-500 uppercase tracking-widest border-b border-brand-100 dark:border-white/5 pb-2 inline-block">Stand: Mai 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">1. Allgemeines</h2>
            <div className="space-y-3">
              <p>1.1 Für unsere („M ONE SH.P.K.“) Lieferungen und Leistungen gelten ausschließlich diese Allgemeinen Geschäftsbedingungen; entgegenstehende oder von unseren Allgemeinen Geschäftsbedingungen abweichende Allgemeinen Geschäftsbedingungen/Einkaufsbedingungen des Kunden erkennen wir nur insoweit an, als wir ihnen ausdrücklich schriftlich zugestimmt haben. Sie entfalten auch keine Wirkung, wenn wir ihnen im Einzelfall nicht widersprochen haben.</p>
              <p>1.2 Die Regelung der Ziff. 1.1 gilt auch für alle zukünftigen Geschäfte mit dem Kunden.</p>
              <p>1.3 Die Abtretung von Forderungen gegen uns an Dritte ist ausgeschlossen. § 354 a HGB bleibt unberührt.</p>
              <p>1.4 Der Kunde ist zur Aufrechnung, auch wenn Mängel- oder Gegenansprüche geltend gemacht werden, nur berechtigt, wenn die geltend gemachten Ansprüche rechtskräftig festgestellt, von uns anerkannt worden oder unstrittig sind. Zur Ausübung eines Zurückbehaltungsrechts ist der Kunde nur befugt, wenn der Gegenanspruch auf demselben Vertragsverhältnis beruht, aus dem sich die Zahlungspflicht des Kunden ergibt.</p>
              <p>1.5 Der Verkauf, Weiterverkauf und die Disposition der Lieferungen und Leistungen sowie jedweder damit verbundener Technologie oder Dokumentation kann dem deutschen, EU-, US-Exportkontrollrecht und ggf. dem Exportkontrollrecht weiterer Staaten unterliegen. Der Kunde erklärt mit der Bestellung die Konformität mit derlei Gesetzen und Verordnungen. Der Kunde erklärt, alle für die Ausfuhr bzw. Einfuhr notwendigen Genehmigungen zu erhalten.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">2. Angebot / Umfang der Lieferung</h2>
            <div className="space-y-3">
              <p>2.1 Unsere Angebote sind freibleibend. Die Angebote in unseren Prospekten stellen eine unverbindliche Aufforderung an den Kunden dar, bei uns Waren zu bestellen.</p>
              <p>2.2 Durch seine Bestellung gibt der Kunde ein verbindliches Angebot auf Abschluss eines Kaufvertrages mit uns ab.</p>
              <p>2.3 Wir können dieses Angebot innerhalb eines Zeitraumes von 30 Kalendertagen mit Zusendung einer Auftragsbestätigung oder Zusendung der bestellten Ware annehmen. Die Auftragsbestätigung erfolgt durch Übermittlung einer E-Mail. Nach fruchtlosem Fristablauf gilt das Angebot als abgelehnt.</p>
              <p>2.4 Bei der Beschreibung unserer Erzeugnisse und ihrer Anwendungsmöglichkeiten in Prospekten, Verarbeitungsanleitungen und ähnlichen Informationsschriften handelt es sich nicht um die Zusicherung bestimmter Eigenschaften, sondern lediglich um unverbindliche Hinweise, die dem Käufer die Beurteilung unserer Erzeugnisse erleichtern sollen. Abweichungen hiervon sind gestattet, sofern sie unerheblich sind, diese keinen Sachmangel darstellen und nicht verbindlich zugesagt wurden.</p>
              <p>2.5 An Entwürfen, Katalogen, Werbematerialien, Abbildungen, Zeichnungen, Kalkulationen und sonstigen Unterlagen behalten wir uns Eigentums- und Urheberrechte vor. Dies gilt auch für solche schriftlichen Unterlagen, die als „vertraulich“ bezeichnet sind. Vor ihrer Weitergabe an Dritte bedarf der Kunde unserer ausdrücklichen schriftlichen Zustimmung.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">3. Auskünfte / Beratungen</h2>
            <p>Auskünfte und technische Beratung geben wir nach bestem Wissen aufgrund unserer Erfahrungen. Alle Angaben und Auskünfte über Eignung und Anwendung unserer Waren sind jedoch unverbindlich und befreien den Kunden nicht von eigenen Prüfungen. Für eine etwaige Haftung gilt Ziffer 9 dieser Allgemeinen Geschäftsbedingungen.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">4. Preise</h2>
            <div className="space-y-3">
              <p>4.1 Sofern sich aus unserer Auftragsbestätigung nichts anderes ergibt, gelten unsere Preise „ab Werk“, ausschließlich Verpackung, Versicherung, Fracht und ggf. Mindermengenzuschlag. Diese Positionen werden gesondert in Rechnung gestellt.</p>
              <p>4.2 Sämtliche Preise sind Nettopreise ohne Umsatzsteuer. Diese wird in gesetzlicher Höhe am Tag der Rechnungsstellung in der Rechnung gesondert berechnet und ausgewiesen.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">5. Zahlungen</h2>
            <div className="space-y-3">
              <p>5.1 Zahlungen haben stets per Vorauskasse zu erfolgen, sofern schriftlich nichts anderes vereinbart wurde. Bei Zahlungsverzug gilt die Regelung der Ziff. 5.2 sowie ergänzend hierzu die gesetzlichen Regeln bezüglich des Zahlungsverzuges.</p>
              <p>5.2 Bei Zahlungsverzug oder Gefährdung unserer Forderungen durch Verschlechterung der Kreditwürdigkeit des Kunden sind wir berechtigt, unsere Forderungen aus der Geschäftsbeziehung mit dem Kunden fällig zu stellen. Wir sind dann auch berechtigt, noch ausstehende Lieferungen nur gegen Vorauszahlung oder gegen Stellung von Sicherheiten auszuführen.</p>
              <p>5.3 Wir sind berechtigt, ab Eintritt des Zahlungsverzugs Verzugszinsen in Höhe von 9 Prozentpunkten über dem jeweils gültigen Basiszinssatz der EZB p.a. zu fordern. Unbeschadet bleibt hiervon die Möglichkeit, einen höheren tatsächlichen Schaden geltend zu machen.</p>
              <p>5.4 Wechsel und Schecks gelten erst nach Einlösung sowie vorbehaltloser Gutschrift auf unserem Konto als Zahlung.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">6. Lieferzeit</h2>
            <div className="space-y-3">
              <p>6.1 Soweit nichts anderes ausdrücklich vereinbart ist, liefern wir ab Werk oder Lager.</p>
              <p>6.2 Liefertermine und Lieferfristen sind schriftlich anzugeben und werden nur mit dem Vorbehalt der richtigen und rechtzeitigen Selbstbelieferung durch unsere Zulieferer vereinbart.</p>
              <p>6.3 Die vereinbarte Lieferfrist ist eingehalten, wenn bis zu ihrem Ablauf der Liefergegenstand im Werk oder Lager zur Abholung bereitsteht.</p>
              <p>6.4 Krieg, Streik, Rohstoffmangel sowie alle sonstigen Fälle höherer Gewalt befreien für die Dauer der Störung und im Umfang ihrer Auswirkungen von der Verpflichtung zur Lieferung. Solche Ereignisse berechtigen uns, von dem Vertrag ganz oder teilweise zurückzutreten.</p>
              <p>6.5 Teillieferungen sind zulässig und bedingungsgemäß zu bezahlen, soweit sie dem Kunden zumutbar sind.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">7. Gefahrübergang und Entgegennahme</h2>
            <div className="space-y-3">
              <p>7.1 Die Abholung/Abnahme des Liefergegenstandes hat durch den Kunden unverzüglich nach der Bereitstellung im Werk oder Lager zu erfolgen.</p>
              <p>7.2 Wird der Liefergegenstand auf Wunsch des Kunden an diesen versandt, so geht mit der Absendung des Liefergegenstandes, spätestens mit Verlassen des Werkes oder Lagers, die Gefahr des zufälligen Untergangs auf den Kunden über.</p>
              <p>7.3 Kommt der Kunde in Annahmeverzug, so sind wir berechtigt, Ersatz der uns entstehenden Aufwendungen zu verlangen.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">8. Eigentumsvorbehalt</h2>
            <div className="space-y-3">
              <p>8.1 Die Liefergegenstände bleiben unser Eigentum (Vorbehaltsware) bis zur Erfüllung sämtlicher Forderungen aus der Geschäftsverbindung.</p>
              <p>8.4 Die Forderungen des Kunden aus der Weiterveräußerung der Vorbehaltsware werden bereits hiermit an uns abgetreten. Sie dienen in demselben Umfange zur Sicherung wie die Vorbehaltsware.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">9. Gewährleistung, Sachmängel</h2>
            <div className="space-y-3">
              <p>9.1 Die Gewährleistungsansprüche des Kunden bei Mängeln richten sich nach den gesetzlichen Bestimmungen, soweit sich nicht durch nachstehende Regelungen Abweichungen ergeben.</p>
              <p>9.3 Bei dem Kauf von neuen Liefergegenständen verjähren die Gewährleistungsansprüche des Kunden bei Mängeln mit Ablauf von einem Jahr ab Erhalt der Liefergegenstände.</p>
              <p>9.4 Bei dem Kauf von gebrauchten Liefergegenständen sind die Gewährleistungsansprüche des Kunden ausgeschlossen.</p>
              <p>9.7 Der Kunde ist verpflichtet, den Liefergegenstand bei Übergabe auf etwaige Mängel zu untersuchen und uns diese unverzüglich schriftlich anzuzeigen.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900 dark:text-white border-l-4 border-brand-500 pl-4">10. Haftung auf Schadensersatz wegen Verschuldens</h2>
            <div className="space-y-3">
              <p>10.1 Unsere Haftung auf Schadensersatz ist nach Maßgabe dieser Ziff. 10 eingeschränkt.</p>
              <p>10.2 Wir haften nicht im Falle einfacher Fahrlässigkeit unserer Organe, soweit es sich nicht um eine Verletzung vertragswesentlicher Pflichten handelt.</p>
              <p>10.4 Im Falle einer Haftung für einfache Fahrlässigkeit ist unsere Haftung für Sachschäden auf einen Betrag von EUR 25.000,00 je Schadensfall beschränkt.</p>
              <p>10.7 Die Einschränkungen dieser Ziff. 10 gelten nicht für unsere Haftung wegen vorsätzlichen Verhaltens oder Verletzung des Lebens, des Körpers oder der Gesundheit.</p>
            </div>
          </section>

          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">11. Datenverarbeitung und Sonstiges</h2>
            <div className="space-y-3 text-sm">
              <p>11.1 Wir speichern und übermitteln die auftragsbezogenen persönlichen Daten des Kunden ausschließlich zur Bearbeitung und Abwicklung seines Auftrages (Art. 6 DSGVO).</p>
              <p>11.2 Wir sind nicht bereit, an einem Streitbeilegungsverfahren teilzunehmen (§§ 36, 37 VSBG).</p>
              <p>11.3 Es gilt das materielle Recht der Bundesrepublik Deutschland; die Geltung des UN-Kaufrechts (CISG) ist ausgeschlossen.</p>
              <p>11.5 Würzburg ist ausschließlicher Gerichtsstand für alle aus dem Vertragsverhältnis resultierenden Streitigkeiten, sofern der Kunde Kaufmann ist.</p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

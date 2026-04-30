"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-10 tracking-tight">
          Datenschutzerklärung
        </h1>
        
        <div className="space-y-12 text-brand-800 dark:text-neutral-300 leading-relaxed text-sm md:text-base">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">1. Name und Kontaktdaten des für die Verarbeitung Verantwortlichen</h2>
            <div className="dark:bg-white/5 bg-brand-50 p-6 rounded-xl border border-brand-100 dark:border-white/10">
              <p>Diese Datenschutz-Information gilt für die Datenverarbeitung durch:</p>
              <div className="mt-4 space-y-2 text-brand-900 dark:text-neutral-200">
                <p><span className="font-bold">Verantwortlicher:</span> M ONE SH.P.K., Veternik Z. Industriale, 10000 Prishtinë, Kosovë</p>
                <p><span className="font-bold">Zweigstelle:</span> Deutschland & Niederlande</p>
                <p><span className="font-bold">Vertreten durch:</span> Arxhent Latifi, Arjeta Latifi</p>
                <p><span className="font-bold">E-Mail:</span> <a href="mailto:info@m-one.net" className="text-brand-500 hover:underline">info@m-one.net</a></p>
                <p><span className="font-bold">Telefon:</span> +49 170 4 695 306 (DE) / +383 49 819 877 (KS)</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">a) Beim Besuch der Website</h3>
              <p>Beim Aufrufen unserer Website <a href="https://www.m-one.net" className="text-brand-500 underline">www.m-one.net</a> werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500 dark:text-neutral-400">
                <li>IP-Adresse des anfragenden Rechners,</li>
                <li>Datum und Uhrzeit des Zugriffs,</li>
                <li>Name und URL der abgerufenen Datei,</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
                <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.</li>
              </ul>
              <p className="mt-4">Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500 dark:text-neutral-400">
                <li>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
                <li>Gewährleistung einer komfortablen Nutzung unserer Website,</li>
                <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                <li>zu weiteren administrativen Zwecken.</li>
              </ul>
              <p className="mt-4 italic">Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen. Darüber hinaus setzen wir beim Besuch unserer Website Cookies sowie Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie unter den Ziff. 4 und 5 dieser Datenschutzerklärung.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">b) Bei Anmeldung für unseren Newsletter</h3>
              <p>Sofern Sie nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrücklich eingewilligt haben, verwenden wir Ihre E-Mail-Adresse dafür, Ihnen regelmäßig unseren Newsletter zu übersenden. Für den Empfang des Newsletters ist die Angabe einer E-Mail-Adresse ausreichend.</p>
              <p>Die Abmeldung ist jederzeit möglich, zum Beispiel über einen Link am Ende eines jeden Newsletters. Alternativ können Sie Ihren Abmeldewunsch gerne auch jederzeit an <a href="mailto:info@m-one.net" className="text-brand-500 underline">info@m-one.net</a> per E-Mail senden.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">c) Bei Nutzung unseres Kontaktformulars</h3>
              <p>Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig getätigt werden.</p>
              <p>Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung. Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage automatisch gelöscht.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">3. Weitergabe von Daten</h2>
            <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
            <ul className="list-disc pl-5 space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
              <li>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,</li>
              <li>die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,</li>
              <li>für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie</li>
              <li>dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">4. Cookies</h2>
            <p>Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware.</p>
            <p>Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres Angebots für Sie angenehmer zu gestalten (z.B. Session-Cookies). Darüber hinaus setzen wir zur Optimierung der Benutzerfreundlichkeit temporäre Cookies ein. Zum anderen setzten wir Cookies ein, um die Nutzung unserer Website statistisch zu erfassen und zum Zwecke der Optimierung unseres Angebotes auszuwerten.</p>
            <p className="italic">Die durch Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung unserer berechtigten Interessen sowie der Dritter nach Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich.</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-6 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">5. Analyse-Tools</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-900 dark:text-white">a) Tracking-Tools</h3>
              <p>Die im Folgenden aufgeführten Tracking-Maßnahmen werden auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO durchgeführt. Mit den Tracking-Maßnahmen wollen wir eine bedarfsgerechte Gestaltung und die fortlaufende Optimierung unserer Webseite sicherstellen.</p>
              
              <div className="space-y-8 mt-6">
                <div>
                  <h4 className="font-bold text-brand-900 dark:text-white mb-2 underline decoration-brand-500 decoration-2 underline-offset-4">i) Google Analytics</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Zum Zwecke der bedarfsgerechten Gestaltung nutzen wir Google Analytics (Google Inc., USA). In diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt. Die IP-Adressen werden anonymisiert (IP-Masking), so dass eine Zuordnung nicht möglich ist. Sie können die Erfassung der Daten durch ein Browser-Add-on verhindern.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-brand-900 dark:text-white mb-2 underline decoration-brand-500 decoration-2 underline-offset-4">ii) Google Adwords Conversion Tracking</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Um die Nutzung unserer Webseite statistisch zu erfassen, nutzen wir ferner das Google Conversion Tracking. Dabei wird ein Cookie auf Ihrem Rechner gesetzt, sofern Sie über eine Google-Anzeige auf unsere Webseite gelangt sind. Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit.</p>
                </div>

                <div>
                  <h4 className="font-bold text-brand-900 dark:text-white mb-2 underline decoration-brand-500 decoration-2 underline-offset-4">iii) etracker</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Unsere Webseite nutzt den Analysedienst etracker (etracker GmbH, Hamburg). Aus den Daten können unter einem Pseudonym Nutzungsprofile erstellt werden. Der Datenerhebung können Sie jederzeit mit Wirkung für die Zukunft widersprechen.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">6. Social Media Plug-ins</h2>
            <p>Wir setzen auf unserer Website auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO Social Plug-ins der sozialen Netzwerke Facebook und Twitter ein. Die Einbindung erfolgt im Wege der sogenannten Zwei-Klick-Methode.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-4 rounded-lg bg-brand-50 dark:bg-white/5 border border-brand-100 dark:border-white/10 text-sm">
                <span className="font-bold block mb-2 text-brand-600 dark:text-brand-400">a) Facebook</span> Plugins (LIKE oder TEILEN-Button). Wenn Sie nicht möchten, dass Facebook die Daten Ihrem Konto zuordnet, loggen Sie sich bitte vorab aus.
              </div>
              <div className="p-4 rounded-lg bg-brand-50 dark:bg-white/5 border border-brand-100 dark:border-white/10 text-sm">
                <span className="font-bold block mb-2 text-brand-600 dark:text-brand-400">b) Twitter</span> Mikroblogging-Dienst Plugins. Loggen Sie sich bitte vorab aus Twitter aus, um eine direkte Zuordnung zu vermeiden.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">7. Betroffenenrechte</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 15 DSGVO:</span> Auskunft über Ihre von uns verarbeiteten Daten.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 16 DSGVO:</span> Berichtigung unrichtiger Daten.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 17 DSGVO:</span> Löschung Ihrer Daten.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 18 DSGVO:</span> Einschränkung der Verarbeitung.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 20 DSGVO:</span> Erhalt Ihrer Daten in strukturiertem Format.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 7 Abs. 3 DSGVO:</span> Widerruf Ihrer Einwilligung.</li>
              <li><span className="font-bold text-brand-900 dark:text-white">Art. 77 DSGVO:</span> Beschwerde bei einer Aufsichtsbehörde.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">8. Widerspruchsrecht</h2>
            <p>Sofern Ihre Daten auf Grundlage von berechtigten Interessen verarbeitet werden, haben Sie das Recht, Widerspruch gegen die Verarbeitung einzulegen. Eine E-Mail an <a href="mailto:info@m-one.net" className="text-brand-500 underline">info@m-one.net</a> genügt.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10">
            <h2 className="text-xl font-bold text-brand-500 uppercase tracking-wider">9. Datensicherheit</h2>
            <p>Wir verwenden das SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-t border-brand-100 dark:border-white/5 pt-10 text-xs text-neutral-500 italic">
            <h2 className="text-sm font-bold text-brand-900 dark:text-white uppercase not-italic">10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Sie kann jederzeit auf der Website abgerufen und ausgedruckt werden.</p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

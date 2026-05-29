"use client";

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const localTranslations = {
  de: {
    title: "Kontaktieren Sie uns",
    subtitle: "Haben Sie Fragen zu unseren Produkten oder wünschen ein Angebot? Schreiben Sie uns direkt.",
    name: "Ihr Name",
    email: "Ihre E-Mail-Adresse",
    subject: "Betreff",
    message: "Ihre Nachricht",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
    error: "Fehler beim Senden. Bitte versuchen Sie es später noch einmal.",
  },
  en: {
    title: "Contact Us",
    subtitle: "Have questions about our products or want a quote? Write to us directly.",
    name: "Your Name",
    email: "Your Email Address",
    subject: "Subject",
    message: "Your Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! Your message has been sent successfully.",
    error: "Error sending message. Please try again later.",
  },
  sq: {
    title: "Na Kontaktoni",
    subtitle: "Keni pyetje rreth produkteve tona apo dëshironi një ofertë? Na shkruani direkt.",
    name: "Emri juaj",
    email: "Adresa juaj e email-it",
    subject: "Subjekti",
    message: "Mesazhi juaj",
    send: "Dërgo Mesazh",
    sending: "Duke u dërguar...",
    success: "Faleminderit! Mesazhi juaj u dërgua me sukses.",
    error: "Gabim gjatë dërgimit. Ju lutem provoni përsëri më vonë.",
  }
};

export default function ContactForm() {
  const { language } = useLanguage();
  const t = localTranslations[language] || localTranslations.de;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 dark:text-white mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 border border-brand-100 dark:border-brand-800/40"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {t.success}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  <AlertCircle className="shrink-0" size={18} />
                  <span>{t.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.message} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                />
              </div>

              <div className="text-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white rounded-full font-bold shadow-lg hover:bg-brand-600 transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? t.sending : t.send}
                  <Send size={16} />
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

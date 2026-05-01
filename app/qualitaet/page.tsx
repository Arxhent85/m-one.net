"use client";

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '../../components/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function QualitaetPage() {
  const { t } = useLanguage();
  const q = (t as any).qualitaet;

  return (
    <div className="bg-white dark:bg-neutral-950 transition-colors duration-300">

      {/* ── Hero Banner ── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <Image
          src="/images/quality/production.png"
          alt="M ONE Produktionsanlage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-500 font-bold text-xs md:text-sm tracking-[0.25em] uppercase mb-4"
          >
            {q.heroLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-4xl leading-[1.1]"
          >
            {q.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl"
          >
            {q.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
          variants={fadeUp}
          className="mb-20 md:mb-28"
        >
          <p className="text-xl md:text-2xl text-brand-800 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {q.introText}{' '}
            <span className="text-brand-500 font-semibold">{q.introPremium} </span>
            {q.introSuffix}
          </p>
        </motion.div>

        {/* ── Section 1: Standards ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32"
        >
          <motion.div custom={0} variants={fadeUp}>
            <p className="text-brand-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">{q.s1Label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 dark:text-white tracking-tight mb-6 leading-tight whitespace-pre-line">
              {q.s1Title}
            </h2>
            <p className="text-brand-800 dark:text-neutral-300 text-lg leading-relaxed">
              {q.s1Body}
            </p>
          </motion.div>
          <motion.div custom={1} variants={fadeUp} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/quality/certification.png"
              alt={q.s1ImgAlt}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.section>

        {/* ── Section 2: Value Chain ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32"
        >
          <motion.div custom={0} variants={fadeUp} className="relative aspect-[4/3] rounded-2xl overflow-hidden md:order-1 order-2">
            <Image
              src="/images/quality/lab.png"
              alt={q.s2ImgAlt}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div custom={1} variants={fadeUp} className="md:order-2 order-1">
            <p className="text-brand-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">{q.s2Label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 dark:text-white tracking-tight mb-6 leading-tight whitespace-pre-line">
              {q.s2Title}
            </h2>
            <p className="text-brand-800 dark:text-neutral-300 text-lg leading-relaxed mb-6">
              {q.s2Body}
            </p>
            {/* Feature Pills */}
            <div className="space-y-4">
              {q.s2Pills.map((item: { label: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                  <div>
                    <p className="font-bold text-brand-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-brand-800 dark:text-neutral-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── Section 3: Transparency ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-24 md:mb-32"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <Image
                src="/images/quality/production.png"
                alt={q.s3ImgAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 max-w-2xl">
              <p className="text-brand-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">{q.s3Label}</p>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                {q.s3Title}
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {q.s3Body}
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Section 4: Manufacturing ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-24 md:mb-32"
        >
          <motion.div custom={0} variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <p className="text-brand-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">{q.s4Label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 dark:text-white tracking-tight mb-6 leading-tight">
              {q.s4Title}
            </h2>
            <p className="text-brand-800 dark:text-neutral-300 text-lg leading-relaxed mb-10">
              {q.s4Body}
            </p>
          </motion.div>

          {/* Location Cards */}
          <motion.div custom={1} variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {q.s4Locations.map((loc: { country: string; name: string; city: string }, i: number) => (
              <div
                key={i}
                className="glass-card flex items-center gap-5 px-6 py-5 bg-neutral-50 dark:bg-white/[0.02] rounded-2xl border border-neutral-200 dark:border-white/5"
              >
                <span className="text-4xl">{loc.country}</span>
                <div>
                  <p className="font-bold text-brand-900 dark:text-white">{loc.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{loc.city}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Closing Statement ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-center border-t border-neutral-200 dark:border-white/5 pt-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-brand-900 dark:text-white tracking-tight mb-4 whitespace-pre-line">
            {q.closingTitle}
          </h2>
          <p className="text-brand-800 dark:text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {q.closingBody}
          </p>
          <p className="mt-8 text-brand-500 font-bold text-lg tracking-wide">
            {q.closingTagline}
          </p>
        </motion.section>

      </div>
    </div>
  );
}

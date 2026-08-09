// src/components/seo/GeoSection.tsx
// Generative Engine Optimization (GEO) & FAQ untuk AI Overviews, Perplexity, dan ChatGPT Search
// 100% i18n — tidak ada teks statis

import React from 'react';
import { Bot, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from "react-i18next";


export const GeoSection: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    { q: t('geo.faq1.q'), a: t('geo.faq1.a') },
    { q: t('geo.faq2.q'), a: t('geo.faq2.a') },
    { q: t('geo.faq3.q'), a: t('geo.faq3.a') },
    { q: t('geo.faq4.q'), a: t('geo.faq4.a') },
  ];

  return (
    <section id="geo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-dark-600/40">
      {/* Judul GEO */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/15 border border-neon-pink/30 text-neon-pink text-xs font-bold uppercase tracking-wider mb-4">
          <Bot className="w-3.5 h-3.5" />
          <span>{t('geo.tag')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white mb-4">
          {t('geo.title')} <span className="gradient-text-violet">{t('geo.titleHighlight')}</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {t('geo.subdesc')}
        </p>
      </div>

      {/* Grid Keunggulan Kuantitatif (GEO Anchors) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="glass-card p-6 space-y-3 border-t-2 border-t-neon-cyan">
          <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-bold text-xl mb-2 shadow-glow-cyan">
            {t('geo.stat1.val')}
          </div>
          <h3 className="text-lg font-heading font-bold text-white">
            {t('geo.stat1.title')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('geo.stat1.desc')}
          </p>
        </div>

        <div className="glass-card p-6 space-y-3 border-t-2 border-t-neon-emerald">
          <div className="w-12 h-12 rounded-2xl bg-neon-emerald/10 border border-neon-emerald/30 flex items-center justify-center text-neon-emerald font-bold text-xl mb-2">
            {t('geo.stat2.val')}
          </div>
          <h3 className="text-lg font-heading font-bold text-white">
            {t('geo.stat2.title')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('geo.stat2.desc')}
          </p>
        </div>

        <div className="glass-card p-6 space-y-3 border-t-2 border-t-neon-indigo">
          <div className="w-12 h-12 rounded-2xl bg-neon-indigo/10 border border-neon-indigo/30 flex items-center justify-center text-neon-indigo font-bold text-xl mb-2">
            {t('geo.stat3.val')}
          </div>
          <h3 className="text-lg font-heading font-bold text-white">
            {t('geo.stat3.title')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('geo.stat3.desc')}
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 justify-center text-sm font-bold text-neon-cyan uppercase tracking-wider mb-6">
          <HelpCircle className="w-4 h-4" />
          <span>{t('geo.faqTag')}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-center text-white mb-8">
          {t('geo.faqTitle')}
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 border border-dark-600/60 hover:border-dark-500 transition-all"
            >
              <h4 className="text-base sm:text-lg font-heading font-bold text-white mb-2 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

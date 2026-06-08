'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function BusinessPage() {
  const { t } = useLanguageStore();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{t('business.title')}</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {t('business.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-glass p-8 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">{t('business.whyTitle')}</h2>
          <ul className="space-y-4">
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">{t('business.why1Title')}</strong>
              {t('business.why1Desc')}
            </li>
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">{t('business.why2Title')}</strong>
              {t('business.why2Desc')}
            </li>
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">{t('business.why3Title')}</strong>
              {t('business.why3Desc')}
            </li>
          </ul>
        </div>

        <div className="card-glass p-8 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">{t('business.contactTitle')}</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(t('business.contactSuccess')); }}>
            <input
              type="text"
              placeholder={t('business.placeholderName')}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <input
              type="email"
              placeholder={t('business.placeholderEmail')}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <textarea
              placeholder={t('business.placeholderText')}
              rows={4}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              {t('business.submitBtn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

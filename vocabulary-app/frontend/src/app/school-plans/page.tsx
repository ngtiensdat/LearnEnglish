'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function SchoolPlansPage() {
  const { t } = useLanguageStore();

  const plans = [
    {
      name: t('schoolPlans.plans.lite.name'),
      price: t('schoolPlans.plans.lite.price'),
      desc: t('schoolPlans.plans.lite.desc'),
      features: [
        t('schoolPlans.plans.lite.features.0'),
        t('schoolPlans.plans.lite.features.1'),
        t('schoolPlans.plans.lite.features.2'),
        t('schoolPlans.plans.lite.features.3'),
      ]
    },
    {
      name: t('schoolPlans.plans.pro.name'),
      price: t('schoolPlans.plans.pro.price'),
      desc: t('schoolPlans.plans.pro.desc'),
      features: [
        t('schoolPlans.plans.pro.features.0'),
        t('schoolPlans.plans.pro.features.1'),
        t('schoolPlans.plans.pro.features.2'),
        t('schoolPlans.plans.pro.features.3'),
        t('schoolPlans.plans.pro.features.4'),
      ],
      popular: true
    }
  ];

  return (
    <div className="space-y-12 py-4">
      <div className="text-center py-12 max-w-xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{t('schoolPlans.title')}</h1>
        <p className="text-slate-400 text-sm">
          {t('schoolPlans.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`card-glass p-8 border space-y-6 flex flex-col justify-between ${
              plan.popular ? 'border-blue-500 bg-blue-950/10 shadow-lg shadow-blue-500/5' : 'border-slate-800'
            }`}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-400 mt-2">{plan.desc}</p>
                </div>
                {plan.popular && (
                  <span className="bg-blue-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                    {t('schoolPlans.popular')}
                  </span>
                )}
              </div>

              <div className="text-3xl font-extrabold text-white">{plan.price}</div>

              <ul className="space-y-3">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center text-sm text-slate-300">
                     <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                     <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition mt-6">
              {t('schoolPlans.getStarted')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

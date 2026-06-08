'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Brain
} from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function LandingPage() {
  const { t } = useLanguageStore();
  const { token } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const ctaLink = mounted && token ? '/dashboard' : '/register';

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl overflow-hidden font-sans shadow-xl border border-slate-800/80">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-6 md:px-12 text-center space-y-8 border-b border-slate-900">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('landing.sparkles')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t('landing.titleBefore')}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent animate-text-glow"> {t('landing.titleHighlight')} </span>
            {t('landing.titleAfter')}
          </h1>
          
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('landing.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href={ctaLink}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35"
            >
              {t('landing.startBtn')}
            </Link>
            <a
              href="#pricing"
              className="bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold px-8 py-3.5 rounded-xl text-sm border border-slate-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('landing.pricingBtn')}
            </a>
          </div>
        </div>

        {/* Realistic Interactive UI Dashboard Preview (Dark mode mockup) */}
        <div className="max-w-5xl mx-auto mt-12 border border-slate-800 rounded-xl shadow-2xl bg-slate-900/60 backdrop-blur-md overflow-hidden text-left text-xs text-slate-300">
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
              <span className="text-[10px] text-slate-500 font-mono ml-4">app.learnenglish.com/dashboard</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span className="font-bold">{t('landing.estScore')}:</span>
              <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">750+</span>
            </div>
          </div>

          <div className="flex min-h-[300px]">
            {/* Sidebar Mock */}
            <aside className="w-40 bg-slate-950/40 border-r border-slate-800 p-4 space-y-4 hidden sm:block">
              <div className="font-bold text-[10px] tracking-widest text-slate-500 uppercase">{t('landing.sidebar.studyDeck')}</div>
              <div className="space-y-1">
                <div className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/20 font-semibold">{t('landing.sidebar.overview')}</div>
                <div className="text-slate-400 px-2 py-1 rounded">{t('landing.sidebar.flashcards')}</div>
                <div className="text-slate-400 px-2 py-1 rounded">{t('landing.sidebar.mockTests')}</div>
                <div className="text-slate-400 px-2 py-1 rounded">{t('landing.sidebar.analytics')}</div>
              </div>
            </aside>
            {/* Dashboard Contents Mock */}
            <main className="flex-1 p-6 bg-slate-900/10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-200">{t('landing.metrics.title')}</h4>
                  <div className="flex space-x-4">
                    <div className="flex-1 bg-slate-950/50 p-3 rounded-lg border border-slate-850">
                      <div className="text-slate-500 text-[10px] uppercase font-bold">{t('landing.metrics.accuracy')}</div>
                      <div className="text-lg font-extrabold text-blue-400">78%</div>
                    </div>
                    <div className="flex-1 bg-slate-950/50 p-3 rounded-lg border border-slate-850">
                      <div className="text-slate-500 text-[10px] uppercase font-bold">{t('landing.metrics.streak')}</div>
                      <div className="text-lg font-extrabold text-amber-500">{t('landing.metrics.streakDays')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-2">{t('landing.metrics.recTitle')}</h4>
                  <div className="flex justify-between items-center p-2.5 bg-slate-950/40 rounded-lg border border-slate-850 text-[11px]">
                    <div>
                      <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1 py-0.5 rounded border border-blue-500/20 uppercase">Part 5 Reading</span>
                      <p className="font-semibold text-slate-300 mt-1">{t('landing.metrics.recSub')}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <h4 className="font-bold text-slate-200">{t('landing.metrics.sm2Title')}</h4>
                  <div className="p-2 bg-slate-950/40 rounded border border-slate-850 text-[10px] flex justify-between">
                    <span>Acquisition</span>
                    <span className="text-green-400 font-bold">{t('landing.metrics.sm2Review')}</span>
                  </div>
                  <div className="p-2 bg-slate-950/40 rounded border border-slate-850 text-[10px] flex justify-between">
                    <span>Collaboration</span>
                    <span className="text-slate-500">{t('landing.metrics.sm2Days')}</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t('landing.features.title')}</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">{t('landing.features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">{t('landing.features.feat1Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('landing.features.feat1Desc')}
            </p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-bold border border-green-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">{t('landing.features.feat2Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('landing.features.feat2Desc')}
            </p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold border border-purple-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">{t('landing.features.feat3Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('landing.features.feat3Desc')}
            </p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold border border-teal-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">{t('landing.features.feat4Title')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('landing.features.feat4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LEARNING ROADMAP */}
      <section className="bg-slate-900/30 py-20 px-6 md:px-12 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('landing.roadmap.title')}</h2>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">{t('landing.roadmap.subtitle')}</p>
          </div>

          <div className="relative pl-8 border-l border-slate-800 space-y-10">
            
            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-500/20">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-200">{t('landing.roadmap.step1Title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {t('landing.roadmap.step1Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-500/20">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-200">{t('landing.roadmap.step2Title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {t('landing.roadmap.step2Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-500/20">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-200">{t('landing.roadmap.step3Title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {t('landing.roadmap.step3Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-500/20">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-200">{t('landing.roadmap.step4Title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {t('landing.roadmap.step4Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRACTICE TESTS & AI ASSISTANT HIGHLIGHT */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t('landing.aiHighlight.tag')}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {t('landing.aiHighlight.title')}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('landing.aiHighlight.desc')}
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{t('landing.aiHighlight.bullet1')}</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{t('landing.aiHighlight.bullet2')}</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{t('landing.aiHighlight.bullet3')}</span>
            </li>
          </ul>
        </div>

        {/* Visual Mock of AI explanation (Dark mode layout) */}
        <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 shadow-xl space-y-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
            <p className="font-bold text-slate-500 text-[10px] uppercase">{t('landing.aiHighlight.questionTag')}</p>
            <p className="font-semibold text-white">
              The board decided to postpone the merger until a more ________ financial forecast is available.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 border border-slate-800 rounded bg-slate-900/40">(A) substantiates</div>
              <div className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded font-bold">(B) {t('landing.aiHighlight.correctTag')}</div>
              <div className="p-2 border border-slate-800 rounded bg-slate-900/40">(C) substantiation</div>
              <div className="p-2 border border-slate-800 rounded bg-slate-900/40">(D) substantially</div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg space-y-2">
            <div className="flex items-center space-x-1.5 text-blue-400 font-bold text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('landing.aiHighlight.aiExplanation')}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {t('landing.aiHighlight.aiExplanationText')}
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-slate-900/30 py-20 px-6 md:px-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">{t('landing.testimonials.title')}</h2>
            <p className="text-xs text-slate-400">{t('landing.testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-md space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                {t('landing.testimonials.t1')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-200">{t('landing.testimonials.t1Author')}</p>
                <p className="text-[10px] text-slate-500">{t('landing.testimonials.t1Role')}</p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-md space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                {t('landing.testimonials.t2')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-200">{t('landing.testimonials.t2Author')}</p>
                <p className="text-[10px] text-slate-500">{t('landing.testimonials.t2Role')}</p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-md space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                {t('landing.testimonials.t3')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-200">{t('landing.testimonials.t3Author')}</p>
                <p className="text-[10px] text-slate-500">{t('landing.testimonials.t3Role')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="pricing" className="py-20 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t('landing.pricing.title')}</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">{t('landing.pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Tier */}
          <div className="bg-slate-900/40 p-8 rounded-xl border border-slate-800/80 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">{t('landing.pricing.freeTitle')}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{t('landing.pricing.freeDesc')}</p>
              </div>
              <div className="text-2xl font-extrabold text-white">{t('landing.pricing.freePrice')} <span className="text-xs font-normal text-slate-500">{t('landing.pricing.freePeriod')}</span></div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t('landing.pricing.freeFeat1')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t('landing.pricing.freeFeat2')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t('landing.pricing.freeFeat3')}</span>
                </li>
              </ul>
            </div>
            <Link
              href={ctaLink}
              className="w-full text-center py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('landing.pricing.freeBtn')}
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-900/60 p-8 rounded-xl border-2 border-blue-500 shadow-xl flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{t('landing.pricing.plusRecommended')}</span>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">{t('landing.pricing.plusTitle')}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{t('landing.pricing.plusDesc')}</p>
              </div>
              <div className="text-2xl font-extrabold text-white">{t('landing.pricing.plusPrice')} <span className="text-xs font-normal text-slate-500">{t('landing.pricing.plusPeriod')}</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-250">{t('landing.pricing.plusFeat1')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-250">{t('landing.pricing.plusFeat2')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t('landing.pricing.plusFeat3')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t('landing.pricing.plusFeat4')}</span>
                </li>
              </ul>
            </div>
            <Link
              href={ctaLink}
              className="w-full text-center py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35"
            >
              {t('landing.pricing.plusBtn')}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA BOTTOM */}
      <section className="bg-slate-900/30 py-16 px-6 md:px-12 text-center border-t border-slate-800">
        <div className="max-w-2xl mx-auto space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-white">{t('landing.ctaBottom.title')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('landing.ctaBottom.desc')}
          </p>
          <div className="pt-2">
            <Link
              href={ctaLink}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3 rounded-xl text-xs transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center space-x-2 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35"
            >
              <span>{t('landing.ctaBottom.btn')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950/80 py-12 px-6 md:px-12 text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">{t('landing.footer.product')}</h5>
            <ul className="space-y-1.5">
              <li><Link href={ctaLink} className="hover:text-slate-300">{t('landing.footer.practiceRooms')}</Link></li>
              <li><Link href={ctaLink} className="hover:text-slate-300">{t('landing.footer.mockTests')}</Link></li>
              <li><Link href={ctaLink} className="hover:text-slate-300">{t('landing.footer.aiAssistant')}</Link></li>
              <li><a href="#pricing" className="hover:text-slate-300">{t('landing.footer.pricingPlans')}</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">{t('landing.footer.resources')}</h5>
            <ul className="space-y-1.5">
              <li><Link href="/library" className="hover:text-slate-300">{t('landing.footer.toeicVocab')}</Link></li>
              <li><Link href="/library" className="hover:text-slate-300">{t('landing.footer.grammarGuides')}</Link></li>
              <li><Link href="/business" className="hover:text-slate-300">{t('landing.footer.instPlans')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">{t('landing.footer.privacySecurity')}</h5>
            <ul className="space-y-1.5">
              <li><Link href="/privacy" className="hover:text-slate-300">{t('landing.footer.privacy')}</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-300">{t('landing.footer.terms')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Learn English</h5>
            <p className="leading-relaxed text-[11px] text-slate-400">
              {t('landing.footer.desc')}
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-900/60 text-center text-[10px] text-slate-600">
          <p>{t('landing.footer.disclaimer')}</p>
        </div>
      </footer>
    </div>
  );
}

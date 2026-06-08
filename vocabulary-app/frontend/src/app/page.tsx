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

export default function LandingPage() {
  const { t } = useLanguageStore();

  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden font-sans shadow-sm border border-slate-200/80">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 px-6 md:px-12 text-center space-y-8 border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('landing.sparkles')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('landing.titleBefore')}
            <span className="text-blue-600">{t('landing.titleHighlight')}</span>
            {t('landing.titleAfter')}
          </h1>
          
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('landing.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg text-sm transition shadow-sm hover:shadow"
            >
              {t('landing.startBtn')}
            </Link>
            <a
              href="#pricing"
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-3.5 rounded-lg text-sm border border-slate-200 transition"
            >
              {t('landing.pricingBtn')}
            </a>
          </div>
        </div>

        {/* Realistic Interactive UI Dashboard Preview (No AI blobs, pure HTML/CSS mockup) */}
        <div className="max-w-5xl mx-auto mt-12 border border-slate-200 rounded-xl shadow-lg bg-white overflow-hidden text-left text-xs text-slate-800">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="text-[10px] text-slate-400 font-mono ml-4">app.toeicmaster.com/dashboard</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span className="font-bold">{t('landing.estScore')}:</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">750+</span>
            </div>
          </div>

          <div className="flex min-h-[300px]">
            {/* Sidebar Mock */}
            <aside className="w-40 bg-slate-50 border-r border-slate-200 p-4 space-y-4 hidden sm:block">
              <div className="font-bold text-[10px] tracking-widest text-slate-400 uppercase">{t('landing.sidebar.studyDeck')}</div>
              <div className="space-y-1">
                <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-semibold">{t('landing.sidebar.overview')}</div>
                <div className="text-slate-600 px-2 py-1 rounded">{t('landing.sidebar.flashcards')}</div>
                <div className="text-slate-600 px-2 py-1 rounded">{t('landing.sidebar.mockTests')}</div>
                <div className="text-slate-600 px-2 py-1 rounded">{t('landing.sidebar.analytics')}</div>
              </div>
            </aside>
            {/* Dashboard Contents Mock */}
            <main className="flex-1 p-6 bg-slate-50/30 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-800">{t('landing.metrics.title')}</h4>
                  <div className="flex space-x-4">
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">{t('landing.metrics.accuracy')}</div>
                      <div className="text-lg font-extrabold text-blue-600">78%</div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">{t('landing.metrics.streak')}</div>
                      <div className="text-lg font-extrabold text-amber-500">{t('landing.metrics.streakDays')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">{t('landing.metrics.recTitle')}</h4>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded border border-slate-100 text-[11px]">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded uppercase">Part 5 Reading</span>
                      <p className="font-semibold text-slate-800 mt-1">{t('landing.metrics.recSub')}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5">
                  <h4 className="font-bold text-slate-800">{t('landing.metrics.sm2Title')}</h4>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[10px] flex justify-between">
                    <span>Acquisition</span>
                    <span className="text-green-600 font-bold">{t('landing.metrics.sm2Review')}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[10px] flex justify-between">
                    <span>Collaboration</span>
                    <span className="text-slate-400">{t('landing.metrics.sm2Days')}</span>
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950">{t('landing.features.title')}</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{t('landing.features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t('landing.features.feat1Title')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('landing.features.feat1Desc')}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t('landing.features.feat2Title')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('landing.features.feat2Desc')}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t('landing.features.feat3Title')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('landing.features.feat3Desc')}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t('landing.features.feat4Title')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('landing.features.feat4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LEARNING ROADMAP */}
      <section className="bg-slate-50 py-20 px-6 md:px-12 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950">{t('landing.roadmap.title')}</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">{t('landing.roadmap.subtitle')}</p>
          </div>

          <div className="relative pl-8 border-l border-slate-200 space-y-10">
            
            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-850">{t('landing.roadmap.step1Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {t('landing.roadmap.step1Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-850">{t('landing.roadmap.step2Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {t('landing.roadmap.step2Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-850">{t('landing.roadmap.step3Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {t('landing.roadmap.step3Desc')}
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-850">{t('landing.roadmap.step4Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {t('landing.roadmap.step4Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRACTICE TESTS & AI ASSISTANT HIGHLIGHT */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t('landing.aiHighlight.tag')}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {t('landing.aiHighlight.title')}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('landing.aiHighlight.desc')}
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
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

        {/* Visual Mock of AI explanation (No AI gradient blobs, pure saas layout) */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
            <p className="font-bold text-slate-400 text-[10px] uppercase">{t('landing.aiHighlight.questionTag')}</p>
            <p className="font-semibold text-slate-800">
              The board decided to postpone the merger until a more ________ financial forecast is available.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(A) substantiates</div>
              <div className="p-2 border border-blue-200 bg-blue-50 text-blue-600 rounded font-bold">(B) {t('landing.aiHighlight.correctTag')}</div>
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(C) substantiation</div>
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(D) substantially</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-2">
            <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('landing.aiHighlight.aiExplanation')}</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              {t('landing.aiHighlight.aiExplanationText')}
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-slate-50 py-20 px-6 md:px-12 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">{t('landing.testimonials.title')}</h2>
            <p className="text-xs text-slate-500">{t('landing.testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {t('landing.testimonials.t1')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">{t('landing.testimonials.t1Author')}</p>
                <p className="text-[10px] text-slate-400">{t('landing.testimonials.t1Role')}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {t('landing.testimonials.t2')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">{t('landing.testimonials.t2Author')}</p>
                <p className="text-[10px] text-slate-400">{t('landing.testimonials.t2Role')}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {t('landing.testimonials.t3')}
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">{t('landing.testimonials.t3Author')}</p>
                <p className="text-[10px] text-slate-400">{t('landing.testimonials.t3Role')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="pricing" className="py-20 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950">{t('landing.pricing.title')}</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{t('landing.pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{t('landing.pricing.freeTitle')}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{t('landing.pricing.freeDesc')}</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{t('landing.pricing.freePrice')} <span className="text-xs font-normal text-slate-400">{t('landing.pricing.freePeriod')}</span></div>
              <ul className="space-y-2.5 text-xs text-slate-600">
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
              href="/register"
              className="w-full text-center py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition"
            >
              {t('landing.pricing.freeBtn')}
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-white p-8 rounded-xl border-2 border-blue-600 shadow-sm flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{t('landing.pricing.plusRecommended')}</span>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{t('landing.pricing.plusTitle')}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{t('landing.pricing.plusDesc')}</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{t('landing.pricing.plusPrice')} <span className="text-xs font-normal text-slate-400">{t('landing.pricing.plusPeriod')}</span></div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-850">{t('landing.pricing.plusFeat1')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-850">{t('landing.pricing.plusFeat2')}</span>
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
              href="/register"
              className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition shadow-md shadow-blue-500/10"
            >
              {t('landing.pricing.plusBtn')}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA BOTTOM */}
      <section className="bg-slate-50 py-16 px-6 md:px-12 text-center border-t border-slate-200/80">
        <div className="max-w-2xl mx-auto space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-slate-950">{t('landing.ctaBottom.title')}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('landing.ctaBottom.desc')}
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-xs transition inline-flex items-center space-x-2 shadow-sm"
            >
              <span>{t('landing.ctaBottom.btn')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-50/50 py-12 px-6 md:px-12 text-slate-500 text-xs border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">{t('landing.footer.product')}</h5>
            <ul className="space-y-1.5">
              <li><Link href="/register" className="hover:text-slate-800">{t('landing.footer.practiceRooms')}</Link></li>
              <li><Link href="/register" className="hover:text-slate-800">{t('landing.footer.mockTests')}</Link></li>
              <li><Link href="/register" className="hover:text-slate-800">{t('landing.footer.aiAssistant')}</Link></li>
              <li><a href="#pricing" className="hover:text-slate-800">{t('landing.footer.pricingPlans')}</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">{t('landing.footer.resources')}</h5>
            <ul className="space-y-1.5">
              <li><Link href="/library" className="hover:text-slate-800">{t('landing.footer.toeicVocab')}</Link></li>
              <li><Link href="/library" className="hover:text-slate-800">{t('landing.footer.grammarGuides')}</Link></li>
              <li><Link href="/business" className="hover:text-slate-800">{t('landing.footer.instPlans')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">{t('landing.footer.privacySecurity')}</h5>
            <ul className="space-y-1.5">
              <li><Link href="/privacy" className="hover:text-slate-800">{t('landing.footer.privacy')}</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-800">{t('landing.footer.terms')}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">TOEIC Master</h5>
            <p className="leading-relaxed text-[11px]">
              {t('landing.footer.desc')}
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-200/60 text-center text-[10px] text-slate-400">
          <p>{t('landing.footer.disclaimer')}</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Search,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Award,
  Brain
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden font-sans shadow-sm border border-slate-200/80">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 px-6 md:px-12 text-center space-y-8 border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation TOEIC Practice</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Master the TOEIC Exam with <span className="text-blue-600">AI-Powered</span> Practice
          </h1>
          
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A structured, personalized learning platform designed to help university students and job seekers achieve their target score of 750+ through smart analytics and active recall.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg text-sm transition shadow-sm hover:shadow"
            >
              Start practicing free
            </Link>
            <a
              href="#pricing"
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-3.5 rounded-lg text-sm border border-slate-200 transition"
            >
              View pricing plans
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
              <span className="font-bold">Estimated Score:</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">750+</span>
            </div>
          </div>

          <div className="flex min-h-[300px]">
            {/* Sidebar Mock */}
            <aside className="w-40 bg-slate-50 border-r border-slate-200 p-4 space-y-4 hidden sm:block">
              <div className="font-bold text-[10px] tracking-widest text-slate-400 uppercase">Study Deck</div>
              <div className="space-y-1">
                <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-semibold">Overview</div>
                <div className="text-slate-600 px-2 py-1 rounded">Flashcards</div>
                <div className="text-slate-600 px-2 py-1 rounded">Mock Tests</div>
                <div className="text-slate-600 px-2 py-1 rounded">Analytics</div>
              </div>
            </aside>
            {/* Dashboard Contents Mock */}
            <main className="flex-1 p-6 bg-slate-50/30 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-800">TOEIC Practice Metrics</h4>
                  <div className="flex space-x-4">
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Accuracy</div>
                      <div className="text-lg font-extrabold text-blue-600">78%</div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Streak</div>
                      <div className="text-lg font-extrabold text-amber-500">12 Days</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">Recommended Today</h4>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded border border-slate-100 text-[11px]">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded uppercase">Part 5 Reading</span>
                      <p className="font-semibold text-slate-800 mt-1">Gerunds vs Infinitives</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5">
                  <h4 className="font-bold text-slate-800">SM-2 Flashcards</h4>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[10px] flex justify-between">
                    <span>Acquisition</span>
                    <span className="text-green-600 font-bold">Review today</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[10px] flex justify-between">
                    <span>Collaboration</span>
                    <span className="text-slate-400">2 days left</span>
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950">Engineered for score improvement</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">No tricks, just effective study frameworks optimized for language acquisition.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">AI Answer Explanations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instant grammatical breakdowns and sentence structures for Part 5, 6, and 7 questions. Understand why your answers are correct or incorrect.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">SM-2 Spaced Repetition</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Flashcard schedules dynamically adapt to your learning pace. Retain high-frequency business vocabulary with minimal daily effort.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Classroom Rooms</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Join active study rooms created by teachers or study groups. Practice quizzes collaboratively and keep up with group milestones.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Detailed Analytics</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Identify accuracy rates and trace weak skills down to specific Parts. Focus your study hours exactly where you leak points.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LEARNING ROADMAP */}
      <section className="bg-slate-50 py-20 px-6 md:px-12 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950">A structured path to 750+</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">Our four-step cycle translates effort into quantifiable score growth.</p>
          </div>

          <div className="relative pl-8 border-l border-slate-200 space-y-10">
            
            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-850">Diagnostic Assessment</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Establish your initial score baseline with a fast, targeted grammar and vocabulary evaluation.
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-850">Targeted Exercises</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Receive recommended reading and listening exercises based on your weakness areas. Stop wasting time on what you already know.
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-850">Spaced Vocabulary Reinforcement</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Review flashcards compiled from your mistakes. Our SM-2 scheduler will prompt review intervals to shift words to long-term memory.
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-850">Simulated Exam Testing</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Take full-length mock exams timed under standard conditions. Track your projected score trajectory week by week.
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
            <span>Interactive Explanations</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            Learn from mistakes with immediate AI feedback
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No more flipping to the back of test prep books to find minimal explanations. Our AI assistant analyzes the sentence context, explains grammar rules, and defines challenging vocabulary options dynamically.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Full Part 5-7 grammatical mapping</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Contextual translations of business idioms</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Adapted score improvement tips</span>
            </li>
          </ul>
        </div>

        {/* Visual Mock of AI explanation (No AI gradient blobs, pure saas layout) */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
            <p className="font-bold text-slate-400 text-[10px] uppercase">Question #14 (Part 5)</p>
            <p className="font-semibold text-slate-800">
              The board decided to postpone the merger until a more ________ financial forecast is available.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(A) substantiates</div>
              <div className="p-2 border border-blue-200 bg-blue-50 text-blue-600 rounded font-bold">(B) substantial (Correct)</div>
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(C) substantiation</div>
              <div className="p-2 border border-slate-200 rounded bg-slate-50">(D) substantially</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-2">
            <div className="flex items-center space-x-1.5 text-blue-700 font-bold text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Explanation</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Dòng khoảng trống đứng trước danh từ ghép <strong>financial forecast</strong>, do đó cần một tính từ bổ nghĩa. <strong>substantial</strong> (adj) mang ý nghĩa "đáng kể, vững chắc", phù hợp nhất với ngữ cảnh dự báo tài chính.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-slate-50 py-20 px-6 md:px-12 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">What our students say</h2>
            <p className="text-xs text-slate-500">Real outcomes from university candidates and working professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "As a senior university student, I needed 700+ to graduate. The spaced repetition vocabulary rooms helped me memorize key business terms in under 3 weeks. I scored 780!"
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">Minh Anh Nguyen</p>
                <p className="text-[10px] text-slate-400">NEU Senior Student</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The AI explanation tool is the best part. When doing mock tests, I could immediately understand why option B was correct instead of option C. It saved me hours of research."
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">Hoang Nam Tran</p>
                <p className="text-[10px] text-slate-400">Software Engineer Job Seeker</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "I managed to raise my TOEIC score from 580 to 820 using only this platform. The weak skills analytics allowed me to concentrate entirely on Part 7 reading practice."
              </p>
              <div>
                <p className="text-xs font-bold text-slate-800">Thi Thu Thao Le</p>
                <p className="text-[10px] text-slate-400">Marketing Professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="pricing" className="py-20 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950">Simple, transparent pricing</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">Choose a plan that fits your preparation timeframe. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Free Basic</h4>
                <p className="text-[10px] text-slate-400 mt-1">For general practice and review</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Access to standard vocab rooms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Basic practice quizzes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Personal progress tracking</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition"
            >
              Sign up free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-white p-8 rounded-xl border-2 border-blue-600 shadow-sm flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Recommended</span>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Premium Prep</h4>
                <p className="text-[10px] text-slate-400 mt-1">Accelerated score improvement package</p>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">$12 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-850">Unlimited Mock Tests</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-slate-850">AI Answer Explanations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>SM-2 Spaced Repetition scheduler</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Detailed weakness skill mapping</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition shadow-md shadow-blue-500/10"
            >
              Start Premium Prep
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA BOTTOM */}
      <section className="bg-slate-50 py-16 px-6 md:px-12 text-center border-t border-slate-200/80">
        <div className="max-w-2xl mx-auto space-y-5">
          <h3 className="text-xl md:text-2xl font-bold text-slate-950">Ready to boost your TOEIC score?</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create an account in less than 30 seconds and start practicing on the most efficient platform for university graduates and job seekers.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-xs transition inline-flex items-center space-x-2 shadow-sm"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-50/50 py-12 px-6 md:px-12 text-slate-500 text-xs border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Product</h5>
            <ul className="space-y-1.5">
              <li><Link href="/register" className="hover:text-slate-800">Practice Rooms</Link></li>
              <li><Link href="/register" className="hover:text-slate-800">Mock Tests</Link></li>
              <li><Link href="/register" className="hover:text-slate-800">AI Assistant</Link></li>
              <li><a href="#pricing" className="hover:text-slate-800">Pricing Plans</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Resources</h5>
            <ul className="space-y-1.5">
              <li><Link href="/library" className="hover:text-slate-800">TOEIC Vocabulary</Link></li>
              <li><Link href="/library" className="hover:text-slate-800">Grammar Guides</Link></li>
              <li><Link href="/business" className="hover:text-slate-800">Institutional Plans</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Privacy & Security</h5>
            <ul className="space-y-1.5">
              <li><Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-800">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">TOEIC Master</h5>
            <p className="leading-relaxed text-[11px]">
              Engineered with care to accelerate English proficiency and test readiness using modern active recall algorithms.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-200/60 text-center text-[10px] text-slate-400">
          <p>© 2026 TOEIC Master. All rights reserved. TOEIC is a registered trademark of ETS. This platform is not endorsed or approved by ETS.</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Award, Users, Shield, Compass, Sparkles } from 'lucide-react';

const courses = [
  {
    title: 'Beginner English',
    subtitle: 'Start your journey to mastering English basics',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
    icon: Compass,
    bullets: [
      'Interactive lessons for grammar, vocabulary, and pronunciation',
      'Videos with native speakers to improve listening skills',
      'Flashcards for essential words and phrases',
      'Quizzes to test basic comprehension and speaking skills'
    ]
  },
  {
    title: 'Intermediate English',
    subtitle: 'Enhance your fluency with intermediate skills',
    color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30',
    icon: BookOpen,
    bullets: [
      'Advanced grammar and conversational practice',
      'Videos with real-life dialogues and discussions',
      'Flashcards for idioms and complex vocabulary',
      'Assessments to improve reading and writing fluency'
    ]
  },
  {
    title: 'Advanced English',
    subtitle: 'Perfect your English for professional and academic use',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    icon: Award,
    bullets: [
      'Lessons on business English and academic writing',
      'Videos with expert-led discussions and presentations',
      'Flashcards for advanced terminology',
      'Simulations for interviews and public speaking'
    ]
  },
  {
    title: 'Kids English',
    subtitle: 'Fun and engaging English for young learners',
    color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
    icon: Users,
    bullets: [
      'Animated videos and songs for vocabulary building',
      'Interactive games for grammar and spelling',
      'Flashcards with pictures and audio support',
      'Simple quizzes designed for young learners'
    ]
  },
  {
    title: 'IELTS Prep',
    subtitle: 'Prepare confidently for your IELTS exam',
    color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    icon: Sparkles,
    bullets: [
      'Practice tests mirroring IELTS format and timing',
      'Videos explaining test strategies and tips',
      'Flashcards for high-frequency words',
      'Mock interviews to boost speaking skills'
    ]
  }
];

const testimonials = [
  {
    name: 'Nguyen Van A',
    title: 'Student (Vietnam)',
    quote: 'Learn English helped me improve my speaking skills in just 3 months. The interactive lessons and quizzes are amazing!'
  },
  {
    name: 'Tran Thi B',
    title: 'Teacher (Hanoi)',
    quote: 'I use Learn English for my classes, and my students love the engaging videos and flashcards. Highly recommended!'
  },
  {
    name: 'Le Van C',
    title: 'Business Professional (Ho Chi Minh City)',
    quote: 'The advanced course prepared me for international meetings. The simulations were a game-changer!'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto space-y-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to Learn English
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Master English with interactive courses, AI-supported tools, and teacher-guided lessons tailored for all levels.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-blue-500/20 hover:scale-105 transition active:scale-95"
          >
            Start for free
          </Link>
          <Link
            href="/business"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl text-lg border border-slate-700 hover:scale-105 transition active:scale-95"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* Course Cards */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Our Courses</h2>
          <p className="text-slate-400 mt-2">Pick a track that aligns with your goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const IconComponent = course.icon;
            return (
              <div
                key={index}
                className={`card-glass p-8 flex flex-col justify-between border bg-gradient-to-b ${course.color} transition hover:scale-[1.02] duration-300`}
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <IconComponent className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{course.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {course.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link
                    href="/register"
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                  >
                    Start learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Section */}
      <section className="card-glass p-10 max-w-4xl mx-auto text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-blue-950/40 to-indigo-950/40">
        <h3 className="text-3xl font-bold">AI-Powered Learning</h3>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Take your learning further with real-time feedback, personalized test analysis, and automated vocabulary tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-5 bg-white/5 rounded-xl border border-white/5">
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Interactive Feedback</h4>
            <p className="text-sm text-slate-400">Enhance your practice with personalized feedback</p>
          </div>
          <div className="p-5 bg-white/5 rounded-xl border border-white/5">
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Automated Planning</h4>
            <p className="text-sm text-slate-400">Save time with automated, structured lesson plans</p>
          </div>
          <div className="p-5 bg-white/5 rounded-xl border border-white/5">
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Privacy First</h4>
            <p className="text-sm text-slate-400">Ensure privacy and focus 100% on your personal progress</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <h3 className="text-3xl md:text-4xl font-bold text-center">What Learners Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="card-glass p-6 bg-slate-900 border border-slate-800 space-y-4">
              <p className="italic text-slate-300">"{t.quote}"</p>
              <div>
                <h4 className="font-bold text-blue-400">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm space-y-2">
        <p>Seamlessly integrate with your learning tools.</p>
        <p>Your data is secure with top-tier privacy protection.</p>
        <Link href="/privacy" className="text-blue-400 hover:underline inline-block mt-2">
          Learn more
        </Link>
      </footer>
    </div>
  );
}

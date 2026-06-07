'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Award, GraduationCap } from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();

  const resources = [
    {
      title: 'TOEIC Practice Tests',
      description: 'Full-length TOEIC mock exams with detailed score reports and answer explanations.',
      category: 'TOEIC',
      path: '/toeic',
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'IELTS Academic',
      description: 'Complete IELTS Academic practice tests with AI-powered writing & speaking feedback.',
      category: 'IELTS Academic',
      path: '/ielts-academic',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'IELTS General',
      description: 'Realistic General Training tests for immigration & work, with instant band score prediction.',
      category: 'IELTS General',
      path: '/ielts-general',
      color: 'from-green-500 to-teal-600',
    }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero */}
      <div className="text-center py-12 max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Resource Library</h1>
        <p className="text-slate-400 text-sm">
          Prepare for TOEIC, IELTS Academic, and IELTS General Training with AI-enhanced practice materials.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((res, idx) => (
          <div
            key={idx}
            onClick={() => router.push(res.path)}
            className="card-glass p-8 flex flex-col justify-between hover:scale-[1.03] transition duration-300 cursor-pointer border border-slate-800"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{res.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{res.description}</p>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-800">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${res.color}`}>
                {res.category}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(res.path);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
              >
                Access Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card-glass p-10 text-center max-w-2xl mx-auto bg-gradient-to-r from-blue-950/20 to-indigo-950/20 space-y-6">
        <h3 className="text-2xl font-bold">Which Test Are You Taking?</h3>
        <p className="text-slate-300 text-sm">
          Choose your path and get a personalized study plan with real-time progress tracking.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition"
        >
          Start Practicing Now
        </button>
      </div>
    </div>
  );
}

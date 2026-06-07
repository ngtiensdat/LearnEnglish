'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function BusinessPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Learn English For Business</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Tailored training programs, progress dashboards, and professional assessments designed for modern global teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-glass p-8 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">Why Partner With Us?</h2>
          <ul className="space-y-4">
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">Custom Curriculum</strong>
              Aligned with your industry sectors, target roles, and daily corporate communications.
            </li>
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">Interactive Analytics</strong>
              Monitor employee engagement, exam performances, and overall speaking development.
            </li>
            <li className="text-sm text-slate-300">
              <strong className="text-blue-400 block mb-1">Premium Mock Exams</strong>
              Regular assessment tests matching strict standard formats.
            </li>
          </ul>
        </div>

        <div className="card-glass p-8 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">Contact Enterprise Team</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Đã gửi liên hệ!'); }}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <input
              type="email"
              placeholder="Work Email"
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <textarea
              placeholder="Tell us about your team size and training requirements"
              rows={4}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              Request Enterprise Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

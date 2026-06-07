'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Award } from 'lucide-react';

const testItems = [
  { id: '224', title: 'New Economy TOEIC Test 1', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' },
  { id: '224', title: 'New Economy TOEIC Test 2', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' },
  { id: '224', title: 'New Economy TOEIC Test 3', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' },
  { id: '224', title: 'New Economy TOEIC Test 4', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' },
  { id: '224', title: 'New Economy TOEIC Test 5', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' },
  { id: '224', title: 'New Economy TOEIC Test 6', time: '120 phút', questions: '7 phần thi | 200 câu hỏi' }
];

export default function TOEICHubPage() {
  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          TOEIC Practice Hub
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Full-length TOEIC tests with instant scoring, detailed explanations, and progress tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testItems.map((item, index) => (
          <div key={index} className="testitem-wrapper card-glass">
            <div>
              <h2 className="testitem-title text-lg font-bold text-white mb-2">{item.title}</h2>
              <div className="testitem-info-wrapper space-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-green-400" /> {item.questions}
                </span>
              </div>
            </div>
            <div className="testitem-start-test mt-4">
              <Link href={`/toeic/${item.id}`} className="btn">
                Chi tiết đề thi
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

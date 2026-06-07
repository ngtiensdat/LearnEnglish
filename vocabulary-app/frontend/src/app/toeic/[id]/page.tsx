'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, FileText } from 'lucide-react';

export default function TOEICDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const parts = [
    { num: 1, desc: 'Part 1: Photographs' },
    { num: 2, desc: 'Part 2: Question-Response' },
    { num: 3, desc: 'Part 3: Conversations' },
    { num: 4, desc: 'Part 4: Talks' },
    { num: 5, desc: 'Part 5: Incomplete Sentences' },
    { num: 6, desc: 'Part 6: Text Completion' },
    { num: 7, desc: 'Part 7: Reading Comprehension' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <button
        onClick={() => router.push('/toeic')}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại Hub
      </button>

      <div className="card-glass p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">New Economy TOEIC Test {id}</h1>
          <p className="text-sm text-slate-400 mt-2">
            Luyện tập từng phần thi Listening/Reading hoặc làm bài kiểm tra đầy đủ (Full Test).
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-blue-400">Chọn phần thi muốn làm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parts.map((p) => (
              <Link
                key={p.num}
                href={`/toeic/${id}/part${p.num}`}
                className="flex items-center p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/40 transition hover:bg-slate-800/50"
              >
                <FileText className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-sm font-semibold text-slate-200">{p.desc}</span>
              </Link>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Link
              href={`/toeic/${id}/full`}
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-extrabold rounded-xl transition shadow-lg shadow-orange-500/20"
            >
              <Clock className="w-5 h-5 mr-2" /> Làm Full Test (120 phút)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

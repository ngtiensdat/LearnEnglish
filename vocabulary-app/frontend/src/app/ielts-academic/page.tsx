'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function IELTSAcademicPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <button
        onClick={() => router.push('/library')}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại Thư viện
      </button>

      <div className="card-glass p-8 text-center space-y-6 border border-slate-800">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">IELTS Academic Preparation</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Luyện thi IELTS Academic với AI đánh giá kỹ năng Viết & Nói, tự động chấm điểm bài đọc & nghe.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto flex items-center gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <p className="text-xs text-slate-300">
            Dữ liệu IELTS đang được hoàn thiện. Trong thời gian này, vui lòng tham khảo các đề luyện thi TOEIC có sẵn.
          </p>
        </div>

        <button
          onClick={() => router.push('/toeic')}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
        >
          Luyện thi TOEIC Ngay
        </button>
      </div>
    </div>
  );
}

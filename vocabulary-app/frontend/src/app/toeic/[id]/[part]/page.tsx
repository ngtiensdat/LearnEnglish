'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, ZoomIn, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/useAuthStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TOEICTestPlayerPage() {
  const params = useParams();
  const id = (params?.id as string) || '';
  const part = (params?.part as string) || '';
  const router = useRouter();
  const { token } = useAuthStore();
  const { t } = useLanguageStore();

  const [data, setData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (part === 'full') {
          const parts = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'];
          const fetchPromises = parts.map((p) =>
            fetch(`/data/toeic/test${id}/${p}.json`)
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          );
          const results = await Promise.all(fetchPromises);
          const valid = results.filter((r) => r !== null);
          const combined = {
            title: `Full TOEIC Test ${id}`,
            questions: valid.flatMap((p: any) =>
              p.questions.map((q: any) => ({ ...q, options: q.options || [] }))
            ),
          };
          setData(combined);
        } else {
          const res = await fetch(`/data/toeic/test${id}/${part}.json`);
          if (!res.ok) throw new Error('Không thể tải file đề');
          const fileData = await res.json();
          const normalized = {
            ...fileData,
            questions: fileData.questions.map((q: any) => ({
              ...q,
              options: q.options || [],
            })),
          };
          setData(normalized);
        }
      } catch (err) {
        console.error('Không thể tải đề:', err);
        toast.error(t('toeic.loadFailedToast'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, part, t]);

  const handleAnswer = (qId: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: selected }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!token) return toast.error(t('toeic.loginRequired'));

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([qid, selected]) => ({
        id: qid,
        selected,
      }));

      const res = await apiClient.post('/learning/toeic/submit', {
        testId: id,
        part,
        answers: formattedAnswers,
      });

      const result = res.data;
      toast.success(`${t('toeic.submitSuccess')}${result.score}/${result.total}`);
      setScore(result.score);
      setTotal(result.total);
    } catch (error: any) {
      console.error('Lỗi nộp bài:', error);
      toast.error(error?.message || t('toeic.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-800 rounded-lg"></div>
            <div className="h-4 w-32 bg-slate-800/60 rounded-md"></div>
          </div>
          <div className="h-10 w-28 bg-slate-800 rounded-xl"></div>
        </div>

        {/* Content Box Skeleton */}
        <div className="card-glass p-8 border border-slate-850 space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-800 rounded-md"></div>
            <div className="h-4 w-5/6 bg-slate-800 rounded-md"></div>
            <div className="h-4 w-2/3 bg-slate-800/60 rounded-md"></div>
          </div>

          <div className="h-48 w-full bg-slate-800/20 rounded-xl border border-slate-800/50 flex items-center justify-center">
            <div className="h-8 w-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          </div>

          {/* Options Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="h-12 bg-slate-850 rounded-xl border border-slate-800"></div>
            <div className="h-12 bg-slate-850 rounded-xl border border-slate-800"></div>
            <div className="h-12 bg-slate-850 rounded-xl border border-slate-800"></div>
            <div className="h-12 bg-slate-850 rounded-xl border border-slate-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertCircle className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">{t('toeic.loadError')}</h2>
        <p className="text-slate-400">{t('toeic.loadErrorDesc')}</p>
        <button onClick={() => router.push(`/toeic/${id}`)} className="btn-primary">
          {t('toeic.backDetailBtn')}
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="max-w-4xl mx-auto space-y-6 py-4">
        <button
          onClick={() => router.push(`/toeic/${id}`)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> {t('toeic.backDetailBtn')}
        </button>

        <div className="card-glass p-6 text-center">
          <h1 className="text-3xl font-extrabold text-white">{data.title}</h1>
          <p className="text-xs text-slate-400 mt-1">{data.questions.length} {t('toeic.question').toLowerCase()}</p>
        </div>

        <div className="space-y-6">
          {data.questions.map((q: any) => {
            const imageSrc = q.image ? `/data/toeic/test${id}/${q.image}` : null;
            const audioSrc = q.audio ? `/data/toeic/test${id}/${q.audio}` : null;

            return (
              <div key={q.id} className="card-glass p-6 border-slate-800 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="font-bold text-blue-400">{t('toeic.question')} {q.id}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Cột trái: ảnh + audio */}
                  {(imageSrc || audioSrc) && (
                    <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                      {imageSrc && (
                        <div className="relative group rounded-xl overflow-hidden shadow border border-slate-800">
                          <img
                            src={imageSrc}
                            alt={`Question ${q.id}`}
                            className="w-full max-w-xs cursor-pointer hover:scale-105 transition duration-300"
                            onClick={() => setZoomImage(imageSrc)}
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image';
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-slate-900/80 p-1.5 rounded-lg text-slate-300 opacity-0 group-hover:opacity-100 transition">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      {audioSrc && (
                        <div className="w-full max-w-xs p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <audio controls src={audioSrc} className="w-full h-8" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cột phải: câu hỏi và lựa chọn */}
                  <div className="flex-1 space-y-3">
                    {q.question && <p className="font-semibold text-slate-200">{q.question}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt: string, i: number) => {
                        const isChecked = answers[q.id] === opt;
                        return (
                          <label
                            key={i}
                            className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition ${
                              isChecked
                                ? 'border-orange-500 bg-orange-500/10 text-white'
                                : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              value={opt}
                              checked={isChecked}
                              onChange={() => handleAnswer(q.id, opt)}
                              className="hidden"
                            />
                            <span className="text-sm">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút nộp bài */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 card-glass border-slate-800">
          <div>
            <p className="text-sm text-slate-400">{t('toeic.footerDesc')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('toeic.answered')}: {Object.keys(answers).length} / {data.questions.length}</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length === 0}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-extrabold rounded-xl transition shadow-lg shadow-orange-500/20 disabled:opacity-40"
          >
            {submitting ? t('toeic.submittingBtn') : t('toeic.submitBtn')}
          </button>
        </div>

        {score !== null && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-glass p-8 text-center space-y-4 border-green-500/20 bg-green-950/10"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('toeic.resultTitle')}</h3>
              <p className="text-3xl font-extrabold text-green-400 mt-2">
                {score} / {total} {t('toeic.resultDesc')}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal phóng to ảnh */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setZoomImage(null)}
        >
          <img src={zoomImage} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl" />
        </div>
      )}
    </>
  );
}

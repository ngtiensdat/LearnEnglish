'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiClient } from '../../../lib/api-client';
import { useAuthStore } from '../../../store/useAuthStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

export default function RoomQuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = (params?.roomId as string) || '';
  const roomName = searchParams?.get('name') || '';

  const { token } = useAuthStore();
  const { t } = useLanguageStore();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [room, setRoom] = useState<any | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return toast.error(t('quizRoom.pwdWarning'));
    setJoining(true);

    try {
      // API expects { name, password }
      // We search for room name. If query param is empty, we fall back to roomId.
      const res = await apiClient.post('/learning/join', {
        name: roomName || roomId, 
        password,
      });
      setRoom(res.data.room);
      toast.success(t('quizRoom.pwdSuccess'));
    } catch (err: any) {
      toast.error(err?.message || t('quizRoom.pwdError'));
    } finally {
      setJoining(false);
    }
  };

  const handleAnswer = (qId: string, optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < room.questions.length) {
      return toast.error(t('quizRoom.toastWarning'));
    }
    setSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));

      const res = await apiClient.post('/learning/submit', {
        roomId: room.id,
        answers: formattedAnswers,
      });

      setScore(res.data.score);
      toast.success(t('quizRoom.toastSuccess') + res.data.score);
    } catch (err: any) {
      toast.error(err?.message || t('quizRoom.toastError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!room) {
    return (
      <div className="max-w-md mx-auto py-20 space-y-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> {t('quizRoom.backBtn')}
        </button>

        <div className="card-glass p-8 space-y-6 text-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{t('quizRoom.pwdTitle')}</h2>
            <p className="text-xs text-slate-400 mt-2">{t('quizRoom.pwdDesc')}</p>
          </div>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              type="password"
              placeholder={t('quizRoom.pwdPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={joining}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              {joining ? t('quizRoom.pwdSubmitLoading') : t('quizRoom.pwdSubmit')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> {t('quizRoom.backBtn')}
        </button>

        <div className="card-glass p-6 text-center">
          <h2 className="text-2xl font-bold text-white">{t('quizRoom.title')} {roomName || room.id}</h2>
          <p className="text-xs text-slate-400 mt-1">{room.questions.length} {t('quizRoom.subTitle')}</p>
        </div>

        {score !== null ? (
          <div className="card-glass p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">{t('quizRoom.scoreTitle')}</h3>
              <p className="text-lg text-slate-300 mt-2">
                {t('quizRoom.scoreResult')} <span className="text-green-400 font-bold">{score}</span>
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              {t('quizRoom.dashboardBtn')}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {room.questions.map((q: any, i: number) => (
              <div key={q.id} className="card-glass p-6 space-y-4 border-slate-800">
                <p className="font-bold text-white">
                  {t('quizRoom.questionLabel')} {i + 1}: {q.content}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt: string, j: number) => (
                    <label
                      key={j}
                      className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition ${
                        answers[q.id] === j
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === j}
                        onChange={() => handleAnswer(q.id, j)}
                        className="hidden"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length < room.questions.length}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition disabled:opacity-40"
            >
              {submitting ? t('quizRoom.submitBtnLoading') : t('quizRoom.submitBtn')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

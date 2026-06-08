'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

const QUIZ_TOPICS = [
  {
    id: 'topic1',
    color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    questions: [
      { id: 'q1', options: ['Dog', 'Cat', 'Bird', 'Fish'], correctAnswer: 0 },
      { id: 'q2', options: ['Dog', 'Cat', 'Bird', 'Fish'], correctAnswer: 1 },
      { id: 'q3', options: ['Fish', 'Bird', 'Dog', 'Horse'], correctAnswer: 1 },
      { id: 'q4', options: ['Cat', 'Dog', 'Fish', 'Bird'], correctAnswer: 2 }
    ]
  },
  {
    id: 'topic2',
    color: 'from-red-500/20 to-pink-500/20 border-red-500/30',
    questions: [
      { id: 'q11', options: ['Apple', 'Orange', 'Banana', 'Grape'], correctAnswer: 0 },
      { id: 'q12', options: ['Apple', 'Orange', 'Pear', 'Peach'], correctAnswer: 1 },
      { id: 'q13', options: ['Banana', 'Apple', 'Orange', 'Grape'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic3',
    color: 'from-green-500/20 to-teal-500/20 border-green-500/30',
    questions: [
      { id: 'q21', options: ['Bread', 'Rice', 'Cake', 'Cookie'], correctAnswer: 0 },
      { id: 'q22', options: ['Milk', 'Water', 'Juice', 'Tea'], correctAnswer: 0 },
      { id: 'q23', options: ['Water', 'Milk', 'Juice', 'Coffee'], correctAnswer: 0 }
    ]
  }
];

export default function QuizPage() {
  const { t } = useLanguageStore();
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const translatedTopics = QUIZ_TOPICS.map((topic) => {
    const questions = topic.questions.map((q, qidx) => ({
      ...q,
      content: t(`quizPage.topics.${topic.id}.questions.${qidx}`)
    }));
    return {
      ...topic,
      title: t(`quizPage.topics.${topic.id}.title`),
      questions
    };
  });

  const handleAnswer = (qId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!selectedTopic) return;
    const questions = selectedTopic.questions;

    if (Object.keys(answers).length < questions.length) {
      toast.error(t('quizPage.toastWarning'));
      return;
    }

    let correct = 0;
    questions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setShowResult(true);
    toast.success(`${t('quizPage.toastSuccess')}${correct}/${questions.length}`);

    // Persist stats in localStorage
    if (typeof window !== 'undefined') {
      const today = new Date().toLocaleDateString();
      const prevStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      const updated = {
        ...prevStats,
        quizHistory: [...(prevStats.quizHistory || []), { date: today, score: correct, total: questions.length, topic: selectedTopic.title }],
      };
      localStorage.setItem('userStats', JSON.stringify(updated));
      window.dispatchEvent(new Event('quizCompleted'));
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setShowResult(false);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <div className="space-y-8 py-4">
        {!selectedTopic ? (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                {t('quizPage.title')}
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                {t('quizPage.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translatedTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectTopic(topic)}
                  className={`card-glass p-6 border bg-gradient-to-b ${topic.color} cursor-pointer hover:scale-[1.03] transition-all`}
                >
                  <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                    <p className="text-sm text-slate-400">{topic.questions.length} {t('quizPage.questionsCountMcq')}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <button
              onClick={() => {
                setSelectedTopic(null);
                resetQuiz();
              }}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" /> {t('quizPage.backBtn')}
            </button>

            <div className="text-center card-glass p-6">
              <h2 className="text-2xl font-bold">{selectedTopic.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{selectedTopic.questions.length} {t('quizPage.questionsCount')}</p>
            </div>

            {showResult ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card-glass p-8 text-center space-y-6"
              >
                <div>
                  <div className="text-7xl font-extrabold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {score}/{selectedTopic.questions.length}
                  </div>
                  <p className="text-xl font-bold text-slate-300 mt-3">
                    {score === selectedTopic.questions.length
                      ? t('quizPage.resultPerfect')
                      : score! >= selectedTopic.questions.length * 0.7
                        ? t('quizPage.resultGood')
                        : t('quizPage.resultRetry')}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
                >
                  {t('quizPage.retakeBtn')}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {selectedTopic.questions.map((q: any, i: number) => (
                  <div key={q.id} className="card-glass p-6 space-y-4 border-slate-800">
                    <p className="font-bold text-white">
                      {t('quizPage.questionLabel')} {i + 1}: {q.content}
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
                  disabled={Object.keys(answers).length < selectedTopic.questions.length}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-extrabold rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('quizPage.submitBtn')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  function handleSelectTopic(topic: any) {
    setSelectedTopic(topic);
  }
}

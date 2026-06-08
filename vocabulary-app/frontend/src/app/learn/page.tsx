'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookOpen } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { ArrowLeft } from 'lucide-react';

const GRAMMAR_TOPICS = [
  {
    id: 'tense1',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    structure: 'S + V(s/es)',
    examples: [
      { en: 'She plays tennis.', vi: 'Cô ấy chơi quần vợt.' },
      { en: 'Water boils at 100°C.', vi: 'Nước sôi ở 100°C.' }
    ],
    usageCount: 3
  },
  {
    id: 'tense2',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    structure: 'S + am/is/are + V-ing',
    examples: [
      { en: 'They are watching TV.', vi: 'Họ đang xem TV.' },
      { en: 'I am learning English.', vi: 'Tôi đang học tiếng Anh.' }
    ],
    usageCount: 3
  },
  {
    id: 'tense3',
    color: 'from-green-500/20 to-lime-500/20 border-green-500/30',
    structure: 'S + have/has + V3/ed',
    examples: [
      { en: 'I have finished my homework.', vi: 'Tôi đã làm xong bài tập.' },
      { en: 'She has lived here since 2012.', vi: 'Cô ấy đã sống ở đây từ 2012.' }
    ],
    usageCount: 3
  },
  {
    id: 'passive',
    color: 'from-indigo-500/20 to-blue-600/20 border-indigo-500/30',
    structure: 'S + to be + V3/ed (+ by O)',
    examples: [
      { en: 'The cake was eaten.', vi: 'Bánh đã bị ăn.' },
      { en: 'English is spoken all over the world.', vi: 'Tiếng Anh được nói trên toàn thế giới.' }
    ],
    usageCount: 2
  }
];

export default function LearnPage() {
  const { t } = useLanguageStore();
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);

  const translatedTopics = GRAMMAR_TOPICS.map((topic) => {
    const usage = [];
    for (let i = 0; i < topic.usageCount; i++) {
      usage.push(t(`learnPage.topics.${topic.id}.usage.${i}`));
    }
    return {
      ...topic,
      title: t(`learnPage.topics.${topic.id}.title`),
      theory: t(`learnPage.topics.${topic.id}.theory`),
      usage,
    };
  });

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic);
    if (typeof window !== 'undefined') {
      localStorage.setItem('latestLearnedTopic', JSON.stringify({ topic: topic.title }));
      window.dispatchEvent(new Event('topicLearned'));
    }
    toast.info(`${t('learnPage.toastStart')}${topic.title}`);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <div className="space-y-8 py-4">
        {!selectedTopic ? (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {t('learnPage.title')}
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                {t('learnPage.desc')}
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
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                    <p className="text-xs text-slate-400">
                      {t('learnPage.theory')} • {t('learnPage.structure').replace(':', '')} • {t('learnPage.examples').replace('3. ', '')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" /> {t('learnPage.backBtn')}
            </button>

            <div className="card-glass p-8 space-y-6 border border-slate-800">
              <h2 className="text-3xl font-extrabold text-white pb-4 border-b border-slate-800">
                {selectedTopic.title}
              </h2>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-blue-400">{t('learnPage.theory')}</h3>
                <p className="text-slate-300 leading-relaxed">{selectedTopic.theory}</p>
              </div>

              {selectedTopic.structure && (
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-400 mb-1">{t('learnPage.structure')}</h4>
                  <code className="text-lg font-mono text-blue-300">{selectedTopic.structure}</code>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-green-400">{t('learnPage.usage')}</h3>
                <ul className="space-y-2">
                  {selectedTopic.usage.map((use: string, i: number) => (
                    <li key={i} className="text-slate-300 flex items-start text-sm">
                      <span className="text-green-400 mr-2">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-purple-400">{t('learnPage.examples')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTopic.examples.map((ex: any, i: number) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
                      <p className="font-semibold text-purple-300">{ex.en}</p>
                      <p className="text-xs text-slate-400 italic">{ex.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

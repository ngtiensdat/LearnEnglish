'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft, BookOpen, Volume2, CheckCircle2 } from 'lucide-react';

export default function RoomVocabPage() {
  const params = useParams();
  const roomId = (params?.roomId as string) || '';
  const { token } = useAuthStore();
  const router = useRouter();

  const [vocabList, setVocabList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchVocab = async () => {
      try {
        const res = await apiClient.get(`/vocab/room/${roomId}`);
        setVocabList(res.data || []);
      } catch (err: any) {
        console.error(err);
        toast.error('Không thể tải từ vựng của phòng học này');
      } finally {
        setLoading(false);
      }
    };

    fetchVocab();
  }, [roomId, token, router]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all cards!
      toast.success('🎉 Chúc mừng bạn đã hoàn thành học tất cả từ vựng!');
      logProgress();
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const logProgress = async () => {
    try {
      await apiClient.post('/stats/history', {
        action: 'Đã hoàn thành học từ vựng',
        roomId,
        details: `Học xong ${vocabList.length} từ vựng`,
      });
      // Save local stats to trigger event updates
      if (typeof window !== 'undefined') {
        const today = new Date().toLocaleDateString();
        const prevStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        const updated = {
          ...prevStats,
          learnHistory: [...(prevStats.learnHistory || []), { date: today, topic: `Phòng ${roomId}` }],
        };
        localStorage.setItem('userStats', JSON.stringify(updated));
        window.dispatchEvent(new Event('topicLearned'));
      }
    } catch (error) {
      console.error('Lỗi khi lưu lịch sử:', error);
    }
  };

  const handleTTS = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Đang tải từ vựng...</div>;
  }

  if (vocabList.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <BookOpen className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Chưa Có Từ Vựng</h2>
        <p className="text-slate-400">Phòng học này hiện chưa được thêm từ vựng nào.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="btn-primary"
        >
          Quay lại Dashboard
        </button>
      </div>
    );
  }

  const currentVocab = vocabList[currentIndex];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại Dashboard
        </button>

        <div className="text-center">
          <span className="text-sm font-semibold text-blue-400">
            Từ {currentIndex + 1} / {vocabList.length}
          </span>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden border border-slate-700">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / vocabList.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard Component */}
        <div className="perspective-[1000px] h-[350px] w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            className={`w-full h-full relative duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden card-glass p-8 flex flex-col justify-between items-center text-center">
              <span className="text-xs font-semibold text-slate-500 tracking-wider">TIẾNG ANH (CLICK ĐỂ LẬT)</span>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">{currentVocab.word}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTTS(currentVocab.word);
                  }}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-blue-400 mx-auto block transition"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <span className="text-xs text-slate-400 italic">Click vào thẻ để xem nghĩa</span>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 card-glass p-8 flex flex-col justify-between items-center text-center bg-gradient-to-br from-blue-950/40 to-slate-900/40">
              <span className="text-xs font-semibold text-blue-400 tracking-wider">ĐÁP ÁN (TIẾNG VIỆT)</span>

              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-green-400">{currentVocab.meaning}</h3>
                {currentVocab.example && (
                  <div className="p-3 bg-slate-950/60 rounded-xl max-w-md border border-slate-800/80">
                    <p className="text-xs text-slate-400">Ví dụ:</p>
                    <p className="text-sm text-slate-200 mt-1 italic">{currentVocab.example}</p>
                  </div>
                )}
              </div>

              <span className="text-xs text-slate-400 italic">Click để xem lại từ tiếng Anh</span>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 disabled:opacity-30 disabled:pointer-events-none"
          >
            Từ Trước Đó
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20"
          >
            {currentIndex === vocabList.length - 1 ? 'Hoàn thành' : 'Từ tiếp theo'}
          </button>
        </div>
      </div>
    </>
  );
}

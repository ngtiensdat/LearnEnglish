import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// DỮ LIỆU MẪU BAN ĐẦU (LƯU TRONG localStorage)
const INITIAL_STATS = {
  user1: {
    name: 'Nguyễn Văn A',
    avatar: 'N',
    progress: 0,
    lastLearned: null,
    quizHistory: [],
    learnHistory: [],
    dailyProgress: [0, 0, 0, 0, 0, 0, 0]
  }
};

function Stats() {
  const { token, userId } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  // === 1. LẤY TÊN NGƯỜI DÙNG TỪ API /auth/me ===
  // === SỬA useEffect GỌI API /auth/me ===
useEffect(() => {
  const fetchUser = async () => {
    if (!token) {
      setUserName('User');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:3010/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserName(res.data.username || 'User');
    } catch (error) {
      console.error('Lỗi API /auth/me:', error.response?.data || error.message);
      setUserName('User'); // DÙ LỖI VẪN HIỂN THỊ
      // toast.error('Không thể lấy thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [token]); // Chỉ chạy khi token thay đổi

  // === 2. LẤY STATS TỪ localStorage DỰA TRÊN userId ===
  useEffect(() => {
    if (!userId) return;

    const saved = localStorage.getItem('userStats');
    const allStats = saved ? JSON.parse(saved) : {};

    // Dùng userId làm key
    const userStats = allStats[userId] || {
      ...INITIAL_STATS.user1,
      name: userName,
      avatar: userName.charAt(0).toUpperCase()
    };

    setStats(userStats);
  }, [userId, userName]);

  // === 3. CẬP NHẬT ĐIỂM TỪ QUIZ & LEARN ===
  useEffect(() => {
    const updateFromQuiz = () => {
      const quizResult = localStorage.getItem('latestQuizResult');
      if (quizResult) {
        const { score, total, topic } = JSON.parse(quizResult);
        updateStats(score, total, 'quiz', topic);
        localStorage.removeItem('latestQuizResult');
      }
    };

    const updateFromLearn = () => {
      const learned = localStorage.getItem('latestLearnedTopic');
      if (learned) {
        const { topic } = JSON.parse(learned);
        updateStats(null, null, 'learn', topic);
        localStorage.removeItem('latestLearnedTopic');
      }
    };

    updateFromQuiz();
    updateFromLearn();

    window.addEventListener('quizCompleted', updateFromQuiz);
    window.addEventListener('topicLearned', updateFromLearn);

    return () => {
      window.removeEventListener('quizCompleted', updateFromQuiz);
      window.removeEventListener('topicLearned', updateFromLearn);
    };
  }, [userId]);

  // === 4. HÀM CẬP NHẬT STATS ===
  const updateStats = (score, total, type, topic) => {
    if (!userId) return;

    setStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      const progressIncrease = type === 'quiz'
        ? Math.round((score / total) * 20)
        : 10;
      const newProgress = Math.min(100, prev.progress + progressIncrease);

      const updated = {
        ...prev,
        progress: newProgress,
        lastLearned: today,
        name: userName,
        avatar: userName.charAt(0).toUpperCase()
      };

      if (type === 'quiz') {
        updated.quizHistory = [...(prev.quizHistory || []), { date: today, score, total, topic }];
      } else {
        updated.learnHistory = [...(prev.learnHistory || []), { date: today, topic }];
      }

      const dayIndex = new Date().getDay();
      updated.dailyProgress = [...prev.dailyProgress];
      updated.dailyProgress[dayIndex] = newProgress;

      // LƯU VÀO localStorage DỰA TRÊN userId
      const allStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      allStats[userId] = updated;
      localStorage.setItem('userStats', JSON.stringify(allStats));

      toast.success(
        type === 'quiz'
          ? `Quiz: ${score}/${total} → +${progressIncrease}%`
          : `Học xong "${topic}" → +10%`
      );

      return updated;
    });
  };

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  const chartData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [{
      label: 'Tiến độ học (%)',
      data: stats.dailyProgress,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* HEADER - HIỂN THỊ TÊN + TIẾN ĐỘ */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {stats.avatar}
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-800">{userName}</h1>
                <p className="text-lg text-emerald-600 font-semibold">Tiến độ: {stats.progress}%</p>
              </div>
            </div>
            {stats.lastLearned && (
              <p className="text-gray-600">Lần học cuối: {new Date(stats.lastLearned).toLocaleDateString('vi-VN')}</p>
            )}
          </div>

          {/* BIỂU ĐỒ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tiến Độ 7 Ngày</h2>
            <div className="h-64">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>

          {/* LỊCH SỬ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Lịch Sử Quiz</h3>
              {stats.quizHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chưa làm quiz nào</p>
              ) : (
                <div className="space-y-3">
                  {stats.quizHistory.slice(-5).reverse().map((q, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{q.topic}</p>
                        <p className="text-sm text-gray-600">{new Date(q.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <span className="font-bold text-indigo-600">{q.score}/{q.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4">Chủ Đề Đã Học</h3>
              {stats.learnHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chưa học chủ đề nào</p>
              ) : (
                <div className="space-y-3">
                  {stats.learnHistory.slice(-5).reverse().map((l, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-semibold">{l.topic}</span>
                      <span className="text-sm text-gray-600">{new Date(l.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* DEV RESET */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  localStorage.removeItem('userStats');
                  window.location.reload();
                }}
                className="text-red-600 hover:underline"
              >
                Reset dữ liệu (DEV)
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Stats;
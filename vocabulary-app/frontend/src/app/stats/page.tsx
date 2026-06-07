'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Award, BarChart2, BookOpen, Clock, RefreshCw } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const INITIAL_STATS = {
  name: 'User',
  avatar: 'U',
  progress: 0,
  lastLearned: null,
  quizHistory: [] as any[],
  learnHistory: [] as any[],
  dailyProgress: [0, 0, 0, 0, 0, 0, 0] as number[],
};

export default function StatsPage() {
  const { token, userId } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // FETCH USER INFO
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await apiClient.get('/auth/me');
        setUserName(res.data.username || 'User');
      } catch (error) {
        console.error('Lỗi lấy user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // LOAD STATS
  useEffect(() => {
    if (!userId) return;

    const saved = localStorage.getItem('userStats');
    const allStats = saved ? JSON.parse(saved) : {};
    
    // Resolve user specific stats
    const userStats = allStats[userId] || {
      ...INITIAL_STATS,
      name: userName,
      avatar: userName.charAt(0).toUpperCase(),
    };

    setStats(userStats);
  }, [userId, userName]);

  // LISTEN FOR UPDATES FROM OTHER COMPONENT SUBMISSIONS
  useEffect(() => {
    const handleUpdate = () => {
      if (!userId) return;
      const saved = localStorage.getItem('userStats');
      const allStats = saved ? JSON.parse(saved) : {};
      if (allStats[userId]) {
        setStats(allStats[userId]);
      }
    };

    window.addEventListener('quizCompleted', handleUpdate);
    window.addEventListener('topicLearned', handleUpdate);

    return () => {
      window.removeEventListener('quizCompleted', handleUpdate);
      window.removeEventListener('topicLearned', handleUpdate);
    };
  }, [userId]);

  const handleResetDev = () => {
    if (window.confirm('Bạn muốn reset lại toàn bộ dữ liệu học tập trên máy này?')) {
      localStorage.removeItem('userStats');
      window.location.reload();
    }
  };

  if (loading || !stats) {
    return <div className="p-8 text-center text-slate-400">Đang tải biểu đồ và tiến trình...</div>;
  }

  const chartData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Tiến độ học tập (%)',
        data: stats.dailyProgress || [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#94a3b8' },
      },
    },
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <div className="space-y-8 py-4">
        {/* Header summary */}
        <div className="card-glass p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {stats.avatar || userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{userName}</h1>
              <p className="text-slate-400 text-sm mt-1">Học sinh tích cực</p>
            </div>
          </div>

          <div className="flex items-center gap-12 text-center">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tiến Độ Tổng</p>
              <p className="text-3xl font-extrabold text-green-400 mt-1">{stats.progress || 0}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Học Lần Cuối</p>
              <p className="text-lg font-bold text-slate-200 mt-2">
                {stats.lastLearned ? new Date(stats.lastLearned).toLocaleDateString('vi-VN') : 'Chưa học'}
              </p>
            </div>
          </div>
        </div>

        {/* 7 Day Line Chart */}
        <div className="card-glass p-6 border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            Biểu Đồ Tiến Độ 7 Ngày
          </h2>
          <div className="h-64 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Histories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quiz log */}
          <div className="card-glass p-6 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Lịch Sử Bài Làm Quiz
            </h3>
            {(!stats.quizHistory || stats.quizHistory.length === 0) ? (
              <p className="text-sm text-slate-500 py-6 text-center">Chưa làm bài quiz nào</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {stats.quizHistory.slice(-5).reverse().map((q: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-slate-200">{q.topic}</p>
                      <p className="text-xs text-slate-500 mt-1">{new Date(q.date).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className="font-bold text-blue-400">{q.score}/{q.total}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Learn topic log */}
          <div className="card-glass p-6 border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Chủ Đề Đã Học
            </h3>
            {(!stats.learnHistory || stats.learnHistory.length === 0) ? (
              <p className="text-sm text-slate-500 py-6 text-center">Chưa học chủ đề nào</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {stats.learnHistory.slice(-5).reverse().map((l: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-200">{l.topic}</span>
                    <span className="text-xs text-slate-500">{new Date(l.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DEV reset helper */}
        <div className="text-center pt-8">
          <button
            onClick={handleResetDev}
            className="inline-flex items-center text-xs text-red-500 hover:text-red-400 hover:underline gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Dữ Liệu Luyện Tập
          </button>
        </div>
      </div>
    </>
  );
}

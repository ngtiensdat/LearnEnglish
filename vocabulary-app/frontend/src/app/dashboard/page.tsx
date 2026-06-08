'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import {
  BookOpen,
  FolderPlus,
  Plus,
  Trash2,
  UploadCloud,
  Users,
  Search,
  Flame,
  Calendar,
  CheckCircle2,
  BarChart2,
  Brain,
  Sparkles,
  Trophy,
  ChevronRight,
  AlertCircle,
  Settings
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { token, role } = useAuthStore();
  const { t, language, setLanguage } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'quizzes' | 'stats' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchDashboardStats = async () => {
    if (!token) return;
    setLoadingStats(true);
    try {
      const res = await apiClient.get('/stats/dashboard');
      setDashboardStats(res.data || null);
    } catch (error) {
      console.error('Fetch dashboard stats error:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
    }
  }, [token]);
  
  // Existing states
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [showScore, setShowScore] = useState(true);
  const [vocab, setVocab] = useState({ word: '', meaning: '', example: '', roomId: '' });
  const [quizQuestions, setQuizQuestions] = useState<any[]>([
    { content: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);
  const [vocabList, setVocabList] = useState<any[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // === FETCH ROOMS ===
  const fetchRooms = async () => {
    if (!token) return;
    try {
      const res = await apiClient.get('/rooms');
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (error: any) {
      console.error('Fetch rooms error:', error);
      toast.error(error?.message || (language === 'vi' ? 'Không thể tải danh sách phòng' : 'Unable to load rooms'));
      setRooms([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, [token]);

  // === TẠO PHÒNG ===
  const createRoom = async () => {
    if (!roomName.trim()) return toast.error(language === 'vi' ? 'Tên phòng không được để trống' : 'Room name cannot be empty');
    try {
      await apiClient.post('/rooms', { name: roomName, password: roomPassword, showScore });
      toast.success(t('dashboard.createSuccess'));
      setRoomName('');
      setRoomPassword('');
      setShowScore(true);
      fetchRooms();
    } catch (error: any) {
      toast.error(t('dashboard.createFailed') + (error?.message || ''));
    }
  };

  // === THAM GIA PHÒNG ===
  const joinRoom = async () => {
    if (!roomName.trim()) return toast.error(language === 'vi' ? 'Tên phòng không được để trống' : 'Room name cannot be empty');
    try {
      const res = await apiClient.post('/learning/join', { name: roomName, password: roomPassword });
      setRoomName('');
      setRoomPassword('');
      toast.success(t('dashboard.joinSuccess'));
      router.push(`/learn/${res.data.room.id}`);
    } catch (error: any) {
      toast.error(error?.message || t('dashboard.joinFailed'));
    }
  };

  // === THÊM TỪ VỰNG ===
  const addVocab = async () => {
    if (!vocab.word.trim() || !vocab.meaning.trim() || !vocab.roomId.trim()) {
      return toast.error(language === 'vi' ? 'Vui lòng điền đầy đủ từ, nghĩa và ID phòng' : 'Please fill in word, meaning, and room ID');
    }
    try {
      await apiClient.post('/vocab', vocab);
      setVocab({ word: '', meaning: '', example: '', roomId: '' });
      toast.success(t('dashboard.addVocabSuccess'));
      if (selectedRoomId === vocab.roomId) {
        fetchVocabList(vocab.roomId);
      }
    } catch (error: any) {
      toast.error(t('dashboard.addVocabFailed') + (error?.message || ''));
    }
  };

  // === UPLOAD EXCEL FILE ===
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !vocab.roomId.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng chọn file và nhập ID phòng' : 'Please select a file and enter room ID');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
          header: ['word', 'meaning', 'example'],
          range: 1,
        });
        
        let count = 0;
        for (const row of rows) {
          if (row.word && row.meaning) {
            await apiClient.post('/vocab', {
              word: String(row.word),
              meaning: String(row.meaning),
              example: row.example ? String(row.example) : '',
              roomId: vocab.roomId,
            });
            count++;
          }
        }
        toast.success(t('dashboard.uploadSuccessCount').replace('{count}', String(count)));
        if (selectedRoomId === vocab.roomId) {
          fetchVocabList(vocab.roomId);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(t('dashboard.uploadFailed') + (error?.message || error));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // === THÊM CÂU HỎI QUIZ ===
  const addQuizQuestions = async () => {
    if (!selectedRoomId) return toast.error(t('dashboard.roomRequired'));
    for (const q of quizQuestions) {
      if (!q.content.trim() || q.options.some((opt: string) => !opt.trim())) {
        return toast.error(t('dashboard.optError'));
      }
    }
    try {
      await apiClient.post(`/rooms/${selectedRoomId}/questions`, { questions: quizQuestions });
      setQuizQuestions([{ content: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      toast.success(t('dashboard.saveQuizSuccess'));
    } catch (error: any) {
      toast.error(error?.message || t('dashboard.saveQuizFailed'));
    }
  };

  const addNewQuestion = () =>
    setQuizQuestions([...quizQuestions, { content: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const updateQuestion = (index: number, field: string, value: any, optIndex: number | null = null) => {
    const newQ = [...quizQuestions];
    if (field === 'options' && optIndex !== null) {
      newQ[index].options[optIndex] = value;
    } else if (field === 'correctAnswer') {
      newQ[index][field] = parseInt(value);
    } else {
      newQ[index][field] = value;
    }
    setQuizQuestions(newQ);
  };

  const removeQuestion = (index: number) => {
    if (quizQuestions.length === 1) return toast.error(t('dashboard.minOneQuestion'));
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  // === XÓA PHÒNG ===
  const deleteRoom = async (id: string) => {
    if (!window.confirm(t('dashboard.deleteConfirmText'))) return;
    try {
      await apiClient.delete(`/rooms/${id}`);
      toast.success(t('dashboard.deleteSuccess'));
      fetchRooms();
    } catch (error: any) {
      toast.error(error?.message || t('dashboard.deleteFailed'));
    }
  };

  // === XÓA TỪ VỰNG ===
  const deleteVocab = async (vocabId: string) => {
    try {
      await apiClient.delete(`/vocab/${vocabId}`);
      setVocabList((prev) => prev.filter((v) => v.id !== vocabId));
      toast.success(t('dashboard.deleteVocabSuccess'));
    } catch (error: any) {
      toast.error(t('dashboard.deleteVocabFailed'));
    }
  };

  // === LẤY DANH SÁCH TỪ VỰNG ===
  const fetchVocabList = async (roomId: string) => {
    try {
      const res = await apiClient.get(`/vocab/room/${roomId}`);
      setVocabList(res.data || []);
    } catch (error: any) {
      toast.error(t('dashboard.loadVocabFailed'));
    }
  };

  // Chart data configs
  const progressData = {
    labels: dashboardStats?.scoreProgress
      ? dashboardStats.scoreProgress.map((item: any) => item.label)
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'TOEIC Estimated Score',
        data: dashboardStats?.scoreProgress
          ? dashboardStats.scoreProgress.map((item: any) => item.score)
          : [500, 520, 580, 610, 650, 710, 750],
        fill: false,
        borderColor: '#2563eb', // Blue-600
        backgroundColor: '#2563eb',
        tension: 0.3,
      },
    ],
  };

  const studyTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Time (mins)',
        data: dashboardStats?.weeklyStudyTime
          ? dashboardStats.weeklyStudyTime
          : [40, 60, 30, 90, 45, 120, 50],
        backgroundColor: '#3b82f6', // Blue-500
        borderRadius: 6,
      },
    ],
  };

  const progressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 400,
        max: 990,
        grid: { color: '#f1f5f9' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const studyTimeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        grid: { color: '#f1f5f9' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  if (!token) {
    return <div className="p-8 text-center text-slate-400 bg-white min-h-[80vh]">Loading redirection...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Main SaaS Dashboard Container */}
      <div className="bg-white text-slate-800 rounded-2xl min-h-[85vh] shadow-sm border border-slate-200/80 overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <span className="font-bold text-lg text-slate-800 tracking-tight">{t('dashboard.title')}</span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'overview'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>{t('dashboard.overview')}</span>
              </button>

              <button
                onClick={() => setActiveTab('rooms')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'rooms'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t('dashboard.rooms')}</span>
              </button>

              <button
                onClick={() => setActiveTab('quizzes')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'quizzes'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>{t('dashboard.quizzes')}</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'stats'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>{t('dashboard.performance')}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{t('navbar.settings')}</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {role ? role[0].toUpperCase() : 'S'}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 capitalize">{role || 'Student'}</p>
                <p className="text-[10px] text-slate-400">Premium Account</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <div className="flex-1 flex flex-col">
          
          {/* TOP HEADER / SEARCH BAR */}
          <header className="h-16 border-b border-slate-200 px-6 md:px-8 flex justify-between items-center bg-white">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('dashboard.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold text-slate-600">{t('dashboard.needHelp')}</span>
              <span className="text-xs text-slate-300">|</span>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('dashboard.level')}</span>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-6 md:p-8 bg-slate-50/50 overflow-y-auto space-y-6">
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 1. LEARNING PROGRESS OVERVIEW */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Score Progress Chart */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-800">{t('dashboard.scoreProgress')}</h3>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{t('dashboard.targetText')}</span>
                      </div>
                      <div className="h-48 relative">
                        <Line data={progressData} options={progressOptions} />
                      </div>
                    </div>
                  </div>

                  {/* Daily Streak, Weekly Study Time, and Completed Lessons */}
                  <div className="space-y-6">
                    {/* Streak & Time summary cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between items-center text-center">
                        <Flame className="w-8 h-8 text-amber-500 fill-amber-500 mb-2" />
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                            {dashboardStats ? `${dashboardStats.streak} ${t('dashboard.streakDays')}` : `12 ${t('dashboard.streakDays')}`}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.streak')}</p>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between items-center text-center">
                        <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                            {dashboardStats 
                              ? `${(dashboardStats.weeklyStudyTime.reduce((a: number, b: number) => a + b, 0) / 60).toFixed(1)} ${t('dashboard.studyHrs')}` 
                              : `4.5 ${t('dashboard.studyHrs')}`}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.weeklyStudy')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lessons completed progress */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-800">{t('dashboard.completedLessons')}</span>
                        <span className="text-xs font-bold text-slate-500">
                          {dashboardStats ? `${dashboardStats.completedLessons} / ${dashboardStats.totalLessons}` : '24 / 40'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ 
                            width: dashboardStats 
                              ? `${(dashboardStats.completedLessons / dashboardStats.totalLessons) * 100}%` 
                              : '60%' 
                          }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">
                        {dashboardStats 
                          ? `${Math.round((dashboardStats.completedLessons / dashboardStats.totalLessons) * 100)}% ${t('dashboard.curriculumComplete')}` 
                          : `60% ${t('dashboard.curriculumComplete')}`}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Grid for Recommended Lessons, Mock Tests, Flashcards & Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column (2/3 width on large screens): Lessons & Mock Tests */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* 2. RECOMMENDED LESSONS */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">{t('dashboard.recommended')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between group hover:border-blue-500 transition duration-200 cursor-pointer">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Vocabulary</span>
                            <h4 className="text-xs font-bold text-slate-800 mt-1">TOEIC Essential 600 Words</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Core corporate vocabulary</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition duration-200 mt-1" />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between group hover:border-blue-500 transition duration-200 cursor-pointer">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Grammar</span>
                            <h4 className="text-xs font-bold text-slate-800 mt-1">Gerunds vs Infinitives</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Part 5 specific structures</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 transition duration-200 mt-1" />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between group hover:border-blue-500 transition duration-200 cursor-pointer">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Reading</span>
                            <h4 className="text-xs font-bold text-slate-800 mt-1">Part 5: Incomplete Sentences</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Grammar & vocabulary context</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition duration-200 mt-1" />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between group hover:border-blue-500 transition duration-200 cursor-pointer">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Listening</span>
                            <h4 className="text-xs font-bold text-slate-800 mt-1">Part 1: Photo Description Tips</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Analyzing details & distractors</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition duration-200 mt-1" />
                        </div>

                      </div>
                    </section>

                    {/* 3. UPCOMING MOCK TESTS */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">{t('dashboard.upcomingTests')}</h3>
                      <div className="space-y-3">
                        
                        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">TOEIC Full Mock Test #12</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">Est. Duration: 120 mins | Date: June 15, 2026</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">Medium</span>
                        </div>

                        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-lg bg-red-100 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">TOEIC Reading Mock Test #5</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">Est. Duration: 75 mins | Date: June 18, 2026</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">Hard</span>
                        </div>

                      </div>
                    </section>

                  </div>

                  {/* Right Column (1/3 width on large screens): Flashcards & Analytics */}
                  <div className="space-y-6">
                    
                    {/* 4. VOCABULARY FLASHCARDS */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800">{t('dashboard.flashcards')}</h3>
                        <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">{t('dashboard.reviewLink')} (15)</span>
                      </div>
                      <div className="space-y-2">
                        {dashboardStats?.flashcards && dashboardStats.flashcards.length > 0 ? (
                          dashboardStats.flashcards.map((item: any, i: number) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                              <div>
                                <p className="font-bold text-slate-800">{item.word}</p>
                                <p className="text-[10px] text-slate-400">{item.meaning}</p>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                item.nextReviewDays === 'Today' ? 'text-green-600 bg-green-50' : 'text-slate-500 bg-slate-100'
                              }`}>
                                {item.nextReviewDays}
                              </span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                              <div>
                                <p className="font-bold text-slate-800">Acquisition</p>
                                <p className="text-[10px] text-slate-400">Sự giành được, mua lại</p>
                              </div>
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">2 days</span>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                              <div>
                                <p className="font-bold text-slate-800">Collaboration</p>
                                <p className="text-[10px] text-slate-400">Sự hợp tác</p>
                              </div>
                              <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Today</span>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                              <div>
                                <p className="font-bold text-slate-800">Mandatory</p>
                                <p className="text-[10px] text-slate-400">Bắt buộc</p>
                              </div>
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">5 days</span>
                            </div>
                          </>
                        )}
                      </div>
                    </section>

                    {/* 5. PERFORMANCE ANALYTICS */}
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-slate-800">{t('dashboard.performanceAnalytics')}</h3>
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-xs text-slate-500">{t('dashboard.accuracy')}</span>
                        <span className="text-sm font-bold text-blue-600">
                          {dashboardStats ? `${dashboardStats.analytics.accuracy}%` : '78%'}
                        </span>
                      </div>

                      <div className="space-y-3 pt-1">
                        <div>
                          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{t('dashboard.strongSkills')}</p>
                          <ul className="text-xs text-slate-600 space-y-1 mt-1">
                            {(dashboardStats?.analytics?.strongSkills || [
                              'Part 5: Incomplete Sentences',
                              'Part 1: Photograph Descriptions'
                            ]).map((skill: string, i: number) => (
                              <li key={i} className="flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{t('dashboard.weakSkills')}</p>
                          <ul className="text-xs text-slate-600 space-y-1 mt-1">
                            {(dashboardStats?.analytics?.weakSkills || [
                              'Part 7: Reading Comprehension',
                              'Part 3: Listening Conversations'
                            ]).map((skill: string, i: number) => (
                              <li key={i} className="flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                  </div>

                </div>

              </div>
            )}

            {/* TAB: ROOMS & CLASSES */}
            {activeTab === 'rooms' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Action Columns based on User Role */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                        <FolderPlus className="w-4 h-4" />
                        {role === 'student' ? t('dashboard.roomsTab.joinTitle') : t('dashboard.roomsTab.createTitle')}
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder={t('dashboard.roomsTab.roomName')}
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder={t('dashboard.roomsTab.roomPassword')}
                          value={roomPassword}
                          onChange={(e) => setRoomPassword(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {role !== 'student' && (
                          <label className="flex items-center text-xs text-slate-600 select-none cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showScore}
                              onChange={(e) => setShowScore(e.target.checked)}
                              className="mr-2 w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300"
                            />
                            {t('dashboard.roomsTab.displayScore')}
                          </label>
                        )}
                        <button
                          onClick={role === 'student' ? joinRoom : createRoom}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition"
                        >
                          {role === 'student' ? t('dashboard.roomsTab.submitJoin') : t('dashboard.roomsTab.submitCreate')}
                        </button>
                      </div>
                    </div>

                    {/* Manage / Add Vocab for Teachers and Admins */}
                    {(role === 'teacher' || role === 'admin') && (
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-green-600 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {t('dashboard.roomsTab.addWord')}
                        </h3>
                        <div className="space-y-2.5">
                          <input
                            type="text"
                            placeholder={t('dashboard.roomsTab.wordLabel')}
                            value={vocab.word}
                            onChange={(e) => setVocab({ ...vocab, word: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder={t('dashboard.roomsTab.meaningLabel')}
                            value={vocab.meaning}
                            onChange={(e) => setVocab({ ...vocab, meaning: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder={t('dashboard.roomsTab.exampleLabel')}
                            value={vocab.example}
                            onChange={(e) => setVocab({ ...vocab, example: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder={t('dashboard.roomsTab.targetRoom')}
                            value={vocab.roomId}
                            onChange={(e) => setVocab({ ...vocab, roomId: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addVocab}
                            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs transition"
                          >
                            {t('dashboard.roomsTab.submitAddWord')}
                          </button>
                          
                          <div className="pt-2.5 border-t border-slate-100 space-y-2">
                            <span className="text-[10px] text-slate-400 block">{t('dashboard.roomsTab.orUploadExcel')}</span>
                            <label className="flex items-center justify-center border border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-2.5 cursor-pointer transition text-slate-500 hover:text-blue-600">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              <span className="text-[10px] font-semibold">{t('dashboard.roomsTab.uploadSpreadsheet')}</span>
                              <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* List of active classrooms */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {t('dashboard.availableClassrooms')}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rooms.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-xs col-span-2">{t('dashboard.noClassroomsFound')}</div>
                        ) : (
                          rooms.map((room) => (
                            <div
                              key={room.id}
                              className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500/40 transition flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-xs text-slate-800">{room.name}</h4>
                                  {(role === 'teacher' || role === 'admin') && (
                                    <button
                                      onClick={() => deleteRoom(room.id)}
                                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                                      title="Delete classroom"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                                <p className="text-[9px] text-slate-400 mt-1 font-mono">ID: {room.id}</p>
                              </div>
                              
                              <div className="mt-4 flex gap-2">
                                <button
                                  onClick={() => router.push(`/learn/${room.id}`)}
                                  className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold rounded-lg transition"
                                >
                                  {t('navbar.learn')}
                                </button>
                                <button
                                  onClick={() => router.push(`/quiz/${room.id}`)}
                                  className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-semibold rounded-lg transition"
                                >
                                  {t('navbar.quiz')}
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: PRACTICE & QUIZZES */}
            {activeTab === 'quizzes' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Check role to show question creator */}
                {role === 'teacher' || role === 'admin' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        {t('dashboard.quizzesTab.createMockQuestions')}
                      </h3>
                      <select
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
                      >
                        <option value="">{t('dashboard.quizzesTab.selectTargetRoom')}</option>
                        {rooms.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                      {quizQuestions.map((q, i) => (
                        <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative">
                          <input
                            placeholder={t('dashboard.quizzesTab.questionPlaceholder').replace('#{num}', String(i + 1))}
                            value={q.content}
                            onChange={(e) => updateQuestion(i, 'content', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt: string, j: number) => (
                              <input
                                key={j}
                                placeholder={t('dashboard.quizzesTab.optionPlaceholder').replace('{char}', String.fromCharCode(65 + j))}
                                value={opt}
                                onChange={(e) => updateQuestion(i, 'options', e.target.value, j)}
                                className="w-full p-2 bg-white border border-slate-100 rounded-lg text-xs text-slate-700"
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-semibold">{t('dashboard.quizzesTab.correctAnswerOption')}</span>
                            <select
                              value={q.correctAnswer}
                              onChange={(e) => updateQuestion(i, 'correctAnswer', e.target.value)}
                              className="bg-white border border-slate-200 text-xs rounded-lg p-2 text-slate-700"
                            >
                              {[0, 1, 2, 3].map((n) => (
                                <option key={n} value={n}>
                                  {String.fromCharCode(65 + n)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={() => removeQuestion(i)}
                            className="w-full py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-bold transition border border-red-100"
                          >
                            {t('dashboard.quizzesTab.removeQuestion')}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={addNewQuestion}
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                      >
                        {t('dashboard.quizzesTab.addQuestionBlock')}
                      </button>
                      <button
                        onClick={addQuizQuestions}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                      >
                        {t('dashboard.quizzesTab.saveQuestionsToDb')}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Student interface for Practice
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{t('dashboard.quizzesTab.historyTitle')}</h3>
                        <p className="text-xs text-slate-400 mt-1">{t('dashboard.quizzesTab.historyDesc')}</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('rooms')} 
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
                      >
                        {t('dashboard.quizzesTab.joinSession')}
                      </button>
                    </div>
                    
                    <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-3">
                      <Brain className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-700">{t('dashboard.quizzesTab.readyTitle')}</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">{t('dashboard.quizzesTab.readyDesc')}</p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB: STATS & ANALYTICS */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                
                {/* Analytics Detail Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Detailed Study Hours Chart */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-4">{t('dashboard.statsTab.allocationTitle')}</h3>
                      <div className="h-56 relative">
                        <Bar data={studyTimeData} options={studyTimeOptions} />
                      </div>
                    </div>
                  </div>

                  {/* Detail word bank management (For Admin/Teacher) or Details stats (Students) */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-800">{t('dashboard.statsTab.insightsTitle')}</h3>
                    
                    {role === 'admin' ? (
                      <div className="space-y-4">
                        <select
                          value={selectedRoomId}
                          onChange={(e) => {
                            setSelectedRoomId(e.target.value);
                            if (e.target.value) fetchVocabList(e.target.value);
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
                        >
                          <option value="">{t('dashboard.roomsTab.selectRoomToInspect')}</option>
                          {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>

                        {selectedRoomId && (
                          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                            {vocabList.length === 0 ? (
                              <p className="text-center py-6 text-slate-400 text-xs">{t('dashboard.roomsTab.noWords')}</p>
                            ) : (
                              vocabList.map((v) => (
                                <div
                                  key={v.id}
                                  className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center text-xs"
                                >
                                  <div>
                                    <span className="font-bold text-slate-800">{v.word}</span>
                                    <span className="text-slate-300 mx-2">|</span>
                                    <span className="text-slate-600">{v.meaning}</span>
                                  </div>
                                  <button
                                    onClick={() => deleteVocab(v.id)}
                                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Student detail stats
                      <div className="space-y-4 text-xs">
                        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                          <p className="font-bold text-blue-800 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            {t('dashboard.statsTab.nextGoal')}
                          </p>
                          <p className="text-[11px] text-slate-600">{t('dashboard.statsTab.activeLearnerDesc')}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">{t('dashboard.statsTab.memorized')}</span>
                            <span className="font-bold text-slate-800">`145 ${t('dashboard.statsTab.wordsText')}`</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">{t('dashboard.statsTab.mockTestsTaken')}</span>
                            <span className="font-bold text-slate-800">`4 ${t('dashboard.statsTab.testsText')}`</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">{t('dashboard.statsTab.avgRating')}</span>
                            <span className="font-bold text-slate-800">680 / 990</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 max-w-lg">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-slate-600" />
                    {t('settings.title')}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{t('settings.titleDesc')}</p>
                </div>
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{t('settings.language')}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t('settings.languageDesc')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLanguage('vi')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                          language === 'vi'
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t('settings.vietnamese')}
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                          language === 'en'
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t('settings.english')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </>
  );
}

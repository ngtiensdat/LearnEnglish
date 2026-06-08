'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';
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
  AlertCircle
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
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'quizzes' | 'stats'>('overview');
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
      toast.error(error?.message || 'Không thể tải danh sách phòng');
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
    if (!roomName.trim()) return toast.error('Tên phòng không được để trống');
    try {
      await apiClient.post('/rooms', { name: roomName, password: roomPassword, showScore });
      toast.success('Tạo phòng thành công');
      setRoomName('');
      setRoomPassword('');
      setShowScore(true);
      fetchRooms();
    } catch (error: any) {
      toast.error('Tạo phòng thất bại: ' + (error?.message || 'Lỗi'));
    }
  };

  // === THAM GIA PHÒNG ===
  const joinRoom = async () => {
    if (!roomName.trim()) return toast.error('Tên phòng không được để trống');
    try {
      const res = await apiClient.post('/learning/join', { name: roomName, password: roomPassword });
      setRoomName('');
      setRoomPassword('');
      toast.success('Tham gia thành công');
      router.push(`/learn/${res.data.room.id}`);
    } catch (error: any) {
      toast.error(error?.message || 'Tham gia thất bại');
    }
  };

  // === THÊM TỪ VỰNG ===
  const addVocab = async () => {
    if (!vocab.word.trim() || !vocab.meaning.trim() || !vocab.roomId.trim()) {
      return toast.error('Vui lòng điền đầy đủ từ, nghĩa và ID phòng');
    }
    try {
      await apiClient.post('/vocab', vocab);
      setVocab({ word: '', meaning: '', example: '', roomId: '' });
      toast.success('Thêm từ thành công');
      if (selectedRoomId === vocab.roomId) {
        fetchVocabList(vocab.roomId);
      }
    } catch (error: any) {
      toast.error('Thêm thất bại: ' + (error?.message || 'Lỗi'));
    }
  };

  // === UPLOAD EXCEL FILE ===
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !vocab.roomId.trim()) {
      toast.error('Vui lòng chọn file và nhập ID phòng');
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
        toast.success(`Đã tải lên thành công ${count} từ vựng`);
        if (selectedRoomId === vocab.roomId) {
          fetchVocabList(vocab.roomId);
        }
      } catch (error: any) {
        console.error(error);
        toast.error('Tải lên thất bại: ' + (error?.message || error));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // === THÊM CÂU HỎI QUIZ ===
  const addQuizQuestions = async () => {
    if (!selectedRoomId) return toast.error('Vui lòng chọn phòng');
    for (const q of quizQuestions) {
      if (!q.content.trim() || q.options.some((opt: string) => !opt.trim())) {
        return toast.error('Vui lòng điền đầy đủ câu hỏi và 4 đáp án');
      }
    }
    try {
      await apiClient.post(`/rooms/${selectedRoomId}/questions`, { questions: quizQuestions });
      setQuizQuestions([{ content: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      toast.success('Thêm câu hỏi thành công');
    } catch (error: any) {
      toast.error(error?.message || 'Thêm thất bại');
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
    if (quizQuestions.length === 1) return toast.error('Phải có ít nhất 1 câu hỏi');
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  // === XÓA PHÒNG ===
  const deleteRoom = async (id: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa phòng học này cùng toàn bộ câu hỏi liên quan?')) return;
    try {
      await apiClient.delete(`/rooms/${id}`);
      toast.success('Xóa phòng thành công');
      fetchRooms();
    } catch (error: any) {
      toast.error(error?.message || 'Xóa thất bại');
    }
  };

  // === XÓA TỪ VỰNG ===
  const deleteVocab = async (vocabId: string) => {
    try {
      await apiClient.delete(`/vocab/${vocabId}`);
      setVocabList((prev) => prev.filter((v) => v.id !== vocabId));
      toast.success('Xóa từ vựng thành công');
    } catch (error: any) {
      toast.error('Xóa thất bại');
    }
  };

  // === LẤY DANH SÁCH TỪ VỰNG ===
  const fetchVocabList = async (roomId: string) => {
    try {
      const res = await apiClient.get(`/vocab/room/${roomId}`);
      setVocabList(res.data || []);
    } catch (error: any) {
      toast.error('Không thể tải từ vựng');
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
              <span className="font-bold text-lg text-slate-800 tracking-tight">TOEIC Master</span>
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
                <span>Overview</span>
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
                <span>Vocabulary Rooms</span>
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
                <span>Practice & Quizzes</span>
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
                <span>Performance & Stats</span>
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
                placeholder="Search lessons, tests, vocabularies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold text-slate-600">Need help?</span>
              <span className="text-xs text-slate-300">|</span>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Level: Intermediate</span>
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
                        <h3 className="text-sm font-bold text-slate-800">TOEIC Score Progress</h3>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Target: 750+</span>
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
                            {dashboardStats ? `${dashboardStats.streak} Days` : '12 Days'}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Daily Streak</p>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between items-center text-center">
                        <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                            {dashboardStats 
                              ? `${(dashboardStats.weeklyStudyTime.reduce((a: number, b: number) => a + b, 0) / 60).toFixed(1)} Hrs` 
                              : '4.5 Hrs'}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Weekly Study</p>
                        </div>
                      </div>
                    </div>

                    {/* Lessons completed progress */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-800">Completed Lessons</span>
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
                          ? `${Math.round((dashboardStats.completedLessons / dashboardStats.totalLessons) * 100)}% of curriculum complete` 
                          : '60% of curriculum complete'}
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
                      <h3 className="text-sm font-bold text-slate-800">Recommended Lessons</h3>
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
                      <h3 className="text-sm font-bold text-slate-800">Upcoming Mock Tests</h3>
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
                        <h3 className="text-sm font-bold text-slate-800">Vocabulary Flashcards</h3>
                        <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">Review (15)</span>
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
                      <h3 className="text-sm font-bold text-slate-800">Performance Analytics</h3>
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-xs text-slate-500">Overall Accuracy</span>
                        <span className="text-sm font-bold text-blue-600">
                          {dashboardStats ? `${dashboardStats.analytics.accuracy}%` : '78%'}
                        </span>
                      </div>

                      <div className="space-y-3 pt-1">
                        <div>
                          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Strong Skills</p>
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
                          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Weak Skills</p>
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
                        {role === 'student' ? 'Join Vocabulary Room' : 'Create Vocabulary Room'}
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Room Name"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Room Password"
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
                            Display scores to students
                          </label>
                        )}
                        <button
                          onClick={role === 'student' ? joinRoom : createRoom}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition"
                        >
                          {role === 'student' ? 'Join Room' : 'Create Room'}
                        </button>
                      </div>
                    </div>

                    {/* Manage / Add Vocab for Teachers and Admins */}
                    {(role === 'teacher' || role === 'admin') && (
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-green-600 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Add Words to Room
                        </h3>
                        <div className="space-y-2.5">
                          <input
                            type="text"
                            placeholder="Word (English)"
                            value={vocab.word}
                            onChange={(e) => setVocab({ ...vocab, word: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Meaning (Vietnamese)"
                            value={vocab.meaning}
                            onChange={(e) => setVocab({ ...vocab, meaning: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Example Sentence (Optional)"
                            value={vocab.example}
                            onChange={(e) => setVocab({ ...vocab, example: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Target Room ID"
                            value={vocab.roomId}
                            onChange={(e) => setVocab({ ...vocab, roomId: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addVocab}
                            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs transition"
                          >
                            Add Word
                          </button>
                          
                          <div className="pt-2.5 border-t border-slate-100 space-y-2">
                            <span className="text-[10px] text-slate-400 block">Or upload vocabulary Excel file (.xlsx)</span>
                            <label className="flex items-center justify-center border border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-2.5 cursor-pointer transition text-slate-500 hover:text-blue-600">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              <span className="text-[10px] font-semibold">Upload spreadsheet</span>
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
                        Available Vocabulary Classrooms
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rooms.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-xs col-span-2">No classrooms found. Join or create a room above.</div>
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
                                  Learn Vocab
                                </button>
                                <button
                                  onClick={() => router.push(`/quiz/${room.id}`)}
                                  className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-semibold rounded-lg transition"
                                >
                                  Take Quiz
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
                        Create Mock Practice Questions
                      </h3>
                      <select
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
                      >
                        <option value="">Select target room</option>
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
                            placeholder={`Question #${i + 1} Content`}
                            value={q.content}
                            onChange={(e) => updateQuestion(i, 'content', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt: string, j: number) => (
                              <input
                                key={j}
                                placeholder={`Option ${String.fromCharCode(65 + j)}`}
                                value={opt}
                                onChange={(e) => updateQuestion(i, 'options', e.target.value, j)}
                                className="w-full p-2 bg-white border border-slate-100 rounded-lg text-xs text-slate-700"
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-semibold">Correct Answer Option:</span>
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
                            Remove this question
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={addNewQuestion}
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                      >
                        + Add Question Block
                      </button>
                      <button
                        onClick={addQuizQuestions}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                      >
                        Save Questions to DB
                      </button>
                    </div>
                  </div>
                ) : (
                  // Student interface for Practice
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Practice History & Quizzes</h3>
                        <p className="text-xs text-slate-400 mt-1">Review your recent classroom scores and exercise logs.</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('rooms')} 
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Join new session
                      </button>
                    </div>
                    
                    <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-3">
                      <Brain className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-700">Quiz Practice Module is Ready</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">Please head to the "Vocabulary Rooms" tab, select an joined classroom, and click "Take Quiz" to begin testing your knowledge.</p>
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
                      <h3 className="text-sm font-bold text-slate-800 mb-4">Weekly Study Allocation</h3>
                      <div className="h-56 relative">
                        <Bar data={studyTimeData} options={studyTimeOptions} />
                      </div>
                    </div>
                  </div>

                  {/* Detail word bank management (For Admin/Teacher) or Details stats (Students) */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-800">Learning Insights</h3>
                    
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
                          <option value="">Select target room to inspect word database</option>
                          {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>

                        {selectedRoomId && (
                          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                            {vocabList.length === 0 ? (
                              <p className="text-center py-6 text-slate-400 text-xs">No vocabulary words found in this room.</p>
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
                            Next Achievement Goal
                          </p>
                          <p className="text-[11px] text-slate-600">Complete 3 more vocabulary flashcard reviews this week to unlock the "Active Learner" badge!</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">Vocabulary memorized</span>
                            <span className="font-bold text-slate-800">145 words</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">Total mock tests taken</span>
                            <span className="font-bold text-slate-800">4 tests</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-500">Average test rating</span>
                            <span className="font-bold text-slate-800">680 / 990</span>
                          </div>
                        </div>
                      </div>
                    )}
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

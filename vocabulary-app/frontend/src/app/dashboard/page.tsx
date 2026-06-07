'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';
import { BookOpen, FolderPlus, Plus, Trash2, UploadCloud, Users } from 'lucide-react';

export default function DashboardPage() {
  const { token, role } = useAuthStore();
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
          skipHeader: true,
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

  if (!token) {
    return <div className="p-8 text-center text-slate-400">Đang chuyển hướng...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="space-y-8 py-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {role === 'student' ? 'Học Tập & Ôn Luyện' : role === 'teacher' ? 'Quản Lý Phòng Lớp' : 'Quản Trị Hệ Thống'}
          </h1>
          <p className="text-slate-400">Chào mừng bạn quay lại hệ thống quản lý học tập</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT 1: HÀNH ĐỘNG NHANH */}
          <div className="space-y-6">
            <motion.div
              className="card-glass p-6 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                {role === 'student' ? 'Tham Gia Phòng Học' : 'Tạo Phòng Học Mới'}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Tên phòng học"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu phòng"
                  value={roomPassword}
                  onChange={(e) => setRoomPassword(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {role !== 'student' && (
                  <label className="flex items-center text-sm text-slate-300 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showScore}
                      onChange={(e) => setShowScore(e.target.checked)}
                      className="mr-2 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                    />
                    Hiển thị điểm số cho học sinh
                  </label>
                )}
                <button
                  onClick={role === 'student' ? joinRoom : createRoom}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/20"
                >
                  {role === 'student' ? 'Tham Gia' : 'Tạo Phòng'}
                </button>
              </div>
            </motion.div>

            {/* Thêm từ vựng */}
            <motion.div
              className="card-glass p-6 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Thêm Từ Vựng
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Từ vựng (English)"
                  value={vocab.word}
                  onChange={(e) => setVocab({ ...vocab, word: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Nghĩa (Vietnamese)"
                  value={vocab.meaning}
                  onChange={(e) => setVocab({ ...vocab, meaning: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Ví dụ câu (Tùy chọn)"
                  value={vocab.example}
                  onChange={(e) => setVocab({ ...vocab, example: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="ID Phòng Học"
                  value={vocab.roomId}
                  onChange={(e) => setVocab({ ...vocab, roomId: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addVocab}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition shadow-lg shadow-green-500/20"
                >
                  Thêm Từ Vựng
                </button>
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block">Hoặc tải file Excel từ vựng (.xlsx)</span>
                  <label className="flex items-center justify-center border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl p-3 cursor-pointer transition text-slate-300 hover:text-white">
                    <UploadCloud className="w-5 h-5 mr-2" />
                    <span className="text-xs font-semibold">Tải lên file từ vựng</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CỘT 2: THÊM CÂU HỎI QUIZ */}
          {(role === 'teacher' || role === 'admin') && (
            <motion.div
              className="card-glass p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Thêm Câu Hỏi Luyện Tập
              </h3>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
              >
                <option value="">Chọn phòng học để gán câu hỏi</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {quizQuestions.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                    <input
                      placeholder={`Câu hỏi thứ ${i + 1}`}
                      value={q.content}
                      onChange={(e) => updateQuestion(i, 'content', e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none"
                    />
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt: string, j: number) => (
                        <input
                          key={j}
                          placeholder={`Đáp án ${String.fromCharCode(65 + j)}`}
                          value={opt}
                          onChange={(e) => updateQuestion(i, 'options', e.target.value, j)}
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs text-slate-400">Đáp án đúng:</span>
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(i, 'correctAnswer', e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs rounded-lg p-2 text-white"
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
                      className="w-full mt-2 py-1.5 bg-red-950/60 border border-red-500/20 text-red-300 rounded-lg text-xs hover:bg-red-900/60 transition"
                    >
                      Xóa câu hỏi này
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={addNewQuestion}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold border border-slate-700"
                >
                  + Thêm câu hỏi
                </button>
                <button
                  onClick={addQuizQuestions}
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold"
                >
                  Lưu tất cả
                </button>
              </div>
            </motion.div>
          )}

          {/* CỘT 3: DANH SÁCH PHÒNG HỌC */}
          <motion.div
            className="card-glass p-6 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-teal-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Danh Sách Phòng Học
            </h3>
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {rooms.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">Chưa có phòng học nào</div>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-teal-500/40 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-200">{room.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">ID: {room.id}</p>
                      </div>
                      {(role === 'teacher' || role === 'admin') && (
                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg transition"
                          title="Xóa phòng học"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {role === 'student' && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => router.push(`/learn/${room.id}`)}
                          className="flex-1 py-2 bg-teal-600/80 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg transition"
                        >
                          Học Từ Vựng
                        </button>
                        <button
                          onClick={() => router.push(`/quiz/${room.id}`)}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition border border-slate-700"
                        >
                          Luyện Tập Quiz
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* QUẢN LÝ TỪ VỰNG DÀNH CHO ADMIN */}
        {role === 'admin' && (
          <motion.div
            className="card-glass p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-orange-400 flex items-center gap-2">
              Quản Lý Từ Vựng Chi Tiết (Admin)
            </h3>
            <select
              value={selectedRoomId}
              onChange={(e) => {
                setSelectedRoomId(e.target.value);
                if (e.target.value) fetchVocabList(e.target.value);
              }}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="">Chọn phòng để xem từ vựng</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            {selectedRoomId && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {vocabList.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">Phòng học này chưa có từ vựng</div>
                ) : (
                  vocabList.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <div className="space-x-2">
                          <span className="font-bold text-white">{v.word}</span>
                          <span className="text-slate-400">—</span>
                          <span className="text-slate-300">{v.meaning}</span>
                        </div>
                        {v.example && <p className="text-xs text-slate-500 mt-1">VD: {v.example}</p>}
                      </div>
                      <button
                        onClick={() => deleteVocab(v.id)}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

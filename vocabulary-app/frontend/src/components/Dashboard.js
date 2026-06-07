import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

// === HÀM XỬ LÝ UPLOAD FILE (KHÔNG ĐỔI) ===
const handleFileUpload = async (e, vocab, token) => {
  const file = e.target.files[0];
  if (!file || !vocab.roomId.trim()) {
    toast.error('Vui lòng chọn file và nhập ID phòng');
    return;
  }
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: ['word', 'meaning', 'example'], skipHeader: true });
      for (const row of rows) {
        if (row.word && row.meaning) {
          await axios.post(
            'http://localhost:3010/vocab',
            { word: row.word, meaning: row.meaning, example: row.example || '', roomId: vocab.roomId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      toast.success('Tải lên từ vựng thành công');
    } catch (error) {
      console.error(error);
      toast.error('Tải lên thất bại: ' + (error.response?.data?.message || error.message));
    }
  };
  reader.readAsArrayBuffer(file);
};

function Dashboard() {
  const { token, role } = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [showScore, setShowScore] = useState(true);
  const [vocab, setVocab] = useState({ word: '', meaning: '', example: '', roomId: '' });
  const [quizQuestions, setQuizQuestions] = useState([{ content: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const [vocabList, setVocabList] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const navigate = useNavigate();

  // === FETCH ROOMS ===
  useEffect(() => {
    const fetchRooms = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:3010/rooms', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000
        });
        setRooms(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Fetch rooms error:', error);
        if (error.code === 'ECONNABORTED') toast.error('Yêu cầu quá thời gian');
        else if (error.response?.status === 401) toast.error('Phiên hết hạn');
        else if (error.response?.status === 403) toast.error('Không có quyền');
        else toast.error('Không thể tải danh sách phòng');
        setRooms([]);
      }
    };
    fetchRooms();
  }, [token]);

  // === TẠO PHÒNG ===
  const createRoom = async () => {
    if (!roomName.trim()) return toast.error('Tên phòng không được để trống');
    try {
      await axios.post('http://localhost:3010/rooms', { name: roomName, password: roomPassword, showScore }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get('http://localhost:3010/rooms', { headers: { Authorization: `Bearer ${token}` } });
      setRooms(res.data);
      toast.success('Tạo phòng thành công');
      setRoomName(''); setRoomPassword(''); setShowScore(true);
    } catch (error) {
      toast.error('Tạo phòng thất bại: ' + (error.response?.data?.message || 'Lỗi'));
    }
  };

  // === THAM GIA PHÒNG ===
  const joinRoom = async () => {
    if (!roomName.trim()) return toast.error('Tên phòng không được để trống');
    try {
      const res = await axios.post('http://localhost:3010/learning/join', { name: roomName, password: roomPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoomName(''); setRoomPassword('');
      navigate(`/learn/${res.data.room.id}`);
      toast.success('Tham gia thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tham gia thất bại');
    }
  };

  // === THÊM TỪ VỰNG ===
  const addVocab = async () => {
    if (!vocab.word.trim() || !vocab.meaning.trim() || !vocab.roomId.trim()) {
      return toast.error('Vui lòng điền đầy đủ từ, nghĩa và ID phòng');
    }
    try {
      await axios.post('http://localhost:3010/vocab', vocab, { headers: { Authorization: `Bearer ${token}` } });
      setVocab({ word: '', meaning: '', example: '', roomId: '' });
      toast.success('Thêm từ thành công');
    } catch (error) {
      toast.error('Thêm thất bại: ' + (error.response?.data?.message || 'Lỗi'));
    }
  };

  // === THÊM CÂU HỎI ===
  const addQuizQuestions = async () => {
    if (!selectedRoomId) return toast.error('Vui lòng chọn phòng');
    for (const q of quizQuestions) {
      if (!q.content.trim() || q.options.some(opt => !opt.trim())) {
        return toast.error('Vui lòng điền đầy đủ câu hỏi');
      }
    }
    try {
      await axios.post(`http://localhost:3010/rooms/${selectedRoomId}/questions`, { questions: quizQuestions }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizQuestions([{ content: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      toast.success('Thêm câu hỏi thành công');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Thêm thất bại');
    }
  };

  const addNewQuestion = () => setQuizQuestions([...quizQuestions, { content: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const updateQuestion = (index, field, value, optIndex = null) => {
    const newQ = [...quizQuestions];
    if (field === 'options') newQ[index].options[optIndex] = value;
    else if (field === 'correctAnswer') newQ[index][field] = parseInt(value);
    else newQ[index][field] = value;
    setQuizQuestions(newQ);
  };
  const removeQuestion = (index) => {
    if (quizQuestions.length === 1) return toast.error('Phải có ít nhất 1 câu hỏi');
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  // === XÓA TỪ VỰNG ===
  const deleteVocab = async (vocabId) => {
    try {
      await axios.delete(`http://localhost:3010/vocab/${vocabId}`, { headers: { Authorization: `Bearer ${token}` } });
      setVocabList(prev => prev.filter(v => v._id !== vocabId));
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };

  // === XÓA PHÒNG ===
  const deleteRoom = async (roomId) => {
    if (!window.confirm('Xóa phòng này?')) return;
    try {
      await axios.delete(`http://localhost:3010/rooms/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
      setRooms(prev => prev.filter(r => r._id !== roomId));
      toast.success('Xóa phòng thành công');
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };

  // === LẤY DANH SÁCH TỪ VỰNG ===
  const fetchVocabList = async (roomId) => {
    try {
      const res = await axios.get(`http://localhost:3010/vocab/room/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
      setVocabList(res.data);
    } catch (error) {
      toast.error('Không thể tải từ vựng');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* === HEADER === */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              {role === 'student' ? 'Học Tập' : role === 'teacher' ? 'Quản Lý Lớp' : 'Quản Trị Hệ Thống'}
            </h1>
            <p className="text-lg text-gray-600">Chào mừng bạn đến với hệ thống học tập</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* === CỘT 1: HÀNH ĐỘNG NHANH === */}
            <div className="space-y-6">
              {/* Tham gia / Tạo phòng */}
              {(role === 'student' || role === 'teacher' || role === 'admin') && (
                <motion.div
                  className="bg-white rounded-2xl shadow-lg p-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-indigo-700 mb-4">
                    {role === 'student' ? 'Tham Gia Phòng' : 'Tạo Phòng Mới'}
                  </h3>
                  <input
                    type="text"
                    placeholder="Tên phòng"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
                  />
                  {role !== 'student' && (
                    <label className="flex items-center mb-4 text-sm">
                      <input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} className="mr-2" />
                      Hiển thị điểm số
                    </label>
                  )}
                  <button
                    onClick={role === 'student' ? joinRoom : createRoom}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition"
                  >
                    {role === 'student' ? 'Tham Gia' : 'Tạo Phòng'}
                  </button>
                </motion.div>
              )}

              {/* Thêm từ vựng */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-green-700 mb-4">Thêm Từ Vựng</h3>
                <input
                  type="text"
                  placeholder="Từ vựng"
                  value={vocab.word}
                  onChange={(e) => setVocab({ ...vocab, word: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Nghĩa"
                  value={vocab.meaning}
                  onChange={(e) => setVocab({ ...vocab, meaning: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Ví dụ (tùy chọn)"
                  value={vocab.example}
                  onChange={(e) => setVocab({ ...vocab, example: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="ID Phòng"
                  value={vocab.roomId}
                  onChange={(e) => setVocab({ ...vocab, roomId: e.target.value })}
                  className="w-full p-3 border rounded-lg mb-3 text-sm"
                />
                <button
                  onClick={addVocab}
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Thêm Từ
                </button>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={(e) => handleFileUpload(e, vocab, token)}
                  className="w-full mt-3 text-xs text-gray-600 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700"
                />
              </motion.div>
            </div>

            {/* === CỘT 2: THÊM CÂU HỎI (GIÁO VIÊN/ADMIN) === */}
            {(role === 'teacher' || role === 'admin') && (
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-purple-700 mb-4">Thêm Câu Hỏi Quiz</h3>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full p-3 border rounded-lg mb-4 text-sm"
                >
                  <option value="">Chọn phòng</option>
                  {rooms.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                </select>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {quizQuestions.map((q, i) => (
                    <div key={i} className="p-4 bg-purple-50 rounded-lg">
                      <input
                        placeholder="Câu hỏi"
                        value={q.content}
                        onChange={(e) => updateQuestion(i, 'content', e.target.value)}
                        className="w-full p-2 border rounded mb-2 text-sm"
                      />
                      {q.options.map((opt, j) => (
                        <input
                          key={j}
                          placeholder={`Đáp án ${j + 1}`}
                          value={opt}
                          onChange={(e) => updateQuestion(i, 'options', e.target.value, j)}
                          className="w-full p-2 border rounded mb-1 text-sm"
                        />
                      ))}
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => updateQuestion(i, 'correctAnswer', e.target.value)}
                        className="w-full p-2 border rounded mb-2 text-sm"
                      >
                        {[0,1,2,3].map(n => <option key={n} value={n}>{String.fromCharCode(65 + n)}</option>)}
                      </select>
                      <button
                        onClick={() => removeQuestion(i)}
                        className="w-full py-1 bg-red-600 text-white rounded text-xs"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addNewQuestion}
                  className="w-full mt-3 py-2 bg-indigo-600 text-white rounded text-sm"
                >
                  + Thêm Câu Hỏi
                </button>
                <button
                  onClick={addQuizQuestions}
                  className="w-full mt-2 py-2 bg-purple-600 text-white rounded font-bold"
                >
                  Lưu Tất Cả
                </button>
              </motion.div>
            )}

            {/* === CỘT 3: DANH SÁCH PHÒNG === */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-teal-700 mb-4">Danh Sách Phòng</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {rooms.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Chưa có phòng nào</p>
                ) : (
                  rooms.map(room => (
                    <motion.div
                      key={room._id}
                      className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-bold text-teal-800">{room.name}</h4>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {role === 'student' && (
                          <>
                            <button onClick={() => navigate(`/learn/${room._id}`)} className="px-3 py-1 bg-teal-600 text-white rounded text-sm">
                              Học
                            </button>
                            <button onClick={() => navigate(`/quiz/${room._id}`)} className="px-3 py-1 bg-cyan-600 text-white rounded text-sm">
                              Quiz
                            </button>
                          </>
                        )}
                        {(role === 'teacher' || role === 'admin') && (
                          <button
                            onClick={() => deleteRoom(room._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* === QUẢN LÝ TỪ VỰNG (ADMIN) === */}
          {role === 'admin' && (
            <motion.div
              className="mt-8 bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-orange-700 mb-4">Quản Lý Từ Vựng</h3>
              <select
                value={selectedRoomId}
                onChange={(e) => { setSelectedRoomId(e.target.value); if (e.target.value) fetchVocabList(e.target.value); }}
                className="w-full p-3 border rounded-lg mb-4"
              >
                <option value="">Chọn phòng để xem từ vựng</option>
                {rooms.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
              </select>
              {selectedRoomId && vocabList.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {vocabList.map(v => (
                    <div key={v._id} className="p-3 bg-orange-50 rounded-lg flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{v.word}</span> - <span className="text-gray-700">{v.meaning}</span>
                        {v.example && <p className="text-xs text-gray-600 mt-1">VD: {v.example}</p>}
                      </div>
                      <button
                        onClick={() => deleteVocab(v._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
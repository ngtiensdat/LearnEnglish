import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QUIZ_TOPICS = [
  {
    id: 'topic1',
    title: 'Động Vật Thông Dụng',
    icon: 'paw',
    color: 'from-yellow-400 to-orange-400',
    questions: [
      { id: 'q1', content: 'Con chó trong tiếng Anh là gì?', options: ['Dog', 'Cat', 'Bird', 'Fish'], correctAnswer: 0 },
      { id: 'q2', content: 'Con mèo?', options: ['Dog', 'Cat', 'Bird', 'Fish'], correctAnswer: 1 },
      { id: 'q3', content: 'Con chim?', options: ['Fish', 'Bird', 'Dog', 'Horse'], correctAnswer: 1 },
      { id: 'q4', content: 'Con cá?', options: ['Cat', 'Dog', 'Fish', 'Bird'], correctAnswer: 2 },
      { id: 'q5', content: 'Con ngựa?', options: ['Horse', 'Cow', 'Pig', 'Sheep'], correctAnswer: 0 },
      { id: 'q6', content: 'Con bò?', options: ['Sheep', 'Cow', 'Horse', 'Pig'], correctAnswer: 1 },
      { id: 'q7', content: 'Con heo?', options: ['Pig', 'Dog', 'Cat', 'Goat'], correctAnswer: 0 },
      { id: 'q8', content: 'Con thỏ?', options: ['Rabbit', 'Mouse', 'Cat', 'Dog'], correctAnswer: 0 },
      { id: 'q9', content: 'Con chuột?', options: ['Cat', 'Dog', 'Mouse', 'Horse'], correctAnswer: 2 },
      { id: 'q10', content: 'Con voi?', options: ['Elephant', 'Lion', 'Tiger', 'Monkey'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic2',
    title: 'Trái Cây',
    icon: 'apple',
    color: 'from-red-400 to-pink-400',
    questions: [
      { id: 'q11', content: 'Quả táo?', options: ['Apple', 'Orange', 'Banana', 'Grape'], correctAnswer: 0 },
      { id: 'q12', content: 'Quả cam?', options: ['Apple', 'Orange', 'Pear', 'Peach'], correctAnswer: 1 },
      { id: 'q13', content: 'Quả chuối?', options: ['Banana', 'Apple', 'Orange', 'Grape'], correctAnswer: 0 },
      { id: 'q14', content: 'Quả nho?', options: ['Grape', 'Apple', 'Orange', 'Banana'], correctAnswer: 0 },
      { id: 'q15', content: 'Quả dưa hấu?', options: ['Watermelon', 'Apple', 'Orange', 'Banana'], correctAnswer: 0 },
      { id: 'q16', content: 'Quả dứa?', options: ['Pineapple', 'Apple', 'Orange', 'Banana'], correctAnswer: 0 },
      { id: 'q17', content: 'Quả lê?', options: ['Pear', 'Apple', 'Banana', 'Orange'], correctAnswer: 0 },
      { id: 'q18', content: 'Quả đào?', options: ['Peach', 'Apple', 'Banana', 'Orange'], correctAnswer: 0 },
      { id: 'q19', content: 'Quả chanh?', options: ['Lemon', 'Apple', 'Banana', 'Orange'], correctAnswer: 0 },
      { id: 'q20', content: 'Quả dâu?', options: ['Strawberry', 'Apple', 'Banana', 'Orange'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic3',
    title: 'Đồ Ăn & Đồ Uống',
    icon: 'cup',
    color: 'from-green-400 to-teal-400',
    questions: [
      { id: 'q21', content: 'Bánh mì?', options: ['Bread', 'Rice', 'Cake', 'Cookie'], correctAnswer: 0 },
      { id: 'q22', content: 'Sữa?', options: ['Milk', 'Water', 'Juice', 'Tea'], correctAnswer: 0 },
      { id: 'q23', content: 'Nước?', options: ['Water', 'Milk', 'Juice', 'Coffee'], correctAnswer: 0 },
      { id: 'q24', content: 'Trà?', options: ['Tea', 'Coffee', 'Milk', 'Juice'], correctAnswer: 0 },
      { id: 'q25', content: 'Cà phê?', options: ['Coffee', 'Tea', 'Milk', 'Juice'], correctAnswer: 0 },
      { id: 'q26', content: 'Bánh ngọt?', options: ['Cake', 'Bread', 'Cookie', 'Rice'], correctAnswer: 0 },
      { id: 'q27', content: 'Bánh quy?', options: ['Cookie', 'Cake', 'Bread', 'Rice'], correctAnswer: 0 },
      { id: 'q28', content: 'Cơm?', options: ['Rice', 'Bread', 'Cake', 'Noodles'], correctAnswer: 0 },
      { id: 'q29', content: 'Nước ép?', options: ['Juice', 'Milk', 'Water', 'Tea'], correctAnswer: 0 },
      { id: 'q30', content: 'Mật ong?', options: ['Honey', 'Sugar', 'Salt', 'Oil'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic4',
    title: 'Đồ Dùng Học Tập',
    icon: 'pencil',
    color: 'from-blue-400 to-cyan-400',
    questions: [
      { id: 'q31', content: 'Bút?', options: ['Pen', 'Pencil', 'Eraser', 'Notebook'], correctAnswer: 0 },
      { id: 'q32', content: 'Bút chì?', options: ['Pencil', 'Pen', 'Ruler', 'Marker'], correctAnswer: 0 },
      { id: 'q33', content: 'Tẩy?', options: ['Eraser', 'Pen', 'Pencil', 'Book'], correctAnswer: 0 },
      { id: 'q34', content: 'Sách?', options: ['Book', 'Notebook', 'Pen', 'Pencil'], correctAnswer: 0 },
      { id: 'q35', content: 'Vở?', options: ['Notebook', 'Book', 'Pen', 'Pencil'], correctAnswer: 0 },
      { id: 'q36', content: 'Thước?', options: ['Ruler', 'Pen', 'Pencil', 'Book'], correctAnswer: 0 },
      { id: 'q37', content: 'Bảng?', options: ['Board', 'Pen', 'Paper', 'Book'], correctAnswer: 0 },
      { id: 'q38', content: 'Bút dạ?', options: ['Marker', 'Pen', 'Pencil', 'Book'], correctAnswer: 0 },
      { id: 'q39', content: 'Keo dán?', options: ['Glue', 'Tape', 'Scissors', 'Pen'], correctAnswer: 0 },
      { id: 'q40', content: 'Kéo?', options: ['Scissors', 'Glue', 'Pen', 'Pencil'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic5',
    title: 'Gia Đình',
    icon: 'users',
    color: 'from-pink-400 to-red-400',
    questions: [
      { id: 'q41', content: 'Cha?', options: ['Father', 'Mother', 'Brother', 'Uncle'], correctAnswer: 0 },
      { id: 'q42', content: 'Mẹ?', options: ['Mother', 'Father', 'Sister', 'Aunt'], correctAnswer: 0 },
      { id: 'q43', content: 'Anh trai?', options: ['Brother', 'Sister', 'Father', 'Uncle'], correctAnswer: 0 },
      { id: 'q44', content: 'Chị gái?', options: ['Sister', 'Brother', 'Mother', 'Aunt'], correctAnswer: 0 },
      { id: 'q45', content: 'Ông?', options: ['Grandfather', 'Grandmother', 'Father', 'Uncle'], correctAnswer: 0 },
      { id: 'q46', content: 'Bà?', options: ['Grandmother', 'Grandfather', 'Mother', 'Aunt'], correctAnswer: 0 },
      { id: 'q47', content: 'Cháu trai?', options: ['Nephew', 'Niece', 'Son', 'Daughter'], correctAnswer: 0 },
      { id: 'q48', content: 'Cháu gái?', options: ['Niece', 'Nephew', 'Daughter', 'Son'], correctAnswer: 0 },
      { id: 'q49', content: 'Con trai?', options: ['Son', 'Daughter', 'Nephew', 'Niece'], correctAnswer: 0 },
      { id: 'q50', content: 'Con gái?', options: ['Daughter', 'Son', 'Niece', 'Nephew'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic6',
    title: 'Màu Sắc',
    color: 'from-purple-400 to-indigo-400',
    questions: [
      { id: 'q51', content: 'Màu đỏ?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 0 },
      { id: 'q52', content: 'Màu xanh?', options: ['Blue', 'Red', 'Yellow', 'Green'], correctAnswer: 0 },
      { id: 'q53', content: 'Màu vàng?', options: ['Yellow', 'Red', 'Blue', 'Green'], correctAnswer: 0 },
      { id: 'q54', content: 'Màu xanh lá?', options: ['Green', 'Blue', 'Red', 'Yellow'], correctAnswer: 0 },
      { id: 'q55', content: 'Màu đen?', options: ['Black', 'White', 'Gray', 'Brown'], correctAnswer: 0 },
      { id: 'q56', content: 'Màu trắng?', options: ['White', 'Black', 'Gray', 'Brown'], correctAnswer: 0 },
      { id: 'q57', content: 'Màu xám?', options: ['Gray', 'White', 'Black', 'Brown'], correctAnswer: 0 },
      { id: 'q58', content: 'Màu nâu?', options: ['Brown', 'Gray', 'Black', 'White'], correctAnswer: 0 },
      { id: 'q59', content: 'Màu hồng?', options: ['Pink', 'Red', 'Purple', 'Blue'], correctAnswer: 0 },
      { id: 'q60', content: 'Màu tím?', options: ['Purple', 'Pink', 'Blue', 'Red'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic7',
    title: 'Nghề Nghiệp',
    icon: 'briefcase',
    color: 'from-indigo-400 to-blue-400',
    questions: [
      { id: 'q61', content: 'Bác sĩ?', options: ['Doctor', 'Teacher', 'Engineer', 'Farmer'], correctAnswer: 0 },
      { id: 'q62', content: 'Giáo viên?', options: ['Teacher', 'Doctor', 'Engineer', 'Farmer'], correctAnswer: 0 },
      { id: 'q63', content: 'Kỹ sư?', options: ['Engineer', 'Teacher', 'Doctor', 'Farmer'], correctAnswer: 0 },
      { id: 'q64', content: 'Nông dân?', options: ['Farmer', 'Engineer', 'Doctor', 'Teacher'], correctAnswer: 0 },
      { id: 'q65', content: 'Luật sư?', options: ['Lawyer', 'Doctor', 'Teacher', 'Engineer'], correctAnswer: 0 },
      { id: 'q66', content: 'Cảnh sát?', options: ['Police', 'Lawyer', 'Doctor', 'Teacher'], correctAnswer: 0 },
      { id: 'q67', content: 'Lính cứu hỏa?', options: ['Firefighter', 'Police', 'Teacher', 'Doctor'], correctAnswer: 0 },
      { id: 'q68', content: 'Đầu bếp?', options: ['Chef', 'Teacher', 'Doctor', 'Engineer'], correctAnswer: 0 },
      { id: 'q69', content: 'Kỹ thuật viên?', options: ['Technician', 'Engineer', 'Teacher', 'Doctor'], correctAnswer: 0 },
      { id: 'q70', content: 'Nhà báo?', options: ['Journalist', 'Teacher', 'Doctor', 'Engineer'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic8',
    title: 'Thời Gian & Ngày Tháng',
    color: 'from-teal-400 to-green-400',
    questions: [
      { id: 'q71', content: 'Thứ Hai?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correctAnswer: 0 },
      { id: 'q72', content: 'Thứ Ba?', options: ['Tuesday', 'Monday', 'Wednesday', 'Thursday'], correctAnswer: 0 },
      { id: 'q73', content: 'Thứ Tư?', options: ['Wednesday', 'Monday', 'Tuesday', 'Thursday'], correctAnswer: 0 },
      { id: 'q74', content: 'Thứ Năm?', options: ['Thursday', 'Monday', 'Tuesday', 'Wednesday'], correctAnswer: 0 },
      { id: 'q75', content: 'Thứ Sáu?', options: ['Friday', 'Monday', 'Tuesday', 'Wednesday'], correctAnswer: 0 },
      { id: 'q76', content: 'Thứ Bảy?', options: ['Saturday', 'Monday', 'Tuesday', 'Wednesday'], correctAnswer: 0 },
      { id: 'q77', content: 'Chủ Nhật?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], correctAnswer: 0 },
      { id: 'q78', content: 'Tháng Một?', options: ['January', 'February', 'March', 'April'], correctAnswer: 0 },
      { id: 'q79', content: 'Tháng Hai?', options: ['February', 'January', 'March', 'April'], correctAnswer: 0 },
      { id: 'q80', content: 'Tháng Ba?', options: ['March', 'January', 'February', 'April'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic9',
    title: 'Địa Điểm & Giao Thông',
    color: 'from-orange-400 to-yellow-400',
    questions: [
      { id: 'q81', content: 'Trường học?', options: ['School', 'Hospital', 'Bank', 'Store'], correctAnswer: 0 },
      { id: 'q82', content: 'Bệnh viện?', options: ['Hospital', 'School', 'Bank', 'Store'], correctAnswer: 0 },
      { id: 'q83', content: 'Ngân hàng?', options: ['Bank', 'Hospital', 'School', 'Store'], correctAnswer: 0 },
      { id: 'q84', content: 'Cửa hàng?', options: ['Store', 'Bank', 'Hospital', 'School'], correctAnswer: 0 },
      { id: 'q85', content: 'Nhà ga?', options: ['Station', 'Store', 'School', 'Hospital'], correctAnswer: 0 },
      { id: 'q86', content: 'Sân bay?', options: ['Airport', 'Station', 'School', 'Hospital'], correctAnswer: 0 },
      { id: 'q87', content: 'Bãi đỗ xe?', options: ['Parking', 'Airport', 'School', 'Hospital'], correctAnswer: 0 },
      { id: 'q88', content: 'Công viên?', options: ['Park', 'School', 'Hospital', 'Store'], correctAnswer: 0 },
      { id: 'q89', content: 'Nhà hàng?', options: ['Restaurant', 'Park', 'Hospital', 'School'], correctAnswer: 0 },
      { id: 'q90', content: 'Khách sạn?', options: ['Hotel', 'Restaurant', 'Park', 'School'], correctAnswer: 0 }
    ]
  },
  {
    id: 'topic10',
    title: 'Cơ Thể Người',
    icon: 'heart',
    color: 'from-red-400 to-pink-400',
    questions: [
      { id: 'q91', content: 'Đầu?', options: ['Head', 'Hand', 'Foot', 'Eye'], correctAnswer: 0 },
      { id: 'q92', content: 'Mắt?', options: ['Eye', 'Ear', 'Mouth', 'Nose'], correctAnswer: 0 },
      { id: 'q93', content: 'Tai?', options: ['Ear', 'Eye', 'Mouth', 'Nose'], correctAnswer: 0 },
      { id: 'q94', content: 'Mũi?', options: ['Nose', 'Ear', 'Eye', 'Mouth'], correctAnswer: 0 },
      { id: 'q95', content: 'Miệng?', options: ['Mouth', 'Nose', 'Eye', 'Ear'], correctAnswer: 0 },
      { id: 'q96', content: 'Tay?', options: ['Hand', 'Foot', 'Head', 'Leg'], correctAnswer: 0 },
      { id: 'q97', content: 'Chân?', options: ['Foot', 'Hand', 'Head', 'Leg'], correctAnswer: 0 },
      { id: 'q98', content: 'Vai?', options: ['Shoulder', 'Hand', 'Foot', 'Head'], correctAnswer: 0 },
      { id: 'q99', content: 'Ngực?', options: ['Chest', 'Back', 'Leg', 'Arm'], correctAnswer: 0 },
      { id: 'q100', content: 'Lưng?', options: ['Back', 'Chest', 'Head', 'Foot'], correctAnswer: 0 }
    ]
  }
];


function Quiz() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!selectedTopic) return;

    const questions = selectedTopic.questions;
    if (Object.keys(answers).length < questions.length) {
      toast.error('Vui lòng trả lời hết các câu hỏi!');
      return;
    }

    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    setScore(correct);
    setShowResult(true);
    toast.success(`Hoàn thành! Điểm: ${correct}/${questions.length}`);
    const result = { score: correct, total: questions.length, topic: selectedTopic.title };
    localStorage.setItem('latestQuizResult', JSON.stringify(result));
    window.dispatchEvent(new Event('quizCompleted'));
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setShowResult(false);
  };

  const backToTopics = () => {
    setSelectedTopic(null);
    resetQuiz();
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* TIÊU ĐỀ CHÍNH */}
          {!selectedTopic && (
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                Chọn Chủ Đề Quiz
              </h1>
              <p className="text-lg text-gray-600">Luyện tập từ vựng theo từng chủ đề</p>
            </div>
          )}

          {/* DANH SÁCH CHỦ ĐỀ */}
          {!selectedTopic ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {QUIZ_TOPICS.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTopic(topic)}
                  className="cursor-pointer group"
                >
                  <div className={`bg-gradient-to-br ${topic.color} p-1 rounded-2xl shadow-lg`}>
                    <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center transition group-hover:scale-105">
                      <div className="text-5xl mb-4">
                        {topic.icon === 'book' && 'Book'}
                        {topic.icon === 'running' && 'Running'}
                        {topic.icon === 'palette' && 'Palette'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {topic.questions.length} câu hỏi
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* HIỂN THỊ BỘ CÂU HỎI */
            <div>
              {/* NÚT QUAY LẠI */}
              <button
                onClick={backToTopics}
                className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Back to topics
              </button>

              {/* TIÊU ĐỀ CHỦ ĐỀ */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedTopic.title}
                </h2>
                <p className="text-gray-600">
                  {selectedTopic.questions.length} câu hỏi
                </p>
              </div>

              {/* KẾT QUẢ */}
              {showResult ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center"
                >
                  <div className="mb-6">
                    <div className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {score}/{selectedTopic.questions.length}
                    </div>
                    <p className="text-2xl font-semibold text-gray-700 mt-3">
                      {score === selectedTopic.questions.length
                        ? 'Hoàn hảo!'
                        : score >= selectedTopic.questions.length * 0.7
                          ? 'Rất tốt!'
                          : 'Cố lên lần sau!'}
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Làm Lại
                  </button>
                </motion.div>
              ) : (
                /* FORM CÂU HỎI */
                <div className="space-y-6">
                  {selectedTopic.questions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                    >
                      <p className="text-lg font-semibold text-gray-800 mb-4">
                        Câu {i + 1}: {q.content}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt, j) => (
                          <label
                            key={j}
                            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                              ${answers[q.id] === j
                                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={answers[q.id] === j}
                              onChange={() => handleAnswer(q.id, j)}
                              className="w-5 h-5 text-indigo-600 mr-3"
                            />
                            <span className="font-medium text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {/* NÚT NỘP */}
                  <div className="text-center mt-8">
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length < selectedTopic.questions.length}
                      className={`px-10 py-4 rounded-xl font-bold text-lg transition-all
                        ${Object.keys(answers).length < selectedTopic.questions.length
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl'
                        }`}
                    >
                      Nộp Bài
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Quiz;
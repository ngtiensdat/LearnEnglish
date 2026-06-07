import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// DỮ LIỆU MẪU – CÁC CHỦ ĐỀ NGỮ PHÁP
const GRAMMAR_TOPICS = [
  // 1. Present Simple
  {
    id: 'tense1',
    title: 'Hiện Tại Đơn (Present Simple)',
    color: 'from-blue-500 to-cyan-500',
    theory: 'Diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định.',
    structure: 'S + V(s/es)',
    usage: [
      'Thói quen: _I go to school every day._',
      'Sự thật hiển nhiên: _The sun rises in the east._',
      'Lịch trình: _The train leaves at 7 PM._'
    ],
    examples: [
      { en: 'She plays tennis.', vi: 'Cô ấy chơi quần vợt.' },
      { en: 'Water boils at 100°C.', vi: 'Nước sôi ở 100°C.' }
    ]
  },

  // 2. Present Continuous
  {
    id: 'tense2',
    title: 'Hiện Tại Tiếp Diễn (Present Continuous)',
    color: 'from-purple-500 to-pink-500',
    theory: 'Diễn tả hành động đang xảy ra tại thời điểm nói.',
    structure: 'S + am/is/are + V-ing',
    usage: [
      'Đang xảy ra: _I am studying now._',
      'Hành động tạm thời: _She is living in Hanoi this month._',
      'Kế hoạch tương lai gần: _We are meeting at 5 PM._'
    ],
    examples: [
      { en: 'They are watching TV.', vi: 'Họ đang xem TV.' },
      { en: 'I am learning English.', vi: 'Tôi đang học tiếng Anh.' }
    ]
  },

  // 3. Present Perfect
  {
    id: 'tense3',
    title: 'Hiện Tại Hoàn Thành (Present Perfect)',
    color: 'from-green-500 to-lime-500',
    theory: 'Diễn tả hành động đã xảy ra trong quá khứ nhưng ảnh hưởng hiện tại.',
    structure: 'S + have/has + V3/ed',
    usage: [
      'Kinh nghiệm: _I have visited Japan._',
      'Hành động kéo dài: _She has lived here for 10 years._',
      'Vừa mới xảy ra: _He has just left._'
    ],
    examples: [
      { en: 'I have finished my homework.', vi: 'Tôi đã làm xong bài tập.' },
      { en: 'She has lived here since 2012.', vi: 'Cô ấy đã sống ở đây từ 2012.' }
    ]
  },

  // 4. Present Perfect Continuous
  {
    id: 'tense4',
    title: 'Hiện Tại Hoàn Thành Tiếp Diễn (Present Perfect Continuous)',
    color: 'from-cyan-500 to-blue-500',
    theory: 'Nhấn mạnh tính liên tục của hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.',
    structure: 'S + have/has been + V-ing',
    usage: [
      'Hành động kéo dài: _I have been studying for 3 hours._',
      'Nhấn mạnh quá trình: _She has been working here since 2010._'
    ],
    examples: [
      { en: 'They have been waiting for you.', vi: 'Họ đã chờ bạn.' },
      { en: 'I have been reading this book all day.', vi: 'Tôi đã đọc cuốn này cả ngày.' }
    ]
  },

  // 5. Past Simple
  {
    id: 'tense5',
    title: 'Quá Khứ Đơn (Past Simple)',
    color: 'from-orange-500 to-yellow-500',
    theory: 'Diễn tả hành động đã xảy ra và kết thúc trong quá khứ.',
    structure: 'S + V2/ed',
    usage: [
      'Hành động đã xảy ra: _I visited Da Nang last year._',
      'Chuỗi hành động: _He entered the room, sat down, and started reading._'
    ],
    examples: [
      { en: 'She watched a movie yesterday.', vi: 'Cô ấy xem phim hôm qua.' },
      { en: 'I worked in Hanoi in 2020.', vi: 'Tôi làm việc ở Hà Nội năm 2020.' }
    ]
  },

  // 6. Past Continuous
  {
    id: 'tense6',
    title: 'Quá Khứ Tiếp Diễn (Past Continuous)',
    color: 'from-red-500 to-orange-500',
    theory: 'Diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ.',
    structure: 'S + was/were + V-ing',
    usage: [
      'Hành động đang diễn ra: _I was sleeping at 10 PM._',
      'Hành động bị gián đoạn: _I was cooking when he arrived._'
    ],
    examples: [
      { en: 'They were playing football.', vi: 'Họ đang chơi bóng.' },
      { en: 'She was reading when I called.', vi: 'Cô ấy đang đọc sách khi tôi gọi.' }
    ]
  },

  // 7. Past Perfect
  {
    id: 'tense7',
    title: 'Quá Khứ Hoàn Thành (Past Perfect)',
    color: 'from-indigo-500 to-purple-500',
    theory: 'Diễn tả một hành động xảy ra trước một hành động khác trong quá khứ.',
    structure: 'S + had + V3/ed',
    usage: [
      'Hành động xảy ra trước: _I had eaten before he came._'
    ],
    examples: [
      { en: 'She had finished the work before 5 PM.', vi: 'Cô ấy đã hoàn thành công việc trước 5 giờ.' },
      { en: 'They had left when I arrived.', vi: 'Họ đã rời đi khi tôi đến.' }
    ]
  },

  // 8. Past Perfect Continuous
  {
    id: 'tense8',
    title: 'Quá Khứ Hoàn Thành Tiếp Diễn (Past Perfect Continuous)',
    color: 'from-pink-500 to-red-500',
    theory: 'Diễn tả hành động kéo dài trước một thời điểm trong quá khứ.',
    structure: 'S + had been + V-ing',
    usage: [
      'Hành động kéo dài: _I had been studying for 2 hours before he arrived._'
    ],
    examples: [
      { en: 'She had been working all day.', vi: 'Cô ấy đã làm việc cả ngày.' },
      { en: 'They had been waiting for an hour.', vi: 'Họ đã chờ 1 giờ.' }
    ]
  },

  // 9. Future Simple
  {
    id: 'tense9',
    title: 'Tương Lai Đơn (Future Simple)',
    color: 'from-blue-600 to-indigo-600',
    theory: 'Diễn tả dự đoán, hứa hẹn hoặc quyết định tại thời điểm nói.',
    structure: 'S + will + V',
    usage: [
      'Dự đoán: _It will rain tomorrow._',
      'Hứa hẹn: _I will help you._'
    ],
    examples: [
      { en: 'I will call you later.', vi: 'Tôi sẽ gọi cho bạn sau.' },
      { en: 'She will go to HCM City next week.', vi: 'Cô ấy sẽ đi TP.HCM tuần tới.' }
    ]
  },

  // 10. Future Continuous
  {
    id: 'tense10',
    title: 'Tương Lai Tiếp Diễn (Future Continuous)',
    color: 'from-teal-500 to-blue-500',
    theory: 'Diễn tả hành động sẽ đang diễn ra tại một thời điểm trong tương lai.',
    structure: 'S + will be + V-ing',
    usage: [
      'Thời điểm tương lai: _I will be working at 8 PM._'
    ],
    examples: [
      { en: 'She will be traveling this time tomorrow.', vi: 'Cô ấy sẽ đang đi du lịch vào giờ này ngày mai.' },
      { en: 'They will be sleeping at midnight.', vi: 'Họ sẽ đang ngủ lúc nửa đêm.' }
    ]
  },

  // 11. Future Perfect
  {
    id: 'tense11',
    title: 'Tương Lai Hoàn Thành (Future Perfect)',
    color: 'from-yellow-500 to-orange-500',
    theory: 'Diễn tả hành động sẽ hoàn thành trước một thời điểm trong tương lai.',
    structure: 'S + will have + V3/ed',
    usage: [
      'Hoàn thành trước tương lai: _I will have finished by 5 PM._'
    ],
    examples: [
      { en: 'She will have left by tomorrow.', vi: 'Cô ấy sẽ rời đi trước ngày mai.' },
      { en: 'They will have completed the project.', vi: 'Họ sẽ hoàn thành dự án.' }
    ]
  },

  // 12. Future Perfect Continuous
  {
    id: 'tense12',
    title: 'Tương Lai Hoàn Thành Tiếp Diễn (Future Perfect Continuous)',
    icon: 'Zap',
    color: 'from-purple-600 to-fuchsia-500',
    theory: 'Nhấn mạnh khoảng thời gian của hành động đến một thời điểm trong tương lai.',
    structure: 'S + will have been + V-ing',
    usage: [
      'Kéo dài đến tương lai: _I will have been studying for 3 hours by 8 PM._'
    ],
    examples: [
      { en: 'She will have been working for 10 years.', vi: 'Cô ấy sẽ làm việc được 10 năm.' },
      { en: 'They will have been waiting for 2 hours.', vi: 'Họ sẽ chờ 2 tiếng.' }
    ]
  },

  {
    id: 'conditional1',
    title: 'Câu Điều Kiện Loại 1',
    color: 'from-green-500 to-teal-500',
    theory: 'Điều kiện có thật ở hiện tại/tương lai.',
    structure: 'If + S + V(s/es), S + will + V',
    usage: ['_If it rains, I will stay home._'],
    examples: [
      { en: 'If you study hard, you will pass.', vi: 'Nếu bạn học chăm, bạn sẽ đậu.' }
    ]
  },

  {
    id: 'conditional2',
    title: 'Câu Điều Kiện Loại 2',
    color: 'from-orange-500 to-red-500',
    theory: 'Điều kiện không có thật ở hiện tại.',
    structure: 'If + S + V2/ed, S + would + V',
    usage: ['_If I were rich, I would travel the world._'],
    examples: [
      { en: 'She would help if she could.', vi: 'Cô ấy sẽ giúp nếu có thể.' }
    ]
  },

  {
    id: 'passive',
    title: 'Câu Bị Động (Passive Voice)',
    color: 'from-indigo-500 to-blue-600',
    theory: 'Chủ ngữ nhận hành động.',
    structure: 'S + to be + V3/ed (+ by O)',
    usage: ['_The room was cleaned._'],
    examples: [
      { en: 'The cake was eaten.', vi: 'Bánh đã bị ăn.' }
    ]
  }
];


function Learn() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const backToTopics = () => {
    setSelectedTopic(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* TIÊU ĐỀ CHÍNH */}
          {!selectedTopic && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Học Ngữ Pháp Tiếng Anh
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chọn một chủ đề để xem lý thuyết, cách dùng và ví dụ chi tiết
              </p>
            </div>
          )}

          {/* DANH SÁCH CHỦ ĐỀ */}
          {!selectedTopic ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GRAMMAR_TOPICS.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedTopic(topic);


                    localStorage.setItem('latestLearnedTopic', JSON.stringify({ topic: topic.title }));
                    window.dispatchEvent(new Event('topicLearned'));

                  }}
                  className="cursor-pointer group"
                >
                  <div className={`bg-gradient-to-br ${topic.color} p-1 rounded-2xl shadow-lg`}>
                    <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center transition group-hover:scale-105 group-hover:shadow-xl">
                      <div className="text-5xl mb-4">
                        {topic.icon === 'Clock' && 'Clock'}
                        {topic.icon === 'Running' && 'Running'}
                        {topic.icon === 'Lightbulb' && 'Lightbulb'}
                        {topic.icon === 'Cloud' && 'Cloud'}
                        {topic.icon === 'Shield' && 'Shield'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Lý thuyết • Cách dùng • Ví dụ
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* HIỂN THỊ NỘI DUNG CHỦ ĐỀ */
            <div>
              {/* NÚT QUAY LẠI */}
              <button
                onClick={backToTopics}
                className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-lg"
              >
                Back to topics
              </button>

              {/* TIÊU ĐỀ CHỦ ĐỀ */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedTopic.title}
                </h2>

                {/* LÝ THUYẾT */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-indigo-600 mb-3">Lý Thuyết</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedTopic.theory}
                  </p>
                </div>

                {/* CẤU TRÚC (nếu có) */}
                {selectedTopic.structure && (
                  <div className="mb-8 p-5 bg-indigo-50 rounded-xl border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">Cấu trúc:</h4>
                    <code className="text-lg font-mono text-indigo-900">
                      {selectedTopic.structure}
                    </code>
                  </div>
                )}

                {/* CÁCH DÙNG */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Cách Dùng</h3>
                  <ul className="space-y-3">
                    {selectedTopic.usage.map((use, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">Checkmark</span>
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* VÍ DỤ */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">Ví Dụ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTopic.examples.map((ex, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200"
                      >
                        <p className="font-semibold text-purple-800 mb-1">{ex.en}</p>
                        <p className="text-gray-700 italic">{ex.vi}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* NÚT HỌC TIẾP */}
              <div className="text-center mt-10">
                <button
                  onClick={backToTopics}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition"
                >
                  Chọn Chủ Đề Khác
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Learn;
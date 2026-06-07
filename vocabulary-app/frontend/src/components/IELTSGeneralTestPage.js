// src/components/IELTSGeneralTestPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function IELTSGeneralTestPage() {
  const { id, part } = useParams(); // /ielts-general/:id/:part
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const token = localStorage.getItem("token");

  // --- JSON mẫu nhúng trực tiếp ---
  const data = {
    title: "IELTS General Test 1",
    questions: [
      {
        id: 1,
        question: "Where is Sylvia?",
        options: ["A. London", "B. Manchester", "C. Edinburgh", "D. Bristol"],
        answer: "A",
        image: "img/q1-10.png",
        audio: "audio/q1-10.mp3"
      },
      {
        id: 2,
        question: "What country is mentioned?",
        options: ["A. Scotland", "B. England", "C. Wales", "D. Ireland"],
        answer: "B",
        image: "img/q1-10.png",
        audio: "audio/q1-10.mp3"
      },
      {
        id: 3,
        question: "What is the date of the event?",
        options: ["26th July", "July 26th", "26 July", "July 27th"],
        answer: ["26th July", "July 26th", "26 July"],
        image: "img/q1-10.png",
        audio: "audio/q1-10.mp3"
      },
      {
        id: 4,
        question: "How many people are expected?",
        options: ["1", "2", "3", "4"],
        answer: ["2", "TWO"],
        image: "img/q1-10.png",
        audio: "audio/q1-10.mp3"
      },
      {
        id: 5,
        question: "What is the holiday status?",
        options: ["On holiday", "Working", "Cancelled"],
        answer: ["ON HOLIDAY", "HOLIDAY"],
        image: "img/q1-10.png",
        audio: "audio/q1-10.mp3"
      }
    ]
  };

  const handleAnswer = (qId, selected) => {
    setAnswers((prev) => ({ ...prev, [qId]: selected }));
  };

  const handleSubmit = () => {
    if (!token) return alert("Vui lòng đăng nhập để nộp bài.");
    let correct = 0;
    data.questions.forEach((q) => {
      const user = answers[q.id];
      if (Array.isArray(q.answer)) {
        if (q.answer.includes(user)) correct++;
      } else {
        if (q.answer === user) correct++;
      }
    });
    setScore(correct);
    alert(`🎉 Nộp bài thành công! Điểm của bạn: ${correct}/${data.questions.length}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">{data.title}</h1>

        <div className="space-y-6">
          {data.questions.map((q) => {
            let imageSrc = q.image ? require(`../data/ieltsgeneral/2010/${q.image}`) : null;
            let audioSrc = q.audio ? require(`../data/ieltsgeneral/2010/${q.audio}`) : null;

            return (
              <div key={q.id} className="border-b pb-4">
                <p className="font-semibold mb-2">Câu {q.id}</p>

                <div className="flex flex-col md:flex-row md:space-x-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/3 flex flex-col items-center">
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt={`Question ${q.id}`}
                        className="rounded-lg w-full max-w-sm shadow mb-2 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setZoomImage(imageSrc)}
                      />
                    )}
                    {audioSrc && <audio controls src={audioSrc} className="w-full max-w-sm" />}
                  </div>

                  <div className="flex-1">
                    {q.question && <p className="font-semibold mb-2">{q.question}</p>}
                    {q.options && q.options.length > 0 && (
                      <ul className="space-y-1">
                        {q.options.map((opt, i) => (
                          <li key={i}>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`q${q.id}`}
                                value={opt}
                                checked={answers[q.id] === opt}
                                onChange={() => handleAnswer(q.id, opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Nộp bài
        </button>

        {score !== null && (
          <div className="mt-4 text-lg font-bold text-green-700">
            Kết quả của bạn: {score}/{data.questions.length}
          </div>
        )}
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default IELTSGeneralTestPage;

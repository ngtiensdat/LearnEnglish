// src/components/IELTSAcademicTestPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IELTSAcademicTestPage() {
  const { id } = useParams(); // /ielts-academic/:id/full
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const module = await import(`../data/ieltsacademic/${id}/full.json`);
        const normalized = {
          ...module.default,
          questions: module.default.questions.map((q) => ({
            ...q,
            options: q.options || [],
          })),
        };
        setData(normalized);
      } catch (err) {
        console.error("Không thể tải đề:", err);
      }
    };
    loadData();
  }, [id]);

  const handleAnswer = (qId, selected) => {
    setAnswers((prev) => ({ ...prev, [qId]: selected }));
  };

  if (!data) {
    return <div className="p-8 text-center text-gray-600">Đang tải đề...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">{data.title}</h1>

        <div className="space-y-6">
          {Array.isArray(data.questions) &&
            data.questions.map((q) => {
              let imageSrc = null;
              if (q.image) {
                try {
                  imageSrc = require(`../data/ieltsacademic/${id}/${q.image}`);
                } catch (err) {
                  console.warn("Không tìm thấy ảnh:", q.image);
                }
              }

              let audioSrc = null;
              if (q.audio) {
                try {
                  audioSrc = require(`../data/ieltsacademic/${id}/${q.audio}`);
                } catch (err) {
                  console.warn("Không tìm thấy audio:", q.audio);
                }
              }

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
                      {audioSrc && (
                        <audio controls src={audioSrc} className="w-full max-w-sm" />
                      )}
                    </div>
                    <div className="flex-1">
                      {q.question && <p className="font-semibold mb-2">{q.question}</p>}
                      {Array.isArray(q.options) && q.options.length > 0 && (
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

        {/* Modal phóng to ảnh */}
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
    </div>
  );
}

export default IELTSAcademicTestPage;

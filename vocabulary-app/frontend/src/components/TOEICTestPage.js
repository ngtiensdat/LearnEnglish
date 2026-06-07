import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TOEICTestPage() {
  const { id, part } = useParams(); // /toeic/:id/:part
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [zoomImage, setZoomImage] = useState(null); // quản lý ảnh phóng to
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (part === "full") {
          const parts = [
            "part1",
            "part2",
            "part3",
            "part4",
            "part5",
            "part6",
            "part7",
          ];
          const modules = await Promise.all(
            parts.map((p) =>
              import(`../data/toeic/test${id}/${p}.json`).catch(() => null)
            )
          );
          const valid = modules.filter((m) => m !== null).map((m) => m.default);
          const combined = {
            title: `Full TOEIC Test ${id}`,
            questions: valid.flatMap((p) =>
              p.questions.map((q) => ({ ...q, options: q.options || [] }))
            ),
          };
          setData(combined);
        } else {
          const module = await import(`../data/toeic/test${id}/${part}.json`);
          const normalized = {
            ...module.default,
            questions: module.default.questions.map((q) => ({
              ...q,
              options: q.options || [],
            })),
          };
          setData(normalized);
        }
      } catch (err) {
        console.error("Không thể tải đề:", err);
      }
    };
    loadData();
  }, [id, part]);

  // Ghi nhận lựa chọn
  const handleAnswer = (qId, selected) => {
    setAnswers((prev) => ({ ...prev, [qId]: selected }));
  };

  // Nộp bài
  const handleSubmit = async () => {
    if (submitting) return;
    if (!token) return alert("Vui lòng đăng nhập để nộp bài.");

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3010/learning/toeic/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          testId: id,
          part,
          answers: Object.entries(answers).map(([qid, selected]) => ({
            id: qid,
            selected,
          })),
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(
          `🎉 Nộp bài thành công! Điểm của bạn: ${result.score}/${result.total}`
        );
        setScore(result.score);
      } else {
        alert(result.message || "Có lỗi khi nộp bài!");
      }
    } catch (error) {
      console.error("Lỗi nộp bài:", error);
      alert("Không thể kết nối đến server!");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (!data) {
    return (
      <div className="p-8 text-center text-gray-600">Đang tải đề...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          {data.title}
        </h1>

        <div className="space-y-6">
          {Array.isArray(data.questions) &&
            data.questions.map((q) => {
              // Load ảnh
              let imageSrc = null;
              if (q.image) {
                try {
                  imageSrc = require(`../data/toeic/test${id}/${q.image}`);
                } catch (err) {
                  console.warn("Không tìm thấy ảnh:", q.image);
                }
              }

              // Load audio
              let audioSrc = null;
              if (q.audio) {
                try {
                  audioSrc = require(`../data/toeic/test${id}/${q.audio}`);
                } catch (err) {
                  console.warn("Không tìm thấy audio:", q.audio);
                }
              }

              return (
                <div key={q.id} className="border-b pb-4">
                  <p className="font-semibold mb-2">Câu {q.id}</p>

                  {/* Flex container cho 2 cột */}
                  <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Cột trái: ảnh + audio */}
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
                        <audio
                          controls
                          src={audioSrc}
                          className="w-full max-w-sm"
                        />
                      )}
                    </div>

                    {/* Cột phải: câu hỏi và lựa chọn */}
                    <div className="flex-1">
                      {q.question && (
                        <p className="font-semibold mb-2">{q.question}</p>
                      )}

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

        {/* Nút nộp bài */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`mt-6 ${
            submitting
              ? "bg-gray-400"
              : "bg-orange-600 hover:bg-orange-700"
          } text-white px-6 py-3 rounded-lg font-semibold transition`}
        >
          {submitting ? "Đang nộp..." : "Nộp bài"}
        </button>

        {score !== null && (
          <div className="mt-4 text-lg font-bold text-green-700">
            Kết quả của bạn: {score}/{data.questions.length}
          </div>
        )}
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
  );
}

export default TOEICTestPage;

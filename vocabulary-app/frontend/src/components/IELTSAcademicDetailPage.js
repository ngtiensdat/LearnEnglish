// src/components/IELTSAcademicDetailPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";

function IELTSAcademicDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          IELTS Academic Test {id}
        </h1>

        <p className="text-gray-700 mb-6">
          Luyện tập đầy đủ các phần Listening, Reading, Writing, Speaking trong đề Academic số {id}.
        </p>

        <div className="section-selector bg-white rounded-2xl shadow p-6 mt-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            Chọn phần muốn làm
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to={`/ielts-academic/${id}/listening`} className="section-btn">Listening</Link>
            <Link to={`/ielts-academic/${id}/reading`} className="section-btn">Reading</Link>
            <Link to={`/ielts-academic/${id}/writing`} className="section-btn">Writing</Link>
            <Link to={`/ielts-academic/${id}/speaking`} className="section-btn">Speaking</Link>
          </div>

          <div className="flex justify-center mt-10">
            <Link to={`/ielts-academic/${id}/full`} className="section-btn">Làm đề full</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IELTSAcademicDetailPage;

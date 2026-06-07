// src/components/TOEICDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../TOEICDetailPage.css";

function TOEICDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          New Economy TOEIC Test {id}
        </h1>

        <p className="text-gray-700 mb-6">
          Luyện tập toàn bộ các phần thi Listening và Reading trong đề TOEIC số{" "}
          {id}. Chọn phần thi bên dưới hoặc làm toàn bộ đề.
        </p>

        {/* --- CHỌN PHẦN THI --- */}
        <div className="section-selector bg-white rounded-2xl shadow p-6 mt-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Chọn phần thi muốn làm
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to={`/toeic/${id}/part1`} className="section-btn">
              Part 1
            </Link>
            <Link to={`/toeic/${id}/part2`} className="section-btn">
              Part 2
            </Link>
            <Link to={`/toeic/${id}/part3`} className="section-btn">
              Part 3
            </Link>
            <Link to={`/toeic/${id}/part4`} className="section-btn">
              Part 4
            </Link>
            <Link to={`/toeic/${id}/part5`} className="section-btn">
              Part 5
            </Link>
            <Link to={`/toeic/${id}/part6`} className="section-btn">
              Part 6
            </Link>
            <Link to={`/toeic/${id}/part7`} className="section-btn">
              Part 7
            </Link>
          </div>

          <div className="flex justify-center mt-10">
            <Link to={`/toeic/${id}/full`} className="section-btn">
              Làm đề
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TOEICDetailPage;

// src/components/IELTSAcademicPage.js
import React from "react";
import { Link } from "react-router-dom";

function IELTSAcademicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-indigo-600 mb-6">
          IELTS Academic Practice
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Complete Academic tests with AI feedback on Writing Task 1 & 2 + Speaking simulation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Mẫu đề 1 --- */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              IELTS Academic Test 2010
            </h2>
            <p className="text-gray-700 mb-4">Full Academic test: Listening, Reading, Writing, Speaking.</p>
            <p className="text-gray-500 mb-4">Thời gian: 2 giờ 30 phút</p>

            <div className="flex space-x-4">
              <Link
                to="/ieltsacademic/2010/full"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Làm đề full
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              IELTS Academic Test 2015
            </h2>
            <p className="text-gray-700 mb-4">Full Academic test: Listening, Reading, Writing, Speaking.</p>
            <p className="text-gray-500 mb-4">Thời gian: 2 giờ 30 phút</p>

            <div className="flex space-x-4">
              <Link
                to="/ieltsacademic/2010/full"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Làm đề full
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              IELTS Academic Test 2018
            </h2>
            <p className="text-gray-700 mb-4">Full Academic test: Listening, Reading, Writing, Speaking.</p>
            <p className="text-gray-500 mb-4">Thời gian: 2 giờ 30 phút</p>

            <div className="flex space-x-4">
              <Link
                to="/ieltsacademic/2010/full"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Làm đề full
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              IELTS Academic Test 2024
            </h2>
            <p className="text-gray-700 mb-4">Full Academic test: Listening, Reading, Writing, Speaking.</p>
            <p className="text-gray-500 mb-4">Thời gian: 2 giờ 30 phút</p>

            <div className="flex space-x-4">
              <Link
                to="/ieltsacademic/2010/full"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Làm đề full
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IELTSAcademicPage;

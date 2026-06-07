// src/components/IELTSGeneralPage.js
import React from 'react';
import { Link } from "react-router-dom";

function IELTSGeneralPage() {
  const testId = "2010";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-green-600 mb-6">IELTS General Training</h1>
        <p className="text-lg text-gray-700 mb-8">
          Practice for immigration & work with real General Training tests and band score prediction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-2">IELTS General Test 1</h2>
            <p className="text-gray-700 mb-4">Full test with Listening, Reading & Writing</p>
            <div className="flex space-x-4">
              <Link
                to={`/ielts-general/${testId}/full`}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Chi tiết
              </Link>
              <Link
                to={`/ielts-general/${testId}/full`}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Làm đề
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IELTSGeneralPage;

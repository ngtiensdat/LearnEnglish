import React from 'react';
import { useNavigate } from 'react-router-dom';

function Library() {
  const navigate = useNavigate();

  const resources = [
    {
      title: 'TOEIC Practice Tests',
      description: 'Full-length TOEIC mock exams with detailed score reports and answer explanations.',
      category: 'TOEIC',
      path: '/toeic'
    },
    {
      title: 'IELTS Academic',
      description: 'Complete IELTS Academic practice tests with AI-powered writing & speaking feedback.',
      category: 'IELTS Academic',
      path: '/ielts-academic'
    },
    {
      title: 'IELTS General',
      description: 'Realistic General Training tests for immigration & work, with instant band score prediction.',
      category: 'IELTS General',
      path: '/ielts-general'
    }
  ];

  const handleAccess = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">Resource Library</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Prepare for <strong>TOEIC</strong>, <strong>IELTS Academic</strong>, and <strong>IELTS General Training</strong> with AI-enhanced practice.
        </p>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-blue-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleAccess(resource.path)} // Click cả card cũng được (tùy chọn)
            >
              <h3 className="text-2xl font-bold text-blue-200 mb-3">{resource.title}</h3>
              <p className="mb-6 text-gray-200 leading-relaxed text-sm">{resource.description}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-4 py-2 rounded-full text-xs font-bold text-white
                  ${resource.category === 'TOEIC' ? 'bg-gradient-to-r from-orange-500 to-red-600' : ''}
                  ${resource.category === 'IELTS Academic' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : ''}
                  ${resource.category === 'IELTS General' ? 'bg-gradient-to-r from-green-500 to-teal-600' : ''}
                `}>
                  {resource.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn click card nếu có
                    handleAccess(resource.path);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Access Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-800 text-center">
        <h3 className="text-3xl font-bold mb-8">Which Test Are You Taking?</h3>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Choose your path and get a personalized study plan with real-time progress tracking.
        </p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Practicing Now
        </button>
      </section>
    </div>
  );
}

export default Library;
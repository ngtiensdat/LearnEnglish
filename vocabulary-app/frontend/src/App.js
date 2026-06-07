import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Quiz from './components/Quiz';
import Stats from './components/Stats';
import SchoolPlans from './components/SchoolPlans';
import Library from './components/Library';
import Business from './components/Business';
import TOEICPage from './components/TOEICPage';
import IELTSAcademicPage from './components/IELTSAcademicPage';
import IELTSGeneralPage from './components/IELTSGeneralPage';
import TOEICDetailPage from './components/TOEICDetailPage';
import TOEICTestPage from "./components/TOEICTestPage";
import IELTSAcademicTestPage from './components/IELTSAcademicTestPage';

// Placeholder Privacy component
function Privacy() {
  return (
    <div className="min-h-screen bg-blue-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg">
          This is the privacy policy page for Learn English. Your data is secure with top-tier privacy protection.
        </p>
      </div>
    </div>
  );
}

// Home component (unchanged from original)
function Home() {
  const courses = [
    {
      title: 'Beginner English',
      subtitle: 'Start your journey to mastering English basics',
      color: 'bg-blue-100',
      bullets: [
        'Interactive lessons for grammar, vocabulary, and pronunciation',
        'Videos with native speakers to improve listening skills',
        'Flashcards for essential words and phrases',
        'Quizzes to test basic comprehension and speaking skills'
      ]
    },
    {
      title: 'Intermediate English',
      subtitle: 'Enhance your fluency with intermediate skills',
      color: 'bg-cyan-100',
      bullets: [
        'Advanced grammar and conversational practice',
        'Videos with real-life dialogues and discussions',
        'Flashcards for idioms and complex vocabulary',
        'Assessments to improve reading and writing fluency'
      ]
    },
    {
      title: 'Advanced English',
      subtitle: 'Perfect your English for professional and academic use',
      color: 'bg-teal-100',
      bullets: [
        'Lessons on business English and academic writing',
        'Videos with expert-led discussions and presentations',
        'Flashcards for advanced terminology',
        'Simulations for interviews and public speaking'
      ]
    },
    {
      title: 'Kids English',
      subtitle: 'Fun and engaging English for young learners',
      color: 'bg-sky-100',
      bullets: [
        'Animated videos and songs for vocabulary building',
        'Interactive games for grammar and spelling',
        'Flashcards with pictures and audio support',
        'Simple quizzes designed for young learners'
      ]
    },
    {
      title: 'IELTS Prep',
      subtitle: 'Prepare confidently for your IELTS exam',
      color: 'bg-indigo-100',
      bullets: [
        'Practice tests mirroring IELTS format and timing',
        'Videos explaining test strategies and tips',
        'Flashcards for high-frequency words',
        'Mock interviews to boost speaking skills'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Nguyen Van A',
      title: 'Student (Vietnam)',
      quote: 'Learn English helped me improve my speaking skills in just 3 months. The interactive lessons and quizzes are amazing!'
    },
    {
      name: 'Tran Thi B',
      title: 'Teacher (Hanoi)',
      quote: 'I use Learn English for my classes, and my students love the engaging videos and flashcards. Highly recommended!'
    },
    {
      name: 'Le Van C',
      title: 'Business Professional (Ho Chi Minh City)',
      quote: 'The advanced course prepared me for international meetings. The simulations were a game-changer!'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">Welcome to</h1>
        <h2 className="text-4xl mb-8">Learn English</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Master English with interactive courses, AI-supported tools, and teacher-guided lessons tailored for all levels.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold">
            Start for free
          </button>
          <button className="bg-gray-200 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold">
            Contact us
          </button>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className={`p-6 rounded-lg ${course.color} text-blue-900 shadow-lg`}>
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="mb-4 font-semibold">{course.subtitle}</p>
              <ul className="space-y-2 mb-6">
                {course.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm">• {bullet}</li>
                ))}
              </ul>
              <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800">
                Start learning
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-16 px-4 bg-blue-800">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">Personalize Your Learning</h3>
            <ul className="space-y-2">
              <li>• Access a library of courses aligned with your goals</li>
              <li>• Use AI to adjust lessons to your skill level</li>
              <li>• Customize materials with various exercises and formats</li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Engage with Every Lesson</h3>
            <ul className="space-y-2">
              <li>• Motivate yourself with interactive content</li>
              <li>• Explore diverse formats like videos and quizzes</li>
              <li>• Track your progress with clear feedback</li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Support for All Learners</h3>
            <ul className="space-y-2">
              <li>• Adjust difficulty for individual needs</li>
              <li>• Set preferences once for automatic application</li>
              <li>• Tailor reading and speaking practice</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-16 px-4 text-center">
        <h3 className="text-3xl font-bold mb-8">AI-Powered Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-lg">Enhance your practice with personalized feedback</p>
          </div>
          <div>
            <p className="text-lg">Save time with automated lesson plans</p>
          </div>
          <div>
            <p className="text-lg">Ensure privacy and focus on progress</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-800">
        <h3 className="text-3xl font-bold mb-8 text-center">What Learners Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white text-blue-900 p-6 rounded-lg shadow-lg">
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 py-8 px-4 text-center">
        <p className="mb-4">Seamlessly integrate with your learning tools.</p>
        <p className="mb-4">Your data is secure with top-tier privacy protection.</p>
        <Link to="/privacy" className="text-blue-300 hover:underline">Learn more</Link>
      </footer>
    </div>
  );
}

function App() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-300">Learn English</Link>
          <div className="space-x-4 flex items-center">
            <Link to="/school-plans" className="hover:underline">School Plans</Link>
            <Link to="/library" className="hover:underline">Library</Link>
            <Link to="/business" className="hover:underline">For Business</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                {role === 'student' && (
                  <>
                    <Link to="/learn" className="hover:underline">Learn</Link>
                    <Link to="/quiz" className="hover:underline">Quiz</Link>
                    <Link to="/stats" className="hover:underline">Stats</Link>
                  </>
                )}
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
            <button
              type="button"
              aria-label="Get a quote"
              className="bg-gray-200 text-blue-900 px-4 py-2 rounded mr-2"
            >
              Get a quote
            </button>
            <button
              type="button"
              aria-label="Enter code"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Enter code
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/school-plans" element={<SchoolPlans />} />
          <Route path="/library" element={<Library />} />
          <Route path="/business" element={<Business />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/toeic" element={<TOEICPage />} />
          <Route path="/toeic/:id" element={<TOEICDetailPage />} />
          <Route path="/ielts-academic" element={<IELTSAcademicPage />} />
          <Route path="/ielts-general" element={<IELTSGeneralPage />} />
          <Route path="/toeic/:id" element={<TOEICDetailPage />} />
          <Route path="/toeic/:id/:part" element={<TOEICTestPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
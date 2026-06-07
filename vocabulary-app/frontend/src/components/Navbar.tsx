'use client';

import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { token, role, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Learn English
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/school-plans" className="hover:text-blue-400 transition-colors">
            School Plans
          </Link>
          <Link href="/library" className="hover:text-blue-400 transition-colors">
            Library
          </Link>
          <Link href="/business" className="hover:text-blue-400 transition-colors">
            For Business
          </Link>
          
          {token ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              {role === 'student' && (
                <>
                  <Link href="/learn" className="hover:text-blue-400 transition-colors">
                    Learn
                  </Link>
                  <Link href="/quiz" className="hover:text-blue-400 transition-colors">
                    Quiz
                  </Link>
                  <Link href="/stats" className="hover:text-blue-400 transition-colors">
                    Stats
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400 transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-400 transition-colors">
                Register
              </Link>
            </>
          )}

          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700">
            Get a quote
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold">
            Enter code
          </button>
        </div>
      </div>
    </nav>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '../store/useLanguageStore';

export default function Navbar() {
  const { token, role, logout } = useAuthStore();
  const { t } = useLanguageStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            {t('navbar.schoolPlans')}
          </Link>
          <Link href="/library" className="hover:text-blue-400 transition-colors">
            {t('navbar.library')}
          </Link>
          <Link href="/business" className="hover:text-blue-400 transition-colors">
            {t('navbar.business')}
          </Link>
          
          {mounted && token ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                {t('navbar.dashboard')}
              </Link>
              {role === 'student' && (
                <>
                  <Link href="/learn" className="hover:text-blue-400 transition-colors">
                    {t('navbar.learn')}
                  </Link>
                  <Link href="/quiz" className="hover:text-blue-400 transition-colors">
                    {t('navbar.quiz')}
                  </Link>
                  <Link href="/stats" className="hover:text-blue-400 transition-colors">
                    {t('navbar.stats')}
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400 transition-colors">
                {t('navbar.login')}
              </Link>
              <Link href="/register" className="hover:text-blue-400 transition-colors">
                {t('navbar.register')}
              </Link>
            </>
          )}

          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700">
            {t('navbar.getQuote')}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold">
            {t('navbar.enterCode')}
          </button>
        </div>
      </div>
    </nav>
  );
}

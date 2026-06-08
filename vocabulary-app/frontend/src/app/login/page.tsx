'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCredentials } = useAuthStore();
  const { t } = useLanguageStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token } = response.data;
      
      // Decode JWT token payload safely
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      setCredentials(token, decodedPayload.role, decodedPayload.id);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <motion.div
        className="card-glass w-full max-w-md p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center flex flex-col items-center">
          <img src="/logo.png" alt="Learn English Logo" className="w-16 h-16 rounded-2xl shadow-lg border border-slate-700/50 mb-4" />
          <h2 className="text-3xl font-extrabold text-white">{t('login.title')}</h2>
          <p className="text-sm text-slate-400 mt-2">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.email')}</label>
            <input
              type="email"
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.password')}</label>
            <input
              type="password"
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? t('login.loggingIn') : t('login.signIn')}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            {t('login.noAccount')}{' '}
            <Link href="/register" className="text-blue-400 hover:underline">
              {t('login.registerHere')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

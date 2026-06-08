'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Settings, LogOut, KeyRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '../store/useLanguageStore';
import { useClickSound } from '../hooks/useClickSound';
import { ROUTES } from '../constants/routes';
import { THEME, FONT_SIZE, FONT_SIZE_VALUES, LOCAL_STORAGE_KEYS, VOUCHER_CODES } from '../constants/app.constants';
import { SettingsPanel } from './features/settings/SettingsPanel';
import { BaseButton } from './base/BaseButton';
import { BaseModal } from './base/BaseModal';
import { BaseInput } from './base/BaseInput';

type ActivationStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Navbar() {
  const { token, role, logout } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { playClick } = useClickSound();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Settings state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(THEME.DARK);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(FONT_SIZE.BASE);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Voucher state
  const [voucherCode, setVoucherCode] = useState('');
  const [codeStatus, setCodeStatus] = useState<ActivationStatus>('idle');
  const [codeFeedback, setCodeFeedback] = useState('');

  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const savedTheme = (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as typeof theme) || THEME.DARK;
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const savedSize = (localStorage.getItem(LOCAL_STORAGE_KEYS.FONT_SIZE) as typeof fontSize) || FONT_SIZE.BASE;
    setFontSize(savedSize);
    document.documentElement.style.fontSize = FONT_SIZE_VALUES[savedSize];

    const savedSound = localStorage.getItem(LOCAL_STORAGE_KEYS.SOUND_ENABLED) !== 'false';
    setSoundEnabled(savedSound);

    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyTheme = (t: 'light' | 'dark' | 'system') => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, t);
    const isDark = t === THEME.DARK || (t === THEME.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    playClick();
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleFontSizeChange = (size: 'sm' | 'base' | 'lg') => {
    playClick();
    setFontSize(size);
    localStorage.setItem(LOCAL_STORAGE_KEYS.FONT_SIZE, size);
    document.documentElement.style.fontSize = FONT_SIZE_VALUES[size];
  };

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SOUND_ENABLED, String(next));
    if (next) setTimeout(playClick, 50);
  };

  const handleLogout = () => {
    playClick();
    logout();
    router.push(ROUTES.HOME);
  };

  const submitVoucherCode = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!voucherCode.trim()) {
      setCodeStatus('error');
      setCodeFeedback(language === 'vi' ? 'Vui lòng nhập mã.' : 'Please enter a code.');
      return;
    }
    setCodeStatus('loading');
    setTimeout(() => {
      const clean = voucherCode.trim().toUpperCase() as string;
      const isValid = (VOUCHER_CODES as readonly string[]).includes(clean);
      if (isValid) {
        setCodeStatus('success');
        setCodeFeedback(language === 'vi' ? `Chúc mừng! Mã ${clean} kích hoạt thành công.` : `Success! Code ${clean} activated.`);
      } else {
        setCodeStatus('error');
        setCodeFeedback(language === 'vi' ? 'Mã không chính xác hoặc đã hết hạn.' : 'Invalid or expired code.');
      }
    }, 800);
  };

  const closeCodeModal = () => {
    setIsCodeModalOpen(false);
    setVoucherCode('');
    setCodeStatus('idle');
    setCodeFeedback('');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          onClick={playClick}
          className="flex items-center space-x-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
        >
          <img
            src="/logo.png"
            alt="Learn English Logo"
            className="w-9 h-9 rounded-xl shadow-md border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-200"
          />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Learn English
          </span>
        </Link>

        {/* Navigation */}
        <div className="space-x-1 md:space-x-3 flex items-center">
          <Link href={ROUTES.SCHOOL_PLANS} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
            {t('navbar.schoolPlans')}
          </Link>
          <Link href={ROUTES.LIBRARY} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
            {t('navbar.library')}
          </Link>
          <Link href={ROUTES.BUSINESS} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
            {t('navbar.business')}
          </Link>

          {mounted && token ? (
            <>
              <Link href={ROUTES.DASHBOARD} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
                {t('navbar.dashboard')}
              </Link>
              {role === 'student' && (
                <>
                  <Link href={ROUTES.LEARN} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200 hidden md:inline-block">
                    {t('navbar.learn')}
                  </Link>
                  <Link href={ROUTES.QUIZ} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200 hidden md:inline-block">
                    {t('navbar.quiz')}
                  </Link>
                  <Link href={ROUTES.STATS} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200 hidden lg:inline-block">
                    {t('navbar.stats')}
                  </Link>
                </>
              )}
              <BaseButton variant="danger" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
                <span className="hidden sm:inline">{t('navbar.logout')}</span>
              </BaseButton>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
                {t('navbar.login')}
              </Link>
              <Link href={ROUTES.REGISTER} onClick={playClick} className="hover:text-blue-400 hover:bg-slate-800/40 px-3 py-2 rounded-xl transition-all duration-200">
                {t('navbar.register')}
              </Link>
            </>
          )}

          <Link href={ROUTES.BUSINESS} onClick={playClick} className="hidden sm:inline-block">
            <BaseButton variant="secondary" size="sm">{t('navbar.getQuote')}</BaseButton>
          </Link>

          <BaseButton
            variant="gradient"
            size="sm"
            onClick={() => { playClick(); setIsCodeModalOpen(true); }}
            leftIcon={<KeyRound className="w-3.5 h-3.5" />}
          >
            {t('navbar.enterCode')}
          </BaseButton>

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => { playClick(); setIsSettingsOpen((v) => !v); }}
              className="p-2 hover:bg-slate-800/60 rounded-xl transition-all duration-200 active:scale-95 text-slate-300 hover:text-white"
              title={t('navbar.settings')}
            >
              <Settings className={`w-5 h-5 transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : 'hover:rotate-45'}`} />
            </button>

            {isSettingsOpen && (
              <SettingsPanel
                theme={theme}
                fontSize={fontSize}
                soundEnabled={soundEnabled}
                onThemeChange={handleThemeChange}
                onFontSizeChange={handleFontSizeChange}
                onSoundToggle={handleSoundToggle}
              />
            )}
          </div>
        </div>
      </div>

      {/* Activation Code Modal */}
      <BaseModal
        isOpen={isCodeModalOpen}
        onClose={closeCodeModal}
        title={language === 'vi' ? 'Nhập mã kích hoạt' : 'Enter Activation Code'}
        subtitle={language === 'vi' ? 'Nhập mã ưu đãi hoặc mã phòng học để bắt đầu.' : 'Enter your promo or classroom code to begin.'}
      >
        <form onSubmit={submitVoucherCode} className="space-y-4">
          <BaseInput
            label={language === 'vi' ? 'Mã kích hoạt' : 'Activation Code'}
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder={language === 'vi' ? 'Ví dụ: FREE100, LEARN2026...' : 'e.g. FREE100, LEARN2026...'}
            helperText={language === 'vi' ? '💡 Thử nhập FREE100 hoặc LEARN2026 để kiểm tra.' : '💡 Try FREE100 or LEARN2026 to test.'}
            className="uppercase font-mono tracking-wider"
            id="activation-code-input"
          />

          {codeStatus !== 'idle' && codeFeedback && (
            <div
              className={`p-3 rounded-xl text-xs border ${
                codeStatus === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : codeStatus === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
              }`}
            >
              {codeStatus === 'loading' ? (
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'vi' ? 'Đang kích hoạt...' : 'Activating...'}</span>
                </span>
              ) : (
                <span>{codeFeedback}</span>
              )}
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <BaseButton type="button" variant="secondary" onClick={closeCodeModal} className="flex-1">
              {language === 'vi' ? 'Đóng' : 'Close'}
            </BaseButton>
            <BaseButton
              type="submit"
              variant="gradient"
              isLoading={codeStatus === 'loading'}
              className="flex-1"
            >
              {language === 'vi' ? 'Kích hoạt' : 'Activate'}
            </BaseButton>
          </div>
        </form>
      </BaseModal>
    </nav>
  );
}

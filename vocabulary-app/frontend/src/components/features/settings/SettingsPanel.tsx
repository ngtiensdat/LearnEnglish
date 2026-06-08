'use client';

import React from 'react';
import { Globe, Sun, Volume2, VolumeX, Type, Check } from 'lucide-react';
import { useLanguageStore } from '../../../store/useLanguageStore';
import { THEME, FONT_SIZE, FONT_SIZE_VALUES, SOUND_CONFIG } from '../../../constants/app.constants';
import type { Language } from '../../../store/useLanguageStore';

interface SettingsPanelProps {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'sm' | 'base' | 'lg';
  soundEnabled: boolean;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onFontSizeChange: (size: 'sm' | 'base' | 'lg') => void;
  onSoundToggle: () => void;
}

/**
 * SettingsPanel — the dropdown panel rendered from the Navbar settings icon.
 * Extracted from Navbar to keep components focused and testable.
 */
export function SettingsPanel({
  theme,
  fontSize,
  soundEnabled,
  onThemeChange,
  onFontSizeChange,
  onSoundToggle,
}: SettingsPanelProps) {
  const { language, setLanguage, t } = useLanguageStore();

  return (
    <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-800 p-5 shadow-2xl z-50 text-slate-200 flex flex-col space-y-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in slide-in-from-top-3 duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-2">
        <h4 className="font-bold text-sm text-white">
          {language === 'vi' ? 'Cài đặt hệ thống' : 'System Settings'}
        </h4>
        <p className="text-[10px] text-slate-400">
          {language === 'vi'
            ? 'Cá nhân hóa trải nghiệm học tập'
            : 'Personalize your learning experience'}
        </p>
      </div>

      {/* Language */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>{t('settings.language')}</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['vi', 'en'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition border ${
                language === lang
                  ? 'bg-blue-600/15 border-blue-500 text-blue-400 font-semibold'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <span>{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
              {language === lang && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Sun className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Giao diện' : 'Appearance'}</span>
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-800/40 p-0.5 rounded-xl border border-slate-800">
          {([THEME.LIGHT, THEME.DARK, THEME.SYSTEM] as const).map((tMode) => (
            <button
              key={tMode}
              onClick={() => onThemeChange(tMode)}
              className={`py-1 rounded-lg text-[10px] font-medium capitalize transition-all ${
                theme === tMode
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tMode}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Type className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Cỡ chữ' : 'Font Size'}</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {([FONT_SIZE.SM, FONT_SIZE.BASE, FONT_SIZE.LG] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => onFontSizeChange(sz)}
              className={`py-1.5 rounded-xl text-xs border transition-all ${
                fontSize === sz
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-400 font-semibold'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {sz.toUpperCase()}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500">
          {language === 'vi' ? `Hiện tại: ${FONT_SIZE_VALUES[fontSize]}` : `Current: ${FONT_SIZE_VALUES[fontSize]}`}
        </p>
      </div>

      {/* Sound Toggle */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-3">
        <span className="text-xs text-slate-300 flex items-center space-x-1.5">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-blue-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
          <span>{language === 'vi' ? 'Hiệu ứng âm thanh' : 'Sound Effects'}</span>
        </span>
        <button
          onClick={onSoundToggle}
          role="switch"
          aria-checked={soundEnabled}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            soundEnabled ? 'bg-blue-600' : 'bg-slate-700'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              soundEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const MAX_WIDTH_CLASSES: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

/**
 * BaseModal — accessible modal with backdrop blur and keyboard close support.
 */
export function BaseModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}: BaseModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={[
          'w-full rounded-2xl border border-slate-800 shadow-2xl',
          'bg-slate-900/95 text-slate-100 p-6',
          'animate-in zoom-in-95 duration-200',
          MAX_WIDTH_CLASSES[maxWidth],
        ].join(' ')}
      >
        {(title || subtitle) && (
          <div className="flex justify-between items-start mb-4">
            <div>
              {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

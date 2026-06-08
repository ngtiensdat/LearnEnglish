'use client';

import React from 'react';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'indigo' | 'emerald' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverable?: boolean;
}

const GLOW_CLASSES: Record<string, string> = {
  blue: 'hover:shadow-blue-500/10 hover:border-blue-500/30',
  indigo: 'hover:shadow-indigo-500/10 hover:border-indigo-500/30',
  emerald: 'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
  none: '',
};

const PADDING_CLASSES: Record<string, string> = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

/**
 * BaseCard — glass morphism card container used throughout the app.
 */
export function BaseCard({
  children,
  className = '',
  glowColor = 'blue',
  padding = 'md',
  onClick,
  hoverable = false,
}: BaseCardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm',
        'shadow-lg transition-all duration-300',
        hoverable && 'hover:-translate-y-0.5 hover:shadow-xl cursor-pointer',
        GLOW_CLASSES[glowColor],
        PADDING_CLASSES[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

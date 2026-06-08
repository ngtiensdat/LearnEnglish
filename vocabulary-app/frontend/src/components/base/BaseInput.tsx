'use client';

import React from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

/**
 * BaseInput — standardized input with label, error, and icon support.
 */
export function BaseInput({
  label,
  error,
  helperText,
  leftIcon,
  rightElement,
  className = '',
  id,
  ...rest
}: BaseInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'w-full rounded-xl bg-slate-900/80 border text-sm text-slate-100',
            'px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-slate-600',
            leftIcon ? 'pl-10' : '',
            rightElement ? 'pr-10' : '',
            error
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-slate-800 focus:border-blue-500/70 hover:border-slate-700',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            {rightElement}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

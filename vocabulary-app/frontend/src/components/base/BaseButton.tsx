'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/20 shadow-sm shadow-blue-500/10',
  secondary:
    'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
  danger:
    'bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20',
  ghost:
    'bg-transparent hover:bg-slate-800/40 text-slate-300 hover:text-white border border-transparent',
  gradient:
    'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/15 border-0',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

/**
 * BaseButton — reusable button component with variants and loading state.
 * All button usage should go through this component.
 */
export function BaseButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...rest
}: BaseButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold',
        'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

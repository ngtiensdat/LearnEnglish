'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * AppProviders wraps the entire app with all React context providers.
 * Add new providers here instead of cluttering layout.tsx.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-slate-800 !border !border-slate-700 !text-slate-100 !rounded-xl !shadow-xl"
      />
    </>
  );
}

'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 card-glass p-8 border border-slate-800 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p>
          Welcome to Learn English. Your privacy is critical to us, and we are committed to protecting your personal information.
        </p>
        <h2 className="text-lg font-bold text-white mt-4">1. Information We Collect</h2>
        <p>
          We only collect data necessary to track your quiz records, vocabulary learning metrics, and exam performances. Password values are securely encrypted.
        </p>
        <h2 className="text-lg font-bold text-white mt-4">2. Sharing & Disclosures</h2>
        <p>
          We do not sell, rent, or lease your user details to any external third parties under any circumstances.
        </p>
        <h2 className="text-lg font-bold text-white mt-4">3. Security</h2>
        <p>
          Top-tier encryption, secure authentication tokens, and access policies protect all your personal dashboard statistics.
        </p>
      </div>
    </div>
  );
}

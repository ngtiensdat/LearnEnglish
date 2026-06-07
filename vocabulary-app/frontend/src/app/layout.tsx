import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Learn English - Master English Vocabulary and Tests',
  description: 'Interactive English learning platform offering vocabulary rooms, quizzes, and standard TOEIC/IELTS test preparation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}

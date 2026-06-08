import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';

export const metadata: Metadata = {
  title: 'Learn English - Master English Vocabulary and Tests',
  description: 'Interactive English learning platform offering vocabulary rooms, quizzes, and standard TOEIC/IELTS test preparation.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col relative">
        {/* Floating Premium Gradient Glowing Blobs */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[130px] animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px] animate-pulse duration-[10000ms]"></div>
          <div className="absolute top-[50%] left-[40%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] animate-pulse duration-[6000ms]"></div>
        </div>

        <Navbar />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </body>
    </html>
  );
}

import type { ReactNode } from 'react';
import quranLogo from '/public/logo.png';

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-b from-slate-50 to-slate-100/80">
      <header className="sticky top-0 flex items-center gap-3 border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-sm">
        <img src={quranLogo} alt="Quran logo" className="h-15 w-15 object-contain" />
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">Daily Quran</h1>
      </header>

      <main className="flex flex-1 flex-col overflow-hidden px-4 py-6 sm:px-6">{children}</main>

      <footer className="sticky bottom-0 mt-auto border-t border-slate-200/60 bg-white/70 py-3 text-center backdrop-blur-sm">
        <p className="text-sm font-semibold text-slate-400">Explore the Holy Quran</p>
      </footer>
    </div>
  );
}

export default Layout;

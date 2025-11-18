import type { ReactNode } from 'react';
import quranLogo from '/public/logo.png';

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div className="relative flex h-full flex-col gap-6 p-4">
      <header className="sticky top-0 z-50 flex items-end justify-start gap-3 border-b-2 border-blue-950 bg-white px-4 pb-4">
        <img src={quranLogo} alt="Quran logo" className="h-16 flex-none" />
        <p className="text-3xl font-medium text-blue-950">Daily Quran</p>
      </header>

      <main className="mx-2 my-10 flex flex-1 flex-col gap-6">{children}</main>

      <footer className="sticky bottom-0 z-50 bg-blue-950">
        <p className="p-4 text-sm font-medium text-amber-100">
          Lets start knowing more about Holy Quran
        </p>
      </footer>
    </div>
  );
}

export default Layout;

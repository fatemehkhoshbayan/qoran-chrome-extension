import type { ReactNode } from 'react';
import { cn } from '../utils';

interface IBoxProps {
  children: ReactNode;
  className: string;
}

function Box({ children, className }: IBoxProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Box;

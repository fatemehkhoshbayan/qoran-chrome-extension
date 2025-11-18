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
        'flex justify-center gap-4 rounded-md p-6 shadow-md shadow-blue-900',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Box;

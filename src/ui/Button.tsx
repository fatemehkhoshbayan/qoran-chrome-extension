import { cn } from '../utils';
interface IButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button({ text, onClick, className, disabled }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 rounded-2xl bg-slate-800 py-3 shadow-lg shadow-slate-200 transition-all hover:bg-slate-900 active:scale-95',
        className,
      )}
      disabled={disabled}
    >
      <span className="text-sm font-bold tracking-wider text-amber-100 uppercase">{text}</span>
    </button>
  );
}

export default Button;

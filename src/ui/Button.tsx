interface IButtonProps {
  text: string;
  size?: 's' | 'm' | 'lg';
}

function Button({ text }: IButtonProps) {
  return (
    <button className="rounded-sm border-2 border-blue-900 bg-blue-950 p-4">
      <p className="text-xl font-medium text-amber-100">{text}</p>
    </button>
  );
}

export default Button;

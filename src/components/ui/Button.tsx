import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'btn-dreamy inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-200/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white shadow-dreamy hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-xl focus-visible:ring-pink-300/70 active:scale-95',
    secondary: 'bg-white/80 backdrop-blur-xl text-purple-600 border-2 border-pink-200/60 shadow-soft hover:bg-pink-50 hover:text-pink-600 hover:shadow-dreamy hover:border-purple-200 focus-visible:ring-purple-200/60 active:scale-95',
    ghost: 'bg-transparent text-slate-600 hover:bg-white/60 hover:text-purple-600 hover:shadow-soft focus-visible:ring-pink-100/60 active:scale-95'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl min-h-[38px] gap-1.5',
    md: 'px-6 py-3 text-base rounded-2xl min-h-[48px] gap-2',
    lg: 'px-8 py-4 text-lg rounded-3xl min-h-[56px] gap-2.5'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      tabIndex={0}
    >
      {children}
    </button>
  );
}

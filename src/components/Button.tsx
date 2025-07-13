import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  icon 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        h-16 rounded-2xl border font-semibold text-lg
        transition-all duration-200 ease-out
        active:scale-95 active:brightness-110
        hover:scale-105 hover:shadow-lg
        backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${className}
      `}
    >
      <div className="flex items-center justify-center">
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

export default Button;
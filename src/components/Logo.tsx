
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo = ({ className, color = "#8B5CF6" }: LogoProps) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-colors", className)}
    >
      <path 
        d="M16 3.2C8.93 3.2 3.2 8.93 3.2 16C3.2 23.07 8.93 28.8 16 28.8C23.07 28.8 28.8 23.07 28.8 16C28.8 8.93 23.07 3.2 16 3.2ZM16 25.6C10.7 25.6 6.4 21.3 6.4 16C6.4 10.7 10.7 6.4 16 6.4C21.3 6.4 25.6 10.7 25.6 16C25.6 21.3 21.3 25.6 16 25.6Z" 
        fill={color}
      />
      <path 
        d="M21.6 16C21.6 19.09 19.09 21.6 16 21.6C12.91 21.6 10.4 19.09 10.4 16C10.4 12.91 12.91 10.4 16 10.4C19.09 10.4 21.6 12.91 21.6 16Z" 
        fill={color}
      />
    </svg>
  );
};

export default Logo;

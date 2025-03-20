
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const AnimatedMenuIcon: React.FC<AnimatedMenuIconProps> = ({ isOpen, onClick, className }) => {
  return (
    <div 
      id="menuToggle" 
      className={cn(
        "relative w-16 h-16 flex flex-col justify-center items-center", 
        className
      )}
    >
      <input 
        type="checkbox" 
        checked={isOpen}
        onChange={onClick}
        className="flex w-14 h-14 absolute cursor-pointer opacity-0 z-[1]"
      />
      
      <svg 
        width="20" 
        height="12" 
        viewBox="0 0 20 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-transform duration-300",
          isOpen ? "rotate-90" : "rotate-0"
        )}
      >
        <line x1="4" y1="1.25" x2="20" y2="1.25" stroke="#1C1B20" strokeWidth="1.5" />
        <line x1="8" y1="11.25" x2="20" y2="11.25" stroke="#1C1B20" strokeWidth="1.5" />
        <line y1="6.25" x2="20" y2="6.25" stroke="#1C1B20" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default AnimatedMenuIcon;

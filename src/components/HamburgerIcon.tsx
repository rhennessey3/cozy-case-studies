
import React from 'react';
import { cn } from '@/lib/utils';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={cn("flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span 
        className={cn(
          "block h-0.5 w-6 bg-gray-800 transition-all duration-300",
          isOpen ? "transform rotate-45 translate-y-2" : ""
        )}
      />
      <span 
        className={cn(
          "block h-0.5 w-6 bg-gray-800 transition-all duration-300",
          isOpen ? "opacity-0" : ""
        )}
      />
      <span 
        className={cn(
          "block h-0.5 w-6 bg-gray-800 transition-all duration-300",
          isOpen ? "transform -rotate-45 -translate-y-2" : ""
        )}
      />
    </button>
  );
};

export default HamburgerIcon;

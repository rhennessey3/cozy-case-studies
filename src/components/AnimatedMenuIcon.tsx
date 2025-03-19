
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
      
      <span 
        id="span1" 
        className={cn(
          "w-10 h-1.5 mb-2 bg-gray-500 rounded-sm origin-[4px_0px] transition-all duration-500 ease-[cubic-bezier(.08,.81,.87,.71)]",
          isOpen && "bg-[#0c2461] rotate-45 translate-x-[8px]"
        )}
      />
      
      <span 
        id="span2" 
        className={cn(
          "w-10 h-1.5 mb-2 bg-gray-500 rounded-sm transition-all duration-500 ease-[cubic-bezier(.08,.81,.87,.71)]",
          isOpen && "bg-[#0c2461] rotate-[495deg] translate-x-[4px]"
        )}
      />
      
      <span 
        id="span3" 
        className={cn(
          "w-10 h-1.5 mb-2 bg-gray-500 rounded-sm origin-[bottom_right] transition-all duration-500 ease-[cubic-bezier(.08,.81,.87,.71)]",
          isOpen && "bg-[#0c2461] rotate-45 opacity-0"
        )}
      />
    </div>
  );
};

export default AnimatedMenuIcon;

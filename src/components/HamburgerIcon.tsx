
import React from 'react';
import { cn } from '@/lib/utils';
import './HamburgerIcon.css';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={cn("hamburger-icon", isOpen ? "is-active" : "", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="burger">
        <div className="strip burger-strip-2">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="strip burger-strip-3">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </button>
  );
};

export default HamburgerIcon;

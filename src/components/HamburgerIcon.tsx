
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
      {isOpen ? (
        // X icon for when menu is open
        <div className="burger-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        // New MENU hamburger icon
        <svg width="39" height="32" viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="4"
            y1="10.25"
            x2="20" 
            y2="10.25"
            stroke="currentColor"
            strokeWidth="1.5" 
          />
          <line 
            x1="8"
            y1="20.25"
            x2="20"
            y2="20.25"
            stroke="currentColor"
            strokeWidth="1.5" 
          />
          <line
            y1="15.25"
            x2="20"
            y2="15.25"
            stroke="currentColor"
            strokeWidth="1.5" 
          />
          
          {/* M */}
          <path
            fill="currentColor"
            d="M37 24.152L30.7 24.17V25.367L34.615 27.689L30.7 30.047V31.253H37V29.885H33.301L36.334 28.04V27.383L33.22 25.529L37 25.52V24.152Z"
          />
          {/* E */}
          <path
            fill="currentColor"
            d="M35.83 20.804H34.372V17.879H33.238V20.804H31.87V17.492H30.7V22.253H37V17.375H35.83V20.804Z" 
          />
          {/* N */}
          <path
            fill="currentColor"
            d="M30.7 10.915H34.525L30.7 14.047V15.253H37V13.813H33.175L37 10.672V9.475H30.7V10.915Z"
          />
          {/* U */}
          <path
            fill="currentColor"
            d="M37.108 4.454C37.108 2.663 36.082 1.601 34.228 1.601H30.7V3.041H34.174C35.371 3.041 35.866 3.554 35.866 4.445C35.866 5.327 35.371 5.849 34.174 5.849H30.7V7.307H34.228C36.082 7.307 37.108 6.245 37.108 4.454Z"
          />
        </svg>
      )}
    </button>
  );
};

export default HamburgerIcon;

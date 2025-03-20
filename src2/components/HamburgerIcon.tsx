
import React from 'react';
import { cn } from '@/lib/utils';
import './HamburgerIcon.css';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerIcon = ({ isOpen, onClick, className }: HamburgerIconProps) => {
  return (
    <button
      className={cn("hamburger-icon", className, {
        "open": isOpen
      })}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="hamburger-inner">
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        <div className="hamburger-line" />
      </div>
    </button>
  );
};

export default HamburgerIcon;

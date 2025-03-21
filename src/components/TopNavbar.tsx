
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedMenuIcon from './AnimatedMenuIcon';
import { Github, Dribbble, Linkedin, Phone } from 'lucide-react';

interface TopNavbarProps {
  className?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getActiveClass = (navPath: string) => {
    if (navPath === '/' && path === '/') {
      return 'text-black font-bold';
    }
    if (navPath !== '/' && path.startsWith(navPath)) {
      return 'text-black font-bold';
    }
    return 'text-gray-800';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
  };

  return (
    <nav className={cn("z-50 bg-white h-16 flex items-center justify-between px-4 md:hidden", className)}>
      <Link to="/" className="text-2xl font-bold">
        <div className="h-10 w-10 bg-black flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 53.34 71.44" 
            className="h-6 w-6"
          >
            <defs>
              <style>
                {`.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:7px;stroke-linecap:round;}
                .letter-h, .number-3{fill:#fff;overflow:hidden;}`}
              </style>
              <clipPath id="clip-path-h-mobile">
                <path d="M14.5,57.51c-.67-.1-1-.23-1-.4V14.66c0-.37,1.26-.55,3.79-.55a19.67,19.67,0,0,1,2.8.15c.65.1,1,.23,1,.4V33.32A15.46,15.46,0,0,1,25,30.49a9.36,9.36,0,0,1,4.33-1.13A11.19,11.19,0,0,1,35,30.76a9.76,9.76,0,0,1,3.76,3.81A11.18,11.18,0,0,1,40,40V57.11c0,.37-1.26.55-3.78.55a19.94,19.94,0,0,1-2.78-.15c-.67-.1-1-.23-1-.4V41.44a5.65,5.65,0,0,0-1.34-3.94A4.46,4.46,0,0,0,27.65,36a10.66,10.66,0,0,0-6.59,2.5v18.6c0,.37-1.26.55-3.78.55A19.94,19.94,0,0,1,14.5,57.51Z" />
              </clipPath>
              <clipPath id="clip-path-3-mobile">
                <path d="M33.78,23.1a.59.59,0,0,1,0-.14,3.3,3.3,0,0,1,.15-.87c.1-.36.2-.53.29-.53a5.58,5.58,0,0,0,1.52.21,2.39,2.39,0,0,0,1.08-.23,1.67,1.67,0,0,0,.69-.62,1.53,1.53,0,0,0,.24-.82,1.25,1.25,0,0,0-.47-1,1.79,1.79,0,0,0-1.17-.38,3.13,3.13,0,0,0-.39,0c-.09,0-.24-.18-.43-.52a1.33,1.33,0,0,1-.27-.64l1.74-1.76H34.19c-.08,0-.13-.24-.13-.7s0-.7.13-.7h4.28s.06.05.09.16a2.29,2.29,0,0,1,0,.54,1.61,1.61,0,0,1-.06.58l-.07.12-1.62,1.56a3.24,3.24,0,0,1,1.38.39,2.55,2.55,0,0,1,1,.95,2.63,2.63,0,0,1,.36,1.38,3.08,3.08,0,0,1-1.75,2.8,4.73,4.73,0,0,1-2.16.45A7.17,7.17,0,0,1,33.78,23.1Z" />
              </clipPath>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <rect className="letter-h" x="13" y="13" width="27" height="45" />
                <rect className="number-3" x="33" y="14" width="8" height="10" />
              </g>
            </g>
          </svg>
        </div>
      </Link>
      
      <AnimatedMenuIcon isOpen={isMenuOpen} onClick={toggleMenu} />
      
      <div className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full",
        "pt-16 flex flex-col justify-between" // Space for the TopNavbar
      )}>
        <div className="flex flex-col p-6 space-y-6">
          <Link 
            to="/" 
            className={cn("text-lg hover:text-black transition font-medium", getActiveClass('/'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span>Home</span>
            </div>
          </Link>
          <Link 
            to="/about" 
            className={cn("text-lg hover:text-black transition font-medium", getActiveClass('/about'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span>About</span>
            </div>
          </Link>
          <Link 
            to="/case-studies" 
            className={cn("text-lg hover:text-black transition font-medium", getActiveClass('/case-studies'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span>Work</span>
            </div>
          </Link>
        </div>
        
        {/* Social links at bottom of mobile menu */}
        <div className="flex justify-center space-x-4 p-6 border-t border-gray-100">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Github size={16} />
          </a>
          <a 
            href="https://dribbble.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Dribbble size={16} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a 
            href="tel:+1234567890" 
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

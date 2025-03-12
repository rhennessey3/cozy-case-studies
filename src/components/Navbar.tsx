
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    closeDrawer();
  }, [location]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.classList.remove('drawer-open');
  };

  const handleNavigation = (path: string) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <>
      {/* Flyout Drawer - the menu that slides out */}
      <div 
        className={cn(
          "fixed left-0 top-0 w-[280px] bg-white transition-transform duration-300 ease-in-out h-screen overflow-y-auto shadow-md z-50",
          drawerOpen ? "translate-x-0" : "translate-x-[-280px]"
        )}
        id="flyoutDrawer"
      >
        <div className="flex flex-col gap-6 pt-20 pb-8 h-full px-6">
          <div 
            className="cursor-pointer mb-6 flex items-center justify-center"
            onClick={() => handleNavigation('/')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 53.34 71.44" 
              className="h-10 w-10"
            >
              <defs>
                <style>
                  {`.cls-1{fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:7px;}
                  .cls-2{fill:#231f20;}`}
                </style>
              </defs>
              <title>Logo</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path className="cls-1" d="M49.84,67.94H3.5V3.5H49.84Z"/>
                  <path className="cls-2" d="M14.5,57.51c-.67-.1-1-.23-1-.4V14.66c0-.37,1.26-.55,3.79-.55a19.67,19.67,0,0,1,2.8.15c.65.1,1,.23,1,.4V33.32A15.46,15.46,0,0,1,25,30.49a9.36,9.36,0,0,1,4.33-1.13A11.19,11.19,0,0,1,35,30.76a9.76,9.76,0,0,1,3.76,3.81A11.18,11.18,0,0,1,40,40V57.11c0,.37-1.26.55-3.78.55a19.94,19.94,0,0,1-2.78-.15c-.67-.1-1-.23-1-.4V41.44a5.65,5.65,0,0,0-1.34-3.94A4.46,4.46,0,0,0,27.65,36a10.66,10.66,0,0,0-6.59,2.5v18.6c0,.37-1.26.55-3.78.55A19.94,19.94,0,0,1,14.5,57.51Z"/>
                  <path className="cls-2" d="M33.78,23.1a.59.59,0,0,1,0-.14,3.3,3.3,0,0,1,.15-.87c.1-.36.2-.53.29-.53a5.58,5.58,0,0,0,1.52.21,2.39,2.39,0,0,0,1.08-.23,1.67,1.67,0,0,0,.69-.62,1.53,1.53,0,0,0,.24-.82,1.25,1.25,0,0,0-.47-1,1.79,1.79,0,0,0-1.17-.38,3.13,3.13,0,0,0-.39,0c-.09,0-.24-.18-.43-.52a1.33,1.33,0,0,1-.27-.64l1.74-1.76H34.19c-.08,0-.13-.24-.13-.7s0-.7.13-.7h4.28s.06.05.09.16a2.29,2.29,0,0,1,0,.54,1.61,1.61,0,0,1-.06.58l-.07.12-1.62,1.56a3.24,3.24,0,0,1,1.38.39,2.55,2.55,0,0,1,1,.95,2.63,2.63,0,0,1,.36,1.38,3.08,3.08,0,0,1-1.75,2.8,4.73,4.73,0,0,1-2.16.45A7.17,7.17,0,0,1,33.78,23.1Z"/>
                </g>
              </g>
            </svg>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            <button 
              type="button"
              className="text-left text-gray-900 hover:text-cozy-600 transition-colors py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => handleNavigation('/')}
            >
              Home
            </button>
            <button 
              type="button"
              className="text-left text-gray-900 hover:text-cozy-600 transition-colors py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => handleNavigation('/about')}
            >
              About
            </button>
            <button 
              type="button"
              className="text-left text-gray-900 hover:text-cozy-600 transition-colors py-3 px-4 cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => handleNavigation('/case-studies')}
            >
              Case Studies
            </button>
          </nav>
        </div>
      </div>
      
      {/* Toggle Button Container - contains the hamburger/close icon */}
      <div className="fixed left-0 top-0 bottom-0 flex flex-col items-center justify-center w-[4.5rem] z-40 bg-white shadow-sm" id="toggleButtonContainer">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDrawer}
          aria-label="Toggle drawer menu"
          className="text-cozy-800 hover:text-cozy-600 transition-colors"
        >
          {drawerOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
    </>
  );
};

export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flyoutMenuOpen, setFlyoutMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleFlyoutMenu = () => {
    setFlyoutMenuOpen(!flyoutMenuOpen);
    // Add a body class to prevent scrolling when the flyout is open
    if (!flyoutMenuOpen) {
      document.body.classList.add('flyout-open');
    } else {
      document.body.classList.remove('flyout-open');
    }
  };

  return (
    <>
      <nav className={cn("bg-background/80 backdrop-blur-md h-16", className)}>
        <div className="container mx-auto h-full px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-cozy-900">Case Studies</Link>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-cozy-800" />
            ) : (
              <Menu className="h-5 w-5 text-cozy-800" />
            )}
          </Button>
        </div>
      </nav>
      
      {/* Flyout menu trigger on the left side */}
      <div className="fixed left-0 top-0 bottom-0 flex flex-col items-center justify-center px-8 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFlyoutMenu}
          aria-label="Toggle flyout menu"
          className="text-cozy-800 hover:text-cozy-600 transition-colors"
        >
          {flyoutMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Flyout Menu - slides in from left */}
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 w-72 bg-card/95 backdrop-blur-md border-r border-border p-6 shadow-lg transition-transform duration-300 ease-in-out z-20",
          flyoutMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
      >
        <div className="flex flex-col gap-6 pt-16">
          <h2 className="text-xl font-semibold text-cozy-900 mb-4">Menu</h2>
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-cozy-800 hover:text-cozy-600 transition-colors py-2 border-b border-cozy-200"
              onClick={() => setFlyoutMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-cozy-800 hover:text-cozy-600 transition-colors py-2 border-b border-cozy-200"
              onClick={() => setFlyoutMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/case-study/example" 
              className="text-cozy-800 hover:text-cozy-600 transition-colors py-2 border-b border-cozy-200"
              onClick={() => setFlyoutMenuOpen(false)}
            >
              Featured Case Study
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Content push effect when flyout is open */}
      <div 
        className={cn(
          "fixed inset-0 bg-transparent transition-transform duration-300 ease-in-out z-10 pointer-events-none",
          flyoutMenuOpen ? "translate-x-[4.5rem]" : "translate-x-0"
        )}
      >
        {/* This is a dummy div that pushes the content */}
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background pt-20 px-4 md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 text-center text-lg">
          <Link 
            to="/" 
            className="py-2 border-b border-cozy-200 text-cozy-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="py-2 border-b border-cozy-200 text-cozy-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

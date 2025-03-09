
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-cozy-900">Case Studies</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-cozy-800 hover:text-cozy-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-cozy-800 hover:text-cozy-600 transition-colors">
            About
          </Link>
        </div>
        
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
    </nav>
  );
};

export default Navbar;

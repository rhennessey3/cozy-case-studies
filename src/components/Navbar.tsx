import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Add a link to the font manager in the navigation items
const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fonts", href: "/fonts" },
  // Add any other navigation items here
];

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={cn("bg-background/80 backdrop-blur-sm py-4", className)}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Your Logo</Link>
        <div className="flex items-center space-x-4">
          {navigationItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm">Contact</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

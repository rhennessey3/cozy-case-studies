
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HamburgerIcon from './HamburgerIcon';

interface TopNavbarProps {
  className?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getActiveClass = (navPath: string) => {
    if (navPath === '/' && path === '/') {
      return 'text-cyan-500 font-bold';
    }
    if (navPath !== '/' && path.startsWith(navPath)) {
      return 'text-cyan-500 font-bold';
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
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </Link>
      
      <HamburgerIcon isOpen={isMenuOpen} onClick={toggleMenu} />
      
      <div className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full",
        "pt-16" // Space for the TopNavbar
      )}>
        <div className="flex flex-col p-6 space-y-6">
          <Link 
            to="/" 
            className={cn("text-lg hover:text-cyan-500 transition font-medium", getActiveClass('/'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span className="material-icons mr-2">home</span>
              <span>Home</span>
            </div>
          </Link>
          <Link 
            to="/about" 
            className={cn("text-lg hover:text-cyan-500 transition font-medium", getActiveClass('/about'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span className="material-icons mr-2">info</span>
              <span>About</span>
            </div>
          </Link>
          <Link 
            to="/case-studies" 
            className={cn("text-lg hover:text-cyan-500 transition font-medium", getActiveClass('/case-studies'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span className="material-icons mr-2">work</span>
              <span>Work</span>
            </div>
          </Link>
          <Link 
            to="/admin/case-studies" 
            className={cn("text-lg hover:text-cyan-500 transition font-medium", getActiveClass('/admin'))}
            onClick={toggleMenu}
          >
            <div className="flex items-center">
              <span className="material-icons mr-2">admin_panel_settings</span>
              <span>Admin</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

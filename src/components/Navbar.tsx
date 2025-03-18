
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;

  const getActiveClass = (navPath: string) => {
    if (navPath === '/' && path === '/') {
      return 'text-cyan-500 font-bold';
    }
    if (navPath !== '/' && path.startsWith(navPath)) {
      return 'text-cyan-500 font-bold';
    }
    return 'text-gray-800';
  };

  return (
    <nav className={cn("fixed left-0 top-0 h-screen z-50 bg-white w-[5.95rem] transition-all duration-300 ease-in-out hidden md:block", className)}>
      <div className="py-6 h-full flex flex-col">
        <div className="flex justify-center mb-6">
          <Link to="/" className="text-2xl font-bold text-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"></div>
          </Link>
        </div>
        <div className="flex flex-col space-y-6 items-center">
          <Link to="/" className={cn("text-sm hover:text-cyan-500 transition font-medium", getActiveClass('/'))}>
            <div className="flex flex-col items-center">
              <span className="material-icons mb-1">home</span>
              <span>Home</span>
            </div>
          </Link>
          <Link to="/about" className={cn("text-sm hover:text-cyan-500 transition font-medium", getActiveClass('/about'))}>
            <div className="flex flex-col items-center">
              <span className="material-icons mb-1">info</span>
              <span>About</span>
            </div>
          </Link>
          <Link to="/case-studies" className={cn("text-sm hover:text-cyan-500 transition font-medium", getActiveClass('/case-studies'))}>
            <div className="flex flex-col items-center">
              <span className="material-icons mb-1">work</span>
              <span>Work</span>
            </div>
          </Link>
          <Link to="/admin/case-studies" className={cn("text-sm hover:text-cyan-500 transition font-medium", getActiveClass('/admin'))}>
            <div className="flex flex-col items-center">
              <span className="material-icons mb-1">admin_panel_settings</span>
              <span>Admin</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

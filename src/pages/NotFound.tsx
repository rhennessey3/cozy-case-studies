
import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const NotFound: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-white">
      {isSmallScreen ? <TopNavbar /> : <Navbar />}
      <div className={cn("container mx-auto py-24 flex flex-col items-center justify-center", !isSmallScreen && "ml-[4.5rem]")}>
        <h1 className="text-6xl font-bold text-cozy-800 mb-4">404</h1>
        <p className="text-2xl mb-8">Page not found</p>
        <Link to="/" className="px-6 py-3 bg-cozy-500 text-white rounded-md hover:bg-cozy-600 transition-colors">
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;

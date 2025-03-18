
import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <div className="container mx-auto py-24 flex flex-col items-center justify-center">
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


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cozy-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Case Studies</h3>
            <p className="text-cozy-200 mb-6 max-w-md">
              Showcasing our best work and the meaningful impact we've made for our clients.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white/90">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cozy-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cozy-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white/90">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cozy-200 hover:text-white transition-colors">
                  UX Design
                </Link>
              </li>
              <li>
                <Link to="/" className="text-cozy-200 hover:text-white transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link to="/" className="text-cozy-200 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/" className="text-cozy-200 hover:text-white transition-colors">
                  Healthcare
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cozy-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cozy-300">© {currentYear} Case Studies. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-cozy-300 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-cozy-300 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

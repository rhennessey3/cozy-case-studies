
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cozy-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="border-t border-cozy-800 pt-6 flex flex-col md:flex-row justify-between items-center">
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

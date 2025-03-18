
import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cozy-800 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Cozy Studio</h3>
            <p className="text-cozy-200 mb-6 max-w-sm">
              Creating innovative solutions that transform ideas into impactful 
              experiences for businesses in the digital landscape.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cozy-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cozy-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-cozy-200 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-cozy-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-cozy-200 hover:text-white transition-colors">About</a></li>
              <li><a href="/case-studies" className="text-cozy-200 hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-cozy-200">
                <MapPin className="h-4 w-4 mr-2" /> 
                <span>123 Design Street, Creative City</span>
              </li>
              <li className="flex items-center text-cozy-200">
                <Mail className="h-4 w-4 mr-2" />
                <span>hello@cozystudio.com</span>
              </li>
              <li className="flex items-center text-cozy-200">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cozy-700 mt-8 pt-8 text-cozy-300 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Cozy Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

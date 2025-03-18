
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const StrapiTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Strapi Connection Test</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This page helps you test the connection to your Strapi CMS.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <StrapiConnectionTest />
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/strapi-config">
                <Settings className="mr-2 h-4 w-4" />
                Advanced Configuration
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrapiTestPage;


import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const StrapiTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Strapi Connection Test</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This page helps you test the connection to your Strapi CMS, even before you've set up any content types.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Testing Without Content Types</AlertTitle>
            <AlertDescription>
              You can use this test to verify your basic Strapi connection before setting up any content types.
              The test will simply try to connect to your Strapi API root endpoint.
            </AlertDescription>
          </Alert>
          
          <StrapiConnectionTest />
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/strapi-config">
                <Settings className="mr-2 h-4 w-4" />
                Advanced Configuration
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <a href="https://docs.strapi.io/user-docs/content-types-builder" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Content Types Guide
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrapiTestPage;

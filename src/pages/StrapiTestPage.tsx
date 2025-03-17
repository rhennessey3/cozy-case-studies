
import React from 'react';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';

const StrapiTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Strapi Connection Test</h1>
        <div className="max-w-2xl mx-auto">
          <StrapiConnectionTest />
          
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Strapi Cloud Configuration Guide</h2>
            <p className="mb-4">
              To properly connect your frontend with Strapi Cloud, make sure you've set these environment variables in your Strapi Cloud project:
            </p>
            <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm">
                <code>{`// In Strapi Cloud dashboard under Settings > Variables
FRONTEND_URL=https://cozy-case-studies.vercel.app`}</code>
              </pre>
            </div>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Current Configuration:</h3>
            <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
              <pre className="text-sm">
                <code>{`// Your frontend .env settings
VITE_STRAPI_API_URL=${import.meta.env.VITE_STRAPI_API_URL || 'Not set'}
VITE_FRONTEND_URL=${import.meta.env.VITE_FRONTEND_URL || 'Not set'}`}</code>
              </pre>
            </div>
            
            <p className="mt-4 text-gray-700">
              After updating the environment variables in Strapi Cloud, make sure to redeploy your Strapi application
              for the changes to take effect.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrapiTestPage;

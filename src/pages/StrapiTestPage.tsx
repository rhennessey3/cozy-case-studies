
import React from 'react';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const StrapiTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Strapi Connection Test</h1>
        <div className="max-w-2xl mx-auto">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              <p className="mb-2">
                <strong>Important:</strong> Most Strapi Cloud instances use a specific URL structure. 
                Ensure your URL in .env is correct and complete.
              </p>
              <p className="text-sm">
                Example: <code className="bg-blue-100 px-1 py-0.5 rounded">https://your-project-name.strapiapp.com</code>
              </p>
            </AlertDescription>
          </Alert>
          
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
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Common Troubleshooting:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>404 Not Found:</strong> Your Strapi URL might be incorrect or the instance is not running. Verify the URL in your Strapi Cloud dashboard.</li>
              <li><strong>CORS Errors:</strong> Make sure your frontend URL is properly configured in Strapi's CORS settings.</li>
              <li><strong>Connection Timeout:</strong> Your Strapi instance might be hibernating if you're using a free tier. Try accessing the admin dashboard to wake it up.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrapiTestPage;

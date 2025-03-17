
import React, { useState, useEffect } from 'react';
import { testStrapiConnection } from '@/services/strapiService';
import { Button } from './ui/button';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ConnectionStatus {
  success: boolean;
  url: string;
  status: string | number;
  statusText: string;
  message: string;
}

const StrapiConnectionTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [frontendUrl, setFrontendUrl] = useState<string>('');
  
  useEffect(() => {
    // Get current frontend URL for CORS instructions
    setFrontendUrl(window.location.origin);
  }, []);

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testStrapiConnection();
      setConnectionStatus(result as ConnectionStatus);
    } catch (error) {
      console.error("Error in connection test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if error is CORS-related
  const isCorsError = connectionStatus?.message?.includes('Network Error') || 
                      connectionStatus?.message?.toLowerCase().includes('cors') ||
                      connectionStatus?.statusText?.toLowerCase().includes('network error');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Strapi Connection Test</h2>
      
      {isCorsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>CORS Error Detected</AlertTitle>
          <AlertDescription>
            Your Strapi API is blocking requests from your frontend application.
            You need to configure CORS in your Strapi admin panel.
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-gray-600 mb-4">
        Test the connection to your Strapi CMS hosted on Railway. This will verify if your front-end 
        application can successfully connect to your Strapi instance.
      </p>
      
      <Button 
        onClick={handleTestConnection} 
        disabled={isLoading}
        className="w-full mb-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing Connection...
          </>
        ) : (
          'Test Strapi Connection'
        )}
      </Button>
      
      {connectionStatus && (
        <div className={`border rounded-md p-4 mb-4 ${connectionStatus.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <h3 className={`font-bold flex items-center ${connectionStatus.success ? 'text-green-700' : 'text-red-700'}`}>
            {connectionStatus.success ? (
              <><CheckCircle2 className="mr-2 h-4 w-4" /> Connection Successful</>
            ) : (
              <><AlertTriangle className="mr-2 h-4 w-4" /> Connection Failed</>
            )}
          </h3>
          <div className="mt-2 text-sm">
            <p><strong>URL:</strong> {connectionStatus.url}</p>
            <p><strong>Status:</strong> {connectionStatus.status} {connectionStatus.statusText}</p>
            <p><strong>Message:</strong> {connectionStatus.message}</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Your Strapi URL: {import.meta.env.VITE_STRAPI_API_URL || 'Not set'}</p>
        <p>Your Frontend URL: {frontendUrl || 'Unknown'}</p>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-medium text-blue-800">CORS Configuration Instructions:</p>
          <ol className="list-decimal pl-5 mt-1 text-blue-700">
            <li>Log in to your Strapi admin panel at: <a href={`${import.meta.env.VITE_STRAPI_API_URL}/admin`} target="_blank" rel="noopener noreferrer" className="underline">Strapi Admin Panel</a></li>
            <li>Go to Settings → Security → CORS</li>
            <li>Add your frontend URL (<code className="bg-blue-100 px-1">{frontendUrl}</code>) to the allowed origins</li>
            <li>Save your settings</li>
            <li>Wait a few minutes for the changes to propagate</li>
            <li>Come back here and test the connection again</li>
          </ol>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="font-medium text-yellow-800">Troubleshooting Tips:</p>
          <ul className="list-disc pl-5 mt-1 text-yellow-700">
            <li>Make sure to include the protocol (<code>https://</code>) in your frontend URL when adding to CORS settings</li>
            <li>Strapi running on Railway may need a few minutes to update CORS settings</li>
            <li>Check if your Strapi server is running and accessible</li>
            <li>Verify that your Strapi API URL is correct</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrapiConnectionTest;


import React, { useState } from 'react';
import { testStrapiConnection } from '@/services/strapiService';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Strapi Connection Test</h2>
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
          <h3 className={`font-bold ${connectionStatus.success ? 'text-green-700' : 'text-red-700'}`}>
            {connectionStatus.success ? '✅ Connection Successful' : '❌ Connection Failed'}
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
        <p className="mt-2">
          <strong>Connection Troubleshooting:</strong>
        </p>
        <ul className="list-disc pl-5 mt-1">
          <li>Check if your Strapi server is running and accessible</li>
          <li>Verify that CORS is properly configured in your Strapi settings</li>
          <li>Make sure your Railway deployment is active</li>
          <li>Check that your Strapi API URL is correct</li>
        </ul>
      </div>
    </div>
  );
};

export default StrapiConnectionTest;

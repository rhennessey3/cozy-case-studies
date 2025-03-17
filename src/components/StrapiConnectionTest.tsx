
import React, { useState, useEffect } from 'react';
import { testStrapiConnection } from '@/services/strapiService';
import { Button } from './ui/button';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import CorsConfigDialog from './CorsConfigDialog';

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
  const [strapiUrl, setStrapiUrl] = useState<string>('');
  
  useEffect(() => {
    // Get current frontend URL for CORS instructions
    setFrontendUrl(window.location.origin);
    setStrapiUrl(import.meta.env.VITE_STRAPI_API_URL || 'https://your-strapi-url.com');
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
  
  // Extract the Railway app URL for display purposes
  const railwayAppUrl = strapiUrl.includes('railway.app') 
    ? strapiUrl 
    : 'your-strapi-app.up.railway.app';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Strapi Connection Test</h2>
      
      {isCorsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>CORS Error Detected</AlertTitle>
          <AlertDescription>
            Your Strapi API is blocking requests from your frontend application.
            <div className="mt-2">
              <CorsConfigDialog 
                frontendUrl={frontendUrl || import.meta.env.VITE_FRONTEND_URL || window.location.origin} 
                strapiUrl={strapiUrl} 
              />
            </div>
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
        <p className="break-all"><strong>Your Strapi URL:</strong> {import.meta.env.VITE_STRAPI_API_URL || 'Not set'}</p>
        <p className="break-all"><strong>Your Frontend URL:</strong> {frontendUrl || 'Unknown'}</p>
        
        {!isCorsError && (
          <div className="mt-2">
            <CorsConfigDialog 
              frontendUrl={frontendUrl || import.meta.env.VITE_FRONTEND_URL || window.location.origin} 
              strapiUrl={strapiUrl} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StrapiConnectionTest;

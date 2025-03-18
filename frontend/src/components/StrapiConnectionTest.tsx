
import React, { useState, useEffect } from 'react';
import { testStrapiConnection } from '@/services/strapiService';
import { Button } from './ui/button';
import { Loader2, AlertTriangle, CheckCircle2, Info, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import CorsConfigDialog from './CorsConfigDialog';
import { toast } from './ui/use-toast';
import { Badge } from './ui/badge';

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
    
    // Show toast with deployment details
    toast({
      title: "Deployment Information",
      description: `Frontend: ${window.location.origin} | Strapi: ${import.meta.env.VITE_STRAPI_API_URL || 'Not configured'}`,
      duration: 6000,
    });
  }, []);

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testStrapiConnection();
      setConnectionStatus(result as ConnectionStatus);
      
      if ((result as ConnectionStatus).success) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Strapi CMS",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error in connection test:", error);
      toast({
        title: "Connection Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if error is CORS-related
  const isCorsError = connectionStatus?.message?.includes('Network Error') || 
                      connectionStatus?.message?.toLowerCase().includes('cors') ||
                      connectionStatus?.statusText?.toLowerCase().includes('network error');
  
  // Check if error is 404-related
  const is404Error = connectionStatus?.status === '404' || 
                     connectionStatus?.status === 404 ||
                     connectionStatus?.message?.includes('404') ||
                     connectionStatus?.message?.includes('Not Found');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Strapi Connection Test</h2>
        <Badge variant={import.meta.env.VITE_STRAPI_API_URL ? "default" : "destructive"}>
          {import.meta.env.VITE_STRAPI_API_URL ? "ENV Configured" : "ENV Missing"}
        </Badge>
      </div>
      
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
      
      {is404Error && (
        <Alert variant="destructive" className="mb-4 border-amber-500 bg-amber-50">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-700">API Endpoint Not Found (404)</AlertTitle>
          <AlertDescription className="text-amber-700">
            <p className="mb-2">The Strapi API endpoint couldn't be found at <code className="bg-amber-100 px-1 py-0.5 rounded">{strapiUrl}/api</code></p>
            <p className="mb-2">Possible solutions:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Verify your Strapi URL in the .env file is correct</li>
              <li>Make sure your Strapi instance is running</li>
              <li>Check if your Strapi has a different API path structure</li>
              <li>Confirm your Strapi deployment is complete and accessible</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-gray-600 mb-4">
        This tool tests the connection between your Vercel deployment at <strong>{window.location.origin}</strong> and 
        your Strapi CMS at <strong>{import.meta.env.VITE_STRAPI_API_URL || 'Not configured'}</strong>.
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
        <p className="break-all"><strong>Strapi URL:</strong> {import.meta.env.VITE_STRAPI_API_URL || 'Not set'}</p>
        <p className="break-all"><strong>Frontend URL:</strong> {frontendUrl || 'Unknown'}</p>
        <p className="break-all mt-1">
          <strong>Vercel Environment Variables:</strong> Make sure you've set <code>VITE_STRAPI_API_URL</code> in your Vercel project settings.
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <CorsConfigDialog 
            frontendUrl={frontendUrl || import.meta.env.VITE_FRONTEND_URL || window.location.origin} 
            strapiUrl={strapiUrl} 
          />
          
          <Button variant="outline" size="sm" className="text-xs" asChild>
            <a href={`${strapiUrl}/admin`} target="_blank" rel="noopener noreferrer">
              Open Strapi Admin <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StrapiConnectionTest;

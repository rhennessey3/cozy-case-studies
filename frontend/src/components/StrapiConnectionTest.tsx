
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

const StrapiConnectionTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
      const response = await axios.get(`${apiUrl}/api/ping`);
      
      if (response.status === 200) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
        setError('Unexpected response from Strapi API');
      }
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Error connecting to Strapi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold mb-4">Strapi CMS Connection Status</h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin text-gray-500" />
            <p>Testing connection...</p>
          </div>
        ) : isConnected === true ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
            <p className="text-green-600 font-medium">Successfully connected to Strapi API</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
            <p className="text-amber-600 font-medium">Failed to connect to Strapi API</p>
            {error && <p className="text-sm text-gray-500 mt-1">{error}</p>}
          </div>
        )}
        
        <Button
          onClick={testConnection}
          className="mt-4"
          variant="outline"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StrapiConnectionTest;

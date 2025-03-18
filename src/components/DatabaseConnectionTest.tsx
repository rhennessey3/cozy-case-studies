
import React, { useState } from 'react';
import { testDatabaseConnection } from '@/services';
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

const DatabaseConnectionTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  
  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testDatabaseConnection();
      setConnectionStatus(result as ConnectionStatus);
    } catch (error) {
      console.error("Error in connection test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Database Connection Test</h2>
      
      <p className="text-gray-600 mb-4">
        Test the connection to your Supabase database. This will verify if your front-end 
        application can successfully connect to your database instance.
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
          'Test Database Connection'
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
            <p><strong>Status:</strong> {connectionStatus.status} {connectionStatus.statusText}</p>
            <p><strong>Message:</strong> {connectionStatus.message}</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Note:</strong> If the connection fails, check your Supabase URL and API key in your environment variables.</p>
      </div>
    </div>
  );
};

export default DatabaseConnectionTest;

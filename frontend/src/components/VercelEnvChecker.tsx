
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info, Check, AlertTriangle } from 'lucide-react';
import { Separator } from './ui/separator';

const VercelEnvChecker: React.FC = () => {
  const strapiUrl = import.meta.env.VITE_STRAPI_API_URL;
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
  const debugMode = import.meta.env.VITE_DEBUG_MODE;
  
  const envVariables = [
    { name: 'VITE_STRAPI_API_URL', value: strapiUrl, required: true },
    { name: 'VITE_FRONTEND_URL', value: frontendUrl, required: false },
    { name: 'VITE_DEBUG_MODE', value: debugMode, required: false }
  ];
  
  const missingRequired = envVariables.filter(env => env.required && !env.value);
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Vercel Environment Variables</h2>
      
      {missingRequired.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Missing Required Environment Variables</AlertTitle>
          <AlertDescription>
            The following required environment variables are missing from your Vercel deployment:
            <ul className="list-disc list-inside mt-1">
              {missingRequired.map(env => (
                <li key={env.name}>{env.name}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>How to Add Environment Variables in Vercel</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside text-sm space-y-1 mt-1">
            <li>Go to your Vercel dashboard and select this project</li>
            <li>Click on "Settings" and navigate to "Environment Variables"</li>
            <li>Add each variable and its value</li>
            <li>Select all environments (Production, Preview, Development)</li>
            <li>Click "Save" and redeploy your application</li>
          </ol>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-gray-700">Current Environment Variables:</h3>
        
        {envVariables.map((env, index) => (
          <div key={env.name}>
            {index > 0 && <Separator className="my-3" />}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm flex items-center">
                  {env.name} 
                  {env.required && <span className="text-red-500 ml-1">*</span>}
                </p>
                <p className="text-xs text-gray-500 mt-1 break-all">
                  {env.value ? env.value : 'Not set'}
                </p>
              </div>
              <div>
                {env.value ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-5">
        * Required variables must be set for proper function
      </p>
    </div>
  );
};

export default VercelEnvChecker;

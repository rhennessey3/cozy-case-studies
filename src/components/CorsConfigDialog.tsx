import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileCode, Cog, Code } from 'lucide-react';

interface CorsConfigDialogProps {
  frontendUrl: string;
  strapiUrl: string;
}

const CorsConfigDialog: React.FC<CorsConfigDialogProps> = ({ frontendUrl, strapiUrl }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          How to Fix CORS Issues
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            How to Fix CORS Issues in Strapi
          </DialogTitle>
          <DialogDescription>
            You need to configure your Strapi instance to accept requests from your frontend application.
            There are two ways to fix this issue:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="border rounded-md p-4">
            <h3 className="font-bold flex items-center mb-2">
              <Cog className="h-5 w-5 mr-2 text-blue-600" />
              Method 1: Using Strapi Admin Panel
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Log in to your Strapi admin panel at: <a href={`${strapiUrl}/admin`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{strapiUrl}/admin</a></li>
              <li>Go to <span className="font-mono bg-gray-100 px-1 rounded">Settings → Security → CORS</span></li>
              <li>Add your frontend URL to the allowed origins: <span className="font-mono bg-gray-100 px-1 rounded">{frontendUrl}</span></li>
              <li>Save your settings</li>
              <li>Wait a few minutes for the changes to propagate (especially on Railway deployments)</li>
            </ol>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-bold flex items-center mb-2">
              <FileCode className="h-5 w-5 mr-2 text-blue-600" />
              Method 2: Editing config/middlewares.js
            </h3>
            <p className="text-sm mb-2">
              If the admin panel method doesn't work, you may need to modify the Strapi configuration file directly:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Access your Strapi project files</li>
              <li>Open the file <span className="font-mono bg-gray-100 px-1 rounded">config/middlewares.js</span></li>
              <li>Find the <span className="font-mono bg-gray-100 px-1 rounded">strapi::cors</span> middleware configuration</li>
              <li>Modify it to include your frontend URL:</li>
            </ol>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
              <pre className="text-xs">
                <code>
{`module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['${frontendUrl}', 'http://localhost:3000', 'http://localhost:5173']
    }
  },
  // ...other middleware configs
];`}
                </code>
              </pre>
            </div>
          </div>
          
          <div className="border rounded-md p-4 bg-blue-50">
            <h3 className="font-bold flex items-center mb-2">
              <Code className="h-5 w-5 mr-2 text-blue-600" />
              Testing the CORS Configuration
            </h3>
            <p className="text-sm">
              After making these changes, come back to your frontend application and click the "Test Strapi Connection" button again.
              If configured correctly, you should see a successful connection response.
            </p>
            <p className="text-sm mt-2">
              <strong>Note:</strong> Changes to CORS settings may take a few minutes to apply, especially on hosted platforms like Railway.
            </p>
          </div>
        </div>
        
        <DialogClose asChild>
          <Button className="w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CorsConfigDialog;

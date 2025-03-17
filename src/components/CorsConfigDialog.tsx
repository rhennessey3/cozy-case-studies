
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
import { AlertTriangle, FileCode, Cog, Code, ExternalLink } from 'lucide-react';

interface CorsConfigDialogProps {
  frontendUrl: string;
  strapiUrl: string;
}

const CorsConfigDialog: React.FC<CorsConfigDialogProps> = ({ frontendUrl, strapiUrl }) => {
  // Extract the actual Railway domain from the URL for easier reading
  const railwayDomain = strapiUrl.includes('railway.app') 
    ? strapiUrl.split('//')[1] 
    : strapiUrl.replace('https://', '');

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
              <li>Log in to your Strapi admin panel on Railway (note: use the URL from your browser, not the one below if they differ)
                <div className="mt-1 mb-1">
                  <a href={`${strapiUrl}/admin`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                    {strapiUrl}/admin
                  </a>
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  If that URL doesn't work, try the Railway dashboard URL format:
                  <span className="block mt-1 font-mono bg-gray-100 px-1 rounded break-all">[your-app-name].up.railway.app/admin</span>
                </div>
              </li>
              <li>Go to <span className="font-mono bg-gray-100 px-1 rounded">Settings → Security → CORS</span></li>
              <li>Add your frontend URL to the allowed origins: <span className="font-mono bg-gray-100 px-1 rounded break-all">{frontendUrl}</span></li>
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
              If the admin panel method doesn't work, you'll need to modify the Strapi configuration file directly on Railway:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Access your Railway dashboard:
                <div className="mt-1 mb-2">
                  <a href="https://railway.app/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center">
                    railway.app/dashboard <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </li>
              <li>
                Find and click on your Strapi project
              </li>
              <li>
                Under "Deployments", find your latest successful deployment and click on it
              </li>
              <li>
                Click on the "Files" tab to access the file explorer
                <div className="mt-1 mb-2">
                  <img src="https://railway.app/brand/logotype-light.svg" alt="Railway Files Tab" className="h-6 my-1" />
                  <div className="text-xs bg-gray-100 p-2 rounded my-1">
                    Look for tabs like: Logs | Variables | <span className="font-bold">Files</span> | Settings
                  </div>
                </div>
              </li>
              <li>
                Navigate to <span className="font-mono bg-gray-100 px-1 rounded">config/middlewares.js</span>
                <div className="text-xs text-gray-600 mt-1">
                  (If you don't see a Files tab, you might need to redeploy with the "Source" deployment type instead of "Docker")
                </div>
              </li>
              <li>Modify the file to include your frontend URL in the CORS configuration:</li>
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
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <strong>Note:</strong> If you don't see a Files tab in Railway, you may be using a Docker deployment. In this case, you'll need to:
              </p>
              <ol className="list-decimal pl-5 mt-2 text-sm text-yellow-800">
                <li>Clone your Strapi project repository</li>
                <li>Make the changes locally</li>
                <li>Push the changes back to your repository</li>
                <li>Railway will automatically redeploy your application</li>
              </ol>
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


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
import { AlertTriangle, FileCode, Cog, Code, ExternalLink, Github, KeyRound, Search, Check } from 'lucide-react';

interface CorsConfigDialogProps {
  frontendUrl: string;
  strapiUrl: string;
}

const CorsConfigDialog: React.FC<CorsConfigDialogProps> = ({ frontendUrl, strapiUrl }) => {
  // Extract the actual Strapi domain from the URL for easier reading
  const strapiDomain = strapiUrl.includes('strapi.app') 
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            How to Fix CORS Issues in Strapi Cloud
          </DialogTitle>
          <DialogDescription>
            You need to configure your Strapi Cloud instance to accept requests from your frontend application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="border rounded-md p-4">
            <h3 className="font-bold flex items-center mb-2">
              <Cog className="h-5 w-5 mr-2 text-blue-600" />
              Method 1: Using Strapi Admin Panel
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Log in to your Strapi Cloud admin panel (note: use the URL from your browser, not the one below if they differ)
                <div className="mt-1 mb-1">
                  <a href={`${strapiUrl}/admin`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                    {strapiUrl}/admin
                  </a>
                </div>
              </li>
              <li>Go to <span className="font-mono bg-gray-100 px-1 rounded">Settings → Security → CORS</span></li>
              <li>Add your frontend URL to the allowed origins: <span className="font-mono bg-gray-100 px-1 rounded break-all">{frontendUrl}</span></li>
              <li>Save your settings</li>
              <li>Wait a few minutes for the changes to propagate</li>
            </ol>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-bold flex items-center mb-2">
              <FileCode className="h-5 w-5 mr-2 text-blue-600" />
              Method 2: Using Environment Variables
            </h3>
            <p className="text-sm mb-2">
              You can set environment variables in your Strapi Cloud dashboard:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Log in to your Strapi Cloud dashboard</li>
              <li>Navigate to your project</li>
              <li>Go to Settings → Variables</li>
              <li>Add a new variable named <span className="font-mono bg-gray-100 px-1 rounded">FRONTEND_URL</span> with value: <span className="font-mono bg-gray-100 px-1 rounded break-all">{frontendUrl}</span></li>
              <li>Save changes and wait for your Strapi instance to redeploy</li>
            </ol>
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
              <strong>Note:</strong> Changes to CORS settings may take a few minutes to apply, especially on Strapi Cloud.
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

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
import { AlertTriangle, FileCode, Cog, Code, ExternalLink, Github, KeyRound, Search } from 'lucide-react';

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
              <Github className="h-5 w-5 mr-2 text-blue-600" />
              Method 2: Using the Railway Strapi Template
            </h3>
            <p className="text-sm mb-2">
              If you're having trouble accessing your current Strapi repository, you can create a new one using Railway's official Strapi template:
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <h4 className="font-bold flex items-center mb-2 text-sm">
                <ExternalLink className="h-4 w-4 mr-2 text-blue-600" />
                Creating a New Strapi Instance with Railway Template
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-blue-800">
                <li>Visit the <a href="https://github.com/railwayapp-templates/strapi" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Railway Strapi Template Repository</a></li>
                <li>Click the green "Use this template" button and select "Create a new repository"</li>
                <li>Name your repository (e.g., "my-strapi-cms")</li>
                <li>Make the repository public or private as you prefer</li>
                <li>Click "Create repository from template"</li>
                <li>Once created, deploy this repository to Railway:
                  <div className="mt-1">
                    <a href="https://railway.app/template/strapi" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Deploy Strapi on Railway with One Click</a>
                  </div>
                  <span className="block mt-1">Or visit your Railway dashboard, create a new project, and select "Deploy from GitHub repo"</span>
                </li>
                <li>After deployment, you'll have a fresh Strapi instance that you can configure</li>
              </ol>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <h4 className="font-bold flex items-center mb-2 text-sm">
                <KeyRound className="h-4 w-4 mr-2 text-amber-600" />
                Configuring CORS in Your New Strapi Instance
              </h4>
              <p className="text-xs text-amber-800 mb-2">
                Once your new Strapi instance is deployed on Railway, you can clone the repository to set up CORS:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-amber-800">
                <li>Clone your new repository:
                  <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs overflow-x-auto">
                    git clone https://github.com/[your-username]/[your-repo-name].git
                  </div>
                </li>
                <li>Navigate to the project directory:
                  <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs overflow-x-auto">
                    cd [your-repo-name]
                  </div>
                </li>
                <li>Find and edit the CORS configuration file at <span className="font-mono bg-gray-100 px-1 rounded">config/middlewares.js</span></li>
              </ol>
            </div>
            
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Open the <span className="font-mono bg-gray-100 px-1 rounded">config/middlewares.js</span> file in your code editor and modify the CORS configuration:
              </li>
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
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <strong>GitHub Workflow:</strong> After making these changes:
              </p>
              <ol className="list-decimal pl-5 mt-2 text-sm text-blue-800">
                <li>Commit your changes to the repository:
                  <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs">
                    git add config/middlewares.js<br />
                    git commit -m "Add CORS configuration for frontend"
                  </div>
                </li>
                <li>Push the changes to GitHub:
                  <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs">
                    git push origin main
                  </div>
                </li>
                <li>Railway will automatically deploy the new changes</li>
                <li>Wait a few minutes for the deployment to complete</li>
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

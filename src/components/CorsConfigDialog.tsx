
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
import { AlertTriangle, FileCode, Cog, Code, ExternalLink, Github, KeyRound } from 'lucide-react';

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
              Method 2: GitHub Repository Configuration
            </h3>
            <p className="text-sm mb-2">
              Since your Strapi project is deployed via GitHub, you'll need to modify the CORS configuration in your repository:
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <h4 className="font-bold flex items-center mb-2 text-sm">
                <KeyRound className="h-4 w-4 mr-2 text-amber-600" />
                Setting up GitHub Authentication
              </h4>
              <p className="text-xs text-amber-800 mb-2">
                GitHub no longer supports password authentication for Git operations. You need to use a personal access token or SSH key.
              </p>
              <div className="space-y-2 text-xs text-amber-800">
                <p className="font-semibold">Option 1: Use a Personal Access Token (Recommended for beginners)</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">GitHub → Settings → Developer settings → Personal access tokens</a></li>
                  <li>Click "Generate new token" and select "Fine-grained tokens"</li>
                  <li>Set an expiration date and give the token a name like "Strapi Project"</li>
                  <li>Under Repository access, select the Strapi repository</li>
                  <li>Under Permissions → Repository permissions, give "Contents" access: Read and write</li>
                  <li>Generate the token and copy it</li>
                  <li>When cloning, use the token as your password:
                    <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs overflow-x-auto">
                      git clone https://github.com/your-username/your-strapi-repo.git<br />
                      Username: your-github-username<br />
                      Password: your-personal-access-token
                    </div>
                  </li>
                </ol>
                
                <p className="font-semibold mt-3">Option 2: Configure SSH (Best for developers)</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Check if you have an existing SSH key: <span className="font-mono bg-gray-100 px-1 rounded">ls -al ~/.ssh</span></li>
                  <li>Generate a new SSH key if needed: <span className="font-mono bg-gray-100 px-1 rounded">ssh-keygen -t ed25519 -C "your_email@example.com"</span></li>
                  <li>Add the key to the ssh-agent: 
                    <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs">
                      eval "$(ssh-agent -s)"<br />
                      ssh-add ~/.ssh/id_ed25519
                    </div>
                  </li>
                  <li>Copy your public key to clipboard:
                    <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs">
                      # On macOS:<br />
                      pbcopy &lt; ~/.ssh/id_ed25519.pub<br />
                      # On Windows (in PowerShell):<br />
                      Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
                    </div>
                  </li>
                  <li>Add the SSH key to your GitHub account at <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">GitHub → Settings → SSH and GPG keys</a></li>
                  <li>Clone using SSH instead:
                    <div className="bg-gray-100 p-1 rounded-md mt-1 mb-1 font-mono text-xs">
                      git clone git@github.com:your-username/your-strapi-repo.git
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                After setting up GitHub authentication, clone your Strapi repository:
                <div className="bg-gray-100 p-2 rounded-md mt-1 mb-2 font-mono text-xs">
                  # For HTTPS with personal access token:<br />
                  git clone https://github.com/your-username/your-strapi-repo.git<br /><br />
                  # Or for SSH:<br />
                  git clone git@github.com:your-username/your-strapi-repo.git
                </div>
              </li>
              <li>
                Open the project in your code editor (like VS Code)
              </li>
              <li>
                Find and edit the file: <span className="font-mono bg-gray-100 px-1 rounded">config/middlewares.js</span>
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

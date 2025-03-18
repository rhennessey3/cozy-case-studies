
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';
import VercelEnvChecker from '@/components/VercelEnvChecker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StrapiConfigPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Strapi Configuration</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This page helps you test and troubleshoot your Strapi CMS integration with your Vercel deployment.
        </p>
        
        <Tabs defaultValue="connection" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="connection">Connection Test</TabsTrigger>
            <TabsTrigger value="env">Environment Variables</TabsTrigger>
            <TabsTrigger value="help">Troubleshooting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection" className="mt-0">
            <StrapiConnectionTest />
          </TabsContent>
          
          <TabsContent value="env" className="mt-0">
            <VercelEnvChecker />
          </TabsContent>
          
          <TabsContent value="help" className="mt-0">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Troubleshooting Strapi in Production</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-medium mb-2">Common Issues & Solutions</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">CORS Errors</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        CORS errors occur when your Strapi backend doesn't recognize your frontend domain.
                      </p>
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-800 text-sm">
                          Add your Vercel deployment URL (<code className="bg-blue-100 px-1 rounded">{window.location.origin}</code>) 
                          to the allowed origins in your Strapi CORS settings.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">404 Not Found Errors</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        This usually means your Strapi URL is incorrect or the endpoint doesn't exist.
                      </p>
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-800 text-sm">
                          Double-check your Strapi URL in Vercel environment variables and make sure
                          the case-studies collection type exists in your Strapi instance.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Permission Errors (403)</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Your Strapi permissions may not allow public access to your content.
                      </p>
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-800 text-sm">
                          In Strapi admin, go to Settings → Roles → Public and ensure the 
                          "find" and "findOne" permissions are enabled for your content types.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Content Not Appearing</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        If you can connect but don't see your content, check that it's published.
                      </p>
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-800 text-sm">
                          Make sure your case studies are published in Strapi and have all required fields
                          including a valid slug. Also check the query parameters in your API requests.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-medium mb-3">Helpful Resources</h3>
                  <div className="space-y-2">
                    <Button variant="outline" asChild className="w-full justify-between">
                      <a href="https://docs.strapi.io/dev-docs/configurations/api" target="_blank" rel="noopener noreferrer">
                        Strapi API Configuration
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full justify-between">
                      <a href="https://docs.strapi.io/dev-docs/configurations/middlewares#cors" target="_blank" rel="noopener noreferrer">
                        Strapi CORS Configuration
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full justify-between">
                      <a href="https://vercel.com/docs/concepts/projects/environment-variables" target="_blank" rel="noopener noreferrer">
                        Vercel Environment Variables
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default StrapiConfigPage;

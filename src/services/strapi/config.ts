
// Configuration values for Strapi service
import { toast } from '@/components/ui/use-toast';

// Get the Strapi API URL from environment variables
export const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
export const API_URL = `${STRAPI_URL}/api`;
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

// Add debug mode to easily toggle verbose logging
export const DEBUG = import.meta.env.VITE_DEBUG_MODE === 'true' || true;

// Log environment variable information on startup
export const logStrapiConfig = () => {
  console.log('==========================================');
  console.log('Strapi Configuration:');
  console.log(`VITE_STRAPI_API_URL env variable: ${import.meta.env.VITE_STRAPI_API_URL ? 'Set ✅' : 'Not set ❌'}`);
  console.log(`Using Strapi URL: ${STRAPI_URL}`);
  console.log(`API endpoint: ${API_URL}/case-studies`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log(`Debug mode: ${DEBUG ? 'Enabled ✅' : 'Disabled ❌'}`);
  console.log('==========================================');
};

// Initialize by logging config
logStrapiConfig();

// Helper for displaying toast notifications for connection errors
export const displayConnectionError = (error: any) => {
  let errorMessage = 'Unknown error occurred';
  
  if (error.code === 'ERR_NETWORK' || (error.message && error.message.includes('Network Error'))) {
    toast({
      title: "CORS Error",
      description: `Add ${FRONTEND_URL} to allowed origins in Strapi CORS settings.`,
      variant: "destructive"
    });
  } else if (error.response?.status === 403) {
    toast({
      title: "Permission Error",
      description: "Strapi returned a 403 Forbidden error. Please check permissions for case studies.",
      variant: "destructive"
    });
  } else {
    toast({
      title: "API Error",
      description: `Failed to fetch from Strapi: ${error.message}`,
      variant: "destructive"
    });
  }
  
  return errorMessage;
};

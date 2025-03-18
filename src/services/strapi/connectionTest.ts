
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { STRAPI_URL, API_URL, FRONTEND_URL } from './config';

/**
 * Tests the basic connection to the Strapi CMS without requiring specific content types
 * @returns A promise that resolves to an object with connection status information
 */
export const testStrapiConnection = async () => {
  try {
    console.log(`Testing connection to Strapi CMS at ${STRAPI_URL}`);
    console.log(`Frontend URL: ${FRONTEND_URL}`);
    
    // First try the simplest connection to the root API endpoint
    // This doesn't require any content types to be set up
    const response = await axios.get(`${STRAPI_URL}/api`, { 
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Origin': FRONTEND_URL
      }
    });
    
    // If we get here, basic connection was successful
    console.log('✅ Successfully connected to Strapi CMS');
    
    // Let's check if the server returned any useful info about available endpoints
    console.log('Available Strapi API endpoints:', response.data);
    
    let message = 'Successfully connected to Strapi CMS';
    if (response.data && response.data.data) {
      message += '. Server is responding properly.';
    }
    
    toast({
      title: "Connection Successful",
      description: `Connected to Strapi CMS at ${STRAPI_URL}`,
      variant: "default"
    });
    
    return {
      success: true,
      url: STRAPI_URL,
      status: response.status,
      statusText: response.statusText,
      message: message
    };
  } catch (error) {
    console.error('❌ Failed to connect to Strapi CMS:', error);
    
    let errorMessage = 'Unknown error occurred';
    let status: string | number = 'Unknown';
    let statusText = '';
    
    if (axios.isAxiosError(error)) {
      statusText = error.message;
      errorMessage = error.message;
      status = error.response?.status?.toString() || 'Network Error';
      
      // Check if this is a CORS error
      if (error.code === 'ERR_NETWORK' || (error.message && error.message.includes('Network Error'))) {
        errorMessage = `CORS Error: Your frontend (${FRONTEND_URL}) is not allowed to access the Strapi API. Please add your frontend URL to the CORS settings in Strapi.`;
        status = 'CORS Error';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Connection timed out. Strapi CMS may be down or unreachable.';
      } else if (error.response?.status === 404) {
        // This is likely due to Strapi not being configured or the endpoint path being incorrect
        errorMessage = `404 Not Found: The Strapi API endpoint was not found at ${STRAPI_URL}/api. This could be because:
          1. The Strapi instance is not running
          2. Strapi has a different API path
          3. The URL format is incorrect (many Strapi Cloud instances use /api as their endpoint)
          
          Try checking if the URL is correct in your Strapi Cloud dashboard.`;
      } else if (error.response?.status === 403) {
        errorMessage = 'Access forbidden. Please check Strapi permissions.';
      }
    }
    
    toast({
      title: "Connection Failed",
      description: errorMessage,
      variant: "destructive"
    });
    
    return {
      success: false,
      url: STRAPI_URL,
      status,
      statusText,
      message: errorMessage
    };
  }
};

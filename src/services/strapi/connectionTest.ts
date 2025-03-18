
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { FRONTEND_URL } from './config';

/**
 * Tests the connection to the Supabase database
 * @returns A promise that resolves to an object with connection status information
 */
export const testStrapiConnection = async () => {
  try {
    console.log(`Testing connection to Supabase database`);
    console.log(`Frontend URL: ${FRONTEND_URL}`);
    
    // Try to fetch a count of case studies as a simple test
    const { count, error } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      throw error;
    }
    
    // If we get here, connection was successful
    console.log('✅ Successfully connected to Supabase database');
    toast({
      title: "Connection Successful",
      description: `Connected to Supabase database with ${count} case studies`,
      variant: "default"
    });
    
    return {
      success: true,
      status: 200,
      statusText: "OK",
      message: 'Successfully connected to Supabase database'
    };
  } catch (error) {
    console.error('❌ Failed to connect to Supabase database:', error);
    
    let errorMessage = 'Unknown error occurred';
    let status: string | number = 'Unknown';
    let statusText = '';
    
    if (error instanceof Error) {
      statusText = error.message;
      errorMessage = error.message;
      status = 'Error';
      
      if (error.message.includes('fetch failed')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('JWT')) {
        errorMessage = 'Authentication error. Please check your Supabase API key.';
      }
    }
    
    toast({
      title: "Connection Failed",
      description: errorMessage,
      variant: "destructive"
    });
    
    return {
      success: false,
      status,
      statusText,
      message: errorMessage
    };
  }
};

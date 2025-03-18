
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DatabaseConnectionTest from '@/components/DatabaseConnectionTest';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const DatabaseTestPage: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-gray-50">
      {isSmallScreen ? <TopNavbar /> : <Navbar />}
      <div className={cn("container mx-auto py-12 px-4", !isSmallScreen && "ml-[4.5rem]")}>
        <h1 className="text-3xl font-bold mb-4 text-center">Database Connection Test</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This page helps you test the connection to your Supabase database.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Testing Database Connection</AlertTitle>
            <AlertDescription>
              You can use this test to verify your Supabase connection is working properly.
              The test will try to connect to your database and query the case studies table.
            </AlertDescription>
          </Alert>
          
          <DatabaseConnectionTest />
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/case-studies">
                <FileText className="mr-2 h-4 w-4" />
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DatabaseTestPage;

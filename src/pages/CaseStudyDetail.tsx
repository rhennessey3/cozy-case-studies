import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { useQuery } from '@tanstack/react-query';
import { getCaseStudyBySlug } from '@/services';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isAdminRoute = window.location.pathname.includes('/admin/');
  const navigate = useNavigate();
  
  // Log when component renders and what slug we're looking for
  useEffect(() => {
    console.log(`CaseStudyDetail rendering with slug: ${slug}`);
    
    // Dismiss any persistent toasts when mounting the component
    toast.dismiss();
  }, [slug]);

  const { data: caseStudy, isLoading, error, refetch } = useQuery({
    queryKey: ['caseStudy', slug],
    queryFn: () => {
      console.log(`Fetching case study with slug: ${slug}`);
      if (!slug) {
        toast.error('No case study slug provided');
        return Promise.reject(new Error('No case study slug provided'));
      }
      return getCaseStudyBySlug(slug);
    },
    enabled: !!slug,
    retry: isAdminRoute ? 0 : 1, // Don't retry in admin mode
    meta: {
      onError: (err: any) => {
        console.error('Error loading case study:', err);
        toast.error(`Failed to load case study: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {isSmallScreen ? <TopNavbar /> : <Navbar />}
        <div className={cn("text-center p-8", !isSmallScreen && "ml-[4.5rem]")}>
          <Loader2 className="h-12 w-12 animate-spin text-cozy-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-cozy-700 mb-2">Loading Case Study</h2>
          <p className="text-cozy-500">Fetching data from database...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {isSmallScreen ? <TopNavbar /> : <Navbar />}
        <div className={cn(
          "container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center",
          !isSmallScreen && "ml-[4.5rem]"
        )}>
          <Alert variant={isAdminRoute ? "info" : "destructive"} className="max-w-xl w-full mb-6">
            {isAdminRoute ? (
              <Info className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertTitle>
              {isAdminRoute 
                ? "Creating New Case Study" 
                : "Error Loading Case Study"}
            </AlertTitle>
            <AlertDescription>
              {isAdminRoute 
                ? `You're creating a new case study with slug "${slug}". Fill in the form and save to create it.` 
                : error instanceof Error 
                  ? error.message 
                  : "We couldn't load this case study. It may not exist or there was a connection issue with our database."}
            </AlertDescription>
          </Alert>
          
          {!isAdminRoute && (
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => navigate('/case-studies')}>
                View All Case Studies
              </Button>
            </div>
          )}
          
          {!isAdminRoute && (
            <div className="mt-8 p-6 border rounded-lg bg-white max-w-xl">
              <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Check that the case study slug is correct</li>
                <li>Verify your Supabase connection is working</li>
                <li>Ensure the case study exists in the database</li>
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {isSmallScreen ? <TopNavbar /> : <Navbar />}
      <div className={cn(!isSmallScreen && "ml-[4.5rem]")}>
        <CaseStudyContent caseStudy={caseStudy} />
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudyDetail;

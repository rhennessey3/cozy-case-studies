
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { useQuery } from '@tanstack/react-query';
import { getCaseStudyBySlug } from '@/services';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  
  const { data: caseStudy, isLoading, error, refetch } = useQuery({
    queryKey: ['caseStudy', slug],
    queryFn: () => getCaseStudyBySlug(slug || ''),
    enabled: !!slug,
    retry: 1
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
          <Alert variant="destructive" className="max-w-xl w-full mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Case Study</AlertTitle>
            <AlertDescription>
              {error instanceof Error 
                ? error.message 
                : "We couldn't load this case study. It may not exist or there was a connection issue with our database."}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
            <Button asChild>
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
          
          <div className="mt-8 p-6 border rounded-lg bg-white max-w-xl">
            <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Check that the case study slug is correct</li>
              <li>Verify your Supabase connection is working</li>
              <li>Ensure the case study exists in the database</li>
            </ul>
          </div>
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
      </div>
    </div>
  );
};

export default CaseStudyDetail;

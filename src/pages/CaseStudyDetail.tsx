
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { getCaseStudyBySlug } from '@/services';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(`CaseStudyDetail rendering with slug: ${slug}`);
    toast.dismiss();
    return () => {
      toast.dismiss();
    };
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
    retry: 1
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {isSmallScreen ? <TopNavbar /> : <Navbar />}
        <div className={cn("text-center p-8", !isSmallScreen && "ml-[4.5rem]")}>
          <Loader2 className="h-12 w-12 animate-spin text-cozy-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-cozy-700 mb-2">Loading Case Study</h2>
          <p className="text-cozy-500">Fetching case study data...</p>
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
                : "We couldn't load this case study. It may not exist or there was a connection issue."}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
            <Button onClick={() => navigate('/case-studies')}>
              View All Case Studies
            </Button>
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
        {caseStudy && <CaseStudyContent caseStudy={caseStudy} />}
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudyDetail;

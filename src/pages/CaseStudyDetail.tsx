
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudyBySlug } from '@/services/strapiService';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from '@/components/ui/use-toast';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsDrawerOpen(document.body.classList.contains('drawer-open'));
    };
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        navigate('/404');
        return;
      }

      try {
        const data = await getCaseStudyBySlug(slug);
        if (!data) {
          navigate('/404');
          return;
        }
        
        console.log("Fetched case study:", data);
        
        // Check if sections exist
        if (!data.sections || data.sections.length === 0) {
          toast({
            title: "Missing sections",
            description: "This case study doesn't have any sections defined in Strapi.",
            variant: "destructive"
          });
        }
        
        setCaseStudy(data);
      } catch (error) {
        console.error('Failed to fetch case study:', error);
        toast({
          title: "Error loading case study",
          description: "There was a problem loading this case study. Using fallback data.",
          variant: "destructive"
        });
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {isSmallScreen ? (
          <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
        ) : (
          <Navbar className="fixed top-0 left-0 right-0 z-50" />
        )}
        <div 
          className={cn(
            "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out",
            !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
            isSmallScreen && "pt-16" // Add top padding for the TopNavbar
          )}
        >
          <ScrollArea className="h-full w-full">
            <div className="min-h-full">
              <Skeleton className="w-full h-screen" />
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  if (!caseStudy) return null;

  return (
    <div className="min-h-screen bg-background">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50" />
      )}
      
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out",
          !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
          isSmallScreen && "pt-16" // Add top padding for the TopNavbar
        )}
      >
        <ScrollArea className="h-full w-full">
          <div className="min-h-full">
            <CaseStudyContent caseStudy={caseStudy} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyDetail;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const caseStudy = caseStudies.find(study => study.slug === slug);

  useEffect(() => {
    if (!caseStudy) {
      navigate('/404');
    }
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
  }, [caseStudy, navigate]);

  if (!caseStudy) {
    return null;
  }

  const { title, coverImage, category } = caseStudy;

  return (
    <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      <div className={cn("fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out", isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]")}>
        <ScrollArea className="h-full w-full">
          <div className="min-h-full">
            <CaseStudyHero 
              title={title}
              coverImage={coverImage}
              category={category}
            />
            <CaseStudyContent caseStudy={caseStudy} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyDetail;

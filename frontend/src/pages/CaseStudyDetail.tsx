
import React from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyIntro from '@/components/case-study/CaseStudyIntro';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { useQuery } from '@tanstack/react-query';
import { getCaseStudyBySlug } from '@/services/strapiService';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ['caseStudy', slug],
    queryFn: () => getCaseStudyBySlug(slug || ''),
    enabled: !!slug
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !caseStudy) {
    return <div className="min-h-screen flex items-center justify-center">Case study not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <CaseStudyHero 
        title={caseStudy.title}
        coverImage={caseStudy.coverImage}
        category={caseStudy.category}
        objective={caseStudy.content.challenge}
        approach={caseStudy.content.approach}
        results={caseStudy.content.results}
      />
      <CaseStudyIntro caseStudy={caseStudy} />
      <CaseStudyContent caseStudy={caseStudy} />
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;

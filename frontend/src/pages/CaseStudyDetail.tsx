
import React from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyIntro from '@/components/case-study/CaseStudyIntro';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';
import { useQuery } from '@tanstack/react-query';
import { fetchCaseStudyBySlug } from '@/services/strapiService';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ['caseStudy', slug],
    queryFn: () => fetchCaseStudyBySlug(slug || ''),
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
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyIntro caseStudy={caseStudy} />
      <CaseStudyContent caseStudy={caseStudy} />
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;

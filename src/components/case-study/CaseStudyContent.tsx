
import React from 'react';
import CaseStudyIntro from './CaseStudyIntro';
import UserResearchSection from './UserResearchSection';
import UserNeedsSection from './UserNeedsSection';
import UserFlowSection from './UserFlowSection';
import IterationSection from './IterationSection';
import PrototypingSection from './PrototypingSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const CaseStudyContent = () => {
  return (
    <>
      <CaseStudyIntro />
      <UserResearchSection />
      <UserNeedsSection />
      <UserFlowSection />
      <IterationSection />
      <PrototypingSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default CaseStudyContent;

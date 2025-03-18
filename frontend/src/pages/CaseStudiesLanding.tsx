
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';

const CaseStudiesLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Case Studies</h1>
        <CaseStudiesGrid />
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudiesLanding;

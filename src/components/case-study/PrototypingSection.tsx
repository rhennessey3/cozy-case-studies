
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface PrototypingSectionProps {
  caseStudy: CaseStudy;
}

const PrototypingSection: React.FC<PrototypingSectionProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className="py-16 bg-[#f3f3f3]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-[#221F26] mb-12 text-left`}>Key Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`${isExtraSmallScreen ? 'text-lg' : 'text-xl'} font-semibold text-[#403E43] mb-3 text-left`}>Project Impact</h3>
                <p className="text-[#222222] text-left mb-8">
                  {caseStudy.content.results.split('.')[0]}.
                </p>
                
                <h3 className={`${isExtraSmallScreen ? 'text-lg' : 'text-xl'} font-semibold text-[#403E43] mb-3 text-left`}>Business Value</h3>
                <p className="text-[#222222] text-left">
                  {caseStudy.content.results.split('.')[1] || caseStudy.content.conclusion.split('.')[0]}.
                </p>
              </div>
              
              <div>
                <h3 className={`${isExtraSmallScreen ? 'text-lg' : 'text-xl'} font-semibold text-[#403E43] mb-3 text-left`}>User Benefits</h3>
                <p className="text-[#222222] text-left mb-8">
                  {caseStudy.content.solution.split('.')[1] || caseStudy.content.solution}.
                </p>
                
                <h3 className={`${isExtraSmallScreen ? 'text-lg' : 'text-xl'} font-semibold text-[#403E43] mb-3 text-left`}>Conclusion</h3>
                <p className="text-[#222222] text-left">
                  {caseStudy.content.conclusion}
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=80&w=800" 
                alt="Final product showcase" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrototypingSection;

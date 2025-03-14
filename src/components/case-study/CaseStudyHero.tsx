
import React from 'react';

interface CaseStudyHeroProps {
  title: string;
  coverImage: string;
  category: string;
}

const CaseStudyHero = ({ title, coverImage, category }: CaseStudyHeroProps) => {
  return (
    <section className="h-screen flex">
      <div className="w-full bg-[#f5f5f5] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-left">
                <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Objective</h3>
                <p className="text-sm md:text-base">To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.</p>
              </div>
              
              <div className="text-left">
                <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Approach</h3>
                <p className="text-sm md:text-base">Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.</p>
              </div>
              
              <div className="text-left">
                <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Results</h3>
                <p className="text-sm md:text-base">30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-[calc(20%+1.5rem)] left-0 w-[50%] h-[15%] bg-black bg-opacity-30 flex items-center">
          <div className="container mx-auto px-4">
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                <span className="block px-[57px]">{category}</span>
                <span className="block text-[#89c5cc] text-xl md:text-2xl mt-1 px-[58px]">{title}</span>
              </h2>
              <p className="text-white text-sm md:text-base mt-2 px-[58px]">
                A case study showcasing innovative solutions and measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;

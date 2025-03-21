
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { CaseStudyHeroProps } from '../CaseStudyHero';

type MobileHeroProps = Omit<CaseStudyHeroProps, 'category'>;

const MobileHero: React.FC<MobileHeroProps> = ({
  title,
  coverImage,
  objective,
  approach,
  results,
  objectiveHeading,
  approachHeading,
  resultsHeading
}) => {
  return (
    <>
      <AspectRatio ratio={1 / 1} className="w-full">
        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
      </AspectRatio>
      
      {/* Mobile view - title and sections in one continuous block */}
      <div className="w-full bg-[#221F26]">
        <div className="container mx-auto px-4">
          <div className="py-4 pb-0">
            <h2 className="text-white text-2xl font-bold leading-tight">
              <span className="block px-0 py-1">{title}</span>
            </h2>
            <Separator className="bg-[#89c5cc] h-0.5 w-16 mt-2 mb-4" />
          </div>
        </div>
        
        {/* Three sections container for mobile - directly connected */}
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 gap-4 text-white">
            <div className="text-left">
              <h3 className="text-[#89c5cc] text-xl font-bold mb-2">{objectiveHeading}</h3>
              <p className="text-sm">{objective}</p>
            </div>
            
            <div className="text-left">
              <h3 className="text-[#89c5cc] text-xl font-bold mb-2">{approachHeading}</h3>
              <p className="text-sm">{approach}</p>
            </div>
            
            <div className="text-left">
              <h3 className="text-[#89c5cc] text-xl font-bold mb-2">{resultsHeading}</h3>
              <p className="text-sm">{results}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHero;


import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '@/data/caseStudies';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  const { title, coverImage, slug, height } = caseStudy;
  
  // Make sure we have a valid slug (defensive coding)
  const safeSlug = slug || '';
  
  // Add console log to debug the link path
  console.log(`Creating case study link to: /case-studies/${safeSlug}`);
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl border border-cozy-100 h-full",
        height === "tall" ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/case-studies/${safeSlug}`} className="block relative h-full">
        <div className="relative aspect-video overflow-hidden h-full">
          <img 
            src={coverImage} 
            alt={title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-transparent p-4 text-white">
            <h3 className="text-lg font-medium transform transition-all duration-500 ease-in-out group-hover:translate-y-[-5px]">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from '@/data/caseStudies';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  const { title, coverImage, category = "Case Study", slug, height, description, summary } = caseStudy;
  
  // Extract first 40 characters of description/summary or use placeholder
  const excerptText = (description || summary)
    ? (description || summary).length > 40 
      ? `${(description || summary).substring(0, 40)}...` 
      : (description || summary)
    : "View case study details...";
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl border border-cozy-100 h-full",
        height === "tall" ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/case-study/${slug}`} className="block relative h-full">
        <div className="relative aspect-video overflow-hidden h-full">
          <img 
            src={coverImage} 
            alt={title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 hover:bg-white text-cozy-800">
              {category}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-transparent p-4 text-white">
            <h3 className="text-lg font-medium transform transition-all duration-500 ease-in-out group-hover:translate-y-[-5px]">{title}</h3>
            <p className="text-sm mt-0.5 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-in-out">{excerptText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard;

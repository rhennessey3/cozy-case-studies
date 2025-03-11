
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
  const { title, coverImage, category, slug, height, description } = caseStudy;
  
  // Extract first 40 characters of description or use placeholder
  const excerptText = description 
    ? description.length > 40 
      ? `${description.substring(0, 40)}...` 
      : description
    : "View case study details...";
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl border border-cozy-100 h-full",
        height === "tall" ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/case-study/${slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 hover:bg-white text-cozy-800">
              {category}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white transform transition-all duration-300 group-hover:translate-y-[-28px]">
            <h3 className="text-lg font-medium line-clamp-1 transition-all duration-300">{title}</h3>
            <p className="text-sm mt-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 line-clamp-2">{excerptText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard;

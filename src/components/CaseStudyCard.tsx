
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
  const { title, summary, coverImage, category, slug, height } = caseStudy;
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl border border-cozy-100 h-full",
        height === "tall" ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/case-study/${slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
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
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-cozy-900 group-hover:text-cozy-700 transition-colors">
            {title}
          </h3>
          <p className="text-cozy-700 line-clamp-3 mb-4">
            {summary}
          </p>
          <div className="flex items-center text-cozy-600 font-medium group-hover:text-cozy-800 transition-colors">
            Read case study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard;


import React from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoBannerProps {
  className?: string;
}

const CompanyLogoBanner: React.FC<CompanyLogoBannerProps> = ({ className }) => {
  return (
    <div className={cn("py-4 px-8 bg-white w-full flex flex-wrap items-center justify-between", className)}>
      <div className="flex items-center space-x-8 mx-auto">
        {/* Placeholder for company logos - using div placeholders for now */}
        <div className="h-8 w-24 bg-gray-200 rounded opacity-50"></div>
        <div className="h-8 w-20 bg-gray-200 rounded opacity-50"></div>
        <div className="h-8 w-28 bg-gray-200 rounded opacity-50"></div>
        <div className="h-8 w-24 bg-gray-200 rounded opacity-50"></div>
        <div className="h-8 w-20 bg-gray-200 rounded opacity-50"></div>
      </div>
    </div>
  );
};

export default CompanyLogoBanner;

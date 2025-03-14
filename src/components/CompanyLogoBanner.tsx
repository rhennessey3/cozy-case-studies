
import React from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoBannerProps {
  className?: string;
}

const CompanyLogoBanner: React.FC<CompanyLogoBannerProps> = ({
  className,
}) => {
  // Array of company logos with their names for accessibility
  const companies = [
    { name: 'Microsoft', color: '#FFFFFF' },
    { name: 'Adobe', color: '#FFFFFF' },
    { name: 'Spotify', color: '#FFFFFF' },
    { name: 'Tesla', color: '#FFFFFF' },
    { name: 'Google', color: '#FFFFFF' },
  ];

  return (
    <div className={cn('w-full py-6 px-4', className)}>
      <p className="text-center text-sm text-white uppercase tracking-wide mb-4 font-medium">Trusted by leading companies</p>
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="opacity-80 hover:opacity-100 transition-all duration-300"
          >
            {/* Styled placeholder logo */}
            <div className="h-8 flex items-center justify-center">
              <div 
                className="rounded-md flex items-center justify-center" 
                style={{ color: company.color }}
              >
                <span className="font-bold text-sm text-white">{company.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogoBanner;


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
    { name: 'Microsoft', color: '#8E9196' },
    { name: 'Adobe', color: '#D946EF' },
    { name: 'Spotify', color: '#8B5CF6' },
    { name: 'Tesla', color: '#F97316' },
    { name: 'Google', color: '#0EA5E9' },
  ];

  return (
    <div className={cn('w-full py-8 bg-white/80 backdrop-blur-sm', className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <p className="text-center text-sm text-cozy-600 uppercase tracking-wide mb-6">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {/* Styled placeholder logo */}
              <div className="h-8 flex items-center justify-center">
                <div 
                  className="w-24 h-8 rounded flex items-center justify-center" 
                  style={{ backgroundColor: company.color }}
                >
                  <span className="font-bold text-xs text-white">{company.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoBanner;

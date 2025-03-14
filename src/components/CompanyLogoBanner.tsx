
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
    { name: 'Microsoft', logo: '/microsoft-logo.svg' },
    { name: 'Adobe', logo: '/adobe-logo.svg' },
    { name: 'Spotify', logo: '/spotify-logo.svg' },
    { name: 'Tesla', logo: '/tesla-logo.svg' },
    { name: 'Google', logo: '/google-logo.svg' },
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
              {/* Placeholder for company logos - using div with text for now */}
              <div className="h-8 flex items-center justify-center">
                <span className="font-bold text-xl text-cozy-800">{company.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoBanner;


import React from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoBannerProps {
  className?: string;
}

const CompanyLogoBanner: React.FC<CompanyLogoBannerProps> = ({
  className,
}) => {
  // Array of company logos with SVG data
  const companies = [
    {
      name: 'Microsoft',
      svg: (
        <svg viewBox="0 0 23 23" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 0H0V11H11V0Z" fill="#333333"/>
          <path d="M23 0H12V11H23V0Z" fill="#333333"/>
          <path d="M11 12H0V23H11V12Z" fill="#333333"/>
          <path d="M23 12H12V23H23V12Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Adobe',
      svg: (
        <svg viewBox="0 0 50 50" className="h-8 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.985 34.5H15.255L13.5 39H9L16.5 17.25H18.825L26.25 39H21.75L19.985 34.5ZM16.5 30.75H18.75L17.625 27.375L16.5 30.75Z" fill="#333333"/>
          <path d="M34.5 39H30.75V17.25H34.5V39Z" fill="#333333"/>
          <path d="M41.25 17.25V39H37.5V17.25H41.25Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Spotify',
      svg: (
        <svg viewBox="0 0 50 50" className="h-8 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM31.907 31.236C31.657 31.636 31.157 31.768 30.757 31.518C26.493 28.93 21.196 28.366 14.919 29.616C14.457 29.709 14.014 29.407 13.921 28.945C13.828 28.483 14.129 28.04 14.592 27.947C21.428 26.593 27.258 27.245 32.008 30.133C32.408 30.383 32.54 30.883 32.29 31.283V31.236ZM33.947 27.12C33.634 27.621 32.997 27.784 32.496 27.471C27.571 24.446 20.009 23.634 14.408 25.184C13.845 25.347 13.257 25.022 13.094 24.459C12.932 23.896 13.257 23.308 13.82 23.145C20.196 21.382 28.508 22.27 34.084 25.684C34.584 25.997 34.747 26.634 34.434 27.134L33.947 27.12ZM34.109 22.891C28.108 19.388 19.196 19.014 14.058 20.652C13.383 20.852 12.683 20.452 12.483 19.777C12.283 19.102 12.683 18.402 13.358 18.202C19.233 16.339 29.096 16.777 35.971 20.777C36.583 21.139 36.784 21.952 36.421 22.564C36.059 23.177 35.246 23.377 34.634 23.014L34.109 22.891Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Tesla',
      svg: (
        <svg viewBox="0 0 100 24" className="h-7 w-14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3.2V5.9H3.6V21.1H7.1V5.9H10.7V3.2H0Z" fill="#333333"/>
          <path d="M15.1 3.2L15 21.1H18.4V13.9H24.9V10.8H18.4V6.1H26.1V3.2H15.1Z" fill="#333333"/>
          <path d="M30.1 3.2V21.1H41.3V18H33.5V13.1H40.1V10.1H33.5V6.1H41V3.2H30.1Z" fill="#333333"/>
          <path d="M46.5 3.2L51.3 21.1H54.4L57.7 9.3L61 21.1H64.2L68.8 3.2H65.2L62.4 15.3L59.1 3.2H56.5L53.2 15.3L50.4 3.2H46.5Z" fill="#333333"/>
          <path d="M72.8 3.2V21.1H76.2V3.2H72.8Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Google',
      svg: (
        <svg viewBox="0 0 24 24" className="h-8 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.501 12.2332C22.501 11.3699 22.4296 10.7399 22.2748 10.0865H12.2153V13.9832H18.12C18.001 14.9515 17.3582 16.4099 15.9296 17.3898L15.9096 17.5203L19.0902 19.9352L19.3106 19.9565C21.3343 18.1249 22.501 15.4282 22.501 12.2332Z" fill="#333333"/>
          <path d="M12.214 22.5C15.107 22.5 17.5335 21.5666 19.3092 19.9567L15.9283 17.3899C15.0242 18.0083 13.801 18.4399 12.214 18.4399C9.38023 18.4399 6.96073 16.6083 6.10303 14.0766L5.98262 14.0871L2.68913 16.5954L2.64819 16.7132C4.41284 20.1433 8.0629 22.5 12.214 22.5Z" fill="#333333"/>
          <path d="M6.10343 14.0767C5.88676 13.4234 5.75843 12.7233 5.75843 12C5.75843 11.2767 5.88676 10.5767 6.0901 9.92337L6.08343 9.78423L2.75016 7.2356L2.64856 7.28667C1.91928 8.71002 1.50098 10.3083 1.50098 12C1.50098 13.6917 1.91928 15.29 2.64856 16.7133L6.10343 14.0767Z" fill="#333333"/>
          <path d="M12.214 5.55997C14.2256 5.55997 15.583 6.41163 16.3569 7.12335L19.3809 4.23C17.5202 2.53834 15.107 1.5 12.214 1.5C8.06287 1.5 4.41284 3.85665 2.64819 7.28662L6.08977 9.92332C6.96073 7.39166 9.38023 5.55997 12.214 5.55997Z" fill="#333333"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={cn('w-full py-6 px-4', className)}>
      <p className="text-center text-sm text-gray-700 uppercase tracking-wide mb-4 font-medium">Trusted by leading companies</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="opacity-80 hover:opacity-100 transition-all duration-300"
            title={company.name}
          >
            {company.svg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogoBanner;

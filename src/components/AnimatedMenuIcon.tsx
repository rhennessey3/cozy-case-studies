
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const AnimatedMenuIcon: React.FC<AnimatedMenuIconProps> = ({ isOpen, onClick, className }) => {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      <input 
        type="checkbox" 
        checked={isOpen}
        onChange={onClick}
        className="absolute w-16 h-16 z-50 opacity-0 cursor-pointer left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      
      {[1, 2].map((_, index) => (
        <div 
          key={index} 
          id="wrap"
          className={cn(
            "w-full h-full absolute flex justify-center items-center transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.575)] delay-[1.85s] pointer-events-none",
            isOpen ? "scale-x-90" : "",
            index === 1 ? "-z-10 before:content-[''] before:absolute before:z-50" : ""
          )}
        >
          {[1, 2, 3].map((_, svgIndex) => (
            <svg 
              key={svgIndex}
              id="Layer_1" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              x="0px" 
              y="0px"
              viewBox="0 0 820 864" 
              style={{ 
                // Fixed TypeScript error by using proper camelCase property name
                enableBackground: 'new 0 0 820 864' as any
              }}
              preserveAspectRatio="xMidYMid meet"
              className={cn(
                "absolute w-[120px] transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.575)] delay-[2s] -ml-[9px]",
                svgIndex === 0 ? "translate-y-[5px]" : "",
                svgIndex === 1 ? "-translate-y-[6px] scale-y-[-1]" : "",
                svgIndex === 2 ? "translate-y-[25px]" : "",
                isOpen && svgIndex === 0 ? "translate-y-0" : "",
                isOpen && svgIndex === 1 ? "translate-y-0 scale-y-[-1]" : ""
              )}
            >
              <g>
                <g id="Layer_1-2">
                  <path 
                    className={cn(
                      "stroke-black dark:stroke-white transition-all duration-[1.5s] ease-in-out",
                      "fill-none stroke-[12px] stroke-linecap-round",
                      !isOpen ? "stroke-dasharray-[4400px] stroke-dashoffset-[4200px]" : "",
                      isOpen ? "stroke-dasharray-[5000px] stroke-dashoffset-[-4150px] stroke-yellow-400" : "",
                      svgIndex === 1 ? "delay-[0.6s]" : "",
                      svgIndex === 2 ? "delay-[1.8s]" : "",
                      isOpen && svgIndex === 0 ? "delay-[0.5s]" : "",
                      isOpen && svgIndex === 1 ? "delay-[0.5s]" : "",
                      isOpen && svgIndex === 2 ? "stroke-dasharray-[10000px] stroke-dashoffset-[10000px] delay-[1s]" : ""
                    )}
                    d="M341.8,326.1h213c89.9-9.3,148.7-84.1,140-152c-7.6-58.9-67.1-121.3-133-109c-65.2,12.2-103.6,91.5-87,133
                    c15.6,39.1,72.5,25.7,104,73c34.8,52.2,4.4,126.9,1,135c-38.6,91.3-166.6,159.9-283,120c-83.1-28.5-148.1-108-153-203
                    c-5.2-102,61.1-181.2,130-217c105.2-54.7,222.8-11.2,288,42c134.2,109.5,141.4,337.4,56,424c-58.7,59.5-164.8,55.8-217,147
                    c-6.4,11.2-13.2,25.9-9,41c12.1,43.6,109.8,70.9,180,42c82.7-34.1,134.7-149.4,97-207c-35.2-53.7-145.1-52.1-210-14
                    c-39,22.9-40.8,46.7-85,69c-55.6,28.1-132.6,30.5-146,7c-14.9-26.2,38-103.1,320-320"
                  />
                </g>
              </g>
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedMenuIcon;

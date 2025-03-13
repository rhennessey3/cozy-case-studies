
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Need to check for window since GSAP plugins are client-side only
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      
      if (logoRef.current) {
        // Get the different SVG elements by their class names
        const border = logoRef.current.querySelector('.cls-1'); // The square border
        const letterH = logoRef.current.querySelector('.letter-h'); // The H
        const number3 = logoRef.current.querySelector('.number-3'); // The 3
        
        // First hide all paths
        gsap.set(border, { 
          opacity: 0,
          strokeDasharray: function(i, el) {
            const length = el.getTotalLength ? el.getTotalLength() : 100;
            return `${length} ${length}`;
          },
          strokeDashoffset: function(i, el) {
            const length = el.getTotalLength ? el.getTotalLength() : 100;
            return length;
          }
        });
        
        // Hide the H and 3 initially
        gsap.set([letterH, number3], {
          y: '100%',
          opacity: 0,
          fill: '#231f20'
        });
        
        // Start all animations at the same time with different durations to make them finish together
        // Border animation - has the longest path, give it more time
        tl.to(border, {
          duration: 2.5,
          opacity: 1,
          strokeDashoffset: 0,
          ease: "power2.inOut"
        }, 0); // Start at 0
        
        // H animation - medium length
        tl.to(letterH, {
          duration: 2.5, // Same duration to finish at the same time
          y: '0%',
          opacity: 1,
          ease: "power2.inOut"
        }, 0); // Start at 0
        
        // 3 animation - shortest
        tl.to(number3, {
          duration: 2.5, // Same duration to finish at the same time
          y: '0%',
          opacity: 1,
          ease: "power2.inOut"
        }, 0); // Start at 0
        
        // Now all text animation will begin after the logo animation completes
        tl.add(() => {
          // Text animations will trigger after logo animation completes
          const headingElements = document.querySelectorAll('.animate-fade-in');
          headingElements.forEach(element => {
            element.classList.add('animation-triggered');
          });
        });
        
        // Add breathing animation for the gradient
        const gradientElement = document.querySelector('.breathing-gradient');
        if (gradientElement) {
          gsap.to(gradientElement, {
            background: 'linear-gradient(to right, #e85d59, #e88073)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }
    }
  }, []);

  return (
    <section className="h-screen flex">
      <div className="w-1/3 breathing-gradient bg-gradient-to-r from-[#e85d59] to-[#e67573]"></div>
      <div className="w-2/3 bg-[#f5f5f5] flex items-center justify-center">
        <div className="max-w-lg px-8">
          <div className="flex justify-start mb-8">
            <svg 
              ref={logoRef}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 53.34 71.44" 
              className="h-28 w-28"
            >
              <defs>
                <style>
                  {`.cls-1{fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:7px;stroke-linecap:round;}
                  .letter-h, .number-3{fill:#231f20;overflow:hidden;}`}
                </style>
                <clipPath id="clip-path-h">
                  <path d="M14.5,57.51c-.67-.1-1-.23-1-.4V14.66c0-.37,1.26-.55,3.79-.55a19.67,19.67,0,0,1,2.8.15c.65.1,1,.23,1,.4V33.32A15.46,15.46,0,0,1,25,30.49a9.36,9.36,0,0,1,4.33-1.13A11.19,11.19,0,0,1,35,30.76a9.76,9.76,0,0,1,3.76,3.81A11.18,11.18,0,0,1,40,40V57.11c0,.37-1.26.55-3.78.55a19.94,19.94,0,0,1-2.78-.15c-.67-.1-1-.23-1-.4V41.44a5.65,5.65,0,0,0-1.34-3.94A4.46,4.46,0,0,0,27.65,36a10.66,10.66,0,0,0-6.59,2.5v18.6c0,.37-1.26.55-3.78.55A19.94,19.94,0,0,1,14.5,57.51Z" />
                </clipPath>
                <clipPath id="clip-path-3">
                  <path d="M33.78,23.1a.59.59,0,0,1,0-.14,3.3,3.3,0,0,1,.15-.87c.1-.36.2-.53.29-.53a5.58,5.58,0,0,0,1.52.21,2.39,2.39,0,0,0,1.08-.23,1.67,1.67,0,0,0,.69-.62,1.53,1.53,0,0,0,.24-.82,1.25,1.25,0,0,0-.47-1,1.79,1.79,0,0,0-1.17-.38,3.13,3.13,0,0,0-.39,0c-.09,0-.24-.18-.43-.52a1.33,1.33,0,0,1-.27-.64l1.74-1.76H34.19c-.08,0-.13-.24-.13-.7s0-.7.13-.7h4.28s.06.05.09.16a2.29,2.29,0,0,1,0,.54,1.61,1.61,0,0,1-.06.58l-.07.12-1.62,1.56a3.24,3.24,0,0,1,1.38.39,2.55,2.55,0,0,1,1,.95,2.63,2.63,0,0,1,.36,1.38,3.08,3.08,0,0,1-1.75,2.8,4.73,4.73,0,0,1-2.16.45A7.17,7.17,0,0,1,33.78,23.1Z" />
                </clipPath>
              </defs>
              <title>Logo</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path className="cls-1" d="M49.84,67.94H3.5V3.5H49.84Z" />
                  <g clipPath="url(#clip-path-h)">
                    <rect className="letter-h" x="13" y="13" width="27" height="45" />
                  </g>
                  <g clipPath="url(#clip-path-3)">
                    <rect className="number-3" x="33" y="14" width="8" height="10" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '2.7s', animationFillMode: 'forwards' }}>Creative Solutions for Modern Challenges</h1>
          <p className="text-lg md:text-xl text-gray-600 opacity-0 animate-fade-in" style={{ animationDelay: '3.0s', animationFillMode: 'forwards' }}>
            We craft innovative solutions that transform ideas into impactful experiences, 
            helping businesses achieve their goals in today's digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

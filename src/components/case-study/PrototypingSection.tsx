
import React from 'react';

const PrototypingSection = () => {
  return (
    <section className="py-16 bg-[#f3f3f3]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#221F26] mb-12 text-left">Prototyping UI</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#403E43] mb-3 text-left">Visual Design System</h3>
                <p className="text-[#222222] text-left mb-8">
                  We established a comprehensive design system with modular components, 
                  ensuring consistent visual language throughout the application while enabling 
                  rapid iteration and development.
                </p>
                
                <h3 className="text-xl font-semibold text-[#403E43] mb-3 text-left">Interaction Patterns</h3>
                <p className="text-[#222222] text-left">
                  We defined consistent interaction patterns for common tasks, reducing 
                  cognitive load for users and ensuring that similar actions had similar 
                  outcomes throughout the platform.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#403E43] mb-3 text-left">High-Fidelity Mockups</h3>
                <p className="text-[#222222] text-left mb-8">
                  Based on validated wireframes, we created pixel-perfect mockups 
                  of all key screens, incorporating feedback from stakeholders and 
                  maintaining accessibility standards.
                </p>
                
                <h3 className="text-xl font-semibold text-[#403E43] mb-3 text-left">Interactive Prototypes</h3>
                <p className="text-[#222222] text-left">
                  We built clickable prototypes to simulate the actual user experience, 
                  allowing stakeholders to experience the workflow before committing 
                  to development resources.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=80&w=800" 
                alt="UI prototype screens" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrototypingSection;

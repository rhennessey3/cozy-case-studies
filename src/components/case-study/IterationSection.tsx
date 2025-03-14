
import React from 'react';

const IterationSection = () => {
  return (
    <section className="py-16 bg-[#221F26]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-left">Iterating User Tasks Flowchart</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800" 
                alt="Initial wireframes" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Initial Wireframing</h3>
            <p className="text-gray-300 text-left">
              We developed low-fidelity wireframes based on our initial user flow diagrams to quickly test core 
              navigation patterns and task flows with real users. This allowed us to identify major usability issues 
              before investing in high-fidelity designs.
            </p>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                alt="User testing sessions" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">User Testing & Refinement</h3>
            <p className="text-gray-300 text-left">
              Each iteration was tested with representative users from all stakeholder groups. We observed their interaction 
              with the platform, documented pain points, and collected quantitative metrics on task completion rates and 
              time-on-task to measure improvements.
            </p>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800" 
                alt="Finalized user flow" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Optimized Final Flows</h3>
            <p className="text-gray-300 text-left">
              The final user flow diagrams achieved a 40% reduction in required steps while improving task completion rates 
              by 65%. These optimized flows formed the foundation for our high-fidelity prototypes and final UI implementation, 
              ensuring the platform remained intuitive for all users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IterationSection;


import React from 'react';

const UserFlowSection = () => {
  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-cozy-900 mb-4">User Tasks Flow Diagram</h2>
            <p className="text-lg text-cozy-700 mb-6">
              Based on our user research, we developed comprehensive task flow diagrams to visualize how different user types would 
              interact with the platform. These diagrams mapped the complete user journey from initial signup to completing core tasks.
            </p>
            <p className="text-lg text-cozy-700">
              The task flow analysis revealed several opportunities to simplify complex processes and create intuitive navigation paths. 
              By identifying decision points and potential roadblocks in advance, we were able to design interfaces that guided users 
              naturally through even the most complex workflows.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" 
                alt="User task flow diagrams" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserFlowSection;

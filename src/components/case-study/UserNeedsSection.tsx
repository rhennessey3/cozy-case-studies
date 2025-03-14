
import React from 'react';

const UserNeedsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
                alt="User needs analysis" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-8 md:mb-0 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-cozy-900 mb-4">User Needs Evaluation</h2>
            <p className="text-lg text-cozy-700 mb-6">
              After consolidating our interview findings, we conducted a thorough evaluation of user needs across all stakeholder groups. 
              This process revealed critical pain points in the existing fundraising workflow and highlighted opportunities for significant improvement.
            </p>
            <p className="text-lg text-cozy-700">
              We identified that organizers needed streamlined management tools, donors wanted transparent and secure payment options, 
              and administrators required comprehensive reporting capabilities. These insights directly informed our design decisions 
              and feature prioritization in the subsequent development phases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNeedsSection;

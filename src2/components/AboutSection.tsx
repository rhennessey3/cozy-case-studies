
import React from 'react';
import { Users, LightbulbIcon, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cozy-900">About Our Approach</h2>
          <p className="text-xl text-cozy-700 max-w-2xl mx-auto">
            We combine strategic thinking with design excellence to create meaningful solutions for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-cozy-100">
            <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-6 text-cozy-800">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-cozy-900">User-Centered</h3>
            <p className="text-cozy-700">
              We place users at the heart of everything we do, creating experiences that resonate with their needs and expectations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-cozy-100">
            <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-6 text-cozy-800">
              <LightbulbIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-cozy-900">Innovative Thinking</h3>
            <p className="text-cozy-700">
              We challenge conventions and explore new possibilities to deliver fresh, creative solutions to complex problems.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-cozy-100">
            <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-6 text-cozy-800">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-cozy-900">Results-Driven</h3>
            <p className="text-cozy-700">
              We focus on outcomes that matter, ensuring our work drives measurable impact for businesses and users alike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

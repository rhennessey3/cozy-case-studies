
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cozy-900">About Us</h1>
          <p className="text-xl text-cozy-700 max-w-3xl mx-auto">
            We are a team of passionate designers and developers dedicated to creating meaningful digital experiences that make a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cozy-900">Our Story</h2>
            <p className="text-cozy-700 mb-4">
              Founded in 2015, our agency began with a simple mission: to bridge the gap between aesthetically pleasing design and functional user experience. What started as a small team of three has now grown into a diverse collective of specialists across multiple disciplines.
            </p>
            <p className="text-cozy-700 mb-4">
              Over the years, we've worked with clients ranging from startups to established enterprises, helping them solve complex problems and create digital products that their users love. Our approach is collaborative, inclusive, and focused on delivering real value.
            </p>
            <p className="text-cozy-700">
              Today, we continue to evolve and adapt to the changing digital landscape, staying at the forefront of industry trends while remaining true to our core principle that good design should be accessible to all.
            </p>
          </div>
          <div className="bg-cozy-100 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900" 
              alt="Our team collaborating" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cozy-900 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
              <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Collaboration</h3>
              <p className="text-cozy-700">
                We believe the best solutions emerge from diverse perspectives working together toward a common goal.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
              <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Continuous Learning</h3>
              <p className="text-cozy-700">
                Our industry evolves rapidly, and we embrace the opportunity to grow and adapt alongside it.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
              <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Empathy</h3>
              <p className="text-cozy-700">
                Understanding the needs, motivations, and pain points of users is fundamental to our design process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
              <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Excellence</h3>
              <p className="text-cozy-700">
                We are committed to quality in everything we do, from the smallest details to the overall vision.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-cozy-50 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cozy-900 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-cozy-200 rounded-full flex items-center justify-center mb-4 mx-auto text-cozy-800 font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Discover</h3>
              <p className="text-cozy-700">
                We begin by understanding your business goals, user needs, and the context in which your product exists.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-cozy-200 rounded-full flex items-center justify-center mb-4 mx-auto text-cozy-800 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Design</h3>
              <p className="text-cozy-700">
                Based on research insights, we craft solutions that are both aesthetically pleasing and functionally effective.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-cozy-200 rounded-full flex items-center justify-center mb-4 mx-auto text-cozy-800 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-cozy-900">Deliver</h3>
              <p className="text-cozy-700">
                We implement the design with precision, test rigorously, and ensure a smooth handoff or launch.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;

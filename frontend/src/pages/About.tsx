
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>Our case studies platform showcases the best work from our design and development team.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

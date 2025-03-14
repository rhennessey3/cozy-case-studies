
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
const CaseStudyDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const caseStudy = caseStudies.find(study => study.slug === slug);
  useEffect(() => {
    if (!caseStudy) {
      navigate('/404');
    }
    const handleBodyClassChange = () => {
      setIsDrawerOpen(document.body.classList.contains('drawer-open'));
    };
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => {
      observer.disconnect();
    };
  }, [caseStudy, navigate]);
  if (!caseStudy) {
    return null;
  }
  const {
    title,
    coverImage,
    category,
    content
  } = caseStudy;
  return <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Fixed Back Button - moved 90px to the right from container edge and adjusted position, moved up by 12px */}
      <div className="fixed top-[1.53rem] z-40 container mx-auto px-4 max-w-4xl pl-[90px]">
        <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white/90" onClick={() => navigate('/case-studies')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to case studies
        </Button>
      </div>
      
      <div className={cn("fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out", isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]")}>
        <ScrollArea className="h-full w-full">
          <div className="min-h-full">
            {/* Case Study Hero */}
            <section className="h-screen flex">
              <div className="w-full bg-[#f5f5f5] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                </div>
                
                {/* Semi-transparent black overlay with three columns - positioned at bottom 20% */}
                <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                      <div className="text-left">
                        <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Objective</h3>
                        <p className="text-sm md:text-base">To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.</p>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Approach</h3>
                        <p className="text-sm md:text-base">Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.</p>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-[#89c5cc] text-base md:text-xl font-bold mb-2">Results</h3>
                        <p className="text-sm md:text-base">30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Title overlay positioned just above the bottom overlay with padding - width extended to fit title on one line */}
                <div className="absolute bottom-[calc(20%+1.5rem)] left-0 w-[50%] h-[15%] bg-black bg-opacity-30 flex items-center">
                  <div className="container mx-auto px-4">
                    <div>
                      <h2 className="text-white text-2xl md:text-3xl font-bold">
                        <span className="block px-[57px]">{category}</span>
                        <span className="block text-[#89c5cc] text-xl md:text-2xl mt-1 px-[58px]">{title}</span>
                      </h2>
                      <p className="text-white text-sm md:text-base mt-2 px-[58px]">
                        A case study showcasing innovative solutions and measurable results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Study Content - Modified to two columns */}
            <section className="min-h-screen bg-white py-20">
              <div className="container mx-auto px-4">
                {/* Updated headline with primary and subhead structure */}
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cozy-900">Turning Chaos into Opportunity</h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-6 text-cozy-600">Building a Streamlined Fundraising Platform</h2>
                
                <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md mb-8">
                  {category}
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left column - Content - Now aligned with container */}
                  <div className="prose prose-lg max-w-none md:pl-0">
                    <h2 className="text-cozy-900 text-left">Introduction</h2>
                    <p className="text-left">Managing a fundraiser with pen and paper is inefficient, confusing, and time-consuming for everyone involved. Recognizing this challenge, HoneyBaked Ham, in collaboration with its gift card fulfillment agency, set out to create a modern, digital fundraising platform that is easy to use, trustworthy, and highly profitable for all stakeholders.</p>
                    
                    <p className="text-left">The goal was clear: transition from paper-based fundraisers to a seamless online experience, reducing organizers' time to invest while unlocking a new revenue stream for HoneyBaked Ham. More importantly, this project could scale beyond just HoneyBaked Ham—offering the gift card fulfillment agency an opportunity to expand its services to multiple clients with similar needs.</p>
                    
                    <h2 className="text-cozy-900 text-left">The Challenge</h2>
                    <p className="text-left">{content.challenge}</p>
                    
                    <h2 className="text-cozy-900 text-left">Our Approach</h2>
                    <p className="text-left">{content.approach}</p>
                    
                    <h2 className="text-cozy-900 text-left">The Solution</h2>
                    <p className="text-left">{content.solution}</p>
                    
                    <h2 className="text-cozy-900 text-left">Results</h2>
                    <p className="text-left">{content.results}</p>
                    
                    <h2 className="text-cozy-900 text-left">Conclusion</h2>
                    <p className="text-left">{content.conclusion}</p>
                  </div>
                  
                  {/* Right column - Only Key Achievements */}
                  <div className="flex flex-col space-y-6">
                    <Card className="overflow-hidden shadow-lg rounded-lg border-0">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-cozy-800 mb-4">Key Achievements</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-cozy-500 rounded-full mr-2"></span>
                            <span>30% reduction in material usage</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-cozy-500 rounded-full mr-2"></span>
                            <span>45% increase in brand recognition</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-cozy-500 rounded-full mr-2"></span>
                            <span>100% biodegradable packaging</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-cozy-500 rounded-full mr-2"></span>
                            <span>20% cost reduction in shipping</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>;
};
export default CaseStudyDetail;

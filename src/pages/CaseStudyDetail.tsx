
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
      
      <div className="fixed top-[1.53rem] z-40 container mx-auto px-4 max-w-4xl pl-[90px]">
        <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white/90" onClick={() => navigate('/case-studies')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to case studies
        </Button>
      </div>
      
      <div className={cn("fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out", isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]")}>
        <ScrollArea className="h-full w-full">
          <div className="min-h-full">
            <section className="h-screen flex">
              <div className="w-full bg-[#f5f5f5] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                </div>
                
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

            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 order-2 md:order-1">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
                        alt="Fundraising platform development" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-8 md:mb-0 order-1 md:order-2">
                    <h2 className="text-3xl font-bold text-cozy-900 mb-4">Turning Chaos into Opportunity</h2>
                    <h3 className="text-2xl font-medium mb-6 text-cozy-600">Building a Streamlined Fundraising Platform</h3>
                    
                    <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md mb-6">
                      {category}
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-left">Managing a fundraiser with pen and paper is inefficient, confusing, and time-consuming for everyone involved. Recognizing this challenge, <strong>HoneyBaked Ham</strong>, in collaboration with its gift card fulfillment agency, set out to create a <strong>modern, digital fundraising platform</strong> that is <strong>easy to use, trustworthy, and highly profitable</strong> for all stakeholders.</p>
                      <br />
                      <p className="text-left">The goal was clear: <strong>transition from paper-based fundraisers to a seamless online experience</strong>, reducing organizers' time to invest while unlocking a new revenue stream for HoneyBaked Ham.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 bg-[#f9f9f9]">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold text-cozy-900 mb-4">User Interviewing & Empathy Maps</h2>
                    <p className="text-lg text-cozy-700 mb-6">
                      From the initial brief it was clear that four primary groups would be using this fundraising platform. 
                      I set up interviews to gather feedback from the experiences people have had during fundraising. 
                      This empathy map helped consolidate those findings we captured. It was later used to translate a 
                      clear set of goals, emotional needs and functional needs each user had.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800" 
                        alt="User interview sessions" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

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

            <section className="py-16 bg-[#221F26]">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-12 text-left">Iterating User Tasks Flowchart</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800" 
                        alt="Initial wireframes" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#89c5cc] mb-4">Initial Wireframing</h3>
                    <p className="text-gray-300 text-center">
                      We developed low-fidelity wireframes based on our initial user flow diagrams to quickly test core 
                      navigation patterns and task flows with real users. This allowed us to identify major usability issues 
                      before investing in high-fidelity designs.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                        alt="User testing sessions" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#89c5cc] mb-4">User Testing & Refinement</h3>
                    <p className="text-gray-300 text-center">
                      Each iteration was tested with representative users from all stakeholder groups. We observed their interaction 
                      with the platform, documented pain points, and collected quantitative metrics on task completion rates and 
                      time-on-task to measure improvements.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800" 
                        alt="Finalized user flow" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#89c5cc] mb-4">Optimized Final Flows</h3>
                    <p className="text-gray-300 text-center">
                      The final user flow diagrams achieved a 40% reduction in required steps while improving task completion rates 
                      by 65%. These optimized flows formed the foundation for our high-fidelity prototypes and final UI implementation, 
                      ensuring the platform remained intuitive for all users.
                    </p>
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

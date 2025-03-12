
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
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
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      observer.disconnect();
    };
  }, [caseStudy, navigate]);
  
  if (!caseStudy) {
    return null;
  }
  
  const { title, coverImage, category, content } = caseStudy;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out",
          isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"
        )}
      >
        <ScrollArea className="h-full w-full">
          <div className="min-h-full">
            {/* Case Study Hero */}
            <section className="h-screen flex">
              <div className="w-full bg-[#f5f5f5] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={coverImage} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* New transparent overlay positioned at 33% down from the top with 15% height */}
                <div className="absolute top-[33%] left-0 right-0 h-[15%] bg-black bg-opacity-30 flex items-center">
                  <div className="container mx-auto px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                      {category}: {title}
                    </h2>
                    <p className="text-white text-sm md:text-base mt-2">
                      A case study showcasing innovative solutions and measurable results.
                    </p>
                  </div>
                </div>
                
                {/* Semi-transparent black overlay with three columns - positioned at bottom 20% */}
                <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                      <div className="text-left">
                        <h3 className="text-base md:text-xl font-bold mb-2">Objective</h3>
                        <p className="text-sm md:text-base">To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.</p>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-base md:text-xl font-bold mb-2">Approach</h3>
                        <p className="text-sm md:text-base">Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.</p>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-base md:text-xl font-bold mb-2">Results</h3>
                        <p className="text-sm md:text-base">30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Study Content */}
            <section className="min-h-screen bg-white py-20">
              <div className="container mx-auto px-4 max-w-4xl">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-8 bg-white"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to case studies
                </Button>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md mb-8">
                  {category}
                </div>

                <article className="prose prose-lg max-w-none">
                  <h2 className="text-cozy-900">Introduction</h2>
                  <p>{content.intro}</p>
                  
                  <h2 className="text-cozy-900">The Challenge</h2>
                  <p>{content.challenge}</p>
                  
                  <h2 className="text-cozy-900">Our Approach</h2>
                  <p>{content.approach}</p>
                  
                  <h2 className="text-cozy-900">The Solution</h2>
                  <p>{content.solution}</p>
                  
                  <h2 className="text-cozy-900">Results</h2>
                  <p>{content.results}</p>
                  
                  <h2 className="text-cozy-900">Conclusion</h2>
                  <p>{content.conclusion}</p>
                </article>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyDetail;

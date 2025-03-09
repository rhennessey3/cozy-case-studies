
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const caseStudy = caseStudies.find(study => study.slug === slug);
  
  useEffect(() => {
    if (!caseStudy) {
      navigate('/404');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [caseStudy, navigate]);
  
  if (!caseStudy) {
    return null;
  }
  
  const { title, coverImage, category, content } = caseStudy;
  
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="h-96 relative">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-10">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-4 bg-white"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to case studies
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
              <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md">
                {category}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10 max-w-4xl">
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
          
          <div className="mt-16 border-t border-cozy-100 pt-8">
            <Button 
              className="bg-cozy-800 hover:bg-cozy-900 text-white"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to all case studies
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CaseStudyDetail;

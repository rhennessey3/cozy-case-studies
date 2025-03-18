
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import Footer from '@/components/Footer';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies, getCaseStudyBySlug } from '@/services';
import ImageUploader from '@/components/ImageUploader';

const CaseStudyEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    coverImage: '',
    category: '',
    height: '',
    intro: '',
    challenge: '',
    approach: '',
    solution: '',
    results: '',
    conclusion: '',
    // Additional fields for section images
    introImage: '',
    challengeImage: '',
    approachImage: '',
    solutionImage: '',
    resultsImage: '',
    conclusionImage: ''
  });
  
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
        toast.error('Failed to fetch case studies');
      }
    };

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await getCaseStudyBySlug(slug);
        if (data) {
          setCaseStudy(data);
          
          // Get section images if they exist
          const { data: sectionsData, error: sectionsError } = await supabase
            .from('case_study_sections')
            .select('*')
            .eq('case_study_id', data.id);
            
          let sectionImages = {
            introImage: '',
            challengeImage: '',
            approachImage: '',
            solutionImage: '',
            resultsImage: '',
            conclusionImage: ''
          };
          
          if (!sectionsError && sectionsData) {
            sectionsData.forEach(section => {
              if (section.component === 'intro' && section.image_url) {
                sectionImages.introImage = section.image_url;
              } else if (section.component === 'challenge' && section.image_url) {
                sectionImages.challengeImage = section.image_url;
              } else if (section.component === 'approach' && section.image_url) {
                sectionImages.approachImage = section.image_url;
              } else if (section.component === 'solution' && section.image_url) {
                sectionImages.solutionImage = section.image_url;
              } else if (section.component === 'results' && section.image_url) {
                sectionImages.resultsImage = section.image_url;
              } else if (section.component === 'conclusion' && section.image_url) {
                sectionImages.conclusionImage = section.image_url;
              }
            });
          }
          
          setForm({
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            description: data.description || '',
            coverImage: data.coverImage,
            category: data.category,
            height: data.height || '',
            intro: data.content.intro,
            challenge: data.content.challenge,
            approach: data.content.approach,
            solution: data.content.solution,
            results: data.content.results,
            conclusion: data.content.conclusion,
            ...sectionImages
          });
        }
      } catch (error) {
        console.error('Failed to fetch case study:', error);
        toast.error('Failed to fetch case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (field: string, imageUrl: string) => {
    setForm(prev => ({ ...prev, [field]: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Prepare case study data
      const caseStudyData = {
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        description: form.description || null,
        cover_image: form.coverImage,
        category: form.category,
        height: form.height || null
      };
      
      // Prepare content data
      const contentData = {
        intro: form.intro,
        challenge: form.challenge,
        approach: form.approach,
        solution: form.solution,
        results: form.results,
        conclusion: form.conclusion
      };

      let caseStudyId;

      if (slug) {
        // Update existing case study
        const { data: caseStudyResult, error: caseStudyError } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('slug', slug);
          
        if (caseStudyError) throw caseStudyError;
        
        // Get case study ID
        const { data: caseStudyIdData, error: caseStudyIdError } = await supabase
          .from('case_studies')
          .select('id')
          .eq('slug', slug)
          .single();
          
        if (caseStudyIdError) throw caseStudyIdError;
        
        caseStudyId = caseStudyIdData.id;
        
        // Update content
        const { data: contentResult, error: contentError } = await supabase
          .from('case_study_content')
          .update(contentData)
          .eq('case_study_id', caseStudyId);
          
        if (contentError) throw contentError;
      } else {
        // Create new case study
        const { data: newCaseStudy, error: caseStudyError } = await supabase
          .from('case_studies')
          .insert(caseStudyData)
          .select('id')
          .single();
          
        if (caseStudyError) throw caseStudyError;
        
        caseStudyId = newCaseStudy.id;
        
        // Create content
        const { data: contentResult, error: contentError } = await supabase
          .from('case_study_content')
          .insert({
            ...contentData,
            case_study_id: caseStudyId
          });
          
        if (contentError) throw contentError;
      }
      
      // Handle section images
      const sectionImageFields = [
        { name: 'introImage', component: 'intro' },
        { name: 'challengeImage', component: 'challenge' },
        { name: 'approachImage', component: 'approach' },
        { name: 'solutionImage', component: 'solution' },
        { name: 'resultsImage', component: 'results' },
        { name: 'conclusionImage', component: 'conclusion' }
      ];
      
      for (const field of sectionImageFields) {
        const imageUrl = form[field.name as keyof typeof form] as string;
        
        // Check if section exists
        const { data: existingSection, error: sectionQueryError } = await supabase
          .from('case_study_sections')
          .select('id')
          .eq('case_study_id', caseStudyId)
          .eq('component', field.component)
          .single();
          
        if (sectionQueryError && !sectionQueryError.message.includes('No rows found')) {
          console.error(`Error checking for section ${field.component}:`, sectionQueryError);
          continue;
        }
        
        if (existingSection) {
          // Update existing section
          const { error: updateSectionError } = await supabase
            .from('case_study_sections')
            .update({
              image_url: imageUrl || null
            })
            .eq('id', existingSection.id);
            
          if (updateSectionError) {
            console.error(`Error updating section ${field.component}:`, updateSectionError);
          }
        } else if (imageUrl) {
          // Create new section
          const { error: createSectionError } = await supabase
            .from('case_study_sections')
            .insert({
              case_study_id: caseStudyId,
              component: field.component,
              image_url: imageUrl,
              content: form[field.component as keyof typeof form] as string,
              sort_order: sectionImageFields.indexOf(field) + 1
            });
            
          if (createSectionError) {
            console.error(`Error creating section ${field.component}:`, createSectionError);
          }
        }
      }
      
      toast.success(slug ? 'Case study updated successfully' : 'Case study created successfully');
      
      if (!slug) {
        navigate(`/admin/case-studies/${form.slug}`);
      }
    } catch (error: any) {
      console.error('Error saving case study:', error);
      toast.error(`Failed to save case study: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const createNewCaseStudy = () => {
    setCaseStudy(null);
    setForm({
      title: '',
      slug: '',
      summary: '',
      description: '',
      coverImage: '',
      category: '',
      height: '',
      intro: '',
      challenge: '',
      approach: '',
      solution: '',
      results: '',
      conclusion: '',
      introImage: '',
      challengeImage: '',
      approachImage: '',
      solutionImage: '',
      resultsImage: '',
      conclusionImage: ''
    });
    navigate('/admin/case-studies');
  };

  const selectCaseStudy = (slug: string) => {
    navigate(`/admin/case-studies/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      )}
      
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out z-30",
          !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
          isSmallScreen && "pt-16"
        )}
      >
        <ScrollArea className="h-full">
          <section className="min-h-screen bg-white py-20">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-left max-w-screen-2xl mx-auto mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#EAEAEA]">
                  <h1 className="text-3xl md:text-4xl font-[900] text-[#1b1b1b]">
                    {slug ? 'EDIT CASE STUDY' : 'CREATE CASE STUDY'}
                  </h1>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={createNewCaseStudy}
                    >
                      New Case Study
                    </Button>
                    {slug && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/case-studies/${slug}`)}
                      >
                        View Live
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="max-w-4xl mx-auto">
                  <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
                  <div className="md:col-span-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-3">Case Studies</h3>
                      <div className="space-y-2">
                        {caseStudies.map(study => (
                          <div 
                            key={study.id}
                            className={cn(
                              "p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                              study.slug === slug && "bg-gray-200 font-medium"
                            )}
                            onClick={() => selectCaseStudy(study.slug)}
                          >
                            {study.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Tabs defaultValue="basics">
                        <TabsList className="mb-4">
                          <TabsTrigger value="basics">Basic Info</TabsTrigger>
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="images">Section Images</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="basics" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="font-medium">Title</label>
                              <Input 
                                name="title" 
                                value={form.title} 
                                onChange={handleChange} 
                                placeholder="Case Study Title"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="font-medium">Slug</label>
                              <Input 
                                name="slug" 
                                value={form.slug} 
                                onChange={handleChange} 
                                placeholder="case-study-slug"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Summary</label>
                            <Textarea 
                              name="summary" 
                              value={form.summary} 
                              onChange={handleChange} 
                              placeholder="Brief summary of the case study"
                              required
                              rows={2}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Description (Optional)</label>
                            <Textarea 
                              name="description" 
                              value={form.description} 
                              onChange={handleChange} 
                              placeholder="Detailed description"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ImageUploader
                              label="Cover Image"
                              currentImageUrl={form.coverImage}
                              onImageUploaded={(url) => handleImageUploaded('coverImage', url)}
                            />
                            
                            <div className="space-y-2">
                              <label className="font-medium">Category</label>
                              <Input 
                                name="category" 
                                value={form.category} 
                                onChange={handleChange} 
                                placeholder="UX Design, Branding, etc."
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Height (Optional)</label>
                            <Input 
                              name="height" 
                              value={form.height} 
                              onChange={handleChange} 
                              placeholder="tall"
                            />
                            <p className="text-sm text-gray-500">Use "tall" to make the card taller in the grid</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="content" className="space-y-4">
                          <div className="space-y-2">
                            <label className="font-medium">Introduction</label>
                            <Textarea 
                              name="intro" 
                              value={form.intro} 
                              onChange={handleContentChange} 
                              placeholder="Introduction to the case study"
                              required
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Challenge</label>
                            <Textarea 
                              name="challenge" 
                              value={form.challenge} 
                              onChange={handleContentChange} 
                              placeholder="The challenge that was addressed"
                              required
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Approach</label>
                            <Textarea 
                              name="approach" 
                              value={form.approach} 
                              onChange={handleContentChange} 
                              placeholder="Your approach to solving the problem"
                              required
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Solution</label>
                            <Textarea 
                              name="solution" 
                              value={form.solution} 
                              onChange={handleContentChange} 
                              placeholder="The solution implemented"
                              required
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Results</label>
                            <Textarea 
                              name="results" 
                              value={form.results} 
                              onChange={handleContentChange} 
                              placeholder="The results achieved"
                              required
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="font-medium">Conclusion</label>
                            <Textarea 
                              name="conclusion" 
                              value={form.conclusion} 
                              onChange={handleContentChange} 
                              placeholder="Concluding thoughts"
                              required
                              rows={3}
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="images" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ImageUploader
                              label="Introduction Image"
                              currentImageUrl={form.introImage}
                              onImageUploaded={(url) => handleImageUploaded('introImage', url)}
                            />
                            
                            <ImageUploader
                              label="Challenge Image"
                              currentImageUrl={form.challengeImage}
                              onImageUploaded={(url) => handleImageUploaded('challengeImage', url)}
                            />
                            
                            <ImageUploader
                              label="Approach Image"
                              currentImageUrl={form.approachImage}
                              onImageUploaded={(url) => handleImageUploaded('approachImage', url)}
                            />
                            
                            <ImageUploader
                              label="Solution Image"
                              currentImageUrl={form.solutionImage}
                              onImageUploaded={(url) => handleImageUploaded('solutionImage', url)}
                            />
                            
                            <ImageUploader
                              label="Results Image"
                              currentImageUrl={form.resultsImage}
                              onImageUploaded={(url) => handleImageUploaded('resultsImage', url)}
                            />
                            
                            <ImageUploader
                              label="Conclusion Image"
                              currentImageUrl={form.conclusionImage}
                              onImageUploaded={(url) => handleImageUploaded('conclusionImage', url)}
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => navigate('/case-studies')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : slug ? 'Update Case Study' : 'Create Case Study'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyEditor;

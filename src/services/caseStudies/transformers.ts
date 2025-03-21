
import { CaseStudy } from '@/data/caseStudies';

/**
 * Transforms raw case study data from Supabase into our CaseStudy type
 */
export const transformCaseStudyData = (data: any): CaseStudy => {
  // Extract basic case study data
  const caseStudy: CaseStudy = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description || '',
    coverImage: data.cover_image,
    category: data.category,
    height: data.height || '',
    content: data.case_study_content?.[0] ? {
      intro: data.case_study_content[0].intro || '',
      challenge: data.case_study_content[0].challenge || '',
      approach: data.case_study_content[0].approach || '',
      solution: data.case_study_content[0].solution || '',
      results: data.case_study_content[0].results || '',
      conclusion: data.case_study_content[0].conclusion || ''
    } : {
      intro: '',
      challenge: '',
      approach: '',
      solution: '',
      results: '',
      conclusion: ''
    },
    customSections: data.customSections || "[]"
  };

  // If this is from local storage, it might already have these properties
  if (data.alignment) caseStudy.alignment = data.alignment;
  if (data.subhead) caseStudy.subhead = data.subhead;
  if (data.introductionParagraph) caseStudy.introductionParagraph = data.introductionParagraph;
  if (data.alignmentImage) caseStudy.alignmentImage = data.alignmentImage;
  
  // Carousel fields
  if (data.carouselTitle) caseStudy.carouselTitle = data.carouselTitle;
  if (data.carouselItem1Title) caseStudy.carouselItem1Title = data.carouselItem1Title;
  if (data.carouselItem1Content) caseStudy.carouselItem1Content = data.carouselItem1Content;
  if (data.carouselItem1Image) caseStudy.carouselItem1Image = data.carouselItem1Image;
  if (data.carouselItem2Title) caseStudy.carouselItem2Title = data.carouselItem2Title;
  if (data.carouselItem2Content) caseStudy.carouselItem2Content = data.carouselItem2Content;
  if (data.carouselItem2Image) caseStudy.carouselItem2Image = data.carouselItem2Image;
  if (data.carouselItem3Title) caseStudy.carouselItem3Title = data.carouselItem3Title;
  if (data.carouselItem3Content) caseStudy.carouselItem3Content = data.carouselItem3Content;
  if (data.carouselItem3Image) caseStudy.carouselItem3Image = data.carouselItem3Image;
  
  // Four paragraphs fields
  if (data.fourParaTitle) caseStudy.fourParaTitle = data.fourParaTitle;
  if (data.fourParaSubtitle) caseStudy.fourParaSubtitle = data.fourParaSubtitle;
  if (data.fourPara1Title) caseStudy.fourPara1Title = data.fourPara1Title;
  if (data.fourPara1Content) caseStudy.fourPara1Content = data.fourPara1Content;
  if (data.fourPara2Title) caseStudy.fourPara2Title = data.fourPara2Title;
  if (data.fourPara2Content) caseStudy.fourPara2Content = data.fourPara2Content;
  if (data.fourPara3Title) caseStudy.fourPara3Title = data.fourPara3Title;
  if (data.fourPara3Content) caseStudy.fourPara3Content = data.fourPara3Content;
  if (data.fourPara4Title) caseStudy.fourPara4Title = data.fourPara4Title;
  if (data.fourPara4Content) caseStudy.fourPara4Content = data.fourPara4Content;
  if (data.fourParaImage) caseStudy.fourParaImage = data.fourParaImage;

  return caseStudy;
};

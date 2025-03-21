
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  coverImage: string;
  category?: string;
  height?: string;
  content: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
  };
  customSections?: string;
  
  // Alignment section properties
  alignment?: string;
  subhead?: string;
  introductionParagraph?: string;
  alignmentImage?: string;
  
  // Carousel section properties
  carouselTitle?: string;
  carouselItem1Title?: string;
  carouselItem1Content?: string;
  carouselItem1Image?: string;
  carouselItem2Title?: string;
  carouselItem2Content?: string;
  carouselItem2Image?: string;
  carouselItem3Title?: string;
  carouselItem3Content?: string;
  carouselItem3Image?: string;
  
  // Four paragraphs section properties
  fourParaTitle?: string;
  fourParaSubtitle?: string;
  fourPara1Title?: string;
  fourPara1Content?: string;
  fourPara2Title?: string;
  fourPara2Content?: string;
  fourPara3Title?: string;
  fourPara3Content?: string;
  fourPara4Title?: string;
  fourPara4Content?: string;
  fourParaImage?: string;
  
  created_at?: string;
}

export const basicCaseStudy: CaseStudy = {
  id: "new",
  title: "New Case Study",
  slug: "new-case-study",
  summary: "A brief summary of the case study",
  coverImage: "/placeholder.svg",
  content: {
    intro: "",
    challenge: "",
    approach: "",
    solution: "",
    results: "",
    conclusion: ""
  },
  customSections: "[]"
};

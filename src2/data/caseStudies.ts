
import { StrapiCaseStudySection } from "@/types/strapi";

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  coverImage: string;
  category: string;
  height?: string;
  content: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
  };
  sections?: StrapiCaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Eco-Friendly Packaging Redesign",
    slug: "eco-packaging-redesign",
    summary: "How we helped a consumer goods company reduce their environmental impact with sustainable packaging.",
    coverImage: "https://res.cloudinary.com/dtrbqr2hn/image/upload/v1576273481/boy-in-school_wo34bk.jpg",
    category: "Sustainability",
    height: "tall",
    content: {
      intro: "A leading consumer goods company approached us to redesign their packaging to be more environmentally friendly.",
      challenge: "The client needed to reduce environmental impact without compromising functionality or increasing costs.",
      approach: "We audited existing packaging, researched sustainable alternatives, and tested multiple prototypes.",
      solution: "We designed packaging using 100% recyclable materials, reducing plastic use by 75% and shipping volume by 30%.",
      results: "The redesign resulted in a 40% carbon footprint reduction and 15% sales increase following launch.",
      conclusion: "This project shows how good design can address environmental concerns while delivering business benefits."
    }
  },
  {
    id: "2",
    title: "Financial App User Experience Overhaul",
    slug: "financial-app-ux-overhaul",
    summary: "Reimagining a complex financial platform for improved user engagement and satisfaction.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    category: "UX Design",
    content: {
      intro: "A fintech startup needed help with user adoption due to their platform's complex interface.",
      challenge: "The app had powerful features but poor information architecture and inconsistent design patterns.",
      approach: "We conducted user research, mapped journeys, and established new design principles.",
      solution: "We simplified the architecture, created a consistent design system, and reimagined key workflows.",
      results: "User engagement increased 60%, support tickets dropped 35%, and retention improved 40%.",
      conclusion: "By balancing functionality with usability, we transformed a difficult platform into an engaging product."
    }
  },
  {
    id: "3",
    title: "Boutique Hotel Digital Transformation",
    slug: "hotel-digital-transformation",
    summary: "Helping a boutique hotel chain create a seamless digital experience across all customer touchpoints.",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    category: "Digital Strategy",
    height: "tall",
    content: {
      intro: "A boutique hotel chain wanted to differentiate themselves with a distinctive digital experience.",
      challenge: "Their digital presence was fragmented with inconsistent branding and an outdated booking system.",
      approach: "We developed a strategy that covered all guest interactions from discovery to post-stay engagement.",
      solution: "We created an integrated ecosystem with a redesigned website, guest app, and in-room tablets.",
      results: "Direct bookings increased 45% and guest satisfaction scores rose from 3.6 to 4.8 out of 5.",
      conclusion: "This project shows the power of a cohesive digital strategy aligned with a brand's positioning."
    }
  },
  {
    id: "4",
    title: "Healthcare Provider Patient Portal",
    slug: "healthcare-patient-portal",
    summary: "Designing an accessible and secure patient portal for a regional healthcare network.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    category: "Healthcare",
    content: {
      intro: "A regional healthcare provider needed a patient portal to improve communication and engagement.",
      challenge: "They needed a solution for all ages and abilities that complied with privacy regulations.",
      approach: "We formed a cross-functional team and conducted extensive accessibility and security testing.",
      solution: "We created an intuitive interface with secure messaging, scheduling, and educational resources.",
      results: "The portal achieved 65% patient adoption, reducing administrative calls by 30%.",
      conclusion: "This project highlights the importance of inclusive design in healthcare technology."
    }
  },
  {
    id: "5",
    title: "E-commerce Checkout Optimization",
    slug: "ecommerce-checkout-optimization",
    summary: "Reducing cart abandonment and increasing conversions for an online retailer.",
    coverImage: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80&w=800",
    category: "E-commerce",
    height: "tall",
    content: {
      intro: "An e-commerce retailer was experiencing high cart abandonment rates during checkout.",
      challenge: "68% of users abandoned their carts due to a complex checkout flow and hidden costs.",
      approach: "We analyzed user behavior, conducted testing, and developed a streamlined checkout prototype.",
      solution: "We created a single-page checkout that reduced fields by 40% and added transparent shipping costs.",
      results: "Cart abandonment dropped 35% and overall conversion rate increased 28%.",
      conclusion: "This data-driven approach significantly improved e-commerce performance and customer satisfaction."
    }
  },
  {
    id: "6",
    title: "Non-profit Donor Engagement Platform",
    slug: "nonprofit-donor-platform",
    summary: "Creating a digital platform to increase donor engagement and transparency for a global non-profit.",
    coverImage: "https://images.unsplash.com/photo-1593113598332-cd59a93f9f76?auto=format&fit=crop&q=80&w=800",
    category: "Non-profit",
    content: {
      intro: "A global non-profit wanted to increase donor engagement and transparency about contributions.",
      challenge: "They lacked digital infrastructure to provide insights into how donations were being used.",
      approach: "We focused on transparency, storytelling, and community building in our strategy.",
      solution: "We created personalized dashboards, interactive maps, and compelling storytelling features.",
      results: "Donor retention increased 50% and average donation size grew 25%.",
      conclusion: "This project transformed the relationship between the non-profit and its supporters."
    }
  }
];


export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string; // Adding optional description field
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
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Eco-Friendly Packaging Redesign",
    slug: "eco-packaging-redesign",
    summary: "How we helped a consumer goods company reduce their environmental impact with sustainable packaging.",
    coverImage: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=800",
    category: "Sustainability",
    height: "tall",
    content: {
      intro: "A leading consumer goods company approached us with the challenge of redesigning their packaging to be more environmentally friendly while maintaining brand recognition and product protection.",
      challenge: "The client needed to reduce their environmental footprint without compromising on packaging functionality or increasing costs significantly. The existing packaging used mixed materials that were difficult to recycle, and they wanted a solution that would appeal to environmentally conscious consumers.",
      approach: "Our approach began with a comprehensive audit of their existing packaging materials and production processes. We researched sustainable alternatives and conducted consumer testing to understand preferences. We then developed multiple prototypes using different eco-friendly materials, evaluating each for durability, cost, and environmental impact.",
      solution: "We designed a new packaging system using 100% recyclable materials, reducing plastic use by 75%. The new design incorporated natural dyes and minimalist printing techniques to lower chemical usage while maintaining brand visibility. We also optimized the shape to reduce shipping volume by 30%.",
      results: "The redesigned packaging resulted in a 40% reduction in carbon footprint and received overwhelmingly positive consumer feedback. The brand experienced a 15% increase in sales following the launch, and the project was featured in several industry publications as an example of sustainable innovation.",
      conclusion: "This case study demonstrates how thoughtful design can address environmental concerns while also delivering business benefits. By taking a holistic approach to the packaging redesign, we were able to create a solution that satisfied all stakeholders and contributed to the client's reputation as an environmentally responsible company."
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
      intro: "A fintech startup had developed a powerful financial management platform but was struggling with user adoption and retention due to its complex interface and steep learning curve.",
      challenge: "The existing application had robust functionality but suffered from poor information architecture, inconsistent design patterns, and workflow inefficiencies. Users were becoming frustrated and abandoning the platform despite its powerful capabilities.",
      approach: "We began with extensive user research, including interviews, usage analytics analysis, and competitive benchmarking. We mapped user journeys and identified pain points in the current experience. Working closely with the client's development team, we established design principles that would guide the redesign process.",
      solution: "Our solution involved a complete UX overhaul that simplified the information architecture, introduced a consistent design system, and reimagined key workflows. We implemented progressive disclosure techniques to manage complexity and added contextual help features to assist users. The redesigned interface featured customizable dashboards and improved data visualization components.",
      results: "Following the implementation of our redesign, the application saw a 60% increase in user engagement and a 35% reduction in support tickets. The average session time increased by 25%, and user retention improved by 40% over six months. The platform's Net Promoter Score rose from 15 to 45.",
      conclusion: "This case study illustrates the importance of user-centered design in complex applications. By focusing on user needs and carefully balancing functionality with usability, we transformed a powerful but difficult-to-use platform into an intuitive and engaging product that users actually enjoyed using."
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
      intro: "A chain of boutique hotels sought to differentiate themselves in a competitive market by creating a distinctive digital experience that would reflect their unique character and enhance guest satisfaction.",
      challenge: "The hotel chain's digital presence was fragmented across multiple platforms with inconsistent branding and user experience. Their booking system was outdated, and they lacked integration between their website, mobile experience, and on-property digital touchpoints.",
      approach: "We developed a comprehensive digital strategy that encompassed all guest interactions from discovery to post-stay engagement. We conducted stakeholder workshops, guest interviews, and analyzed the competitive landscape to identify opportunities for differentiation and improvement.",
      solution: "We created an integrated digital ecosystem featuring a redesigned responsive website, a new mobile app for guests, and custom in-room tablets. All touchpoints shared a consistent design language while highlighting the unique personality of each property. We implemented a modern booking engine with personalization features and integrated it with their CRM and property management systems.",
      results: "The digital transformation increased direct bookings by 45%, reducing dependency on third-party platforms and improving margins. Guest satisfaction scores related to digital experience increased from 3.6/5 to 4.8/5. The mobile app achieved a 70% adoption rate among guests, and the integrated approach generated valuable data insights for ongoing optimization.",
      conclusion: "This case study demonstrates the power of a cohesive digital strategy that aligns with a brand's unique positioning. By creating a seamless experience across all touchpoints and focusing on the specific needs of their guest demographic, this boutique hotel chain was able to use digital technology as a key differentiator in a crowded marketplace."
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
      intro: "A regional healthcare provider needed to develop a patient portal that would improve communication, streamline administrative processes, and enhance patient engagement in their healthcare journey.",
      challenge: "The organization needed a solution that would serve patients of all ages and technical abilities, comply with strict healthcare privacy regulations, and integrate with their existing electronic health record system. They also faced the challenge of encouraging adoption among both patients and healthcare providers.",
      approach: "We took a collaborative approach, forming a cross-functional team that included healthcare providers, administrative staff, IT specialists, and patient representatives. We conducted extensive accessibility testing and security assessments throughout the development process. We also created a comprehensive adoption strategy for both patients and staff.",
      solution: "The resulting patient portal featured an intuitive interface with accessibility as a core design principle. It included secure messaging, appointment scheduling, test result access, prescription refill requests, and educational resources. We implemented rigorous security measures to ensure HIPAA compliance and created a responsive design that worked well on all devices.",
      results: "Within the first year, the portal achieved a 65% adoption rate among patients, exceeding industry averages. Administrative call volume decreased by 30%, and patient satisfaction with communication improved by 45%. Healthcare providers reported saving an average of 5 hours per week on administrative tasks, allowing more time for patient care.",
      conclusion: "This case study highlights the importance of inclusive design in healthcare technology. By considering the needs of all stakeholders and focusing on accessibility, security, and seamless integration, we created a solution that improved healthcare delivery efficiency while enhancing the patient experience. The project demonstrates how thoughtful digital solutions can have meaningful impacts on healthcare outcomes."
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
      intro: "An established e-commerce retailer was experiencing high cart abandonment rates and sought to optimize their checkout process to improve conversion rates and enhance customer satisfaction.",
      challenge: "Analysis revealed that 68% of users who added items to their cart were abandoning before completing their purchase. The existing checkout flow required multiple steps, had confusing form validation, and lacked transparency about shipping costs and delivery timeframes – all contributing to customer hesitation at the critical conversion point.",
      approach: "We began with a comprehensive audit of the existing checkout flow, analyzing user behavior through heatmaps, session recordings, and funnel analytics. We conducted user testing to identify specific pain points and surveyed customers who had abandoned carts to understand their reasons. Based on these insights, we developed a streamlined checkout prototype and A/B tested variations to determine the optimal approach.",
      solution: "Our solution included a redesigned single-page checkout that reduced the required fields by 40%, implemented real-time validation with helpful error messages, added a progress indicator, and incorporated transparent shipping estimates earlier in the process. We also implemented a guest checkout option while still highlighting the benefits of creating an account. The mobile experience received particular attention to ensure it was optimized for smaller screens.",
      results: "The optimization resulted in a 35% reduction in cart abandonment and a 28% increase in overall conversion rate. The average time to complete checkout decreased from 4.2 minutes to 2.1 minutes. Mobile conversions saw an even more dramatic improvement with a 42% increase, reflecting the focus on mobile optimization. Customer satisfaction metrics related to the checkout process improved by 60%.",
      conclusion: "This case study demonstrates how a data-driven, user-centered approach to checkout optimization can significantly impact e-commerce performance. By identifying and addressing specific friction points in the customer journey, we were able to create a more efficient and trustworthy checkout experience that benefited both users and the business."
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
      intro: "A global non-profit organization wanted to increase donor engagement and transparency by creating a platform where supporters could track the impact of their contributions and connect more deeply with the organization's mission.",
      challenge: "The organization was facing increasing donor expectations for transparency and impact reporting, but lacked the digital infrastructure to provide personalized insights into how donations were being used. They needed a solution that would engage donors of varying commitment levels, from one-time contributors to major benefactors.",
      approach: "We developed a strategy based on the principles of transparency, storytelling, and community building. Working closely with the organization's program teams, we mapped out impact reporting workflows and created a system for translating complex development work into accessible stories and metrics. We designed the experience to accommodate different user segments with varying information needs.",
      solution: "The resulting platform featured personalized donor dashboards showing the impact of individual contributions, interactive maps highlighting project locations, compelling storytelling through text and video, and community features that connected donors with each other and with beneficiaries. We implemented a notification system to keep donors updated on progress and created opportunities for deeper engagement through virtual events and volunteer opportunities.",
      results: "After launching the platform, the organization saw a 50% increase in donor retention and a 25% increase in average donation size. Recurring donations grew by 35%, and the organization gained valuable insights into donor interests and behaviors. User feedback was overwhelmingly positive, with donors reporting feeling more connected to the organization's work and more confident in their impact.",
      conclusion: "This case study illustrates how digital platforms can transform the relationship between non-profits and their supporters. By focusing on transparency, personalization, and meaningful connection, we helped the organization build stronger, more sustainable relationships with their donor community while providing the accountability that modern donors expect."
    }
  }
];

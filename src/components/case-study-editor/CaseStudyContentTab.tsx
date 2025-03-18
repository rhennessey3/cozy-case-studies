
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CaseStudyContentTabProps {
  form: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
  };
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = ({ 
  form, 
  handleContentChange 
}) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default CaseStudyContentTab;


import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface CaseStudyContentTabProps {
  form: {
    intro: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string;
    conclusion: string;
  };
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const CaseStudyContentTab: React.FC<CaseStudyContentTabProps> = ({ 
  form, 
  handleContentChange 
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-blue-500 rounded"></div>
          <h3 className="text-lg font-semibold">Introduction</h3>
        </div>
        <Textarea 
          name="intro" 
          value={form.intro} 
          onChange={handleContentChange} 
          placeholder="Introduction to the case study"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-red-500 rounded"></div>
          <h3 className="text-lg font-semibold">Challenge</h3>
        </div>
        <Textarea 
          name="challenge" 
          value={form.challenge} 
          onChange={handleContentChange} 
          placeholder="The challenge that was addressed"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-green-500 rounded"></div>
          <h3 className="text-lg font-semibold">Approach</h3>
        </div>
        <Textarea 
          name="approach" 
          value={form.approach} 
          onChange={handleContentChange} 
          placeholder="Your approach to solving the problem"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-purple-500 rounded"></div>
          <h3 className="text-lg font-semibold">Solution</h3>
        </div>
        <Textarea 
          name="solution" 
          value={form.solution} 
          onChange={handleContentChange} 
          placeholder="The solution implemented"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-yellow-500 rounded"></div>
          <h3 className="text-lg font-semibold">Results</h3>
        </div>
        <Textarea 
          name="results" 
          value={form.results} 
          onChange={handleContentChange} 
          placeholder="The results achieved"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-6 bg-orange-500 rounded"></div>
          <h3 className="text-lg font-semibold">Conclusion</h3>
        </div>
        <Textarea 
          name="conclusion" 
          value={form.conclusion} 
          onChange={handleContentChange} 
          placeholder="Concluding thoughts"
          required
          rows={3}
          className="border-gray-300"
        />
      </div>
    </div>
  );
};

export default CaseStudyContentTab;

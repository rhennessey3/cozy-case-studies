
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-6">Case Study Header</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-gray-500">Subhead One</Label>
            <Input 
              id="challenge" 
              name="challenge" 
              value={form.challenge} 
              onChange={handleContentChange} 
              placeholder="Challenge"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="challenge-content" className="text-gray-500">Subhead One Paragraph</Label>
            <Textarea 
              id="challenge-content" 
              name="intro" 
              value={form.intro} 
              onChange={handleContentChange} 
              placeholder="Enter your content here..."
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach" className="text-gray-500">Subhead Two</Label>
            <Input 
              id="approach" 
              name="approach" 
              value={form.approach} 
              onChange={handleContentChange} 
              placeholder="Approach"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach-content" className="text-gray-500">Subhead Two Paragraph</Label>
            <Textarea 
              id="approach-content" 
              name="solution" 
              value={form.solution} 
              onChange={handleContentChange} 
              placeholder="Enter your content here..."
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="results" className="text-gray-500">Subhead Three</Label>
            <Input 
              id="results" 
              name="results" 
              value={form.results} 
              onChange={handleContentChange} 
              placeholder="Results"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="results-content" className="text-gray-500">Subhead Three Paragraph</Label>
            <Textarea 
              id="results-content" 
              name="conclusion" 
              value={form.conclusion} 
              onChange={handleContentChange} 
              placeholder="Enter your content here..."
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-6 bg-blue-500 rounded"></div>
            <h3 className="text-lg font-semibold">Additional Content</h3>
          </div>
          <Textarea 
            name="intro" 
            value={form.intro} 
            onChange={handleContentChange} 
            placeholder="Additional content text"
            rows={3}
            className="border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyContentTab;

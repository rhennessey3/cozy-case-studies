
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

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
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <h2 className="text-xl font-bold mb-6">Case Study Introduction</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-gray-500">Subhead</Label>
            <Input 
              id="challenge" 
              name="challenge" 
              value={form.challenge} 
              onChange={handleContentChange} 
              placeholder="This is the introduction of the case study"
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach" className="text-gray-500">Subhead two</Label>
            <Input 
              id="approach" 
              name="approach" 
              value={form.approach} 
              onChange={handleContentChange} 
              placeholder="It's a pretty awesome case study"
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="intro-content" className="text-gray-500">Case Study Introduction Paragraph</Label>
          <Textarea 
            id="intro-content" 
            name="intro" 
            value={form.intro} 
            onChange={handleContentChange} 
            placeholder="Enter your case study introduction paragraph here..."
            className="bg-gray-50 border-gray-200 w-full"
            rows={6}
          />
        </div>
      </Card>
    </div>
  );
};

export default CaseStudyContentTab;

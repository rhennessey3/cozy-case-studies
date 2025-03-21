
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface IntroductionSectionProps {
  formData: any;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ formData, onContentChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="intro">Introduction</Label>
        <Textarea 
          id="intro"
          name="intro"
          value={formData.intro || ''}
          onChange={onContentChange}
          placeholder="Brief introduction for the case study"
          className="h-24"
        />
      </div>
      
      <div>
        <Label htmlFor="challenge">Challenge</Label>
        <Textarea 
          id="challenge"
          name="challenge"
          value={formData.challenge || ''}
          onChange={onContentChange}
          placeholder="What challenge did this project address?"
          className="h-24"
        />
      </div>
      
      <div>
        <Label htmlFor="approach">Approach</Label>
        <Textarea 
          id="approach"
          name="approach"
          value={formData.approach || ''}
          onChange={onContentChange}
          placeholder="What was your approach to solving the challenge?"
          className="h-24"
        />
      </div>
    </div>
  );
};

export default IntroductionSection;

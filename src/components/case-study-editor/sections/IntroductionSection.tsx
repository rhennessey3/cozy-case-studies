
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface IntroductionSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  introValue: string;
  challengeValue: string;
  approachValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  isOpen,
  onToggle,
  introValue,
  challengeValue,
  approachValue,
  onChange
}) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="w-full"
    >
      <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none">
        <CollapsibleTrigger className="w-full text-left focus:outline-none">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">Case Study Introduction</h2>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="challenge" className="text-gray-500">Subhead</Label>
              <Input 
                id="challenge" 
                name="challenge" 
                value={challengeValue} 
                onChange={onChange} 
                placeholder="This is the introduction of the case study"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="approach" className="text-gray-500">Subhead two</Label>
              <Input 
                id="approach" 
                name="approach" 
                value={approachValue} 
                onChange={onChange} 
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
              value={introValue} 
              onChange={onChange} 
              placeholder="Enter your case study introduction paragraph here..."
              className="bg-gray-50 border-gray-200 w-full"
              rows={6}
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default IntroductionSection;

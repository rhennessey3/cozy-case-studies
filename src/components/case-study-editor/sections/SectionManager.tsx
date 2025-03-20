
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface SectionType {
  id: string;
  type: 'alignment' | 'carousel' | 'fourParagraphs';
  name: string;
}

interface SectionManagerProps {
  sections: SectionType[];
  onAddSection: (type: SectionType['type']) => void;
  onRemoveSection: (id: string) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection,
  onRemoveSection
}) => {
  const [selectedType, setSelectedType] = React.useState<SectionType['type']>('alignment');

  const handleTypeChange = (value: string) => {
    setSelectedType(value as SectionType['type']);
  };

  return (
    <Card className="p-6 bg-white rounded-lg border border-gray-200 shadow-none mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Case Study Sections</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Sections</h3>
          {sections.length === 0 ? (
            <p className="text-gray-500 italic">No custom sections added yet</p>
          ) : (
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({section.type})</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onRemoveSection(section.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Add New Section</h3>
          
          <RadioGroup 
            value={selectedType} 
            onValueChange={handleTypeChange}
            className="flex flex-col space-y-2 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alignment" id="alignment" />
              <Label htmlFor="alignment">Left or Right Aligned Section</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="carousel" id="carousel" />
              <Label htmlFor="carousel">3 Column Slider</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fourParagraphs" id="fourParagraphs" />
              <Label htmlFor="fourParagraphs">Four Small Paragraphs</Label>
            </div>
          </RadioGroup>
          
          <Button
            type="button"
            onClick={() => onAddSection(selectedType)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Section</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SectionManager;

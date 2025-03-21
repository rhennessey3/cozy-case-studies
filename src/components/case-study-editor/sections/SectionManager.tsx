
import React from 'react';
import { Plus, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionResponse } from '@/hooks/case-study-editor/sections/types/sectionTypes';
import { getSectionDisplayName } from '@/hooks/case-study-editor/sections/utils/sectionTypeMapping';

interface SectionManagerProps {
  sections: SectionResponse[];
  onAddSection: (type: string) => void;
  onRemoveSection: (id: string) => void;
  onMoveSection: (id: string, direction: 'up' | 'down') => void;
  onTogglePublished: (id: string, published: boolean) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection,
  onRemoveSection,
  onMoveSection,
  onTogglePublished
}) => {
  const sectionTypes = ['introduction', 'alignment', 'carousel', 'fourParagraphs'];
  const sortedSections = [...sections].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Add Section</h3>
            <div className="flex flex-wrap gap-2">
              {sectionTypes.map(type => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  onClick={() => onAddSection(type)}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {getSectionDisplayName(type)}
                </Button>
              ))}
            </div>
          </div>

          {sortedSections.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">Manage Sections</h3>
              <div className="border rounded-md divide-y">
                {sortedSections.map((section, index) => (
                  <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="flex items-center">
                      <span className="font-medium">{section.title || getSectionDisplayName(section.component)}</span>
                      <span className="ml-2 text-xs text-gray-500">(ID: {section.id.slice(0, 8)}...)</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTogglePublished(section.id, !section.published)}
                        title={section.published ? 'Unpublish' : 'Publish'}
                      >
                        {section.published ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMoveSection(section.id, 'up')}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMoveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionManager;


import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';

interface EditorTabsNavProps {
  showViewLive: boolean;
  showDelete: boolean;
  onViewLive?: () => void;
  onDelete?: () => void;
}

const EditorTabsNav: React.FC<EditorTabsNavProps> = ({
  showViewLive,
  showDelete,
  onViewLive,
  onDelete
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <TabsList className="mb-0">
        <TabsTrigger value="basics">Basic Info</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2 mt-4 md:mt-0">
        {showViewLive && onViewLive && (
          <Button
            type="button"
            variant="outline"
            onClick={onViewLive}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Live
          </Button>
        )}
        
        {showDelete && onDelete && (
          <Button
            type="button"
            variant="outline"
            onClick={onDelete}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditorTabsNav;


import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Upload, Save, Layers } from 'lucide-react';

interface EditorTabsNavProps {
  showViewLive: boolean;
  showDelete: boolean;
  isDraft?: boolean;
  onViewLive?: () => void;
  onDelete?: () => void;
  onToggleMode?: () => void;
  onPublish?: () => void;
  saving?: boolean;
}

const EditorTabsNav: React.FC<EditorTabsNavProps> = ({
  showViewLive,
  showDelete,
  isDraft = true,
  onViewLive,
  onDelete,
  onToggleMode,
  onPublish,
  saving = false
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <TabsList className="mb-0">
          <TabsTrigger value="basics">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        {onToggleMode && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`px-2 py-1 rounded-md ${isDraft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              {isDraft ? 'Draft Mode' : 'Live Mode'}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onToggleMode}
              className="flex items-center gap-1 text-xs"
            >
              <Layers className="h-3 w-3" />
              Switch to {isDraft ? 'Live' : 'Draft'} Mode
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-4 md:mt-0">
        {isDraft && onPublish && (
          <Button
            type="button"
            variant="outline"
            onClick={onPublish}
            disabled={saving}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-200"
          >
            <Upload className="h-4 w-4" />
            Publish Draft
          </Button>
        )}
        
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

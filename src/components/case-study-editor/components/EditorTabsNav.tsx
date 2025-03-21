
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Upload } from 'lucide-react';
import FormActions from './FormActions';

interface EditorTabsNavProps {
  showViewLive: boolean;
  showDelete: boolean;
  isDraft?: boolean;
  onViewLive?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  saving?: boolean;
  isNew?: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
}

const EditorTabsNav: React.FC<EditorTabsNavProps> = ({
  showViewLive,
  showDelete,
  isDraft = true,
  onViewLive,
  onDelete,
  onPublish,
  saving = false,
  isNew = false,
  slug,
  cancelHref,
  onCancel
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
      <div className="flex-shrink-0">
        <Tabs defaultValue="basics">
          <TabsList className="mb-0">
            <TabsTrigger value="basics">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        {!isNew && isDraft && onPublish && (
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
        
        <FormActions
          saving={saving}
          slug={slug}
          cancelHref={cancelHref}
          onCancel={onCancel}
          isDraft={isDraft}
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default EditorTabsNav;

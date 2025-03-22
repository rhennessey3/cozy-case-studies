
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import FormActions from './FormActions';

interface EditorTabsNavProps {
  showViewLive: boolean;
  showDelete: boolean;
  onViewLive?: () => void;
  onDelete?: () => void;
  saving?: boolean;
  isNew?: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const EditorTabsNav: React.FC<EditorTabsNavProps> = ({
  showViewLive,
  showDelete,
  onViewLive,
  onDelete,
  saving = false,
  isNew = false,
  slug,
  cancelHref,
  onCancel,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
      <div className="flex-shrink-0">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="mb-0">
            <TabsTrigger value="basics">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
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
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default EditorTabsNav;

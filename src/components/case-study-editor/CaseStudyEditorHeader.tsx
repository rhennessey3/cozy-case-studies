
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Eye, Trash2, Save, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CaseStudyEditorHeaderProps {
  headingText: string;
  onLogout?: () => void;
  onViewLive?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  showViewLive?: boolean;
  showDelete?: boolean;
  isNew?: boolean;
  saving?: boolean;
  children?: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CaseStudyEditorHeader: React.FC<CaseStudyEditorHeaderProps> = ({
  headingText,
  onLogout,
  onViewLive,
  onDelete,
  onCancel,
  onSubmit,
  showViewLive = false,
  showDelete = false,
  isNew = false,
  saving = false,
  children,
  activeTab,
  onTabChange
}) => {
  const getButtonText = () => {
    if (saving) return 'Saving...';
    return isNew ? 'Save Case Study' : 'Save Changes';
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const formEvent = new Event('submit', { bubbles: true }) as unknown as React.FormEvent;
      onSubmit(formEvent);
    }
  };

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="px-4 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
          <h1 className="font-bold text-sm md:text-base lg:text-lg tracking-tight text-slate-800">
            {headingText}
          </h1>
          
          <div className="md:hidden">
            {onLogout && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="flex gap-1 items-center"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-0">
              <TabsTrigger value="basics">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            {showViewLive && onViewLive && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onViewLive}
                className="flex gap-1 items-center"
              >
                <Eye className="h-4 w-4" />
                View Live
              </Button>
            )}
            
            {showDelete && onDelete && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onDelete}
                className="flex gap-1 items-center text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            
            <Button 
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              size="sm"
              className="flex items-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {!saving && <Save size={16} />}
              {getButtonText()}
            </Button>
            
            <div className="hidden md:block">
              {onLogout && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onLogout}
                  className="flex gap-1 items-center"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </header>
  );
};

export default CaseStudyEditorHeader;


import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Eye, Trash } from 'lucide-react';

interface CaseStudyEditorHeaderProps {
  headingText: string;
  onLogout?: () => void;
  onViewLive?: () => void;
  onDelete?: () => void;
  showViewLive?: boolean;
  showDelete?: boolean;
  children?: React.ReactNode;
}

const CaseStudyEditorHeader: React.FC<CaseStudyEditorHeaderProps> = ({
  headingText,
  onLogout,
  onViewLive,
  onDelete,
  showViewLive = false,
  showDelete = false,
  children
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="px-4 lg:px-8 h-16 flex items-center justify-between max-w-screen-2xl mx-auto">
        <h1 className="font-bold text-sm md:text-base lg:text-lg tracking-tight text-slate-800">
          {headingText}
        </h1>
        
        <div className="flex space-x-2 items-center">
          {children}
          
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
              variant="destructive" 
              size="sm"
              onClick={onDelete}
              className="flex gap-1 items-center"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          )}
          
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
    </header>
  );
};

export default CaseStudyEditorHeader;

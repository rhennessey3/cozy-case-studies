
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CaseStudyEditorHeaderProps {
  headingText: string;
  onViewLive: () => void;
  onLogout: () => void;
  onDelete?: () => void;
  showViewLive: boolean;
  showDelete: boolean;
}

const CaseStudyEditorHeader: React.FC<CaseStudyEditorHeaderProps> = ({
  headingText,
  onViewLive,
  onLogout,
  onDelete,
  showViewLive,
  showDelete
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#EAEAEA]">
      <h1 className="text-3xl md:text-4xl font-[900] text-[#1b1b1b]">
        {headingText}
      </h1>
      <div className="flex gap-2">
        {showViewLive && (
          <Button
            variant="outline"
            onClick={onViewLive}
          >
            View Live
          </Button>
        )}
        {showDelete && (
          <Button
            variant="outline"
            onClick={onDelete}
            className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default CaseStudyEditorHeader;

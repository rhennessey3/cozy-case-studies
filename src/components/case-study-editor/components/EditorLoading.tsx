
import React from 'react';

interface EditorLoadingProps {
  message?: string;
}

const EditorLoading: React.FC<EditorLoadingProps> = ({ 
  message = 'Loading editor content...' 
}) => {
  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-center mb-4">
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
      <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="h-16 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-16 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="flex justify-end mt-6">
        <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default EditorLoading;

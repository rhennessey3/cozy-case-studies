
import React from 'react';

const EditorLoading: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default EditorLoading;

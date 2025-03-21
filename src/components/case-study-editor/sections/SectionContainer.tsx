
import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
}

/**
 * Container component for individual section types
 * Handles common section rendering logic like expansion/collapse
 */
const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <div className="mb-6">
      {children}
    </div>
  );
};

export default SectionContainer;

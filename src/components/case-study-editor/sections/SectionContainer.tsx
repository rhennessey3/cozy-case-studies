
import React from 'react';
import { SectionWithOrder } from './types';

interface SectionContainerProps {
  section: SectionWithOrder;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

/**
 * Container component for individual section types
 * Handles common section rendering logic like expansion/collapse
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  section,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div key={section.id} className="mb-6">
      {children}
    </div>
  );
};

export default SectionContainer;


import React from 'react';

/**
 * This component is kept for backwards compatibility.
 * All functionality has been moved to CaseStudyEditorHeader.
 * Props are accepted but not used to maintain compatibility with existing code.
 */
interface FormActionsProps {
  saving?: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = () => null;

export default FormActions;

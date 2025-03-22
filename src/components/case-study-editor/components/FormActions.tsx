
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  saving: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  saving, 
  slug,
  cancelHref = '/admin/case-studies',
  onCancel,
  className = ""
}) => {
  // This component is now only used in case we need to show form actions elsewhere
  // The main functionality has been moved to CaseStudyEditorHeader
  return null;
};

export default FormActions;

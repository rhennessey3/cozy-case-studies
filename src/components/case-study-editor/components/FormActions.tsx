
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  saving: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  saving, 
  slug,
  cancelHref = '/admin/case-studies',
  onCancel
}) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(cancelHref);
    }
  };
  
  const getButtonText = () => {
    if (saving) return 'Saving...';
    if (!slug || slug === 'new') return 'Create Case Study';
    return 'Update Case Study';
  };
  
  return (
    <div className="flex justify-end gap-2 py-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={saving}
        className="flex items-center gap-2"
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        {getButtonText()}
      </Button>
    </div>
  );
};

export default FormActions;

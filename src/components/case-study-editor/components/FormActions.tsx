
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  saving: boolean;
  slug?: string;
  cancelHref?: string;
  onCancel?: () => void;
  isDraft?: boolean;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  saving, 
  slug,
  cancelHref = '/admin/case-studies',
  onCancel,
  isDraft = true,
  className = ""
}) => {
  const navigate = useNavigate();
  const isNew = !slug || slug === 'new' || slug === '';
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(cancelHref);
    }
  };
  
  const getButtonText = () => {
    if (saving) return 'Saving...';
    return isNew ? 'Save Case Study' : 'Save Changes';
  };
  
  return (
    <div className={`flex justify-end gap-2 ${className}`}>
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
        {!saving && <Save size={16} />}
        {getButtonText()}
      </Button>
    </div>
  );
};

export default FormActions;

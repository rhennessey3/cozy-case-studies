
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
}

const FormActions: React.FC<FormActionsProps> = ({ 
  saving, 
  slug,
  cancelHref = '/admin/case-studies',
  onCancel,
  isDraft = true
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
    
    const actionText = !slug || slug === 'new' ? 'Create' : 'Update';
    const modeText = isDraft ? 'Draft' : 'Live';
    
    return `${actionText} ${modeText}`;
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
        className={`flex items-center gap-2 ${isDraft ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        {!saving && <Save size={16} />}
        {getButtonText()}
      </Button>
    </div>
  );
};

export default FormActions;

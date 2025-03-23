
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  isNew?: boolean;
  saving?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
  className?: string;
  slug?: string; // Added slug prop to interface
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isNew = false,
  saving = false,
  onCancel,
  onSubmit,
  className = '',
  slug // Adding slug parameter
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {onCancel && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          disabled={saving}
        >
          Cancel
        </Button>
      )}
      
      {onSubmit && (
        <Button 
          type="button" 
          onClick={onSubmit} 
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isNew ? 'Creating...' : 'Saving...'}
            </>
          ) : (
            isNew ? 'Create' : 'Save'
          )}
        </Button>
      )}
    </div>
  );
};

export default FormActions;

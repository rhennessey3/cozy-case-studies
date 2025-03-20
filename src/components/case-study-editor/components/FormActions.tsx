
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  saving: boolean;
  slug?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ saving, slug }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/admin/case-studies')}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={saving}
        className="flex items-center gap-2"
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        {saving ? 'Saving...' : slug === 'new' ? 'Create Case Study' : 'Update Case Study'}
      </Button>
    </div>
  );
};

export default FormActions;

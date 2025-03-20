
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface AuthErrorStateProps {
  errorMessage: string | null;
}

const AuthErrorState: React.FC<AuthErrorStateProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  
  const handleRedirectToLogin = () => {
    const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
    
    if (!isLocalAuthOnly) {
      localStorage.removeItem('admin_authenticated');
    }
    
    navigate('/admin/login');
    toast.info('Please log in to continue');
  };
  
  return (
    <div className="space-y-6 py-8">
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-700">
          {errorMessage || 'You must be logged in to create or edit case studies'}
        </AlertDescription>
      </Alert>
      <Button onClick={handleRedirectToLogin} className="mt-4">
        Go to Login
      </Button>
    </div>
  );
};

export default AuthErrorState;

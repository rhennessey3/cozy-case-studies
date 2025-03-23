
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthErrorStateProps {
  errorMessage: string | null;
}

const AuthErrorState: React.FC<AuthErrorStateProps> = ({ errorMessage }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          {errorMessage || "Authentication error. Please log in to continue."}
        </AlertDescription>
      </Alert>
      
      <p className="text-gray-600 mt-4">
        The admin section is no longer available in this version of the application.
      </p>
    </div>
  );
};

export default AuthErrorState;

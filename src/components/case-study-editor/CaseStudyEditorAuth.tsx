
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import CaseStudyEditorLayout from './CaseStudyEditorLayout';

interface CaseStudyEditorAuthProps {
  children: React.ReactNode;
}

const CaseStudyEditorAuth: React.FC<CaseStudyEditorAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/admin/login');
      toast.error('You must be logged in to access this page');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, show loading
  if (!isAuthenticated) {
    return (
      <CaseStudyEditorLayout>
        <div className="py-8 flex justify-center items-center">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      </CaseStudyEditorLayout>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default CaseStudyEditorAuth;

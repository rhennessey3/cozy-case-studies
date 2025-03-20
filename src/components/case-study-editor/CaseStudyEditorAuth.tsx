
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { AUTH_STORAGE_KEY } from '@/constants/authConstants';
import CaseStudyEditorLayout from './CaseStudyEditorLayout';

interface CaseStudyEditorAuthProps {
  children: React.ReactNode;
}

const CaseStudyEditorAuth: React.FC<CaseStudyEditorAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Check local authentication as a fallback
  const isLocallyAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  const isLocalAuthOnly = import.meta.env.VITE_LOCAL_AUTH_ONLY === 'true';
  
  // User is authenticated if they're authenticated via context OR locally authenticated in local auth mode
  const effectivelyAuthenticated = isAuthenticated || (isLocalAuthOnly && isLocallyAuthenticated) || isLocallyAuthenticated;
  
  useEffect(() => {
    // If not authenticated at all, redirect to login
    if (!effectivelyAuthenticated) {
      navigate('/admin/login');
      toast.error('You must be logged in to access this page');
    }
  }, [effectivelyAuthenticated, navigate]);

  // If not authenticated, show loading
  if (!effectivelyAuthenticated) {
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

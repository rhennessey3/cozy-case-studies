
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/pages/AdminLogin';
import AdminCaseStudies from '@/pages/AdminCaseStudies';
import CaseStudyEditor from '@/pages/CaseStudyEditor';

/**
 * Authenticated route wrapper component
 */
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{element}</>;
};

/**
 * Admin routes configuration
 */
export const AdminRoutes = [
  <Route 
    key="admin-root" 
    path="/admin" 
    element={<Navigate to="/admin/case-studies" replace />} 
  />,
  <Route key="admin-login" path="/admin/login" element={<AdminLogin />} />,
  <Route 
    key="admin-case-studies" 
    path="/admin/case-studies" 
    element={<ProtectedRoute element={<AdminCaseStudies />} />} 
  />,
  <Route 
    key="admin-case-study-editor" 
    path="/admin/case-studies/:slug" 
    element={<ProtectedRoute element={<CaseStudyEditor />} />} 
  />
];

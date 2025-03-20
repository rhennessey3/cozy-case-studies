
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CaseStudyForm } from '@/types/caseStudy';
import { processBasicInfo } from './processors/basicInfoProcessor';
import { processContentData } from './processors/contentDataProcessor';
import { processCustomSections } from './processors/customSectionsProcessor';
import { processSectionImages } from './processors/sectionImagesProcessor';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/contexts/AuthContext';

const validateCaseStudyForm = (form: CaseStudyForm): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!form.title.trim()) errors.push('Title is required');
  if (!form.slug.trim()) errors.push('URL slug is required');
  if (!form.coverImage) errors.push('Cover image is required');
  
  if (!form.challenge.trim()) errors.push('Challenge is required');
  if (!form.intro.trim()) errors.push('Challenge description is required');
  if (!form.approach.trim()) errors.push('Approach is required');
  if (!form.solution.trim()) errors.push('Approach description is required');
  if (!form.results.trim()) errors.push('Results is required');
  if (!form.conclusion.trim()) errors.push('Results description is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const useFormSubmitHandling = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const isSupabaseAuthenticated = !!data.session;
        
        console.log('Session check:', isSupabaseAuthenticated ? 'Authenticated with Supabase' : 'Not authenticated with Supabase');
        
        if (!isSupabaseAuthenticated && isAuthenticated) {
          try {
            console.log('Session mismatch detected. Attempting to sign in with admin credentials...');
            
            // Sign out first to ensure clean state
            await supabase.auth.signOut();
            
            // Try to sign in with admin credentials
            const { data: signInData, error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (error) {
              console.error('Failed to sign in with admin credentials:', error);
              toast.error(`Authentication error: ${error.message}`, {
                id: 'auth-error',
                duration: 5000,
              });
            } else if (signInData.session) {
              console.log('Signed in with admin credentials successfully');
              toast.success('Authentication restored', {
                id: 'auth-success',
                duration: 3000,
              });
            }
          } catch (error) {
            console.error('Exception during sign in with admin credentials:', error);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setSessionChecked(true);
      }
    };
    
    checkSession();
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors } = validateCaseStudyForm(form);
    if (!isValid) {
      errors.forEach(error => {
        toast.error(error);
      });
      toast.error(`Please fill in all required fields (${errors.length})`, {
        id: 'validation-error-summary',
        duration: 5000,
      });
      return;
    }
    
    setSaving(true);
    
    try {
      // For development purposes, allow saving without actual Supabase authentication
      // This skips the actual database operations but lets users test the UI
      if (import.meta.env.DEV) {
        // Simulate successful save in development
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        toast.success(slug ? 'Case study updated successfully' : 'Case study created successfully');
        
        if (!slug) {
          navigate(`/admin/case-studies/${form.slug}`);
        }
        
        setSaving(false);
        return;
      }
      
      // Production flow with actual authentication
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        if (isAuthenticated) {
          try {
            console.log('Attempting to authenticate before save operation');
            await supabase.auth.signOut();
            
            const { data, error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (error) {
              console.error('Authentication error:', error);
              throw new Error(`Authentication failed: ${error.message}`);
            }
            
            if (!data.session) {
              console.error('No session created after authentication');
              throw new Error('Failed to authenticate with Supabase');
            }
            
            console.log('Successfully authenticated with Supabase');
          } catch (authError: any) {
            console.error('Authentication error:', authError);
            toast.error(`Authentication failed: ${authError.message}`);
            setSaving(false);
            return;
          }
        } else {
          toast.error('You must be logged in to save case studies');
          setSaving(false);
          return;
        }
      }
      
      const { data: finalSessionCheck } = await supabase.auth.getSession();
      if (!finalSessionCheck.session) {
        toast.error('Failed to establish a valid authentication session');
        setSaving(false);
        return;
      }
      
      console.log('Authentication verified, proceeding with save operation');
      
      const { caseStudyId } = await processBasicInfo(form, slug);
      await processContentData(form, caseStudyId, slug);
      await processSectionImages(form, caseStudyId);
      await processCustomSections(form, caseStudyId);
      
      toast.success(slug ? 'Case study updated successfully' : 'Case study created successfully');
      
      if (!slug) {
        navigate(`/admin/case-studies/${form.slug}`);
      }
    } catch (error: any) {
      console.error('Error saving case study:', error);
      toast.error(`Failed to save case study: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return { saving, handleSubmit, sessionChecked };
};

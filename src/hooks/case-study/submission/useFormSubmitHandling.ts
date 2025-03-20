
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

export const useFormSubmitHandling = (form: CaseStudyForm, slug?: string) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const [sessionChecked, setSessionChecked] = useState(false);

  // Check session status on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const isSupabaseAuthenticated = !!data.session;
        
        console.log('Session check:', isSupabaseAuthenticated ? 'Authenticated with Supabase' : 'Not authenticated with Supabase');
        
        // If not authenticated through Supabase but our context says we are,
        // sign in with the admin credentials
        if (!isSupabaseAuthenticated && isAuthenticated) {
          try {
            console.log('Session mismatch detected. Attempting to sign in with admin credentials...');
            
            // Sign out first to clear any potential bad state
            await supabase.auth.signOut();
            
            // Sign in as the admin user
            const { data: signInData, error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (error) {
              console.error('Failed to sign in with admin credentials:', error);
              toast.error(`Authentication error: ${error.message}`, {
                id: 'auth-error', // Using an ID to prevent duplicate toasts
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
    setSaving(true);
    
    try {
      // Double-check authentication status before proceeding
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        // If not authenticated with Supabase, try to sign in
        if (isAuthenticated) {
          try {
            console.log('Attempting to authenticate before save operation');
            // Sign out first to ensure clean state
            await supabase.auth.signOut();
            
            // Use signInWithPassword for the most reliable auth approach
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
      
      // Double-check once more that we have a valid session
      const { data: finalSessionCheck } = await supabase.auth.getSession();
      if (!finalSessionCheck.session) {
        toast.error('Failed to establish a valid authentication session');
        setSaving(false);
        return;
      }
      
      console.log('Authentication verified, proceeding with save operation');
      
      // Process the case study submission in steps
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


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
      const { data } = await supabase.auth.getSession();
      setSessionChecked(true);
      
      // If not authenticated through Supabase but our context says we are,
      // sign in with the admin credentials
      if (!data.session && isAuthenticated) {
        try {
          console.log('Attempting to sign in with admin credentials:', ADMIN_EMAIL);
          // Sign in as the admin user (this is a workaround for the demo)
          const { error } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });
          
          if (error) {
            console.error('Failed to sign in with admin credentials:', error);
            toast.error(`Authentication error: ${error.message}`);
          } else {
            console.log('Signed in with admin credentials successfully');
          }
        } catch (error) {
          console.error('Exception during sign in with admin credentials:', error);
        }
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
        // If not authenticated, try to sign in with admin credentials
        if (isAuthenticated) {
          try {
            console.log('Attempting to authenticate before save operation');
            // Use signInWithPassword directly for the most reliable auth approach
            const { data, error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD
            });
            
            if (error) {
              console.error('Authentication error:', error);
              throw error;
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

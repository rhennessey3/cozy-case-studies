
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SectionWithOrder } from '@/components/case-study-editor/sections/types';
import { SectionResponse } from './types/sectionTypes';

// Define the interface for storing section state
interface SectionState {
  sections: SectionResponse[];
  lastUpdated: string;
}

export const useSectionStorage = (caseStudyId: string | null) => {
  const [sectionsState, setSectionsState] = useState<SectionState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load sections from Supabase
  const loadSections = async () => {
    if (!caseStudyId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log(`Loading sections for case study ID: ${caseStudyId}`);

      // Get the case study sections container from the database
      const { data, error } = await supabase
        .from('case_study_sections')
        .select('metadata, id')
        .eq('case_study_id', caseStudyId)
        .eq('component', 'editor_state')
        .maybeSingle();

      if (error) {
        throw new Error(`Failed to load sections: ${error.message}`);
      }

      if (data && data.metadata) {
        console.log('Loaded sections from Supabase:', data.metadata);
        // Using type assertion with 'as' after verifying the structure
        const metadata = data.metadata as any;
        if (metadata.sections && metadata.lastUpdated) {
          // Filter out any sections with component type 'editor_state'
          const filteredSections = metadata.sections.filter(
            (section: any) => section.component !== 'editor_state'
          );
          
          // Normalize the sections to ensure they have all required fields
          const normalizedSections = filteredSections.map((section: any) => {
            // Convert legacy format to current format if needed
            return {
              id: section.id,
              case_study_id: section.case_study_id || caseStudyId,
              component: section.component || section.type || 'alignment',
              title: section.title || section.name || '',
              content: section.content || '',
              sort_order: section.sort_order !== undefined ? section.sort_order : 
                         (section.order !== undefined ? section.order : 0),
              published: section.published !== undefined ? section.published : true,
              image_url: section.image_url,
              metadata: section.metadata
            };
          });
          
          setSectionsState({
            sections: normalizedSections,
            lastUpdated: metadata.lastUpdated
          });
        } else {
          throw new Error('Invalid metadata structure');
        }
      } else {
        setSectionsState({
          sections: [],
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (err: any) {
      console.error('Error loading sections:', err);
      setError(err.message);
      setSectionsState({
        sections: [],
        lastUpdated: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save sections to Supabase
  const saveSections = async (sections: SectionResponse[]) => {
    if (!caseStudyId) {
      console.log('No case study ID, skipping save');
      return;
    }

    try {
      setError(null);
      console.log(`Saving ${sections.length} sections for case study ID: ${caseStudyId}`);
      
      // Filter out any potential 'editor_state' entries
      const filteredSections = sections.filter(section => {
        return section.component !== 'editor_state';
      });

      const sectionState: SectionState = {
        sections: filteredSections,
        lastUpdated: new Date().toISOString()
      };

      // First check if there's an existing record
      const { data, error: checkError } = await supabase
        .from('case_study_sections')
        .select('id')
        .eq('case_study_id', caseStudyId)
        .eq('component', 'editor_state')
        .maybeSingle();

      if (checkError) {
        throw new Error(`Failed to check for existing sections: ${checkError.message}`);
      }

      let result;
      
      if (data) {
        // Update existing record
        result = await supabase
          .from('case_study_sections')
          .update({
            metadata: sectionState as any, // Cast to any to bypass type checking temporarily
            content: 'Editor state storage',
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id);
      } else {
        // Insert new record
        result = await supabase
          .from('case_study_sections')
          .insert({
            case_study_id: caseStudyId,
            component: 'editor_state',
            title: 'Editor State',
            content: 'Editor state storage',
            metadata: sectionState as any, // Cast to any to bypass type checking temporarily
            sort_order: 0,
            published: false // This is just internal state, should not be published
          });
      }

      if (result.error) {
        throw new Error(`Failed to save sections: ${result.error.message}`);
      }

      console.log('Sections saved successfully to Supabase');
      setSectionsState(sectionState);
    } catch (err: any) {
      console.error('Error saving sections:', err);
      setError(err.message);
      toast.error(`Failed to save section data: ${err.message}`);
    }
  };

  // Load sections on initial render and when caseStudyId changes
  useEffect(() => {
    loadSections();
  }, [caseStudyId]);

  return {
    sections: sectionsState?.sections || [],
    setSections: saveSections,
    isLoading,
    error,
    refresh: loadSections
  };
};

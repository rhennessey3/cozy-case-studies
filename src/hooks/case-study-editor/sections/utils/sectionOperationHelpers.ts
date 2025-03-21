
import { toast } from 'sonner';
import { SectionResponse } from '../types/sectionTypes';

/**
 * Helper functions for section operations
 */

/**
 * Shows a loading toast and returns its ID
 */
export const showLoadingToast = (message: string): string => {
  const toastId = `section-operation-${Date.now()}`;
  toast.loading(message, { id: toastId, duration: 2000 });
  return toastId;
};

/**
 * Dismisses a toast and shows a success message
 */
export const showSuccessToast = (loadingToastId: string, message: string): void => {
  toast.dismiss(loadingToastId);
  toast.success(message);
};

/**
 * Dismisses a toast and shows an error message
 */
export const showErrorToast = (loadingToastId: string, message: string, error?: any): void => {
  console.error(`Section operation error: ${message}`, error);
  toast.dismiss(loadingToastId);
  toast.error(`Error: ${message}`);
};

/**
 * Gets the maximum sort order from an array of sections
 */
export const getMaxSortOrder = (sections: SectionResponse[]): number => {
  return sections.length > 0
    ? Math.max(...sections.map(s => s.sort_order || 0))
    : 0;
};

/**
 * Normalizes a section name for display in user messages
 */
export const normalizeSectionName = (componentType: string): string => {
  return componentType.charAt(0).toUpperCase() + componentType.slice(1);
};

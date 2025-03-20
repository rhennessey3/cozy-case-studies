
/**
 * Utility function to determine if we're in admin section
 */
export const isAdminRoute = (): boolean => {
  return window.location.pathname.includes('/admin/');
};

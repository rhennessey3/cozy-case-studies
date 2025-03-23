
/**
 * Utility function to determine if the current route is in the admin section
 * 
 * This helps components conditionally render content based on whether they're
 * being viewed in the admin interface or the public-facing site.
 */
export const isAdminRoute = (): boolean => {
  // Check if the current URL path includes '/admin/'
  return window.location.pathname.startsWith('/admin');
};

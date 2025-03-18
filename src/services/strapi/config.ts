
// Configuration file for Strapi service

// Debug mode to toggle verbose logging
export const DEBUG = true;

// Frontend URL for CORS settings
export const FRONTEND_URL = window.location.origin;

// Log environment variable information on startup
console.log('==========================================');
console.log('Supabase Configuration:');
console.log(`Using Frontend URL: ${FRONTEND_URL}`);
console.log(`Debug mode: ${DEBUG ? 'Enabled ✅' : 'Disabled ❌'}`);
console.log('==========================================');

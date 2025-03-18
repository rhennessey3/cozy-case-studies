
# React Frontend Application

This directory contains the React application that serves as the frontend for the case studies website.

## Technologies Used

- React with Vite
- React Router for page routing
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Query for data fetching

## Key Components

- **CaseStudiesGrid**: Displays a grid of case study cards
- **CaseStudyCard**: Individual case study display card
- **CaseStudyDetail**: Page displaying detailed view of a case study
- **StrapiConnectionTest**: Component to test connection to Strapi CMS

## Important Files

- `App.tsx`: Main application component with routing
- `services/strapiService.ts`: Service for Strapi API communication
- `data/caseStudies.ts`: Local fallback data for case studies

## Deployment

When deploying to Vercel, ensure:

1. Set the Framework Preset to "Vite" in Vercel
2. Add `VITE_STRAPI_API_URL` as an environment variable with your Strapi instance URL
3. Set build command to `npm run build` and output directory to `dist`
4. After deployment, add your Vercel URL to Strapi's CORS settings

## Connection with Strapi

The application uses the `VITE_STRAPI_API_URL` environment variable to connect to the Strapi backend.

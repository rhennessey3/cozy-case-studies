
# Strapi Backend Setup

This directory contains files and configuration related to the Strapi CMS backend.

## Connection Information

The Strapi instance is currently deployed at:
```
https://prized-ball-ee89a13ade.strapiapp.com
```

## CORS Configuration

To allow the frontend to communicate with the Strapi backend, follow these steps:

1. Log in to your Strapi admin panel
2. Navigate to Settings → Global Settings → CORS
3. Add your frontend URL to the allowed origins list (e.g., `https://cozy-case-studies.vercel.app`)
4. Save your changes

## Environment Variables

For proper frontend-backend communication, ensure these environment variables are set:

- In Strapi:
  - `FRONTEND_URL`: The URL of your frontend application

- In your frontend:
  - `VITE_STRAPI_API_URL`: The URL of your Strapi instance

## Content Types

Ensure the following content types are configured in your Strapi instance:
- Case Study
- Sections (components within case studies)

## API Endpoints

The frontend primarily communicates with the following endpoints:
- `/api/case-studies`: For fetching case study data

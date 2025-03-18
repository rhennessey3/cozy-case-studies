
# Strapi Middlewares

This directory contains custom middlewares for the Strapi application:

## CORS Middleware Configuration

The CORS middleware is essential for allowing the frontend to communicate with the backend. The configuration should include:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://your-frontend-domain.com'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Make sure to replace 'https://your-frontend-domain.com' with the actual URL of your frontend application.

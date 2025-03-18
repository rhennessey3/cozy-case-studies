
# Case Study Routes

This directory contains route definitions for the Case Study content type.

## Default Routes

Strapi automatically generates default routes for basic CRUD operations:

- `GET /case-studies`: Get a list of case studies
- `GET /case-studies/:id`: Get a specific case study by ID
- `POST /case-studies`: Create a new case study
- `PUT /case-studies/:id`: Update a case study
- `DELETE /case-studies/:id`: Delete a case study

## Custom Routes

Custom routes can be added to extend the default functionality:

```javascript
module.exports = {
  routes: [
    // Default routes
    {
      method: 'GET',
      path: '/case-studies',
      handler: 'case-study.find',
      config: {
        policies: [],
      },
    },
    // Custom routes
    {
      method: 'GET',
      path: '/case-studies/slug/:slug',
      handler: 'case-study.findBySlug',
      config: {
        policies: [],
      },
    },
  ],
};
```

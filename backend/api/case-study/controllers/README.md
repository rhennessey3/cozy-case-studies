# Case Study Controller

This directory contains the controller for the Case Study content type. The controller handles API requests related to case studies.

## Default Controller

Strapi automatically generates a default controller with basic CRUD operations:

- `find`: Get a list of case studies
- `findOne`: Get a specific case study by ID
- `count`: Count the number of case studies
- `create`: Create a new case study
- `update`: Update an existing case study
- `delete`: Delete a case study

## Custom Controller Extensions

Custom controller methods can be added to extend the default functionality:

```javascript
module.exports = {
  // Extend the default controller
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    const entity = await strapi.services['case-study'].findOne({ slug });
    return entity;
  },
  
  // Other custom methods...
};
```

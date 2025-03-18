
# Strapi Content Types

This directory contains schema definitions for the Strapi content types used in this project:

## Case Study

The main content type for case studies with the following structure:

- `title`: Text (required)
- `slug`: Text (required, unique)
- `summary`: Text
- `description`: Text
- `coverImage`: Media (image)
- `category`: Text
- `height`: Text (for UI layout control)
- `sections`: Component (repeatable)

## Components

### Case Study Section

A component type with various formats:
- Hero
- Introduction
- Challenge
- Approach
- Solution
- Results
- Conclusion

Each section type may have specific fields like:
- `title`: Text
- `content`: Rich Text
- `image`: Media
- `backgroundColor`: Text

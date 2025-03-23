
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import CaseStudiesLanding from '@/pages/CaseStudiesLanding';
import CaseStudyDetail from '@/pages/CaseStudyDetail';
import NotFound from '@/pages/NotFound';
import DatabaseTestPage from '@/pages/DatabaseTestPage';

/**
 * Public routes configuration
 */
export const PublicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="case-studies" path="/case-studies" element={<CaseStudiesLanding />} />,
  <Route key="case-study-detail" path="/case-studies/:slug" element={<CaseStudyDetail />} />,
  <Route key="database-test" path="/database-test" element={<DatabaseTestPage />} />,
  <Route key="not-found" path="*" element={<NotFound />} />
];

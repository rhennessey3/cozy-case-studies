
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesLanding from './pages/CaseStudiesLanding';
import CaseStudyDetail from './pages/CaseStudyDetail';
import NotFound from './pages/NotFound';
import StrapiTestPage from './pages/StrapiTestPage';
import StrapiConfigPage from './pages/StrapiConfigPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/case-studies" element={<CaseStudiesLanding />} />
      <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
      <Route path="/strapi-test" element={<StrapiTestPage />} />
      <Route path="/strapi-config" element={<StrapiConfigPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

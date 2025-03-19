
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesLanding from './pages/CaseStudiesLanding';
import CaseStudyDetail from './pages/CaseStudyDetail';
import CaseStudyEditor from './pages/CaseStudyEditor';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import DatabaseTestPage from './pages/DatabaseTestPage';
import Footer from './components/Footer';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-studies" element={<CaseStudiesLanding />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/case-studies" element={<CaseStudyEditor />} />
        <Route path="/admin/case-studies/:slug" element={<CaseStudyEditor />} />
        <Route path="/database-test" element={<DatabaseTestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;

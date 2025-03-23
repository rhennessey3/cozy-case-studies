
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesLanding from './pages/CaseStudiesLanding';
import CaseStudyDetail from './pages/CaseStudyDetail';
import NotFound from './pages/NotFound';
import DatabaseTestPage from './pages/DatabaseTestPage';
import AdminLogin from './pages/AdminLogin';
import AdminCaseStudies from './pages/AdminCaseStudies';
import CaseStudyEditor from './pages/CaseStudyEditor';

// This router is used for compatibility with createBrowserRouter
// The main application uses AppRoutes.tsx with the Routes/Route components
const routes = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/case-studies',
    element: <CaseStudiesLanding />,
  },
  {
    path: '/case-studies/:slug',
    element: <CaseStudyDetail />,
  },
  {
    path: '/database-test',
    element: <DatabaseTestPage />,
  },
  
  // Admin routes
  {
    path: '/admin',
    element: <AdminCaseStudies />, // Redirect to case studies
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/case-studies',
    element: <AdminCaseStudies />,
  },
  {
    path: '/admin/case-studies/:slug',
    element: <CaseStudyEditor />,
  },
  
  // Not Found route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;

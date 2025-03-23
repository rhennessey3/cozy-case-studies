
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesLanding from './pages/CaseStudiesLanding';
import CaseStudyDetail from './pages/CaseStudyDetail';
import NotFound from './pages/NotFound';
import DatabaseTestPage from './pages/DatabaseTestPage';

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
  
  // Not Found route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;

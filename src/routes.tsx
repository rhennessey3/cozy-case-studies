
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesLanding from './pages/CaseStudiesLanding';
import CaseStudyDetail from './pages/CaseStudyDetail';
import NotFound from './pages/NotFound';
import StrapiTestPage from './pages/StrapiTestPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/home',
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
    path: '/strapi-test',
    element: <StrapiTestPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;

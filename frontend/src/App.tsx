
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudyDetail from './pages/CaseStudyDetail'
import CaseStudiesLanding from './pages/CaseStudiesLanding'
import NotFound from './pages/NotFound'
import StrapiTestPage from './pages/StrapiTestPage'
import { Toaster } from '@/components/ui/toaster'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-studies" element={<CaseStudiesLanding />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/strapi-test" element={<StrapiTestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

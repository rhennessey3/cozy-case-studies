
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import Home from '@/pages/Home'
import About from '@/pages/About'
import CaseStudyDetail from '@/pages/CaseStudyDetail'
import CaseStudiesLanding from '@/pages/CaseStudiesLanding'
import NotFound from '@/pages/NotFound'
import StrapiTestPage from '@/pages/StrapiTestPage'
import StrapiConfigPage from '@/pages/StrapiConfigPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-studies" element={<CaseStudiesLanding />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/strapi-test" element={<StrapiTestPage />} />
        <Route path="/strapi-config" element={<StrapiConfigPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

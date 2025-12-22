import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTestSetStore } from './store/useTestSetStore'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'
import Admin from './pages/Admin'

function App() {
  const { initializeTestSets } = useTestSetStore()

  useEffect(() => {
    initializeTestSets()
  }, [initializeTestSets])

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

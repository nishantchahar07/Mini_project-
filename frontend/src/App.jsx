import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Terms from './pages/Terms'
import Footer from './components/Footer'
import './styles/global.css'

function AppContent() {
  const [language, setLanguage] = useState('en')
  const [token, setToken] = useState(sessionStorage.getItem('token') || '')
  const location = useLocation()

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const showFooter = location.pathname !== '/terms'

  return (
    <div className="app">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login language={language} setLanguage={setLanguage} setToken={setToken} />} />
          <Route path="/register" element={<Register language={language} setLanguage={setLanguage} setToken={setToken} />} />
          <Route path="/terms" element={<Terms language={language} />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

function App(){
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

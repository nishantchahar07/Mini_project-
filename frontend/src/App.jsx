import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Terms from './pages/Terms'
import Pricelist from './pages/Pricelist'
import './styles/global.css'

function AppContent() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en'
  })
  const [token, setToken] = useState(sessionStorage.getItem('token') || '')
  const location = useLocation()

  // Handle language changes and persist to localStorage
  const handleLanguageChange = (newLang) => {
    console.log('App: Language changing from', language, 'to', newLang)
    setLanguage(newLang)
    localStorage.setItem('selectedLanguage', newLang)
  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])


  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login language={language} setLanguage={handleLanguageChange} setToken={setToken} />} />
          <Route path="/register" element={<Register language={language} setLanguage={handleLanguageChange} setToken={setToken} />} />
          <Route path="/terms" element={<Terms language={language} setLanguage={handleLanguageChange} />} />
          <Route path="/pricelist" element={<Pricelist language={language} setLanguage={handleLanguageChange} />} />
        </Routes>
      </main>
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

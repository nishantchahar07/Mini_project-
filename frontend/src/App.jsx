import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Footer from './components/Footer'

function App(){
  const [language, setLanguage] = useState('en')
  const [token, setToken] = useState(sessionStorage.getItem('token') || '')

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <Header language={language} setLanguage={setLanguage} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login language={language} setLanguage={setLanguage} setToken={setToken} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

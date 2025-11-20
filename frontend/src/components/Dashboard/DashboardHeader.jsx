import { useState, useEffect } from 'react'
import axios from 'axios'
import './DashboardHeader.css'

export default function DashboardHeader({ language, setLanguage }) {
  const [texts, setTexts] = useState({})
  const [user, setUser] = useState(null)


  useEffect(() => {
    loadTexts()
    loadUser()
  }, [language])

  async function loadUser() {
    try {
      const token = sessionStorage.getItem('token')
      if (!token) return
      
      // Fetch real user data from the backend using JWT token
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const userData = response.data
      setUser({
        name: userData.displayName,
        company: userData.companyName,
        email: userData.email,
        id: userData.id
      })
    } catch (error) {
      console.log("Error loading user data:", error)
      
      // Fallback to sessionStorage data if API fails
      const userEmail = sessionStorage.getItem('userEmail')
      if (userEmail) {
        const emailUser = userEmail.split('@')[0]
        const emailDomain = userEmail.split('@')[1]
        
        const userName = emailUser.includes('.') 
          ? emailUser.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
          : emailUser.charAt(0).toUpperCase() + emailUser.slice(1)
        
        let companyName = 'Your Company'
        if (emailDomain === 'fakturera.com') {
          companyName = 'Fakturera AS'
        } else if (emailDomain === 'demo.com') {
          companyName = 'Demo Company'
        } else {
          companyName = emailDomain.split('.')[0].charAt(0).toUpperCase() + emailDomain.split('.')[0].slice(1) + ' AS'
        }
        
        setUser({
          name: userName,
          company: companyName,
          email: userEmail
        })
      } else {
        // Final fallback
        setUser({
          name: 'User',
          company: 'Company AS',
          email: 'user@company.com'
        })
      }
    }
  }

  async function loadTexts() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Header i18n load error", error)
    }
  }

  const toggleLanguage = () => {
    console.log('DashboardHeader: Current language:', language)
    console.log('DashboardHeader: setLanguage function available:', !!setLanguage)
    if (!setLanguage) {
      console.error('setLanguage function is not available!')
      return
    }
    const newLang = language === 'en' ? 'sv' : 'en'
    console.log('DashboardHeader: Toggling to:', newLang)
    setLanguage(newLang)
  }

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-brand">
        <div className="dashboard-avatar" />
        <div className="dashboard-user">
          <div className="dashboard-name">{user?.name || 'Loading...'}</div>
          <div className="dashboard-sub">{user?.company || 'Loading...'}</div>
        </div>
      </div>
      <div className="dashboard-lang" onClick={toggleLanguage}>
        {language === 'en' ? 'English' : 'Svenska'} 
        <span className="dashboard-flag">{language === 'en' ? '🇬🇧' : '🇸🇪'}</span>
      </div>
    </header>
  )
}
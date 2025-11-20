import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import axios from "axios"
import "../styles/header.css"

export default function Header({ language = "en", setLanguage = () => {} }) {
  const [openLang, setOpenLang] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [texts, setTexts] = useState({})
  const dropdownRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Header i18n load error", error)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenLang(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  function toggleLang() {
    setOpenLang(!openLang)
  }

  function chooseLang(lang) {
    console.log('Header: Choosing language:', lang)
    console.log('Header: setLanguage function available:', !!setLanguage)
    setLanguage(lang)
    setOpenLang(false)
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <button 
          className="mobile-hamburger" 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          <Menu size={24} color="white" />
        </button>
        
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="logo"
          className="header-logo desktop-only"
        />
      </div>

      <nav className="header-nav desktop-only">
        <a href="#" className="nav-link">{texts.home || "Home"}</a>
        <a href="#" className="nav-link">{texts.order || "Order"}</a>
        <a href="#" className="nav-link">{texts.ourCustomers || "Our Customers"}</a>
        <a href="#" className="nav-link">{texts.aboutUs || "About us"}</a>
        <a href="#" className="nav-link">{texts.contactUs || "Contact Us"}</a>
      </nav>

      <div className="header-right">
        <div className="lang-group" ref={dropdownRef}>
          <button className="flag-tile" onClick={toggleLang}>
            <img
              src={language === "en"
                ? "https://storage.123fakturere.no/public/flags/GB.png"
                : "https://storage.123fakturere.no/public/flags/SE.png"}
              alt={language === "en" ? "EN" : "SV"}
            />
          </button>

          {openLang && (
            <div className="lang-dropdown">
              <button className="lang-item" onClick={() => chooseLang("sv")}>
                <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="SE" />
                <span>Svenska</span>
              </button>
              <button className="lang-item" onClick={() => chooseLang("en")}>
                <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="GB" />
                <span>English</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="menu-dropdown" ref={menuRef}>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>{texts.home || "Home"}</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>{texts.order || "Order"}</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>{texts.ourCustomers || "Our Customers"}</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>{texts.aboutUs || "About us"}</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>{texts.contactUs || "Contact Us"}</a>
          </div>
        </>
      )}
    </header>
  )
}
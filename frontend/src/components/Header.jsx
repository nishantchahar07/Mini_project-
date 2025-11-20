import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import "../styles/header.css"

export default function Header({ language = "en", setLanguage = () => {} }) {
  const [openLang, setOpenLang] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuRef = useRef(null)

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
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Order</a>
        <a href="#" className="nav-link">Our Customers</a>
        <a href="#" className="nav-link">About us</a>
        <a href="#" className="nav-link">Contact Us</a>
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
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>Order</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>Our Customers</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>About us</a>
            <a href="#" className="menu-item" onClick={() => setMenuOpen(false)}>Contact Us</a>
          </div>
        </>
      )}
    </header>
  )
}
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Header({ language = "en", setLanguage = () => {} }) {
  const [openLang, setOpenLang] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenLang(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  function toggleLang() {
    setOpenLang(!openLang)
  }

  function chooseLang(lang) {
    setLanguage(lang)
    setOpenLang(false)
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="logo"
          className="header-logo"
        />
      </div>

      <nav className="header-nav" aria-label="Main navigation">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Order</a>
        <a href="#" className="nav-link">Our Customers</a>
        <a href="#" className="nav-link">About us</a>
        <a href="#" className="nav-link">Contact Us</a>
      </nav>

      <div className="header-right">
        <div className="lang-group" ref={dropdownRef}>
          <button
            className="flag-tile"
            title={language === "en" ? "English" : "Svenska"}
            onClick={toggleLang}
            aria-haspopup="menu"
            aria-expanded={openLang}
          >
            <img
              src={language === "en"
                ? "https://storage.123fakturere.no/public/flags/GB.png"
                : "https://storage.123fakturere.no/public/flags/SE.png"}
              alt={language === "en" ? "EN" : "SE"}
            />
          </button>

          {openLang && (
            <div className="lang-dropdown" role="menu">
              <button className="lang-item" onClick={() => chooseLang("se")}>
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

        <button className="hamburger-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>≡</button>
      </div>

      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <button
                className="drawer-close"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <ul className="drawer-items">
              <li onClick={() => navigate("/terms")}>Terms</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

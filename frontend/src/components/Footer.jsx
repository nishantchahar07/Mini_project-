import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/footer.css"

export default function Footer({ language = "en" }) {
  const [texts, setTexts] = useState({})
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Footer i18n load error", error)
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="brand-big">123 Fakturera</div>
          <div className="divider" />
        </div>

        <nav className="footer-nav">
          <a href="#" className="footer-link">{texts.home || "Home"}</a>
          <a href="#" className="footer-link">{texts.order || "Order"}</a>
          <a href="#" className="footer-link">{texts.contactUs || "Contact us"}</a>
        </nav>
      </div>

      <div className="footer-bottom">
        © Lättfaktura, CRO no. 638537, {currentYear}. All rights reserved.
      </div>
    </footer>
  )
}
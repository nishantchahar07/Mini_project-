import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Header from "../components/Header"
import Footer from "../components/Footer"
const backgroundImage = "https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"

export default function Terms({ language = "en", setLanguage = () => {} }) {
  const navigate = useNavigate()
  const [texts, setTexts] = useState({})

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Terms i18n load error", error)
    }
  }

  const text = texts.termsFullContent || "Loading terms content..."

  const paragraphs = text.split("\n\n")

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div className="terms-page">
        <div className="terms-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />

        <div className="terms-content-stack">
        {}
        <h1 className="terms-title-outside">{texts.termsTitle || "Terms"}</h1>
        
        {}
        <button 
          className="terms-close-button" 
          onClick={() => navigate(-1)}
        >
          {texts.closeAndGoBack || "Close and Go Back"}
        </button>

        {}
        <div className="terms-container">
          {paragraphs.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
        
        {}
        <button 
          className="terms-close-button" 
          onClick={() => navigate(-1)}
        >
          {texts.closeAndGoBack || "Close and Go Back"}
        </button>
        </div>
      </div>
      <Footer language={language} />
    </>
  )
}

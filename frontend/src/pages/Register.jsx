import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const backgroundImage = "https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"

export default function Register({ language, setLanguage, setToken }) {
  const [businessName, setBusinessName] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [address, setAddress] = useState("")
  const [postal, setPostal] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [texts, setTexts] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const r = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
        if (mounted) setTexts(r.data || {})
      } catch (e) {
        console.log("i18n load error", e)
      }
    }
    load()
    return () => { mounted = false }
  }, [language])

  async function handleRegister(e) {
    e.preventDefault()
    if (loading) return
    setError("")
    setLoading(true)
    try {
      const payload = { businessName, contactPerson, address, postal, city, email, phone, password }
      const r = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/register`, payload)
      const token = r?.data?.token
      if (!token) {
        setError(r?.data?.message || "Registration failed")
        setLoading(false)
        return
      }
      sessionStorage.setItem("token", token)
      setToken(token)
      navigate("/pricelist")
    } catch (e) {
      setError(e?.response?.data?.message || "Registration error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div className="register-page">
        <div className="register-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="register-container">
        <div className="register-card">
          <h1 className="register-heading">{texts.registerTitle || "Register"}</h1>

          <form onSubmit={handleRegister} className="register-form">
            <input
              className="pill-input"
              placeholder={texts.businessName || "Business name"}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <input
              className="pill-input"
              placeholder={texts.contactPerson || "Contact Person"}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />

            <input
              className="pill-input"
              placeholder={texts.address || "Address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="pill-input"
              placeholder={texts.postal || "Postal number"}
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />

            <input
              className="pill-input"
              placeholder={texts.city || "City"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="pill-input"
              placeholder={texts.email || "Email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <input
              className="pill-input"
              placeholder={texts.phone || "Phone number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="terms-text">
              {(texts.trialText || "You can use and try 123 Fakturera for free for 14 days.\n\nThis is a true full-version, so you can send out 1000 invoices or more, for free.\n\n123 Fakturera is so easy and self-explanatory that the chance that you will need help is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from today.\n\nClick Invoice Now to start invoicing. Your first invoice is normally ready to be sent in 5 - 10 minutes.").split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="password-row">
              <input
                className="pill-input password-input"
                type={showPassword ? "text" : "password"}
                placeholder={texts.password || "Choose Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="submit-wrap">
              <button className="cta-btn" type="submit" disabled={loading}>
                {loading ? (texts.registering || "Registering...") : (texts.invoiceNow || "Invoice Now")}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
      <Footer language={language} />
    </>
  )
}

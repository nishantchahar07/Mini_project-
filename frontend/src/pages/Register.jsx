import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const API_BASE = "http://localhost:3000"

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
        const r = await axios.get(`${API_BASE}/api/texts?lang=${language}`)
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
      const payload = {
        businessName,
        contactPerson,
        address,
        postal,
        city,
        email,
        phone,
        password
      }
      const r = await axios.post(`${API_BASE}/api/auth/register`, payload)
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
    <div className="register-page">
      <div
        className="register-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)"
        }}
      />

      <div className="register-wrapper">
        <header className="register-header">
          <div className="logo">Register</div>
          <div className="lang-flag">🇬🇧</div>
        </header>

        <main className="register-box" role="main" aria-labelledby="register-heading">
          <h1 id="register-heading" className="register-title">
            {texts.registerTitle || "Register"}
          </h1>

          <form onSubmit={handleRegister} className="register-form" autoComplete="on" noValidate>
            <div className="form-row">
              <label className="register-label" htmlFor="businessName">{texts.businessName || "Business name"}</label>
              <input id="businessName" className="register-input" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder={texts.businessName || "Business name"} />
            </div>

            <div className="form-row">
              <label className="register-label" htmlFor="contactPerson">{texts.contactPerson || "Contact Person"}</label>
              <input id="contactPerson" className="register-input" type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder={texts.contactPerson || "Contact Person"} />
            </div>

            <div className="form-row">
              <label className="register-label" htmlFor="address">{texts.address || "Address"}</label>
              <input id="address" className="register-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={texts.address || "Address"} />
            </div>

            <div className="row two">
              <div className="form-row">
                <label className="register-label" htmlFor="postal">{texts.postal || "Postal number"}</label>
                <input id="postal" className="register-input" type="text" value={postal} onChange={(e) => setPostal(e.target.value)} placeholder={texts.postal || "Postal number"} />
              </div>

              <div className="form-row">
                <label className="register-label" htmlFor="city">{texts.city || "City"}</label>
                <input id="city" className="register-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={texts.city || "City"} />
              </div>
            </div>

            <div className="form-row">
              <label className="register-label" htmlFor="email">{texts.email || "Email address"}</label>
              <input id="email" className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={texts.email || "Email address"} required />
            </div>

            <div className="form-row">
              <label className="register-label" htmlFor="phone">{texts.phone || "Phone number"}</label>
              <input id="phone" className="register-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={texts.phone || "Phone number"} />
            </div>

            <div className="form-row">
              <label className="register-label" htmlFor="password">{texts.password || "Choose Password"}</label>
              <div className="register-password-wrap">
                <input id="password" className="register-input" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={texts.password || "Choose Password"} required />
                <button type="button" className="register-toggle" onClick={() => setShowPassword((s) => !s)} aria-pressed={showPassword} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <div className="register-error" role="alert">{error}</div>}

            <div className="form-row">
              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? (texts.registering || "Registering...") : (texts.register || "Invoice Now")}
              </button>
            </div>

            <div className="register-links">
              <Link to="/login">Log in</Link>
              <Link to="/terms">{texts.termsLink || "Terms"}</Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

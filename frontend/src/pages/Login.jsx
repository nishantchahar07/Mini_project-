import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const backgroundImage = "https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"

export default function Login({ language, setLanguage, setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [texts, setTexts] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/api/texts?lang=${language}`)
      setTexts(response.data)
    } catch (error) {
      console.log("i18n load error", error)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setError("")

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        username: email,
        password: password
      })

      const token = response.data.token
      if (!token) return setError("Invalid response")

      sessionStorage.setItem("token", token)
      setToken(token)
      navigate("/pricelist")
    } catch (error) {
      console.log(error)
      setError("Incorrect login")
    }
  }

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <div className="login-page">
        <div className="login-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />

        <div className="login-box">
          <h1 className="login-title">{texts.login || "Log in"}</h1>

          <form onSubmit={handleLogin} className="login-form">
            <label className="field-label">{texts.usernameLabel || "Username"}</label>
            <input
              type="text"
              className="input-field"
              placeholder={texts.usernamePlaceholder || "Enter username"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="field-label">{texts.passwordLabel || "Password"}</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder={texts.passwordPlaceholder || "Enter password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" className="login-btn">
              {texts.login || "Log in"}
            </button>

            <div className="login-links">
              <Link to="/register">{texts.register || "Register"}</Link>
              <a href="#">{texts.forgotPassword || "Forgotten password?"}</a>
            </div>
          </form>
        </div>
      </div>
      <Footer language={language} />
    </>
  )
}
// src/pages/Login.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_BASE = "http://localhost:3000"   // change if needed

export default function Login({ language, setLanguage, setToken }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [texts, setTexts] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const res = await axios.get(`${API_BASE}/api/texts?lang=${language}`)
      setTexts(res.data)
    } catch (err) {
      console.log("i18n load error", err)
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username: email,
        password: password
      })

      const token = res.data.token
      if (!token) return setError("Invalid response")

      sessionStorage.setItem("token", token)
      setToken(token)

      navigate("/pricelist")
    } catch (err) {
      console.log(err)
      setError("Incorrect login")
    }
  }


  return (
    <div className="login-page">

      <div
        className="login-bg"
        style={{
          backgroundImage:
            "url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)"
        }}
      />

      <div className="login-box">

        <h1 className="login-title">
          {texts.login || "Log in"}
        </h1>

        <form onSubmit={handleLogin} className="login-form">

          <label className="field-label">
            {texts.username || "Enter your email address"}
          </label>

          <input
            type="text"
            className="input-field"
            placeholder={texts.username || "Email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="field-label">
            {texts.password || "Enter your password"}
          </label>

          <div className="password-wrap">
            <input
              type={showPw ? "text" : "password"}
              className="input-field"
              placeholder={texts.password || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="pw-toggle"
              onClick={() => setShowPw(v => !v)}
            >
              {showPw ? (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.708zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                </svg>
              ) : (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              )}
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="login-btn">
            {texts.login || "Log in"}
          </button>

          <div className="login-links">
            <a href="#">Register</a>
            <a href="#">Forgotten password?</a>
          </div>

        </form>
      </div>

    </div>
  )
}

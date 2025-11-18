import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/header.css'
import './styles/login.css'
import './styles/register.css'
import './styles/terms.css'
import './styles/footer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

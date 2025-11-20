import "../styles/footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="brand-big">123 Fakturera</div>
          <div className="divider" />
        </div>

        <nav className="footer-nav">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">Order</a>
          <a href="#" className="footer-link">Contact us</a>
        </nav>
      </div>

      <div className="footer-bottom">
        © Lättfaktura, CRO no. 638537, {currentYear}. All rights reserved.
      </div>
    </footer>
  )
}
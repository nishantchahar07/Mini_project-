import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './DashboardSidebar.css'

// Import your provided PNG icons
import InvoicesIcon from '../../assets/icons/invoices-BkXL9vU_.png'
import CustomersIcon from '../../assets/icons/customers-D9Vkbe79.png'
import SupportIcon from '../../assets/icons/support-DaW0YcI6.png' // Using support as business icon
import JournalIcon from '../../assets/icons/invoiceJournal-MUxoNRXF.png'
import PricelistIcon from '../../assets/icons/pricelist-B-brUIvJ.png'
import MultipleIcon from '../../assets/icons/multipleInvoicing-CQx5HdvY.png'
import UnpaidIcon from '../../assets/icons/unpaidInvoices-BDSWgO6w.png'
import OfferIcon from '../../assets/icons/offer-D6rRk8QD.png'
import ImportExportIcon from '../../assets/icons/importExport-DcfkwvHi.png'
import DownloadIcon from '../../assets/icons/download.png' // Using download as logout icon

export default function DashboardSidebar({ language }) {
  const [texts, setTexts] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    loadTexts()
  }, [language])

  async function loadTexts() {
    try {
      const response = await axios.get(`http://localhost:3000/api/texts?lang=${language}`)
      setTexts(response.data || {})
    } catch (error) {
      console.log("Sidebar i18n load error", error)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const handlePricelistClick = () => {
    navigate('/pricelist')
  }

  const menuItems = [
    { key: 'invoices', label: texts.invoices || 'Invoices', active: false, icon: InvoicesIcon },
    { key: 'customers', label: texts.customers || 'Customers', active: false, icon: CustomersIcon },
    { key: 'myBusiness', label: texts.myBusiness || 'My Business', active: false, icon: SupportIcon },
    { key: 'invoiceJournal', label: texts.invoiceJournal || 'Invoice Journal', active: false, icon: JournalIcon },
    { 
      key: 'priceList', 
      label: texts.priceList || 'Price List', 
      active: true,
      onClick: handlePricelistClick,
      isActive: location.pathname === '/pricelist',
      icon: PricelistIcon
    },
    { key: 'multipleInvoicing', label: texts.multipleInvoicing || 'Multiple Invoicing', active: false, icon: MultipleIcon },
    { key: 'unpaidInvoices', label: texts.unpaidInvoices || 'Unpaid Invoices', active: false, icon: UnpaidIcon },
    { key: 'offer', label: texts.offer || 'Offer', active: false, icon: OfferIcon },
    { key: 'inventoryControl', label: texts.inventoryControl || 'Inventory Control', active: false, icon: ImportExportIcon },
    { key: 'memberInvoicing', label: texts.memberInvoicing || 'Member Invoicing', active: false, icon: MultipleIcon },
    { key: 'importExport', label: texts.importExport || 'Import/Export', active: false, icon: ImportExportIcon }
  ]

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-menu-title">{texts.menu || 'Menu'}</div>
      <ul className="dashboard-menu-list">
        {menuItems.map((item) => (
          <li 
            key={item.key}
            className={`dashboard-menu-item ${item.isActive ? 'active' : ''} ${!item.active ? 'disabled' : ''}`}
            onClick={item.onClick}
            style={{ cursor: item.active ? 'pointer' : 'not-allowed' }}
          >
            <img src={item.icon} alt={item.label} className="menu-icon" />
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
        <li 
          className="dashboard-menu-item logout"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <img src={DownloadIcon} alt="Logout" className="menu-icon" />
          <span className="menu-label">{texts.logOut || 'Log out'}</span>
        </li>
      </ul>
    </aside>
  )
}
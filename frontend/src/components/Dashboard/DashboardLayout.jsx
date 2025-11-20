import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import './DashboardLayout.css'

export default function DashboardLayout({ children, language, setLanguage }) {
  return (
    <div className="dashboard-layout">
      <DashboardHeader language={language} setLanguage={setLanguage} />
      <div className="dashboard-body">
        <DashboardSidebar language={language} />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  )
}
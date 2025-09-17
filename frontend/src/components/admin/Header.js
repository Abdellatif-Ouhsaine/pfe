import "./Header.css"

const Header = () => {
  return (
    <div className="admin-top-header">
      <div className="header-left-section">
        <h1 className="page-main-title">Partnership Requests</h1>
        
      </div>

      <div className="header-right-section">
        <div className="notification-area">
          <span className="bell-notification-icon">🔔</span>
          <span className="notification-label">Notifications</span>
        </div>

        <div className="admin-user-profile">
          <div className="user-profile-info">
            <span className="admin-user-name">Admin User</span>
            <span className="admin-user-email">admin@gobite.ma</span>
          </div>
          <div className="user-profile-avatar">A</div>
          <span className="logout-door-icon">🚪</span>
        </div>
      </div>
    </div>
  )
}

export default Header

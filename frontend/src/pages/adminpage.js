import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Sidebar from "./../components/admin/Sidebar"
import Header from "./../components/admin/Header"
import PartnershipRequests from "./../components/admin/PartnershipRequests"
import RiderApplications from "./../components/admin/riders"
import RestaurantApplications from "./../components/admin/restaurent"
import "./adminpage.css"

function Admin() {
  const location = useLocation() ;
  const admin = location.pathname;
  return (
   
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main-section">
          <Header />
          
            {admin === '/adminpage/' && <PartnershipRequests/>}
            {admin === '/adminpage' && <PartnershipRequests/>}
            {admin === '/adminpage/riders' && <RiderApplications/>}
            {admin === '/adminpage/restaurants' && <RestaurantApplications/>}

          
        </div>
      </div>
   
  )
}

export default Admin

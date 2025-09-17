import Header from "../../components/dashboard/Header";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../../styles/style.css";

export default function Menu() {
  return (
    <div>
      <Header />
      <div className="menu-navbar">
        <NavLink to="/Dashboardpartner/menu/add" className={({isActive})=>isActive ? "menu-navbar-active" : "menu-navbar-link"}>
          Add new menu
        </NavLink>
        <NavLink to="/Dashboardpartner/menu/menuList" className={({isActive})=>isActive ? "menu-navbar-active" : "menu-navbar-link"}>
          Menu List
        </NavLink>
      </div>
       <div className="menu-content1">
        <Outlet/>
      </div>
    </div>
  );
}

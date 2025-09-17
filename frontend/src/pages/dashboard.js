import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./dashboard/Home";
import Orders from "./dashboard/Orders";
import ZonesListPage from "./dashboard/ZonesListPage";
import AddZonePage from "./dashboard/AddZonePage";
import Reservations from "./dashboard/Reservations";

import Analytics from "./dashboard/Analytics";

import Menu from "./dashboard/Menu";
import AddMenuForm from "./dashboard/AddMenu";
import MenuList from "./dashboard/MenuList";
import Sidebar from "../components/dashboard/Sidebar";
export default function DashboardResto() {
  return (
    <>
      <div className="container1">
        <Sidebar />
        <div className="dashboard-conteneur">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/zones" element={<ZonesListPage />} />
            <Route path="/zones/add" element={<AddZonePage />} />
            <Route path="/zones/edit" element={<AddZonePage />} />
            <Route path="/menu" element={<Menu />}>
              <Route path="add" element={<AddMenuForm />} />
              <Route path="menulist" element={<MenuList />} />
            </Route>
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

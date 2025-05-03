import React, { useState } from "react";
import "./dashboard.css";
import TourPackages from "./TourPackage";
import Customers from "./Customers.jsx";
import Destinations from "./Destinations";
import Bookings from "./Bookings.jsx";
import Settings from "./Settings";

const SIDEBAR_ITEMS = [
  { key: "tour-packages", label: "Tour Packages", icon: "bi-box" },
  { key: "customers", label: "Customers", icon: "bi-people" },
  { key: "destinations", label: "Destinations", icon: "bi-map" },
  { key: "bookings", label: "Bookings", icon: "bi-calendar" },
  { key: "settings", label: "Settings", icon: "bi-gear" },
];

export default function DashboardLayout() {
  const [active, setActive] = useState("tour-packages");

  function renderContent() {
    switch (active) {
      case "tour-packages":
        return <TourPackages />;
      case "customers":
        return <Customers />;
      case "destinations":
        return <Destinations />;
      case "bookings":
        return <Bookings />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  }

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile-photo">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=0d6efd&color=fff&rounded=true&size=80"
            alt="Profile"
          />
        </div>
        <h2 className="dashboard-title">Tour Manager</h2>
        <nav>
          <ul>
            {SIDEBAR_ITEMS.map((item) => (
              <li
                key={item.key}
                className={active === item.key ? "active" : ""}
                onClick={() => setActive(item.key)}>
                <i className={`bi ${item.icon}`}></i> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <button className="dashboard-logout-btn">
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </aside>
      <main className="dashboard-main">{renderContent()}</main>
    </div>
  );
}

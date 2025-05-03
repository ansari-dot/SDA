import React, { useState } from "react";
import "./dashboard.css";
import Hotels from "./Hotels";
import Bookings from "./Bookings";
import Customers from "./Customers";
import Settings from "./Settings";

const SIDEBAR_ITEMS = [
  { key: "hotels", label: "Hotels", icon: "bi-building" },
  { key: "bookings", label: "Bookings", icon: "bi-calendar" },
  { key: "customers", label: "Customers", icon: "bi-people" },
  { key: "settings", label: "Settings", icon: "bi-gear" },
];

export default function DashboardLayout() {
  const [active, setActive] = useState("hotels");

  function renderContent() {
    switch (active) {
      case "hotels":
        return <Hotels />;
      case "bookings":
        return <Bookings />;
      case "customers":
        return <Customers />;
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
            src="https://ui-avatars.com/api/?name=Hotel+Admin&background=0d6efd&color=fff&rounded=true&size=80"
            alt="Profile"
          />
        </div>
        <h2 className="dashboard-title">Hotel Admin</h2>
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
import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import Bookings from "./Bookings";
import Customers from "./Customers";
import Settings from "./Settings";
import Company from "./Company";
import RoomAdd from "./DisplayHotel";
import CompanyAdd from "./AddCompany";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

// --- Dashboard Component ---
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardHome() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 15, 22, 30, 25],
        fill: false,
        borderColor: '#43b36a',
        backgroundColor: '#43b36a',
        tension: 0.4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: 32 }}>Dashboard Overview</h2>
      <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
        <div className="dashboard-card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#43b36a', marginBottom: 8 }}><i className="bi bi-people"></i></div>
          <div style={{ fontWeight: 700, fontSize: 24 }}>1,234</div>
          <div style={{ color: '#888', fontSize: 15 }}>Total Users</div>
        </div>
        <div className="dashboard-card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#43b36a', marginBottom: 8 }}><i className="bi bi-building"></i></div>
          <div style={{ fontWeight: 700, fontSize: 24 }}>56</div>
          <div style={{ color: '#888', fontSize: 15 }}>Total Hotels</div>
        </div>
        <div className="dashboard-card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#43b36a', marginBottom: 8 }}><i className="bi bi-calendar"></i></div>
          <div style={{ fontWeight: 700, fontSize: 24 }}>789</div>
          <div style={{ color: '#888', fontSize: 15 }}>Total Bookings</div>
        </div>
      </div>
      <div className="dashboard-card" style={{ minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Bookings Over Time</div>
        <div style={{ width: '100%', maxWidth: 700 }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

const SIDEBAR_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "bi-bar-chart" },
  { key: "add-company", label: "Add Hotel", icon: "bi-building" },
  { key: "customers", label: "Hotel Verification", icon: "bi-buildings" },
  { key: "company", label: "Hotel ", icon: "bi-buildings" },
  { key: "add-room", label: "Add Room", icon: "bi-door-open" },
  { key: "bookings", label: "Bookings", icon: "bi-calendar" },
  { key: "settings", label: "Settings", icon: "bi-gear" },
];

const notificationsExample = [
  { id: 1, text: "New booking received from John Doe.", time: "2 min ago", unread: true },
  { id: 2, text: "Hotel 'Grand Plaza' verified.", time: "10 min ago", unread: true },
  { id: 3, text: "Room 101 marked as unavailable.", time: "1 hour ago", unread: false },
  { id: 4, text: "New user registered: Sarah A.", time: "2 hours ago", unread: false },
];

export default function DashboardLayout() {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies(["token", "user"]);
  const [data, setData] = useState({});
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(notificationsExample);
  const notifRef = useRef();

  useEffect(() => {
    const user = cookies.user;
    const token = cookies.token;
    if (!token || !user) {
      navigate("/login");
    } else {
      setData(user);
    }
  }, [cookies, navigate]);

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    }
    if (showNotif) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showNotif]);

  const handleLogout = () => {
    removeCookies("token", { path: "/" });
    removeCookies("user", { path: "/" });
    setData({});
    navigate("/login", { replace: true });
    window.history.replaceState(null, "", "/login");
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  function renderContent() {
    switch (active) {
      case "dashboard":
        return <DashboardHome />;
      case "customers":
        return <Customers />;
      case "bookings":
        return <Bookings />;
      case "company":
        return <Company />;
      case "add-company":
        return <CompanyAdd />;
      case "add-room":
        return <RoomAdd />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  }

  // Count unread notifications
  const unreadCount = notifications.filter(n => n.unread).length;
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, unread: false })));

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile-photo">
          <img src={data.profilePhoto} alt="Profile" />
        </div>
        <h2 className="dashboard-title">{data.name}</h2>
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
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </aside>
      <main className="dashboard-main">
        {/* Topbar with notifications and user */}
        <div className="dashboard-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 32, marginBottom: 32, position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 12px rgba(67,179,106,0.06)', borderRadius: 12, padding: '18px 32px' }}>
          {/* Notification Bell */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button className="notif-bell-btn" style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', fontSize: 24, color: '#43b36a', padding: 0 }} onClick={() => setShowNotif(v => !v)}>
              <i className="bi bi-bell"></i>
              {unreadCount > 0 && <span style={{ position: 'absolute', top: 2, right: 2, background: '#d32f2f', color: '#fff', borderRadius: '50%', fontSize: 12, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{unreadCount}</span>}
            </button>
            {showNotif && (
              <div className="notif-dropdown" style={{ position: 'absolute', right: 0, top: 36, minWidth: 320, background: '#fff', boxShadow: '0 8px 32px rgba(67,179,106,0.14)', borderRadius: 12, zIndex: 100, animation: 'fadeInNotif 0.3s', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e6e6e6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#43b36a', fontSize: 16 }}>Notifications</span>
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#4f8cff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Mark all as read</button>
                </div>
                <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: 24, color: '#aaa', textAlign: 'center' }}>No notifications</div>
                  ) : notifications.map(n => (
                    <div key={n.id} style={{ padding: '16px 20px', background: n.unread ? '#e6f7ee' : '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <i className={`bi ${n.unread ? 'bi-dot' : 'bi-dot'} notif-dot`} style={{ color: n.unread ? '#43b36a' : '#bbb', fontSize: 18 }}></i>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: n.unread ? 700 : 500, color: n.unread ? '#222' : '#888', fontSize: 15 }}>{n.text}</div>
                        <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* User Avatar and Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={data.profilePhoto} alt="User" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(67,179,106,0.10)' }} />
            <span style={{ fontWeight: 700, color: '#43b36a', fontSize: 16 }}>{data.name}</span>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

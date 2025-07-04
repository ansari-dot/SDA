import React, { useState, useEffect } from 'react';
import AdminUsers from './AdminUsers';
import AdminBookings from './AdminBookings';
import AdminPackages from './AdminPackages';
import AdminPayments from './AdminPayments';
import AdminCompanies from './AdminCompanies';
import AdminHotels from './AdminHotels';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'users', label: 'Users' },
  { key: 'companies', label: 'Companies' },
  { key: 'hotels', label: 'Hotels' },
  { key: 'packages', label: 'Package Owners' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'payments', label: 'Payments' },
];

const AdminDashboard = () => {
  const [active, setActive] = useState('dashboard');
  const [stats, setStats] = useState({ users: 0, hotelOwners: 0, packageOwners: 0, bookings: 0, payments: 0 });

  // Fetch stats (placeholder, replace with real API calls)
  useEffect(() => {
    setStats({ users: 120, hotelOwners: 8, packageOwners: 6, bookings: 230, payments: 150 });
  }, []);

  // Chart data (placeholder)
  const bookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Bookings', data: [12, 19, 15, 22, 30, 25], backgroundColor: '#4f8cff' },
    ],
  };
  const usersPieData = {
    labels: ['Users', 'Hotel Owners', 'Package Owners'],
    datasets: [
      { data: [106, 8, 6], backgroundColor: ['#4f8cff', '#ffb347', '#7ed957'] },
    ],
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#232946', color: '#fff', display: 'flex', flexDirection: 'column', padding: 24 }}>
        <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32, letterSpacing: 1 }}>Admin Panel</h2>
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            style={{
              background: active === item.key ? '#4f8cff' : 'transparent',
              color: active === item.key ? '#fff' : '#b8c1ec',
              border: 'none',
              borderRadius: 8,
              padding: '14px 18px',
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
          >
            {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, color: '#b8c1ec', marginTop: 32 }}>© {new Date().getFullYear()} Admin Dashboard</div>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <h1 style={{ fontWeight: 800, fontSize: 32, color: '#232946', letterSpacing: 1 }}>
            {SIDEBAR_ITEMS.find(i => i.key === active)?.label || 'Dashboard'}
          </h1>
          <div style={{ fontWeight: 600, color: '#4f8cff', fontSize: 18 }}>Welcome, Admin</div>
        </div>
        {/* Dashboard Home */}
        {active === 'dashboard' && (
          <>
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, minWidth: 200, flex: 1 }}>
                <div style={{ fontSize: 18, color: '#4f8cff', fontWeight: 700 }}>Users</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>{stats.users}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, minWidth: 200, flex: 1 }}>
                <div style={{ fontSize: 18, color: '#ffb347', fontWeight: 700 }}>Hotel Owners</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>{stats.hotelOwners}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, minWidth: 200, flex: 1 }}>
                <div style={{ fontSize: 18, color: '#7ed957', fontWeight: 700 }}>Package Owners</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>{stats.packageOwners}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, minWidth: 200, flex: 1 }}>
                <div style={{ fontSize: 18, color: '#232946', fontWeight: 700 }}>Bookings</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>{stats.bookings}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, minWidth: 200, flex: 1 }}>
                <div style={{ fontSize: 18, color: '#4f8cff', fontWeight: 700 }}>Payments</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>{stats.payments}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, flex: 2, minWidth: 320 }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Bookings Over Time</h3>
                <Bar data={bookingsData} />
              </div>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e6ed', padding: 24, flex: 1, minWidth: 220 }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>User Roles</h3>
                <Pie data={usersPieData} />
              </div>
            </div>
          </>
        )}
        {active === 'users' && <AdminUsers />}
        {active === 'companies' && <AdminCompanies />}
        {active === 'hotels' && <AdminHotels />}
        {active === 'packages' && <AdminPackages />}
        {active === 'bookings' && <AdminBookings />}
        {active === 'payments' && <AdminPayments />}
      </main>
    </div>
  );
};

export default AdminDashboard; 
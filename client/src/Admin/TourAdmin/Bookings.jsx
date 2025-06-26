// Bookings.jsx
import React, { useState } from "react";
import "./bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: 101,
      customer: "Ali Khan",
      package: "Hunza Valley Tour",
      date: "2024-07-10",
      status: "Confirmed",
    },
    {
      id: 102,
      customer: "Sara Ahmed",
      package: "Skardu Adventure",
      date: "2024-08-15",
      status: "Pending",
    },
    {
      id: 103,
      customer: "John Doe",
      package: "Murree Weekend",
      date: "2024-09-01",
      status: "Cancelled",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-badge status-confirmed";
      case "Pending":
        return "status-badge status-pending";
      case "Cancelled":
        return "status-badge status-cancelled";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="customers-container touradmin-bg">
      {/* Header Bar */}
      <div className="touradmin-header">
        <div className="touradmin-header-title">Dashboard &gt; Bookings</div>
        <button className="touradmin-new-btn" onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Search/Filter Bar */}
      <div className="touradmin-filterbar">
        <input
          className="touradmin-search"
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="touradmin-tablecard">
        <table className="touradmin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render booking rows as before, using new styles */}
            {bookings.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>No bookings found</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.package}</td>
                  <td>{booking.date}</td>
                  <td><span className={getStatusClass(booking.status)}>{booking.status}</span></td>
                  <td>
                    <button className="hotel-btn-secondary" style={{marginRight: 8}} onClick={() => handleEdit(booking)}>Edit</button>
                    <button className="hotel-btn-secondary" style={{background: '#fff0f0', color: '#d32f2f', border: '1px solid #ffd6d6'}} onClick={() => deleteBooking(booking.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add Booking Form (hidden by default, shown on '+ New') */}
      {showForm && (
        <div className="dashboard-card" style={{ position: 'relative', marginBottom: 32 }}>
          <button className="close-form-btn" onClick={() => setShowForm(false)}>&times;</button>
          {/* Render the form as before */}
          {/* ...form JSX... */}
        </div>
      )}
    </div>
  );
}

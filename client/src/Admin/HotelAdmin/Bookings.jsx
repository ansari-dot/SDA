import React, { useState, useEffect } from "react";
import "./bookings.css";
import { useCookies } from "react-cookie";

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:2000/admin/bookings", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [cookies.token]);

  const filtered = bookings.filter(
    b =>
      (b.customer?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.hotel?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.status || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hoteladmin-bg">
      {/* Header Bar */}
      <div className="hoteladmin-header">
        <div className="hoteladmin-header-title">Dashboard &gt; Bookings</div>
        <button className="hoteladmin-new-btn" onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Search Bar */}
      <div className="hoteladmin-filterbar">
        <input
          className="hoteladmin-search"
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="hoteladmin-tablecard">
        {loading ? (
          <div style={{ textAlign: "center", color: "#888", padding: 32 }}>Loading bookings...</div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "#d32f2f", padding: 32 }}>Error: {error}</div>
        ) : (
          <table className="hoteladmin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa" }}>No bookings found</td></tr>
              ) : (
                filtered.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.customer?.name || "-"}</td>
                    <td>{booking.hotel?.name || "-"}</td>
                    <td>{booking.room?.roomType || "-"}</td>
                    <td>{booking.date ? new Date(booking.date).toLocaleDateString() : "-"}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button className="bookings-action-btn">View</button>
                      <button className="bookings-action-btn">Edit</button>
                      <button className="bookings-action-btn bookings-action-danger">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Add Booking Form (not implemented here, just placeholder) */}
      {showForm && (
        <div className="dashboard-card" style={{background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', margin: '32px auto', maxWidth: 600, position: 'relative'}}>
          <button
            className="close-form-btn"
            onClick={() => setShowForm(false)}
            style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 20, color: '#aaa', cursor: 'pointer' }}
            title="Close"
          >
            ×
          </button>
          <div className="dashboard-card-header" style={{display: "flex",alignItems: "center",gap: "10px",marginBottom: "20px",}}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              <i className="bi bi-calendar"></i> Add Booking (Form Here)
            </h2>
          </div>
          {/* Booking form fields go here */}
        </div>
      )}
    </div>
  );
}

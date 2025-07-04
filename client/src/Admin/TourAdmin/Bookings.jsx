// Bookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2000/api/tourbooking", { withCredentials: true });
      setBookings(res.data.bookings || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:2000/api/tourbooking/${id}`, { withCredentials: true });
      fetchBookings();
    } catch {
      alert("Failed to delete booking");
    }
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

  const filteredBookings = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (b.packageId?.destination || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-container touradmin-bg">
      {/* Header Bar */}
      <div className="touradmin-header">
        <div className="touradmin-header-title">Dashboard &gt; Bookings</div>
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
              <th>Email</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} style={{ color: 'red' }}>{error}</td></tr>
            ) : filteredBookings.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa" }}>No bookings found</td></tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.packageId?.destination || "-"}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td><span className={getStatusClass(booking.status)}>{booking.status}</span></td>
                  <td>
                    <button className="hotel-btn-secondary" style={{background: '#fff0f0', color: '#d32f2f', border: '1px solid #ffd6d6'}} onClick={() => deleteBooking(booking._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

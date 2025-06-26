// RoomList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

function RoomList({ hotelId }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelsLoading, setHotelsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/get/rooms/${hotelId}`
        );
        setRooms(response.data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [hotelId]);

  useEffect(() => {
    const fetchHotels = async () => {
      setHotelsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get/allhotel?limit=3`);
        setHotels(Array.isArray(response.data.hotels) ? response.data.hotels : []);
      } catch (error) {
        setHotels([]);
      } finally {
        setHotelsLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomType?.toLowerCase().includes(search.toLowerCase()) ||
      String(room.pricePerNight).includes(search)
  );

  return (
    <div className="hoteladmin-bg">
      {/* Header Bar */}
      <div className="hoteladmin-header">
        <div className="hoteladmin-header-title">Dashboard &gt; Rooms</div>
        <button className="hoteladmin-new-btn" onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Show first three hotels */}
      <div style={{ margin: "24px 0" }}>
        <h4 style={{ marginBottom: 12 }}>Top 3 Hotels</h4>
        {hotelsLoading ? (
          <div>Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <div style={{ color: "#aaa" }}>No hotels found</div>
        ) : (
          <div style={{ display: "flex", gap: 24 }}>
            {hotels.map((hotel) => (
              <div key={hotel._id} style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: 16,
                minWidth: 220,
                maxWidth: 260,
                flex: "1 1 220px"
              }}>
                <div style={{
                  height: 120,
                  background: `url(${hotel.images && hotel.images.length > 0 ? `${API_BASE_URL}/${hotel.images[0]}` : "https://via.placeholder.com/220x120?text=No+Image"}) center/cover no-repeat`,
                  borderRadius: 8,
                  marginBottom: 10
                }}></div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{hotel.name}</div>
                <div style={{ color: "#888", fontSize: 14 }}>{hotel.location}</div>
                <div style={{ color: "#d4a017", fontWeight: 600, fontSize: 15 }}>
                  <i className="bi bi-star-fill" /> {hotel.rating}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div className="hoteladmin-filterbar">
        <input
          className="hoteladmin-search"
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="hoteladmin-tablecard">
        <table className="hoteladmin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room Type</th>
              <th>Price/Night</th>
              <th>Guests</th>
              <th>Beds</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: "center" }}>Loading...</td></tr>
            ) : filteredRooms.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa" }}>No rooms found</td></tr>
            ) : (
              filteredRooms.map(room => (
                <tr key={room._id}>
                  <td>
                    {room.image ? (
                      <img src={`${API_BASE_URL}/Uploads/${room.image}`} alt="room" className="hoteladmin-thumb" />
                    ) : (
                      <div className="hoteladmin-thumb hoteladmin-thumb-placeholder">No Image</div>
                    )}
                  </td>
                  <td>{room.roomType}</td>
                  <td>${room.pricePerNight}</td>
                  <td>{room.numberOfGuest}</td>
                  <td>{room.numberOfBeds}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add Room Form (not implemented here, just placeholder) */}
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
              <i className="bi bi-door-open"></i> Add Room (Form Here)
            </h2>
          </div>
          {/* Room form fields go here */}
        </div>
      )}
    </div>
  );
}

export default RoomList;

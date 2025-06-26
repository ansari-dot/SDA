import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import "./hotelDetail.css";

const HotelDetail = () => {
  const hotelDetail = useSelector((state) => state.hotel.hotelDetail);

  if (!hotelDetail) {
    return <div className="text-center py-5">Loading hotel details...</div>;
  }

  // Fallbacks
  const name = hotelDetail.name || "Hotel Name";
  const location = hotelDetail.location || "Location";
  const rating = hotelDetail.rating || 0;
  const description = hotelDetail.description
    ? hotelDetail.description.length > 120
      ? hotelDetail.description.slice(0, 120) + "..."
      : hotelDetail.description
    : "No description available.";
  const amenities = hotelDetail.facilities || hotelDetail.amenities || [];
  const imageUrl = hotelDetail.images && hotelDetail.images.length > 0
    ? `http://localhost:2000/${hotelDetail.images[0]}`
    : "https://via.placeholder.com/1200x500?text=No+Image";
  const rooms = hotelDetail.rooms || [];

  return (
    <div className="hoteldetail-root bg-light">
      {/* Hero Section */}
      <section
        className="position-relative w-100 mb-5"
        style={{
          minHeight: 360,
          background: `url(${imageUrl}) center/cover no-repeat`,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          boxShadow: '0 8px 32px 0 rgba(44,103,119,0.13)',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(120deg, rgba(60,40,20,0.65) 0%, rgba(120,90,60,0.45) 100%)',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            zIndex: 1,
          }}
        ></div>
        <div className="container position-relative z-2 py-5" style={{ zIndex: 2 }}>
          <div className="d-flex flex-column align-items-start justify-content-end" style={{ minHeight: 320 }}>
            <h1 className="display-3 fw-bold text-white mb-3" style={{ textShadow: '0 4px 24px rgba(60,40,20,0.25)' }}>{name}</h1>
            <div className="d-flex align-items-center gap-4 mb-3">
              <span className="badge bg-primary bg-opacity-75 px-3 py-2 rounded-pill fs-5">
                <i className="bi bi-geo-alt me-1"></i> {location}
              </span>
              <span className="badge bg-warning bg-opacity-75 px-3 py-2 rounded-pill fs-5">
                <i className="bi bi-star-fill text-white me-1"></i> {rating} / 5
              </span>
            </div>
            <p className="lead text-white mb-0" style={{ maxWidth: 600, opacity: 0.92 }}>{description}</p>
          </div>
        </div>
      </section>

      {/* Amenities & Reservation Section */}
      <section className="container mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-3" style={{ color: '#7c4f1d' }}>Amenities</h2>
            <div className="d-flex flex-wrap gap-3 mb-3">
              {amenities.length > 0 ? (
                amenities.slice(0, 8).map((amenity, idx) => (
                  <span key={idx} className="badge bg-light text-dark border" style={{ fontSize: '1.1rem', fontWeight: 500, borderRadius: 16, padding: '10px 18px' }}>
                    <i className={
                      amenity === "Free WiFi"
                        ? "bi bi-wifi"
                        : amenity === "Pool"
                        ? "bi bi-water"
                        : amenity === "Spa"
                        ? "bi bi-droplet"
                        : amenity === "Mountain Views"
                        ? "bi bi-image"
                        : amenity === "Restaurant"
                        ? "bi bi-egg-fried"
                        : "bi bi-dot"
                    } style={{ marginRight: 8 }}></i>
                    {amenity}
                  </span>
                ))
              ) : (
                <span className="text-muted">No amenities listed.</span>
              )}
            </div>
          </div>
          <div className="col-lg-4 text-lg-end text-center">
            <button
              className="btn btn-lg px-5 py-3 fw-bold shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)',
                color: '#fffbe9',
                borderRadius: 18,
                fontSize: '1.2rem',
                boxShadow: '0 2px 12px 0 rgba(120,90,60,0.10)',
              }}
            >
              <i className="bi bi-calendar-check me-2"></i>
              Make a Reservation
            </button>
          </div>
        </div>
      </section>

      {/* Room List Section */}
      <section className="container mb-5">
        <h2 className="fw-bold mb-4" style={{ color: "#7c4f1d" }}>Available Rooms</h2>
        <div className="row g-4">
          {rooms.length > 0 ? (
            rooms.map((room, idx) => (
              <div className="col-md-6 col-lg-4" key={room._id || idx}>
                <div className="card shadow-sm h-100" style={{ borderRadius: 16, overflow: 'hidden', border: 'none' }}>
                  <div
                    style={{
                      height: 180,
                      background: `url(${room.images && room.images.length > 0 ? `http://localhost:2000/${room.images[0]}` : "https://via.placeholder.com/400x200?text=No+Image"}) center/cover no-repeat`,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  ></div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-2" style={{ color: '#21747b' }}>{room.roomType}</h5>
                    <div className="mb-2 text-muted">${room.pricePerNight} / night</div>
                    <div className="mb-2">
                      <span className="me-3"><i className="bi bi-people me-1"></i> {room.numberOfGuest} Guests</span>
                      <span><i className="bi bi-moon me-1"></i> {room.numberOfBeds} Beds</span>
                    </div>
                    <button
                      className="btn mt-auto"
                      style={{ background: 'linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)', color: '#fffbe9', borderRadius: 12, fontWeight: 600 }}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-center py-5">No rooms available for this hotel.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;

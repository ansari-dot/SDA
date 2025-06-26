import React, { useEffect, useState } from "react";
import "./hotels.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:2000";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get/allhotel?limit=9`);
        setHotels(Array.isArray(response.data.hotels) ? response.data.hotels : []);
      } catch (err) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <section className="hotels-section">
      <h2 className="hotels-title">Popular Hotels & Accommodations</h2>
      <p className="hotels-desc">
        Discover the perfect place to stay during your journey through Pakistan,
        from luxurious hotels to serene mountain retreats.
      </p>
      {loading ? (
        <div style={{ textAlign: "center", color: "#888", padding: 32 }}>Loading hotels...</div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "#d9534f", padding: 32 }}>{error}</div>
      ) : (
        <div className="container">
          <div className="row g-4">
            {hotels.map((hotel, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div className="hotel-card">
                  <div
                    className="hotel-img"
                    style={{ backgroundImage: `url(${hotel.images && hotel.images.length > 0 ? `${API_BASE_URL}/${hotel.images[0]}` : "https://via.placeholder.com/400x200?text=No+Image"})` }}>
                    <div className="hotel-rating-badge">
                      <i className="bi bi-star-fill" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="hotel-info">
                    <div className="hotel-title-row">
                      <span className="hotel-name">{hotel.name}</span>
                      <span className="hotel-price">
                        From ${hotel.price}
                        <span className="hotel-price-night">/night</span>
                      </span>
                    </div>
                    <div className="hotel-location">
                      <i className="bi bi-geo-alt" /> {hotel.location}
                    </div>
                    <div className="hotel-amenities">
                      {(hotel.amenities || hotel.facilities || []).slice(0, 3).map((amenity, idx) => (
                        <span className="hotel-amenity" key={idx}>
                          <i
                            className={
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
                            }></i>{" "}
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="hotel-guests">
                      <i className="bi bi-people" /> {hotel.guests || "-"}
                    </div>
                    <button className="hotel-btn btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link
              to="/hotels"
              style={{
                background: "linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)",
                color: "#fffbe9",
                border: "none",
                borderRadius: 22,
                padding: "16px 44px",
                fontSize: "1.2rem",
                fontWeight: 700,
                boxShadow: "0 2px 12px 0 rgba(120,90,60,0.10)",
                transition: "background 0.2s, color 0.2s",
                textDecoration: "none",
                display: "inline-block"
              }}
              onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #b07d3c 0%, #7c4f1d 100%)")}
              onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)")}
            >
              See All Hotels
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hotels;

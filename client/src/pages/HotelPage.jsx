import React from "react";
import "./hotelPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHotel } from "../redux/hotelSlice.js";
const hotels = [
  {
    image: "/images/pearl.jpg",
    name: "Pearl Continental Hotel",
    location: "Lahore",
    price: 150,
    rating: 4.8,
    amenities: ["Free WiFi", "Pool", "Spa"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/serena.jpg",
    name: "Serena Hotel",
    location: "Islamabad",
    price: 180,
    rating: 4.9,
    amenities: ["Free WiFi", "Pool", "Spa"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/marriott.jpg",
    name: "Marriott Hotel",
    location: "Karachi",
    price: 160,
    rating: 4.7,
    amenities: ["Free WiFi", "Pool", "Restaurant"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/shangrila.jpg",
    name: "Shangrila Resort",
    location: "Skardu",
    price: 200,
    rating: 4.9,
    amenities: ["Free WiFi", "Mountain Views", "Restaurant"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/luxus.jpg",
    name: "Luxus Hunza Resort",
    location: "Hunza",
    price: 190,
    rating: 4.8,
    amenities: ["Free WiFi", "Mountain Views", "Restaurant"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/greenretreat.jpg",
    name: "Green Retreat",
    location: "Murree",
    price: 130,
    rating: 4.5,
    amenities: ["Free WiFi", "Restaurant", "Heating"],
    guests: "2-4 Guests",
  },
];

export default function HotelPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleViewDetail = (p) => {
    dispatch(setHotel(p));
    navigate("/hotel-detail");
  };
  return (
    <div className="hotelpage-root">
      {/* Hero Section */}
      <section className="hotelpage-hero">
        <h1 className="hotelpage-hero-title">
          Find Your Perfect Stay in Pakistan
        </h1>
        <p className="hotelpage-hero-desc">
          Browse our selection of hotels, resorts, and guesthouses across
          Pakistan's most beautiful destinations.
        </p>
        <div className="hotelpage-filter-container">
          <div className="hotelpage-filter-row">
            <div className="hotelpage-filter-group">
              <label className="hotelpage-filter-label">Location</label>
              <input
                className="hotelpage-filter-input"
                placeholder="All Locations"
              />
            </div>
            <div className="hotelpage-filter-group">
              <label className="hotelpage-filter-label">Price Range</label>
              <div className="hotelpage-filter-slider-row">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="hotelpage-filter-slider"
                />
                <span className="hotelpage-filter-slider-label">
                  $0 - $1000
                </span>
              </div>
            </div>
            <div className="hotelpage-filter-group">
              <label className="hotelpage-filter-label">Rating</label>
              <input
                className="hotelpage-filter-input"
                placeholder="Any Rating"
              />
            </div>
          </div>
          <div className="hotelpage-filter-actions">
            <button className="hotelpage-filter-btn hotelpage-filter-apply">
              <i className="bi bi-search" /> Apply Filters
            </button>
            <button className="hotelpage-filter-btn hotelpage-filter-clear">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="hotelpage-main">
        <div className="hotelpage-main-header">
          <h2 className="hotelpage-main-title">6 Hotels Found</h2>
          <div className="hotelpage-sort-dropdown">
            <select>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
            </select>
          </div>
        </div>
        <div className="hotelpage-grid">
          {hotels.map((h, i) => (
            <div className="hotelpage-card" key={i}>
              <div
                className="hotelpage-img"
                style={{ backgroundImage: `url(${h.image})` }}>
                <div className="hotelpage-rating-badge">
                  <i className="bi bi-star-fill" /> {h.rating}
                </div>
              </div>
              <div className="hotelpage-info">
                <div className="hotelpage-row hotelpage-title-row">
                  <span className="hotelpage-name">{h.name}</span>
                  <span className="hotelpage-price">
                    From ${h.price}
                    <span className="hotelpage-price-night">/night</span>
                  </span>
                </div>
                <div className="hotelpage-location">
                  <i className="bi bi-geo-alt" /> {h.location}
                </div>
                <div className="hotelpage-amenities">
                  {h.amenities.map((a, j) => (
                    <span className="hotelpage-amenity" key={j}>
                      <i
                        className={
                          a === "Free WiFi"
                            ? "bi bi-wifi"
                            : a === "Pool"
                            ? "bi bi-water"
                            : a === "Spa"
                            ? "bi bi-droplet"
                            : a === "Mountain Views"
                            ? "bi bi-image"
                            : a === "Restaurant"
                            ? "bi bi-egg-fried"
                            : a === "Heating"
                            ? "bi bi-thermometer"
                            : "bi bi-dot"
                        }></i>{" "}
                      {a}
                    </span>
                  ))}
                </div>
                <div className="hotelpage-guests">
                  <i className="bi bi-people" /> {h.guests}
                </div>
                <button
                  className="hotelpage-btn"
                  onClick={() => handleViewDetail(p)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="hotelpage-cta">
        <h2 className="hotelpage-cta-title">
          Can't Find What You're Looking For?
        </h2>
        <p className="hotelpage-cta-desc">
          Contact our travel experts who can help you find the perfect
          accommodation for your needs.
        </p>
        <div className="hotelpage-cta-actions">
          <button className="hotelpage-cta-btn hotelpage-cta-contact">
            Contact Us
          </button>
          <button className="hotelpage-cta-btn hotelpage-cta-packages">
            View Tour Packages
          </button>
        </div>
      </section>
    </div>
  );
}

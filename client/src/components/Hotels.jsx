import React from "react";
import "./hotels.css";

const hotels = [
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
    image: "/images/shangrila.jpg",
    name: "Shangrila Resort",
    location: "Skardu",
    price: 200,
    rating: 4.9,
    amenities: ["Free WiFi", "Mountain Views", "Restaurant"],
    guests: "2-4 Guests",
  },
  {
    image: "/images/pearl.jpg",
    name: "Pearl Continental Hotel",
    location: "Lahore",
    price: 150,
    rating: 4.8,
    amenities: ["Free WiFi", "Pool", "Spa"],
    guests: "2-4 Guests",
  },
];

export default function Hotels() {
  return (
    <section className="hotels-section">
      <h2 className="hotels-title">Popular Hotels & Accommodations</h2>
      <p className="hotels-desc">
        Find the perfect place to stay during your journey through Pakistan, from luxury hotels to cozy mountain retreats.
      </p>
      <div className="hotels-grid">
        {hotels.map((h, i) => (
          <div className="hotel-card" key={i}>
            <div className="hotel-img" style={{ backgroundImage: `url(${h.image})` }}>
              <div className="hotel-rating-badge">
                <i className="bi bi-star-fill" /> {h.rating}
              </div>
            </div>
            <div className="hotel-info">
              <div className="hotel-row hotel-title-row">
                <span className="hotel-name">{h.name}</span>
                <span className="hotel-price">From ${h.price}<span className="hotel-price-night">/night</span></span>
              </div>
              <div className="hotel-location">
                <i className="bi bi-geo-alt" /> {h.location}
              </div>
              <div className="hotel-amenities">
                {h.amenities.map((a, j) => (
                  <span className="hotel-amenity" key={j}><i className={a === "Free WiFi" ? "bi bi-wifi" : a === "Pool" ? "bi bi-water" : a === "Spa" ? "bi bi-droplet" : a === "Mountain Views" ? "bi bi-image" : a === "Restaurant" ? "bi bi-egg-fried" : "bi bi-dot"}></i> {a}</span>
                ))}
              </div>
              <div className="hotel-guests">
                <i className="bi bi-people" /> {h.guests}
              </div>
              <button className="hotel-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
      <button className="hotels-all-btn">View All Hotels</button>
    </section>
  );
} 
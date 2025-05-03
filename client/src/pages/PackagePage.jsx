import React from "react";
import "./packagePage.css";

const packages = [
  {
    image: "/images/northpakistan.jpg",
    name: "Northern Adventure",
    company: "Explore Pakistan Tours",
    price: 1200,
    rating: 4.8,
    features: ["7 Days", "All-Inclusive", "Guided"],
    location: "Hunza, Skardu, Fairy Meadows",
  },
  {
    image: "/images/lahoreheritage.jpg",
    name: "Lahore Heritage Tour",
    company: "Heritage Travels",
    price: 600,
    rating: 4.7,
    features: ["3 Days", "Cultural", "City Tour"],
    location: "Lahore",
  },
  {
    image: "/images/karachisea.jpg",
    name: "Karachi Sea Breeze",
    company: "Sun & Sand Tours",
    price: 850,
    rating: 4.6,
    features: ["5 Days", "Beach", "Family Friendly"],
    location: "Karachi, Gwadar",
  },
  {
    image: "/images/swatvalley.jpg",
    name: "Swat Valley Escape",
    company: "Green Valley Adventures",
    price: 950,
    rating: 4.9,
    features: ["6 Days", "Nature", "Hiking"],
    location: "Swat, Kalam",
  },
  {
    image: "/images/murreetrip.jpg",
    name: "Murree Hills Retreat",
    company: "Mountain Breeze Co.",
    price: 700,
    rating: 4.5,
    features: ["4 Days", "Resort Stay", "Couple Friendly"],
    location: "Murree",
  },
  {
    image: "/images/desertadventure.jpg",
    name: "Cholistan Desert Adventure",
    company: "Desert Explorers",
    price: 1100,
    rating: 4.7,
    features: ["5 Days", "Desert Safari", "Camping"],
    location: "Cholistan",
  },
];

export default function PackagePage() {
  return (
    <div className="packagepage-root">
      {/* Hero Section */}
      <section className="packagepage-hero">
        <h1 className="packagepage-hero-title">Discover Amazing Tour Packages</h1>
        <p className="packagepage-hero-desc">
          Explore curated travel packages from top tour companies across Pakistan's most breathtaking destinations.
        </p>
        <div className="packagepage-filter-container">
          <div className="packagepage-filter-row">
            <div className="packagepage-filter-group">
              <label className="packagepage-filter-label">Destination</label>
              <input className="packagepage-filter-input" placeholder="All Destinations" />
            </div>
            <div className="packagepage-filter-group">
              <label className="packagepage-filter-label">Price Range</label>
              <div className="packagepage-filter-slider-row">
                <input type="range" min="0" max="2000" className="packagepage-filter-slider" />
                <span className="packagepage-filter-slider-label">$0 - $2000</span>
              </div>
            </div>
            <div className="packagepage-filter-group">
              <label className="packagepage-filter-label">Company</label>
              <input className="packagepage-filter-input" placeholder="Any Company" />
            </div>
          </div>
          <div className="packagepage-filter-actions">
            <button className="packagepage-filter-btn packagepage-filter-apply"><i className="bi bi-search" /> Apply Filters</button>
            <button className="packagepage-filter-btn packagepage-filter-clear">Clear Filters</button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="packagepage-main">
        <div className="packagepage-main-header">
          <h2 className="packagepage-main-title">6 Packages Found</h2>
          <div className="packagepage-sort-dropdown">
            <select>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
            </select>
          </div>
        </div>
        <div className="packagepage-grid">
          {packages.map((p, i) => (
            <div className="packagepage-card" key={i}>
              <div className="packagepage-img" style={{ backgroundImage: `url(${p.image})` }}>
                <div className="packagepage-rating-badge">
                  <i className="bi bi-star-fill" /> {p.rating}
                </div>
              </div>
              <div className="packagepage-info">
                <div className="packagepage-row packagepage-title-row">
                  <span className="packagepage-name">{p.name}</span>
                  <span className="packagepage-price">From ${p.price}</span>
                </div>
                <div className="packagepage-company">
                  <i className="bi bi-building" /> {p.company}
                </div>
                <div className="packagepage-location">
                  <i className="bi bi-geo-alt" /> {p.location}
                </div>
                <div className="packagepage-features">
                  {p.features.map((f, j) => (
                    <span className="packagepage-feature" key={j}><i className="bi bi-check-circle" /> {f}</span>
                  ))}
                </div>
                <button className="packagepage-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="packagepage-cta">
        <h2 className="packagepage-cta-title">Can't Find the Perfect Package?</h2>
        <p className="packagepage-cta-desc">
          Contact our travel experts who can help you customize your dream tour experience.
        </p>
        <div className="packagepage-cta-actions">
          <button className="packagepage-cta-btn packagepage-cta-contact">Contact Us</button>
          <button className="packagepage-cta-btn packagepage-cta-packages">View All Companies</button>
        </div>
      </section>
    </div>
  );
} 
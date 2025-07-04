import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_BASE_URL = "http://localhost:2000";

export default function HomePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/package/allflat`);
        const data = await response.json();
        setPackages(Array.isArray(data.packages) ? data.packages.slice(0, 3) : []);
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <section className="home-packages-section">
      <h2 className="hotels-title">Top Tour Packages</h2>
      <p className="hotels-desc">
        Handpicked experiences for your next adventure. Explore our most popular tour packages in Pakistan.
      </p>
      {loading ? (
        <div style={{ textAlign: "center", color: "#888", padding: 32 }}>Loading packages...</div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "#d9534f", padding: 32 }}>{error}</div>
      ) : (
        <div className="container">
          <div className="row g-4">
            {packages.map((pkg, index) => {
              let imgUrl = pkg.image
                ? `${API_BASE_URL}/${pkg.image.replaceAll('\\','/')}`
                : "https://via.placeholder.com/400x200?text=No+Image";
              return (
                <div className="col-12 col-md-4" key={index}>
                  <div className="hotel-card">
                    <div
                      className="hotel-img"
                      style={{ backgroundImage: `url(${imgUrl})`, height: 220 }}
                    >
                      <div className="hotel-rating-badge">
                        <i className="bi bi-star-fill" /> {pkg.rating || 5}
                      </div>
                    </div>
                    <div className="hotel-info">
                      <div className="hotel-title-row">
                        <span className="hotel-name">{pkg.packageType} Tour</span>
                        <span className="hotel-price">
                          Rs. {pkg.price?.toLocaleString() || "-"}
                          <span className="hotel-price-night">/person</span>
                        </span>
                      </div>
                      <div className="hotel-location">
                        <i className="bi bi-geo-alt" /> {pkg.destination}
                      </div>
                      <div className="hotel-amenities">
                        <span className="hotel-amenity"><i className="bi bi-building"></i> {pkg.companyName}</span>
                      </div>
                      <button className="hotel-btn btn">View Details</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link
              to="/packages"
              className="hotels-all-btn"
            >
              See All Packages
            </Link>
          </div>
        </div>
      )}
    </section>
  );
} 
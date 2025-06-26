import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHotelDetail, setRoomList } from "../redux/hotelSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

// Inline styles (unchanged)
const styles = {
  hotelPage: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
    paddingTop: "3rem",
    fontFamily: "'Inter', sans-serif",
  },
  heroSection: {
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    padding: "120px 0 80px",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "1.5rem",
    lineHeight: 1.2,
  },
  heroSubtitle: {
    color: "#e9ecef",
    fontSize: "1.25rem",
    fontWeight: 400,
    marginBottom: "3rem",
    opacity: 0.9,
  },
  filterContainer: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
  },
  filterLabel: {
    color: "#ffffff",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  filterInput: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    color: "#ffffff",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },
  filterButton: {
    borderRadius: "12px",
    fontWeight: 600,
    padding: "12px 30px",
    transition: "all 0.3s ease",
  },
  hotelCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s ease",
    border: "none",
  },
  hotelImage: {
    height: "250px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 100%)",
  },
  ratingBadge: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "25px",
    padding: "8px 15px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
  },
  priceTag: {
    fontSize: "1.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #f28b82 0%, #cf6679 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  amenityItem: {
    fontSize: "0.9rem",
    color: "#6c757d",
    marginBottom: "5px",
  },
  ctaSection: {
    background:
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    padding: "80px 0",
    position: "relative",
    overflow: "hidden",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "1rem",
  },
  ctaSubtitle: {
    color: "#e9ecef",
    fontSize: "1.25rem",
    fontWeight: 400,
    marginBottom: "3rem",
    opacity: 0.9,
  },
  responsiveHeroTitle: {
    fontSize: "2.5rem",
  },
  responsiveHeroSubtitle: {
    fontSize: "1rem",
  },
  responsiveHotelImage: {
    height: "200px",
  },
};

// Note: Wrap this component in an ErrorBoundary in the parent component (e.g., App.jsx) to handle rendering errors gracefully.
// Example ErrorBoundary:
// class ErrorBoundary extends React.Component {
//   state = { hasError: false };
//   static getDerivedStateFromError(error) { return { hasError: true }; }
//   componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
//   render() {
//     if (this.state.hasError) {
//       return <div style={{ textAlign: "center", padding: "5rem 0", color: "#dc3545" }}>
//         Something went wrong. Please try again later.
//       </div>;
//     }
//     return this.props.children;
//   }
// }

const HotelList = memo(function HotelList({ hotels, loading, error, currentPage, totalPages, handlePageChange, fetchHotelDetail }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 0", color: "#6c757d" }}>
        Loading hotels...
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>;
  }
  return (
    <div className="container pb-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <h2 className="fw-bold mb-0" style={{ color: "#7c4f1d", fontSize: "2rem" }}>{hotels.length} Hotels Found</h2>
      </div>
      <div className="row g-4">
        {Array.isArray(hotels) && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div className="col-lg-4 col-md-6" key={hotel._id || index}>
              <div className="card shadow-sm h-100" style={{ borderRadius: 18, overflow: 'hidden', border: 'none' }}>
                <div
                  className="hotel-img"
                  style={{
                    height: 220,
                    backgroundImage: `url(${hotel.images && hotel.images.length > 0 ? `http://localhost:2000/${hotel.images[0]}` : "https://via.placeholder.com/400x200?text=No+Image"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <div className="hotel-rating-badge" style={{ position: 'absolute', top: 18, right: 18, background: '#d4a017', color: '#fff', padding: '0.5rem 1rem', borderRadius: 50, fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <i className="bi bi-star-fill" /> {hotel.rating}
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="hotel-title-row d-flex justify-content-between align-items-center mb-2">
                    <span className="hotel-name fw-semibold" style={{ fontSize: '1.2rem', color: '#2c2c2c' }}>{hotel.name}</span>
                    <span className="hotel-price" style={{ color: '#d4a017', fontWeight: 600 }}>
                      {hotel.minRoomPrice !== undefined && hotel.minRoomPrice !== null
                        ? `From $${hotel.minRoomPrice}`
                        : <span style={{ color: '#888', fontWeight: 400, fontSize: '0.95rem' }}>No rooms available</span>}
                      <span className="hotel-price-night" style={{ color: '#7a7a7a', fontSize: '0.9rem' }}>{hotel.minRoomPrice !== undefined && hotel.minRoomPrice !== null ? "/night" : ""}</span>
                    </span>
                  </div>
                  <div className="hotel-location mb-2" style={{ color: '#7a7a7a', fontSize: '1.05rem' }}>
                    <i className="bi bi-geo-alt" /> {hotel.location}
                  </div>
                  <div className="hotel-amenities mb-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {(hotel.facilities || hotel.amenities || []).slice(0, 3).map((amenity, idx) => (
                      <span className="hotel-amenity" key={idx} style={{ background: '#f0efeb', padding: '0.5rem 1rem', borderRadius: 20, fontSize: '0.9rem', color: '#5a5a5a' }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="hotel-description mb-2" style={{ color: '#888', fontSize: 14 }}>
                    {hotel.description
                      ? hotel.description.slice(0, 80) + (hotel.description.length > 80 ? "..." : "")
                      : ""}
                  </div>
                  <button
                    className="btn mt-auto"
                    style={{ background: 'linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)', color: '#fffbe9', borderRadius: 12, fontWeight: 600 }}
                    onClick={() => fetchHotelDetail(hotel._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5">No hotels found.</div>
        )}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item${currentPage === i + 1 ? " active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
});

export default function HotelPage() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hotelsPerPage = 9;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    rating: "",
    sort: "price-low-high",
  });

  // Unified fetch function
  const fetchHotels = async (page = 1, filterState = filters) => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", hotelsPerPage);
    if (filterState.location) params.append("location", filterState.location);
    if (filterState.price) params.append("price", filterState.price);
    if (filterState.rating) params.append("rating", filterState.rating);
    if (filterState.sort) params.append("sort", filterState.sort);
    try {
      const response = await axios.get(`http://localhost:2000/api/get/allhotel?${params.toString()}`);
      setHotels(Array.isArray(response.data.hotels) ? response.data.hotels : []);
      setTotalPages(response.data.totalPages || 1);
    } catch (e) {
      setError("Failed to load hotels. Please try again.");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and whenever filters or page changes
  useEffect(() => {
    fetchHotels(currentPage, filters);
    // eslint-disable-next-line
  }, [currentPage, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
    fetchHotels(1, newFilters);
  };

  // Handle filter submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHotels(1, filters);
    setCurrentPage(1);
  };

  // Handle clear filters
  const handleClear = () => {
    setFilters({
      location: "",
      price: "",
      rating: "",
      sort: "price-low-high",
    });
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch hotel details and rooms
  const fetchHotelDetail = async (hotelId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/get/hoteldetail/${hotelId}`
      );
      dispatch(setHotelDetail({
        ...(response.data.hotel || {}),
        rooms: Array.isArray(response.data.rooms) ? response.data.rooms : [],
      }));
      navigate(`/hotel/${hotelId}`);
    } catch (err) {
      console.error("Error fetching hotel details:", err);
    }
  };

  // Inject styles for pseudo-elements and hover effects
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 20% 80%, rgba(242, 139, 130, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(207, 102, 121, 0.3) 0%, transparent 50%);
        pointer-events: none;
      }
      .cta-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 70% 30%, rgba(242, 139, 130, 0.2) 0%, transparent 50%);
        pointer-events: none;
      }
      .filter-input::placeholder {
        color: rgba(255, 255, 255, 0.7) !important;
      }
      .filter-input:focus {
        background: rgba(255, 255, 255, 0.2) !important;
        border-color: #f28b82 !important;
        box-shadow: 0 0 0 0.2rem rgba(242, 139, 130, 0.25) !important;
        color: white !important;
      }
      .btn-gradient-primary {
        background: linear-gradient(135deg, #f28b82 0%, #cf6679 100%);
        border: none;
        border-radius: 12px;
        font-weight: 600;
        padding: 12px 30px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(242, 139, 130, 0.3);
        color: white;
      }
      .btn-gradient-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(242, 139, 130, 0.4);
        color: white;
      }
      .btn-glass {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      .btn-glass:hover {
        background: rgba(255, 255, 255, 0.25);
        color: white;
      }
      .package-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      }
      .sort-select {
        border-radius: 12px;
        border: 2px solid #e9ecef;
        padding: 10px 15px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: white;
      }
      .sort-select:focus {
        border-color: #f28b82;
        box-shadow: 0 0 0 0.2rem rgba(242, 139, 130, 0.25);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.hotelPage}>
      {/* Hero Section - Modernized */}
      <section className="hero-section" style={styles.heroSection}>
        <div className="container hero-content" style={styles.heroContent}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h1
                className="hero-title"
                style={{
                  ...styles.heroTitle,
                  ...(isMobile ? styles.responsiveHeroTitle : {}),
                }}>
                Discover Your Perfect Stay in Pakistan
              </h1>
              <p
                className="hero-subtitle"
                style={{
                  ...styles.heroSubtitle,
                  ...(isMobile ? styles.responsiveHeroSubtitle : {}),
                }}>
                Explore luxurious hotels, serene resorts, and charming guesthouses across Pakistan's breathtaking destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar - Card/Glassmorphism */}
      <div className="container" style={{ marginTop: -60, zIndex: 10, position: 'relative' }}>
        <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: 24, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4 p-md-5">
            <div>
              <div className="row g-4 align-items-end">
                <div className="col-md-3">
                  <label className="form-label fw-semibold" htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="form-control"
                    placeholder="All Locations"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold" htmlFor="price">Price Range ($)</label>
                  <input
                    type="range"
                    name="price"
                    id="price"
                    min="0"
                    max="1000"
                    className="form-range mb-2"
                    value={filters.price}
                    onChange={handleFilterChange}
                    style={{ accentColor: "#b07d3c" }}
                  />
                  <div className="d-flex justify-content-between">
                    <span style={{ color: "#888", fontSize: "0.9rem" }}>$0</span>
                    <span style={{ color: "#888", fontSize: "0.9rem" }}>${filters.price}</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold" htmlFor="rating">Minimum Rating</label>
                  <select
                    name="rating"
                    id="rating"
                    className="form-select"
                    value={filters.rating}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold" htmlFor="sort">Sort By</label>
                  <select
                    name="sort"
                    id="sort"
                    className="form-select"
                    value={filters.sort}
                    onChange={handleFilterChange}
                    style={{ borderRadius: 12, fontWeight: 500 }}
                  >
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating-high-low">Rating: High to Low</option>
                    <option value="rating-low-high">Rating: Low to High</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "linear-gradient(90deg, #7c4f1d 0%, #b07d3c 100%)",
                    color: "#fffbe9",
                    borderRadius: 12,
                    fontWeight: 600,
                    padding: "12px 30px",
                    boxShadow: "0 2px 12px 0 rgba(120,90,60,0.10)",
                  }}
                  onClick={handleClear}
                >
                  <i className="bi bi-search me-2"></i>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel List Section - Modern Cards */}
      <HotelList
        hotels={hotels}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        fetchHotelDetail={fetchHotelDetail}
      />
    </div>
  );
}

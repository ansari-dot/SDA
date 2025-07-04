import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/packagePage.css';

export default function CompanyPackagesPage() {
  const { companyName } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyPackages = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:2000/api/package/allflat');
        const all = res.data.packages || [];
        // Filter by companyName (case-insensitive)
        const filtered = all.filter(p => (p.companyName || '').toLowerCase() === (companyName || '').toLowerCase());
        setPackages(filtered);
        setError('');
        if (process.env.NODE_ENV !== 'production') {
          console.log('Company page:', companyName, 'All company names in data:', filtered.map(p => p.companyName));
        }
      } catch (err) {
        setError('Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyPackages();
  }, [companyName]);

  return (
    <div className="packagepage-root">
      <div className="container py-5">
        <button className="btn btn-outline-primary mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <h2 className="section-title mb-4">Packages by {companyName}</h2>
        {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
          <div className="row g-4">
            {packages.length === 0 ? (
              <div className="text-center py-5">No packages found for this company.</div>
            ) : (
              packages.map((item, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="card package-card h-100">
                    <div
                      className="package-img"
                      style={{
                        backgroundImage: `url(${
                          item.image
                            ? `http://localhost:2000/${item.image.replace('\\', '/')}`
                            : 'https://via.placeholder.com/400x250'
                        })`,
                      }}
                    >
                      <div className="rating-badge">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {item.rating || 'N/A'}
                        <i className="bi bi-people-fill text-muted ms-2 me-1"></i>
                        {item.numberOfPeople || 1}
                      </div>
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-building" style={{ color: '#667eea' }}></i>
                        <span className="ms-2 fw-semibold">{companyName}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="package-type">{item.packageType || 'Standard'} Tour</span>
                        <div className="text-end">
                          <div className="price-tag">Rs {item.price?.toLocaleString() || 'N/A'}</div>
                          <small className="text-muted">per person</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-geo-alt-fill" style={{ color: '#667eea' }}></i>
                        <span className="ms-2 fw-semibold">{item.destination || 'Unknown'}</span>
                      </div>
                      <div className="mb-4 flex-grow-1">
                        {item.facilities?.slice(0, 4).map((facility, i) => (
                          <div key={i} className="facility-item">
                            <i className="bi bi-check-circle-fill facility-icon"></i>
                            {facility}
                          </div>
                        ))}
                        {item.facilities?.length > 4 && (
                          <small className="text-primary fw-semibold">
                            +{item.facilities.length - 4} more facilities
                          </small>
                        )}
                      </div>
                      <button
                        className="btn btn-view-details mt-auto"
                        onClick={() => navigate(`/package/${item.destination}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
import React from "react";
import "./packageDetail.css";

export default function PackageDetail() {
  return (
    <div className="packagedetail-root">
      <button className="packagedetail-backbtn">&#8592; Back to Packages</button>
      <div className="packagedetail-main">
        <div className="packagedetail-imgcol">
          <img
            className="packagedetail-img"
            src="/images/hunza.jpg"
            alt="Hunza Valley Explorer"
          />
        </div>
        <div className="packagedetail-infocol">
          <div className="packagedetail-company-badge">North Trip &amp; Travel</div>
          <h1 className="packagedetail-title">Hunza Valley Explorer</h1>
          <div className="packagedetail-meta">
            <span className="packagedetail-meta-item">
              <i className="bi bi-geo-alt" /> Hunza Valley
            </span>
            <span className="packagedetail-meta-item">
              <i className="bi bi-calendar-event" /> 7 days
            </span>
          </div>
          <div className="packagedetail-desc">
            Experience the beauty of Hunza Valley with visits to Attabad Lake, Baltit Fort, and Eagle's Nest.
          </div>
          <hr className="packagedetail-divider" />
          <div className="packagedetail-price-row">
            <div>
              <div className="packagedetail-price-label">Price per person</div>
              <div className="packagedetail-price">Rs. 85,000</div>
            </div>
            <button className="packagedetail-bookbtn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
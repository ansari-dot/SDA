import React, { useState } from "react";
import "./tourpackages.css";

export default function TourPackages() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Add New Tour Package</h1>
      <form className="tourpackage-form">
        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Package Type</label>
            <input type="text" placeholder="e.g. Beach Vacation, Mountain Trek" />
          </div>
          <div className="tourpackage-col">
            <label>Price</label>
            <input type="text" placeholder="Price in USD" />
          </div>
        </div>
        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Destination</label>
            <input type="text" placeholder="e.g. Bali, Paris" />
          </div>
          <div className="tourpackage-col">
            <label>Travel Date</label>
            <input type="date" />
          </div>
        </div>
        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Duration (Days)</label>
            <input type="number" placeholder="Number of days" />
          </div>
          <div className="tourpackage-col">
            <label>Number of People</label>
            <input type="number" placeholder="Max number of people" />
          </div>
        </div>
        <div className="tourpackage-row">
          <div className="tourpackage-col">
            <label>Rating</label>
            <input type="number" placeholder="Rating out of 5" />
          </div>
          <div className="tourpackage-col">
            <label>Package Image</label>
            <input type="file" />
            <div className="tourpackage-image-placeholder">
              <i className="bi bi-image" style={{ fontSize: "2.5rem", color: "#b0b7c3" }}></i>
            </div>
          </div>
        </div>
        <div className="tourpackage-row">
          <div className="tourpackage-col-full">
            <label>Description</label>
            <textarea placeholder="Describe the tour package"></textarea>
          </div>
        </div>
        <div className="tourpackage-row">
          <div className="tourpackage-col-full">
            <label>Facilities</label>
            <div className="tourpackage-facilities">
              <label><input type="checkbox" /> WiFi</label>
              <label><input type="checkbox" /> Breakfast</label>
              <label><input type="checkbox" /> Swimming Pool</label>
              <label><input type="checkbox" /> Spa</label>
              <label><input type="checkbox" /> Gym</label>
              <label><input type="checkbox" /> Tour Guide</label>
              <label><input type="checkbox" /> Transportation</label>
              <label><input type="checkbox" /> All Meals</label>
            </div>
          </div>
        </div>
        <div className="tourpackage-actions">
          <button type="submit" className="tourpackage-save-btn">Save Tour Package</button>
        </div>
      </form>
    </div>
  );
}

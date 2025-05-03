import React, { useState } from "react";
import axios from "axios";
import "./hotels.css";

export default function Hotels() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerNight: "",
    numberOfGuest: "",
    facilities: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          facilities: [...formData.facilities, value],
        });
      } else {
        setFormData({
          ...formData,
          facilities: formData.facilities.filter((f) => f !== value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    try {
      await axios.post("http://localhost:5000/api/hotels", hotelData);
      alert("Hotel saved successfully!");
      setFormData({
        name: "",
        location: "",
        pricePerNight: "",
        numberOfGuest: "",
        facilities: [],
      });
    } catch (err) {
      console.error(err);
      alert("Error saving hotel.");
    }
      */
  };

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Add New Hotel</h1>
      <form className="hotel-form" onSubmit={handleSubmit}>
        <div className="hotel-row">
          <div className="hotel-col">
            <label>Hotel Name</label>
            <input
              type="text"
              name="name"
              placeholder="Hotel Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hotel-col">
            <label>City/Location</label>
            <input
              type="text"
              name="location"
              placeholder="City or Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="hotel-row">
          <div className="hotel-col">
            <label>Price Per Night</label>
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price per night (USD)"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hotel-col">
            <label>Guests</label>
            <input
              type="number"
              name="numberOfGuest"
              placeholder="Number of guests"
              value={formData.numberOfGuest}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="hotel-row">
          <div className="hotel-col-full">
            <label>Facilities</label>
            <div className="hotel-facilities">
              {[
                "WiFi",
                "Breakfast",
                "Swimming Pool",
                "Spa",
                "Gym",
                "Parking",
                "Restaurant",
                "Room Service",
              ].map((facility) => (
                <label key={facility}>
                  <input
                    type="checkbox"
                    name="facilities"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleChange}
                  />{" "}
                  {facility}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="hotel-actions">
          <button type="submit" className="hotel-save-btn">
            Save Hotel
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomForm({ hotelId }) {
  const [formData, setFormData] = useState({
    roomType: "",
    pricePerNight: "",
    numberOfGuest: "",
    numberOfBeds: "",
    description: "",
    image: null,
  });

  const [validated, setValidated] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const data = new FormData();
    data.append("roomType", formData.roomType);
    data.append("pricePerNight", formData.pricePerNight);
    data.append("numberOfGuest", formData.numberOfGuest);
    data.append("numberOfBeds", formData.numberOfBeds);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        `http://localhost:2000/api/add/room/${hotelId}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Room added successfully!", { position: "top-center" });
      console.log("Room added:", response.data);
    } catch (err) {
      toast.error("Failed to add room: " + err.message, {
        position: "top-center",
      });
    }

    // Reset form
    setFormData({
      roomType: "",
      pricePerNight: "",
      numberOfGuest: "",
      numberOfBeds: "",
      description: "",
      image: null,
    });
    setValidated(false);
    form.reset();
  };

  return (
    <div>
      <ToastContainer />
      {!showForm && (
        <button
          className="show-form-btn"
          style={{
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
            marginBottom: "24px",
            transition: "background 0.2s",
          }}
          onClick={() => setShowForm(true)}>
          + Add Room
        </button>
      )}

      {showForm && (
        <div
          className="card shadow-lg rounded-4 border-0 p-4"
          style={{
            maxWidth: "500px",
            margin: "auto",
            backgroundColor: "#f8f9fa",
            position: "relative",
          }}>
          <button
            className="close-form-btn"
            onClick={() => setShowForm(false)}
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              background: "none",
              border: "none",
              fontSize: 20,
              color: "#aaa",
              cursor: "pointer",
            }}
            title="Close">
            ×
          </button>
          <h3 className="text-center mb-4 text-dark">Room Details Form</h3>

          <form
            noValidate
            className={validated ? "was-validated" : ""}
            onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <input
                type="text"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please enter the room type.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Price Per Night ($)</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                className="form-control"
                min="0"
                required
              />
              <div className="invalid-feedback">Enter a valid price.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Number of Guests</label>
              <input
                type="number"
                name="numberOfGuest"
                value={formData.numberOfGuest}
                onChange={handleChange}
                className="form-control"
                min="1"
                required
              />
              <div className="invalid-feedback">
                At least 1 guest is required.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Number of Beds</label>
              <input
                type="number"
                name="numberOfBeds"
                value={formData.numberOfBeds}
                onChange={handleChange}
                className="form-control"
                min="1"
                required
              />
              <div className="invalid-feedback">
                At least 1 bed is required.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Enter room description"
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please provide a description.
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Image Upload</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="invalid-feedback">Please upload an image.</div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark rounded-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoomForm;

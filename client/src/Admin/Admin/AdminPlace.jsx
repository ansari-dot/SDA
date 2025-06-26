import React, { useState } from "react";
import axios from "axios";
const AdminPlace = () => {
  const [formData, setFormData] = useState({
    location: "",
    placeName: "",
    description: "",
    fullDetails: "",
    image: null,
    rating: "",
    bestTime: "",
    review: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Simple toast function
  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.background = type === "error" ? "#f44336" : "#4CAF50";
    toast.style.color = "white";
    toast.style.borderRadius = "4px";
    toast.style.zIndex = "1000";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:2000/api/places/add",
        form,
        {
          withCredentials: true,
        }
      );

      showToast("Place added successfully!", "success");

      // Reset form
      setFormData({
        location: "",
        placeName: "",
        description: "",
        fullDetails: "",
        image: null,
        rating: "",
        bestTime: "",
        review: "",
      });
      setPreviewImage(null);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to add place",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h1>Add Tourist Destination</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Place Name</label>
          <input
            type="text"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Full Details</label>
          <textarea
            name="fullDetails"
            value={formData.fullDetails}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {previewImage && <img src={previewImage} alt="Preview" />}
        </div>

        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Best Time to Visit</label>
          <input
            type="text"
            name="bestTime"
            value={formData.bestTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Place"}
        </button>
      </form>

      <style jsx>{`
        .admin-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        textarea {
          min-height: 100px;
        }
        button {
          background: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background: #cccccc;
        }
        img {
          max-width: 200px;
          margin-top: 10px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default AdminPlace;

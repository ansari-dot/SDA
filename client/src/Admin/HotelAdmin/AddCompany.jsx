import React, { useState, useEffect } from "react";
import "./hotels.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

const CompanyAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    facilities: [],
    description: "",
    loading: false,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState({}); // { hotelId: [room, ...] }
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch hotels and their rooms
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoadingHotels(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/get/hotel`, {
        withCredentials: true,
      });

      const data = res.data;
      setHotels(data.hotels || []);

      // Fetch rooms for each hotel with error handling
      const roomsObj = {};
      await Promise.all(
        (data.hotels || []).map(async (hotel) => {
          try {
            const r = await axios.get(
              `${API_BASE_URL}/api/get/rooms/${hotel._id}`,
              { withCredentials: true }
            );
            roomsObj[hotel._id] = r.data.rooms || [];
          } catch (error) {
            console.error(
              `Error fetching rooms for hotel ${hotel._id}:`,
              error
            );
            roomsObj[hotel._id] = [];
            toast.error(`Failed to load rooms for ${hotel.name}`);
          }
        })
      );
      setRooms(roomsObj);
    } catch (e) {
      console.error("Error loading hotels:", e);
      toast.error(e.response?.data?.message || "Failed to load hotels");
    }
    setLoadingHotels(false);
  };
  /* const fetchHotels = async () => {
    setLoadingHotels(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/get/hotel`, {
        withCredentials: true,
      });
      const data = res.data;
      setHotels(data.hotels || []);
      // Fetch rooms for each hotel
      const roomsObj = {};
      await Promise.all(
        (data.hotels || []).map(async (hotel) => {
          try {
            const r = await axios.get(
              `${API_BASE_URL}/api/get/rooms/${hotel._id}`,
              { withCredentials: true }
            );
            roomsObj[hotel._id] = r.data.rooms || [];
          } catch {
            roomsObj[hotel._id] = [];
          }
        })
      );
      setRooms(roomsObj);
    } catch (e) {
      toast.error("Failed to load hotels");
    }
    setLoadingHotels(false);
  }; */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        facilities: checked
          ? [...prevData.facilities, value]
          : prevData.facilities.filter((f) => f !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.rating
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setFormData((prev) => ({ ...prev, loading: true }));

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("rating", formData.rating);
    data.append("description", formData.description);
    formData.facilities.forEach((f) => data.append("facilities[]", f));
    images.forEach((image) => data.append("images", image));

    try {
      const response = await axios.post(`${API_BASE_URL}/api/hotel/add`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Hotel added successfully!");
        setFormData({
          name: "",
          location: "",
          rating: "",
          facilities: [],
          description: "",
          loading: false,
        });
        setImages([]);
        setPreviewImages([]);
        setShowForm(false);
        // Add new hotel to list
        fetchHotels();
      } else {
        toast.error(response.data.message || "Something went wrong");
        setFormData((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Error submitting hotel data:", error);
      toast.error(error.response?.data?.message || "Failed to submit hotel");
      setFormData((prev) => ({ ...prev, loading: false }));
    }
  };

  const renderRatingStars = () => {
    const rating = parseInt(formData.rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i + 1}
        className={`rating-star ${i + 1 <= rating ? "active" : ""}`}
        onClick={() => setFormData({ ...formData, rating: (i + 1).toString() })}
        style={{ cursor: "pointer", fontSize: "1.2rem" }}>
        <i className="bi bi-star-fill"></i>
      </span>
    ));
  };

  // Filter hotels by search
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name?.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hoteladmin-bg">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header Bar */}
      <div className="hoteladmin-header">
        <div className="hoteladmin-header-title">Dashboard &gt; Hotels</div>
        <button
          className="hoteladmin-new-btn"
          onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Search/Filter Bar */}
      <div className="hoteladmin-filterbar">
        <input
          className="hoteladmin-search"
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Add more filters here if needed */}
      </div>
      {/* Table */}
      <div className="hoteladmin-tablecard">
        <table className="hoteladmin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Facilities</th>
              <th>Rooms</th>
            </tr>
          </thead>
          <tbody>
            {loadingHotels ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredHotels.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>
                  No hotels found
                </td>
              </tr>
            ) : (
              filteredHotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td>
                    {/* Show first image if available */}
                    {hotel.images && hotel.images.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}/Uploads/${hotel.images[0]}`}
                        alt="hotel"
                        className="hoteladmin-thumb"
                      />
                    ) : (
                      <div className="hoteladmin-thumb hoteladmin-thumb-placeholder">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{hotel.name}</td>
                  <td>{hotel.location}</td>
                  <td>
                    <span style={{ color: "#ffc107" }}>
                      <i className="bi bi-star-fill"></i>{" "}
                      {hotel.rating || "N/A"}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "#666" }}>
                    {hotel.facilities?.join(", ")}
                  </td>
                  <td>
                    {rooms[hotel._id] && rooms[hotel._id].length > 0 ? (
                      <span style={{ color: "#4f8cff", fontWeight: 600 }}>
                        {rooms[hotel._id].length} room(s)
                      </span>
                    ) : (
                      <span style={{ color: "#aaa" }}>No rooms</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add Hotel Form */}
      {showForm && (
        <div
          className="dashboard-card"
          style={{
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            margin: "32px auto",
            maxWidth: 600,
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
          <div
            className="dashboard-card-header"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              <i className="bi bi-building"></i> Add Hotel Details
            </h2>
          </div>

          <form
            className="hotel-form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Hotel Basic Info */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="hotel-row">
                <div className="hotel-col">
                  <label>Hotel Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter hotel name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="hotel-col">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="hotel-row">
                <div className="hotel-col">
                  <label>Rating</label>
                  <div className="rating-stars-container">
                    {renderRatingStars()}
                  </div>
                  <input
                    type="hidden"
                    name="rating"
                    value={formData.rating}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Hotel Facilities */}
            <div className="form-section">
              <h3 className="section-title">Facilities & Amenities</h3>
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
                  "Air Conditioning",
                  "Bar",
                  "Business Center",
                  "Pet Friendly",
                ].map((facility) => (
                  <label
                    key={facility}
                    className="facility-checkbox"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}>
                    <input
                      type="checkbox"
                      name="facilities"
                      value={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                    <span>{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hotel Description */}
            <div className="form-section">
              <h3 className="section-title">Description</h3>
              <textarea
                name="description"
                placeholder="Enter hotel description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Hotel Images */}
            <div className="form-section">
              <h3 className="section-title">Hotel Images</h3>
              <div className="file-upload-container">
                <label
                  className="file-upload-label"
                  style={{ display: "block", cursor: "pointer" }}>
                  <div
                    className="upload-icon"
                    style={{ fontSize: "2rem", color: "#6c757d" }}>
                    <i className="bi bi-cloud-arrow-up"></i>
                  </div>
                  <div className="upload-text">
                    Click or drag images here to upload
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
              <div className="preview-images">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="hotel-btn-primary"
              disabled={formData.loading}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#43b36a",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}>
              {formData.loading ? "Saving..." : "Save Hotel"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanyAdd;

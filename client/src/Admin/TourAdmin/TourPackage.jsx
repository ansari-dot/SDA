import React, { useEffect, useState } from "react";
import "./tourpackages.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TourPackages() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    packageType: "",
    price: "",
    destination: "",
    travelDate: "",
    duration: "",
    numberOfPeople: "",
    rating: "",
    description: "",
    facilities: [],
    image: null,
    preview: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState([]);
  const [previewPackage, setPreviewPackage] = useState(null);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        "http://localhost:2000/api/get/ownerCompany",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result.data);
      setFormData((prev) => ({
        ...prev,
        companyName: result.data?.BusinessName || "",
      }));
    } catch (e) {
      console.error("Error fetching company data:", e);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedFacilities = checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((item) => item !== value);
        return { ...prev, facilities: updatedFacilities };
      });
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.image &&
      !formData.preview?.includes("http://localhost:5000")
    ) {
      toast.error("❌ Please upload an image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("packageType", formData.packageType);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("travelDate", formData.travelDate);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("numberOfPeople", formData.numberOfPeople);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("facilities", JSON.stringify(formData.facilities));
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const url = formData._id
        ? `http://localhost:2000/api/package/update/${formData._id}`
        : "http://localhost:2000/api/package/add";

      const method = formData._id ? "put" : "post";

      const response = await axios[method](url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(
        `✅ Package ${formData._id ? "updated" : "added"} successfully!`
      );
      getOwnerPackage();
      setShowForm(false);
      setFormData({
        companyName: data?.BusinessName || "",
        packageType: "",
        price: "",
        destination: "",
        travelDate: "",
        duration: "",
        numberOfPeople: "",
        rating: "",
        description: "",
        facilities: [],
        image: null,
        preview: null,
      });
    } catch (error) {
      console.error("Error:", error);
      const msg =
        error.response?.data?.message ||
        `❌ Failed to ${
          formData._id ? "update" : "add"
        } package. Please try again.`;
      toast.error(msg);
    }
  };

  const getOwnerPackage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/package/getOwnerPackage",
        {
          withCredentials: true,
        }
      );
      setPackages(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      const msg =
        error.response?.data?.message ||
        "❌ Failed to get packages. Please try again.";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/package/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("✅ Package deleted successfully!");
      getOwnerPackage();
    } catch (error) {
      console.error("Error:", error);
      const msg =
        error.response?.data?.message ||
        "❌ Failed to delete package. Please try again.";
      toast.error(msg);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      _id: pkg._id,
      companyName: pkg.companyName,
      packageType: pkg.packageType,
      price: pkg.price,
      destination: pkg.destination,
      travelDate: pkg.travelDate,
      duration: pkg.duration,
      numberOfPeople: pkg.numberOfPeople,
      rating: pkg.rating,
      description: pkg.description,
      facilities: pkg.facilities || [],
      image: null,
      preview: pkg.image
        ? `http://localhost:5000/${pkg.image.replace(/\\/g, "/")}`
        : null,
    });
    setShowForm(true);
  };

  const handlePreview = (pkg) => {
    setPreviewPackage(pkg);
  };

  const closePreview = () => {
    setPreviewPackage(null);
  };

  useEffect(() => {
    getOwnerPackage();
  }, []);

  return (
    <div className="customers-container touradmin-bg">
      {/* Header Bar */}
      <div className="touradmin-header">
        <div className="touradmin-header-title">
          Dashboard &gt; Tour Packages
        </div>
        <button className="touradmin-new-btn" onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Search/Filter Bar */}
      <div className="touradmin-filterbar">
        <input
          className="touradmin-search"
          type="text"
          placeholder="Search tour packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="touradmin-tablecard">
        <table className="touradmin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Package Type</th>
              <th>Destination</th>
              <th>Description</th>
              <th>Facilities</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", color: "#aaa" }}>
                  No tour packages found
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>
                    {pkg.image ? (
                      <img
                        src={`http://localhost:2000/${pkg.image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={pkg.packageType}
                        style={{
                          width: "100px",
                          height: "auto",
                          maxHeight: "60px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="touradmin-thumb touradmin-thumb-placeholder">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{pkg.packageType}</td>
                  <td>{pkg.destination}</td>
                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {pkg.description}
                  </td>
                  <td>
                    {pkg.facilities && pkg.facilities.length > 0 ? (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {pkg.facilities.slice(0, 3).map((item, index) => (
                          <li key={index} style={{ marginBottom: "4px" }}>
                            • {item}
                          </li>
                        ))}
                        {pkg.facilities.length > 3 && (
                          <li>+{pkg.facilities.length - 3} more</li>
                        )}
                      </ul>
                    ) : (
                      "No facilities"
                    )}
                  </td>
                  <td>${pkg.price}</td>
                  <td>{pkg.rating}/5</td>
                  <td>
                    <button
                      className="hotel-btn-secondary"
                      style={{ marginRight: 8 }}
                      onClick={() => handleEdit(pkg)}>
                      Edit
                    </button>
                    <button
                      className="hotel-btn-secondary"
                      style={{ marginRight: 8 }}
                      onClick={() => handlePreview(pkg)}>
                      Preview
                    </button>
                    <button
                      className="hotel-btn-secondary"
                      style={{
                        background: "#fff0f0",
                        color: "#d32f2f",
                        border: "1px solid #ffd6d6",
                      }}
                      onClick={() => handleDelete(pkg._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewPackage && (
        <div className="tourpackage-preview-modal">
          <div className="tourpackage-preview-content">
            <button className="close-preview-btn" onClick={closePreview}>
              &times;
            </button>
            <h2>{previewPackage.packageType}</h2>
            <div className="tourpackage-preview-row">
              <div className="tourpackage-preview-col">
                {previewPackage.image ? (
                  <img
                    src={`http://localhost:2000/${previewPackage.image.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={previewPackage.packageType}
                    className="tourpackage-preview-image"
                  />
                ) : (
                  <div className="tourpackage-preview-noimage">No Image</div>
                )}
              </div>
              <div className="tourpackage-preview-col">
                <div className="tourpackage-preview-detail">
                  <strong>Company:</strong> {previewPackage.companyName}
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Destination:</strong> {previewPackage.destination}
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Price:</strong> ${previewPackage.price}
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Travel Date:</strong>{" "}
                  {new Date(previewPackage.travelDate).toLocaleDateString()}
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Duration:</strong> {previewPackage.duration} days
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Max People:</strong> {previewPackage.numberOfPeople}
                </div>
                <div className="tourpackage-preview-detail">
                  <strong>Rating:</strong> {previewPackage.rating}/5
                </div>
              </div>
            </div>
            <div className="tourpackage-preview-row">
              <div className="tourpackage-preview-col-full">
                <strong>Description:</strong>
                <p>{previewPackage.description}</p>
              </div>
            </div>
            <div className="tourpackage-preview-row">
              <div className="tourpackage-preview-col-full">
                <strong>Facilities:</strong>
                <ul className="tourpackage-preview-facilities">
                  {previewPackage.facilities &&
                  previewPackage.facilities.length > 0 ? (
                    previewPackage.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))
                  ) : (
                    <li>No facilities listed</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Tour Package Form (hidden by default, shown on '+ New') */}
      {showForm && (
        <div
          className="dashboard-card"
          style={{ position: "relative", marginBottom: 32 }}>
          <button
            className="close-form-btn"
            onClick={() => {
              setShowForm(false);
              setFormData({
                companyName: data?.BusinessName || "",
                packageType: "",
                price: "",
                destination: "",
                travelDate: "",
                duration: "",
                numberOfPeople: "",
                rating: "",
                description: "",
                facilities: [],
                image: null,
                preview: null,
              });
            }}>
            &times;
          </button>
          <form className="tourpackage-form" onSubmit={handleSubmit}>
            <div className="tourpackage-col">
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col">
                <label>Package Type</label>
                <input
                  type="text"
                  placeholder="e.g. Beach Vacation, Mountain Trek"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tourpackage-col">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price in USD"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Bali, Paris"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tourpackage-col">
                <label>Travel Date</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col">
                <label>Duration (Days)</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="Number of days"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tourpackage-col">
                <label>Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  placeholder="Max number of people"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col">
                <label>Rating</label>
                <input
                  type="number"
                  step="0.1"
                  max="5"
                  min="0"
                  placeholder="Rating out of 5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="tourpackage-col">
                <label>Package Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <div className="tourpackage-image-placeholder">
                  {formData.preview ? (
                    <img
                      src={formData.preview}
                      alt="Preview"
                      className="image-preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  ) : (
                    <i
                      className="bi bi-image"
                      style={{ fontSize: "2.5rem", color: "#b0b7c3" }}></i>
                  )}
                </div>
              </div>
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col-full">
                <label>Description</label>
                <textarea
                  placeholder="Describe the tour package"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>
            </div>

            <div className="tourpackage-row">
              <div className="tourpackage-col-full">
                <label>Facilities</label>
                <div className="tourpackage-facilities">
                  {[
                    "WiFi",
                    "Breakfast",
                    "Swimming Pool",
                    "Spa",
                    "Gym",
                    "Tour Guide",
                    "Transportation",
                    "All Meals",
                  ].map((facility) => (
                    <label key={facility}>
                      <input
                        type="checkbox"
                        value={facility}
                        checked={formData.facilities.includes(facility)}
                        onChange={handleChange}
                      />
                      {facility}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="tourpackage-actions">
              <button type="submit" className="tourpackage-save-btn">
                {formData._id ? "Update" : "Save"} Tour Package
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

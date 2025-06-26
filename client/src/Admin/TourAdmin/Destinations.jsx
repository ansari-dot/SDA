import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./destination.css";
import TourPackage from "./TourPackage.jsx";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/package/owner",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.success) {
          setDestinations(response.data.data);
        } else {
          toast.error("No packages found.");
        }
      } catch (e) {
        console.error("Error fetching packages:", e.message);
        toast.error("Failed to load destinations.");
      }
    };

    fetchPackages();
  }, []);

  const handlePreview = (packageData) => {
    setSelectedPackage(packageData);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedPackage(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/package/delete/owner/${id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setDestinations(destinations.filter((dest) => dest._id !== id));
      toast.success("Package deleted successfully.");
    } catch (e) {
      console.error("Error deleting package:", e.message);
      toast.error("Failed to delete package.");
    }
  };

  return (
    <div className="customers-container touradmin-bg">
      {/* Header Bar */}
      <div className="touradmin-header">
        <div className="touradmin-header-title">Dashboard &gt; Destinations</div>
        <button className="touradmin-new-btn" onClick={() => setShowForm(true)}>
          + New
        </button>
      </div>
      {/* Search/Filter Bar */}
      <div className="touradmin-filterbar">
        <input
          className="touradmin-search"
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="touradmin-tablecard">
        <table className="touradmin-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Type</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render destination rows as before, using new styles */}
            {destinations.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>No destinations found</td></tr>
            ) : (
              destinations.map((dest) => (
                <tr key={dest._id}>
                  <td>{dest.packageName}</td>
                  <td>{dest.packageType}</td>
                  <td>{dest.destination}</td>
                  <td>{dest.price}</td>
                  <td>{dest.rating}</td>
                  <td>
                    <button className="hotel-btn-secondary" style={{marginRight: 8}} onClick={() => handlePreview(dest)}>Preview</button>
                    <button className="hotel-btn-secondary" style={{background: '#fff0f0', color: '#d32f2f', border: '1px solid #ffd6d6'}} onClick={() => handleDelete(dest._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add Destination Form (hidden by default, shown on '+ New') */}
      {showForm && (
        <div className="dashboard-card" style={{ position: 'relative', marginBottom: 32 }}>
          <button className="close-form-btn" onClick={() => setShowForm(false)}>&times;</button>
          {/* Render the form as before */}
          {/* ...form JSX... */}
        </div>
      )}
      {/* Preview Modal (if needed) */}
      {selectedPackage && showPreview && (
        <div className={`preview-form show-preview`}>
          {/* ...existing preview modal code... */}
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import "./customers.css";
import axios from "axios";

export default function Customers() {
  const [formData, setFormData] = useState({
    BusinessName: "",
    RegistrationNumber: "",
    PhysicalAddress: "",
    BusinessPhone: "",
    BusinessEmail: "",
    website: "",
    OwnerFullName: "",
    OwnerPhone: "",
    OwnerEmail: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Submitting...");
    setSubmittedOnce(true);
    setNotification({ message: "", type: "" });

    try {
      const response = await axios.post(
        "http://localhost:2000/api/company/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage("Form submitted! Awaiting admin verification...");
      setVerificationStatus("pending");
      setNotification({
        message: "Company registered successfully! Awaiting verification.",
        type: "success",
      });
      setShowForm(false);
      getCompany(); // refetch after registration
    } catch (err) {
      console.error(err);
      setStatusMessage("Submission failed. Try again.");
      setVerificationStatus("unverified");
      setNotification({
        message: err?.response?.data?.message || "Error submitting form.",
        type: "error",
      });
    }
  };

  const getCompany = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/get/ownerCompany",
        {
          withCredentials: true,
        }
      );
      setCompany(response.data.data || null);
      setVerificationStatus(response.data?.verificationStatus || "");
    } catch (err) {
      console.error("Error fetching company:", err);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleEdit = (c) => {
    setFormData(c);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/company/delete/${id}`, {
        withCredentials: true,
      });
      setNotification({ message: "Company deleted.", type: "success" });
      setCompany(null);
      setShowForm(false);
      getCompany();
    } catch (err) {
      console.error("Delete failed:", err);
      setNotification({ message: "Failed to delete.", type: "error" });
    }
  };

  const statusColor = (status) => {
    if (status === "verified") return { bg: "#e8f5e9", color: "#388e3c" };
    if (status === "unverified") return { bg: "#ffebee", color: "#d32f2f" };
    return { bg: "#fff8e1", color: "#f9a825" };
  };

  return (
    <div className="customers-container touradmin-bg">
      <div className="touradmin-header">
        <div className="touradmin-header-title">
          Dashboard &gt; Company Verification
        </div>
        {!company && (
          <button
            className="touradmin-new-btn"
            onClick={() => setShowForm(true)}>
            + New
          </button>
        )}
      </div>

      <div className="touradmin-filterbar">
        <input
          className="touradmin-search"
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="touradmin-tablecard">
        <table className="touradmin-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Owner</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Verification Status</th>
              <th>Registration #</th>
              <th>Address</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : !company ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", color: "#aaa" }}>
                  No company found
                </td>
              </tr>
            ) : (
              <tr>
                <td>{company.BusinessName}</td>
                <td>{company.OwnerFullName}</td>
                <td>{company.OwnerPhone}</td>
                <td>{company.OwnerEmail}</td>
                <td>
                  <span
                    style={{
                      background: statusColor(company.verificationStatus).bg,
                      color: statusColor(company.verificationStatus).color,
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontWeight: 600,
                      fontSize: 13,
                    }}>
                    {company.verificationStatus || "Pending"}
                  </span>
                </td>
                <td>{company.RegistrationNumber}</td>
                <td>{company.PhysicalAddress}</td>
                <td>{company.website}</td>
                <td>
                  <button
                    className="hotel-btn-secondary"
                    style={{ marginRight: 8 }}
                    onClick={() => handleEdit(company)}>
                    Edit
                  </button>
                  <button
                    className="hotel-btn-secondary"
                    style={{
                      background: "#fff0f0",
                      color: "#d32f2f",
                      border: "1px solid #ffd6d6",
                    }}
                    onClick={() => handleDelete(company._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderNotification()}

      {renderStatusBar()}

      {showForm && !company && (
        <div
          className="dashboard-card"
          style={{ position: "relative", marginBottom: 32 }}>
          <button className="close-form-btn" onClick={() => setShowForm(false)}>
            &times;
          </button>

          <form className="form-sections" onSubmit={handleSubmit}>
            {/* --- Business Section --- */}
            <div className="form-section">
              <h3>Business Information</h3>
              <div className="form-fields">
                <label>Business/Hotel Name</label>
                <input
                  type="text"
                  name="BusinessName"
                  value={formData.BusinessName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <label>Registration Number</label>
                <input
                  type="text"
                  name="RegistrationNumber"
                  value={formData.RegistrationNumber}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <label>Physical Address</label>
                <input
                  type="text"
                  name="PhysicalAddress"
                  value={formData.PhysicalAddress}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="form-group">
                  <div className="form-item">
                    <label>Business Phone</label>
                    <input
                      type="tel"
                      name="BusinessPhone"
                      value={formData.BusinessPhone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label>Business Email</label>
                    <input
                      type="email"
                      name="BusinessEmail"
                      value={formData.BusinessEmail}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <label>Website (optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* --- Owner Section --- */}
            <div className="form-section">
              <h3>Owner Information</h3>
              <div className="form-fields">
                <label>Owner Full Name</label>
                <input
                  type="text"
                  name="OwnerFullName"
                  value={formData.OwnerFullName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="form-group">
                  <div className="form-item">
                    <label>Owner Phone</label>
                    <input
                      type="tel"
                      name="OwnerPhone"
                      value={formData.OwnerPhone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label>Owner Email</label>
                    <input
                      type="email"
                      name="OwnerEmail"
                      value={formData.OwnerEmail}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
            <p>{statusMessage}</p>
          </form>
        </div>
      )}
    </div>
  );

  function renderNotification() {
    if (!notification.message) return null;
    return (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    );
  }

  function renderStatusBar() {
    if (!submittedOnce && !verificationStatus) return null;

    let statusClass = "status-pending";
    let text = "Pending Verification...";
    let icon = "⏳";

    if (verificationStatus === "verified") {
      statusClass = "status-verified";
      text = "Verified";
      icon = "✓";
    } else if (verificationStatus === "unverified") {
      statusClass = "status-unverified";
      text = "Unverified — Please resubmit the form";
      icon = "✗";
    }

    return (
      <div className={`status-indicator ${statusClass}`}>
        <span className="status-indicator-icon">{icon}</span> {text}
      </div>
    );
  }
}

/*const Company = () => {
  const [data, setData] = useState(null); // Use null for initial state

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/get/company', {
          withCredentials: true,
        });
        setData(response.data.data); // Assuming the company data is in response.data.data
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div>
      <h2>Verified Company Details</h2>
      {data ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Registration Number</th>
              <th>Physical Address</th>
              <th>Business Phone</th>
              <th>Business Email</th>
              <th>Owner Name</th>
              <th>Owner Phone</th>
              <th>Owner Email</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.BusinessName}</td>
              <td>{data.RegistrationNumber}</td>
              <td>{data.PhysicalAddress}</td>
              <td>{data.BusinessPhone}</td>
              <td>{data.BusinessEmail}</td>
              <td>{data.OwnerFullName}</td>
              <td>{data.OwnerPhone}</td>
              <td>{data.OwnerEmail}</td>
              <td>{data.website || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading company details...</p>
      )}
    </div>
  );
};
*/

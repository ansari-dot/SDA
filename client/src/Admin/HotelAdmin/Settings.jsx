import React, { useState } from "react";
import "./settings.css";

export default function Settings() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="hoteladmin-bg">
      {/* Header Bar */}
      <div className="hoteladmin-header">
        <div className="hoteladmin-header-title">Dashboard &gt; Settings</div>
        <button className="hoteladmin-new-btn" onClick={() => setShowForm(true)}>
          + Edit
        </button>
      </div>
      {/* Settings Form */}
      {showForm && (
        <div className="dashboard-card" style={{background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', margin: '32px auto', maxWidth: 600, position: 'relative'}}>
          <button
            className="close-form-btn"
            onClick={() => setShowForm(false)}
            style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 20, color: '#aaa', cursor: 'pointer' }}
            title="Close"
          >
            ×
          </button>
          <h1 style={{ marginBottom: "24px" }}>Settings</h1>
          <form className="settings-form">
            <div className="settings-row">
              <div className="settings-col">
                <label>Name</label>
                <input type="text" placeholder="Admin Name" />
              </div>
              <div className="settings-col">
                <label>Email</label>
                <input type="email" placeholder="admin@email.com" />
              </div>
            </div>
            <div className="settings-row">
              <div className="settings-col">
                <label>Password</label>
                <input type="password" placeholder="New Password" />
              </div>
              <div className="settings-col">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" />
              </div>
            </div>
            <div className="settings-actions">
              <button type="submit" className="settings-save-btn">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./customers.css";
import { useCookies } from "react-cookie";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:2000/admin/customers", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();
        setCustomers(data.customers || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [cookies.token]);

  const filtered = customers.filter(
    c =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hoteladmin-bg">
      {/* Header Bar */}
      <div className="hoteladmin-header">
        <div className="hoteladmin-header-title">Dashboard &gt; Customers</div>
      </div>
      {/* Search Bar */}
      <div className="hoteladmin-filterbar">
        <input
          className="hoteladmin-search"
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="hoteladmin-tablecard">
        {loading ? (
          <div style={{ textAlign: "center", color: "#888", padding: 32 }}>Loading customers...</div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "#d32f2f", padding: 32 }}>Error: {error}</div>
        ) : (
          <table className="hoteladmin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={2} style={{ textAlign: "center", color: "#aaa" }}>No customers found</td></tr>
              ) : (
                filtered.map((c, i) => (
                  <tr key={c._id || i}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

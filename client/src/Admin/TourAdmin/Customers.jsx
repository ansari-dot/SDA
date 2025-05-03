import React from "react";
import "./customers.css";

const mockCustomers = [
  { id: 1, name: "Ali Khan", email: "ali@example.com", phone: "+92 300 1234567" },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com", phone: "+92 301 7654321" },
  { id: 3, name: "John Doe", email: "john@example.com", phone: "+92 302 9876543" },
];

export default function Customers() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Customers</h1>
      <div className="customers-table-wrapper">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button className="customers-action-btn">View</button>
                  <button className="customers-action-btn">Edit</button>
                  <button className="customers-action-btn customers-action-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
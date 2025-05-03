import React from "react";
import "./bookings.css";

const mockBookings = [
  { id: 101, customer: "Ali Khan", package: "Hunza Valley Tour", date: "2024-07-10", status: "Confirmed" },
  { id: 102, customer: "Sara Ahmed", package: "Skardu Adventure", date: "2024-08-15", status: "Pending" },
  { id: 103, customer: "John Doe", package: "Murree Weekend", date: "2024-09-01", status: "Cancelled" },
];

export default function Bookings() {
  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Bookings</h1>
      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.package}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="bookings-action-btn">View</button>
                  <button className="bookings-action-btn">Edit</button>
                  <button className="bookings-action-btn bookings-action-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
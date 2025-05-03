import React from "react";
import "./destinations.css";

const mockDestinations = [
  { id: 1, name: "Hunza Valley", country: "Pakistan", popularity: "High" },
  { id: 2, name: "Skardu", country: "Pakistan", popularity: "Medium" },
  { id: 3, name: "Murree", country: "Pakistan", popularity: "High" },
  { id: 4, name: "Fairy Meadows", country: "Pakistan", popularity: "Medium" },
];

export default function Destinations() {
  return (
    <div>
      <div className="destinations-header">
        <h1>Destinations</h1>
        <button className="destinations-add-btn">
          <i className="bi bi-plus-circle"></i> Add Destination
        </button>
      </div>
      <div className="destinations-table-wrapper">
        <table className="destinations-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Popularity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDestinations.map((dest) => (
              <tr key={dest.id}>
                <td>{dest.name}</td>
                <td>{dest.country}</td>
                <td>
                  <span className={`badge badge-${dest.popularity.toLowerCase()}`}>
                    {dest.popularity}
                  </span>
                </td>
                <td>
                  <button className="destinations-action-btn" title="View">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="destinations-action-btn" title="Edit">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="destinations-action-btn destinations-action-danger" title="Delete">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
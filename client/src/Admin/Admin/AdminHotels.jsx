import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:2000/api/get/allhotel', { withCredentials: true });
      setHotels(res.data.hotels || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hotel?')) return;
    try {
      await axios.delete(`http://localhost:2000/api/hotel/${id}`, { withCredentials: true });
      fetchHotels();
    } catch {
      alert('Failed to delete hotel');
    }
  };

  const filteredHotels = hotels.filter(
    (h) =>
      (h.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (h.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
      <h2>Hotel Management</h2>
      <input
        type="text"
        placeholder="Search hotels..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8, width: 300 }}
      />
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Owner</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: '#aaa' }}>No hotels found</td></tr>
            ) : (
              filteredHotels.map((h) => (
                <tr key={h._id}>
                  <td>{h._id}</td>
                  <td>{h.name}</td>
                  <td>{h.location}</td>
                  <td>{h.userId || '-'}</td>
                  <td>{h.rating}</td>
                  <td>{h.status || 'Active'}</td>
                  <td>
                    <button onClick={() => handleDelete(h._id)} style={{ color: 'red' }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHotels; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:2000/api/package/get', { withCredentials: true });
      // Flatten all packages
      const all = res.data.packages.flatMap(pkgDoc =>
        (pkgDoc.package || []).map(pkg => ({ ...pkg, parentId: pkgDoc._id }))
      );
      setPackages(all);
      setError('');
    } catch (err) {
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openEdit = (pkg) => {
    setEditId(pkg._id);
    setEditData({ ...pkg });
  };
  const closeEdit = () => {
    setEditId(null);
    setEditData({});
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2000/api/package/admin/update/${editId}`, editData, { withCredentials: true });
      closeEdit();
      fetchPackages();
    } catch {
      alert('Failed to update package');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await axios.delete(`http://localhost:2000/api/package/admin/delete/${id}`, { withCredentials: true });
      fetchPackages();
    } catch {
      alert('Failed to delete package');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
      <h2>Admin Package Management</h2>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Type</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Travel Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.companyName}</td>
                <td>{p.packageType}</td>
                <td>{p.destination}</td>
                <td>{p.price}</td>
                <td>{p.rating}</td>
                <td>{p.travelDate}</td>
                <td>
                  <button onClick={() => openEdit(p)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={!!editId} onRequestClose={closeEdit} ariaHideApp={false}>
        <h2>Edit Package</h2>
        <form onSubmit={submitEdit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input name="companyName" value={editData.companyName || ''} onChange={handleEditChange} placeholder="Company Name" required />
          <input name="packageType" value={editData.packageType || ''} onChange={handleEditChange} placeholder="Type" required />
          <input name="destination" value={editData.destination || ''} onChange={handleEditChange} placeholder="Destination" required />
          <input name="price" value={editData.price || ''} onChange={handleEditChange} placeholder="Price" required />
          <input name="rating" value={editData.rating || ''} onChange={handleEditChange} placeholder="Rating" />
          <input name="travelDate" value={editData.travelDate || ''} onChange={handleEditChange} placeholder="Travel Date" />
          <textarea name="description" value={editData.description || ''} onChange={handleEditChange} placeholder="Description" />
          <button type="submit">Save</button>
          <button type="button" onClick={closeEdit}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPackages; 
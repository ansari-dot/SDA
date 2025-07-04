import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:2000/api/company', { withCredentials: true });
      setCompanies(res.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post('http://localhost:2000/api/company/approve', { id }, { withCredentials: true });
      fetchCompanies();
    } catch {
      alert('Failed to approve company');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post('http://localhost:2000/api/company/reject', { id }, { withCredentials: true });
      fetchCompanies();
    } catch {
      alert('Failed to reject company');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company?')) return;
    try {
      await axios.delete('http://localhost:2000/api/delete/ownerCompany', {
        data: { id },
        withCredentials: true
      });
      fetchCompanies();
    } catch {
      alert('Failed to delete company');
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      (c.BusinessName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.OwnerFullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.verificationStatus || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
      <h2>Company Verification Management</h2>
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8, width: 300 }}
      />
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Business Name</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', color: '#aaa' }}>No companies found</td></tr>
            ) : (
              filteredCompanies.map((c) => (
                <tr key={c._id}>
                  <td>{c._id}</td>
                  <td>{c.BusinessName}</td>
                  <td>{c.OwnerFullName}</td>
                  <td>{c.OwnerFullName && c.OwnerFullName.toLowerCase().includes('hotel') ? 'Hotel' : 'Tour'}</td>
                  <td>{c.BusinessEmail}</td>
                  <td>{c.BusinessPhone}</td>
                  <td>{c.verificationStatus}</td>
                  <td>
                    {c.verificationStatus === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(c._id)} style={{ marginRight: 8, color: 'green' }}>Approve</button>
                        <button onClick={() => handleReject(c._id)} style={{ color: 'red' }}>Reject</button>
                      </>
                    )}
                    {c.verificationStatus === 'approved' && (
                      <button onClick={() => handleDelete(c._id)} style={{ color: 'red' }}>Delete</button>
                    )}
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

export default AdminCompanies; 
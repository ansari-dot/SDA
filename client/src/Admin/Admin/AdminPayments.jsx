import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ amount: '', payer: '', payee: '', type: 'hotel', reference: '' });
  const [creating, setCreating] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:2000/api/payment', { withCredentials: true });
      setPayments(res.data.payments || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:2000/api/payment/${id}/status`, { status }, { withCredentials: true });
      fetchPayments();
    } catch {
      alert('Failed to update payment status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this payment?')) return;
    try {
      await axios.delete(`http://localhost:2000/api/payment/${id}`, { withCredentials: true });
      fetchPayments();
    } catch {
      alert('Failed to delete payment');
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await axios.post('http://localhost:2000/api/payment', form, { withCredentials: true });
      setForm({ amount: '', payer: '', payee: '', type: 'hotel', reference: '' });
      fetchPayments();
    } catch {
      alert('Failed to create payment');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h2>Admin Payment Management</h2>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payer</th>
              <th>Payee</th>
              <th>Type</th>
              <th>Status</th>
              <th>Reference</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.amount}</td>
                <td>{p.payer?.name || p.payer}</td>
                <td>{p.payee?.name || p.payee}</td>
                <td>{p.type}</td>
                <td>
                  <select value={p.status} onChange={e => handleStatusChange(p._id, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td>{p.reference}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(p._id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Create New Payment (Mock)</h3>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleFormChange} required style={{ width: 100 }} />
        <input name="payer" placeholder="Payer User ID" value={form.payer} onChange={handleFormChange} required style={{ width: 150 }} />
        <input name="payee" placeholder="Payee User ID" value={form.payee} onChange={handleFormChange} required style={{ width: 150 }} />
        <select name="type" value={form.type} onChange={handleFormChange} required>
          <option value="hotel">Hotel</option>
          <option value="tour">Tour</option>
        </select>
        <input name="reference" placeholder="Reference" value={form.reference} onChange={handleFormChange} style={{ width: 150 }} />
        <button type="submit" disabled={creating}>{creating ? 'Creating...' : 'Create Payment'}</button>
      </form>
    </div>
  );
};

export default AdminPayments; 
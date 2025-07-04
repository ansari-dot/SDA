import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Fetch hotel bookings
      const hotelRes = await axios.get('http://localhost:2000/api/admin/bookings', { withCredentials: true });
      // Fetch tour bookings
      const tourRes = await axios.get('http://localhost:2000/api/tourbooking/all', { withCredentials: true });
      setHotelBookings(hotelRes.data.bookings || []);
      setTourBookings(tourRes.data.bookings || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteHotelBooking = async (id) => {
    if (!window.confirm('Delete this hotel booking?')) return;
    try {
      await axios.delete(`http://localhost:2000/api/booking/${id}`, { withCredentials: true });
      fetchBookings();
    } catch {
      alert('Failed to delete hotel booking');
    }
  };

  const deleteTourBooking = async (id) => {
    if (!window.confirm('Delete this tour booking?')) return;
    try {
      await axios.delete(`http://localhost:2000/api/tourbooking/${id}`, { withCredentials: true });
      fetchBookings();
    } catch {
      alert('Failed to delete tour booking');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'status-badge status-confirmed';
      case 'Pending':
        return 'status-badge status-pending';
      case 'Cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge';
    }
  };

  // Filter bookings by search
  const filteredHotelBookings = hotelBookings.filter(
    (b) =>
      (b.customer?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.hotel?.name || '').toLowerCase().includes(search.toLowerCase())
  );
  const filteredTourBookings = tourBookings.filter(
    (b) =>
      (b.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.customerEmail || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.packageId?.destination || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h2>Admin Booking Management</h2>
      <input
        type="text"
        placeholder="Search bookings..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8, width: 300 }}
      />
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <>
          <h3>Hotel Bookings</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Nights</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotelBookings.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: '#aaa' }}>No hotel bookings found</td></tr>
              ) : (
                filteredHotelBookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b._id}</td>
                    <td>{b.customer?.name || b.customer}</td>
                    <td>{b.hotel?.name || b.hotel}</td>
                    <td>{b.room?.roomType || b.room}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>{b.nights}</td>
                    <td>{b.totalPrice}</td>
                    <td><span className={getStatusClass(b.status)}>{b.status}</span></td>
                    <td>Hotel</td>
                    <td>
                      <button onClick={() => deleteHotelBooking(b._id)} style={{ color: 'red' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <h3>Tour Bookings</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Package</th>
                <th>Date</th>
                <th>People</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourBookings.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', color: '#aaa' }}>No tour bookings found</td></tr>
              ) : (
                filteredTourBookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b._id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.customerEmail}</td>
                    <td>{b.packageId?.destination || '-'}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>{b.numberOfPeople}</td>
                    <td><span className={getStatusClass(b.status)}>{b.status}</span></td>
                    <td>Tour</td>
                    <td>
                      <button onClick={() => deleteTourBooking(b._id)} style={{ color: 'red' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminBookings; 
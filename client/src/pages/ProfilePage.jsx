import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './profilePage.css';

const mockHotelBookings = [
  {
    id: 'H123',
    hotelName: 'Grand Palace Hotel',
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    status: 'Confirmed',
  },
  {
    id: 'H124',
    hotelName: 'City View Inn',
    checkIn: '2024-08-10',
    checkOut: '2024-08-12',
    status: 'Pending',
  },
];

const mockPackageBookings = [
  {
    id: 'P567',
    packageName: 'Maldives Honeymoon',
    startDate: '2024-09-15',
    endDate: '2024-09-22',
    status: 'Confirmed',
  },
  {
    id: 'P568',
    packageName: 'Adventure in Bali',
    startDate: '2024-10-05',
    endDate: '2024-10-12',
    status: 'Cancelled',
  },
];

const ProfilePage = () => {
  const user = useSelector(state => state.user?.user);
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    if (user) {
      console.log('User object:', user);
    }
    // Add background class to body
    document.body.classList.add('profile-bg');
    return () => {
      document.body.classList.remove('profile-bg');
    };
  }, [user]);

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password change logic
    alert('Password change submitted!');
  };

  if (!user) {
    return <div className="container mt-5"><h2>Please log in to view your profile.</h2></div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || user.email || 'User')}
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-header-info">
            <h4>{user.name || 'User'}</h4>
            <div className="text-muted">{user.email}</div>
          </div>
        </div>
        {/* Tabs */}
        <ul className="nav nav-tabs profile-tabs mb-3" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={`nav-link${activeTab === 'profile' ? ' active' : ''}`} onClick={() => setActiveTab('profile')} type="button" role="tab">Profile</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link${activeTab === 'bookings' ? ' active' : ''}`} onClick={() => setActiveTab('bookings')} type="button" role="tab">Bookings</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link${activeTab === 'settings' ? ' active' : ''}`} onClick={() => setActiveTab('settings')} type="button" role="tab">Settings</button>
          </li>
        </ul>
        {/* Tab Content */}
        <div className="profile-section">
          {activeTab === 'profile' && (
            <div>
              <h5>Profile Details</h5>
              <ul className="list-group list-group-flush profile-details-list">
                <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
                <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
                {/* Add more user fields as needed */}
              </ul>
            </div>
          )}
          {activeTab === 'bookings' && (
            <div>
              <h5 className="mb-3">Hotel Bookings</h5>
              {mockHotelBookings.length === 0 ? (
                <p>No hotel bookings found.</p>
              ) : (
                <div className="table-responsive mb-4">
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Hotel</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockHotelBookings.map(b => (
                        <tr key={b.id}>
                          <td>{b.hotelName}</td>
                          <td>{b.checkIn}</td>
                          <td>{b.checkOut}</td>
                          <td><span className={`badge bg-${b.status === 'Confirmed' ? 'success' : b.status === 'Pending' ? 'warning' : 'secondary'}`}>{b.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <h5 className="mb-3">Package Bookings</h5>
              {mockPackageBookings.length === 0 ? (
                <p>No package bookings found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Package</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPackageBookings.map(b => (
                        <tr key={b.id}>
                          <td>{b.packageName}</td>
                          <td>{b.startDate}</td>
                          <td>{b.endDate}</td>
                          <td><span className={`badge bg-${b.status === 'Confirmed' ? 'success' : b.status === 'Pending' ? 'warning' : b.status === 'Cancelled' ? 'danger' : 'secondary'}`}>{b.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h5>Change Password</h5>
              <form className="mt-3" style={{ maxWidth: 400 }} onSubmit={handlePasswordSubmit} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Change Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
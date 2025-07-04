import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function MobileNavbar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-navbar-overlay bg-dark text-white"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <button className="mobile-navbar-close btn btn-link text-white fs-2" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
          <nav className="mobile-navbar-menu nav flex-column align-items-center mt-4">
            <Link to="/" onClick={onClose} className="nav-link text-white">Home</Link>
            <Link to="/places" onClick={onClose} className="nav-link text-white">Places</Link>
            <Link to="/hotels" onClick={onClose} className="nav-link text-white">Hotels</Link>
            <Link to="/blogs" onClick={onClose} className="nav-link text-white">Blogs</Link>
            <Link to="/packages" onClick={onClose} className="nav-link text-white">Packages</Link>
            <Link to="/contact" onClick={onClose} className="nav-link text-white">Contact Us</Link>
            <div className="mobile-navbar-socials d-flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon text-white" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon text-white" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon text-white" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <Link to="/login" className="login-icon text-white" title="Sign In" onClick={onClose}><i className="bi bi-person-circle"></i></Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfile = () => {
    setPopoverOpen(false);
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      setPopoverOpen(false);
      dispatch(logoutAction());
      const response = await axios.get("http://localhost:2000/api/logout", { withCredentials: true });
      toast.success("✅ " + response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("❌ Logout failed");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark px-4 py-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2">
            <img src="/logo.png" alt="Travelars Logo" style={{ height: 32, width: 32, objectFit: 'contain', borderRadius: 8 }} />
            Travelars
          </Link>
          <button className="navbar-toggler border-0" type="button" onClick={() => setMobileOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-2">
              <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/places">Places</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/hotels">Hotels</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/blogs">Blogs</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/packages">Packages</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact</Link></li>
            </ul>
            <div className="d-flex align-items-center gap-2 ms-auto">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 px-2" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 px-2" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 px-2" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              {user ? (
                <div
                  className="position-relative ms-2"
                  onMouseEnter={() => setPopoverOpen(true)}
                  onMouseLeave={() => setPopoverOpen(false)}
                  style={{ cursor: "pointer" }}>
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || "User")}`}
                    alt="User Avatar"
                    className="rounded-circle border border-secondary"
                    style={{ width: 32, height: 32, objectFit: "cover" }}
                  />
                  {popoverOpen && (
                    <div
                      className="shadow-lg bg-dark text-white rounded p-3"
                      style={{ position: "absolute", top: "120%", right: 0, minWidth: 220, zIndex: 1000 }}>
                      <div className="text-center mb-2">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || "User")}`}
                          alt="User Avatar"
                          className="rounded-circle mb-2 border border-secondary"
                          style={{ width: 56, height: 56, objectFit: "cover" }}
                        />
                        <div className="fw-bold fs-6">{user.name || "User"}</div>
                        <div className="text-muted small">{user.email}</div>
                      </div>
                      <button className="btn btn-sm btn-outline-light w-100 mb-2" onClick={handleProfile}>View Profile</button>
                      <button className="btn btn-sm btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-light ms-2">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <MobileNavbar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

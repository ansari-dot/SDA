import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function MobileNavbar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-navbar-overlay"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button className="mobile-navbar-close" onClick={onClose}>&times;</button>
          <nav className="mobile-navbar-menu">
            <Link to="/" onClick={onClose}>Home</Link>
            <Link to="/places" onClick={onClose}>Places</Link>
            <Link to="/hotels" onClick={onClose}>Hotels</Link>
            <Link to="/blogs" onClick={onClose}>Blogs</Link>
            <Link to="/packages" onClick={onClose}>Packages</Link>
            <Link to="/contact" onClick={onClose}>Contact Us</Link>
            <div className="mobile-navbar-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-4"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-info fs-4"><i className="bi bi-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-danger fs-4"><i className="bi bi-instagram"></i></a>
              <Link to="/login" className="btn btn-outline-primary rounded-circle p-2 ms-2" title="Sign In">
                <i className="bi bi-person" style={{fontSize: '1.2rem'}}></i>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/logo.png" alt="Travelars Logo" style={{height: '38px', width: '38px', objectFit: 'contain', marginRight: '6px'}} />
            <span className="fw-bold" style={{color: '#ffe9c7', fontSize: '1.35rem', letterSpacing: '1px'}}>Travelars</span>
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-none d-lg-flex" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/places">Places</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotels">Hotels</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/packages">Packages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-5"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-info fs-5"><i className="bi bi-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-danger fs-5"><i className="bi bi-instagram"></i></a>
              <Link to="/login" className="btn btn-outline-primary rounded-circle p-2" title="Sign In">
                <i className="bi bi-person" style={{fontSize: '1.2rem'}}></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <MobileNavbar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-black text-white pt-5 pb-3 border-top border-dark mt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-4 mb-2">Travelars</div>
            <p className="text-secondary small mb-3">Discover Pakistan's breathtaking beauty and rich cultural heritage with Travelars, your trusted companion for memorable journeys.</p>
            <div className="d-flex gap-3 mb-2">
              <a href="#" className="text-white fs-5" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-5" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-5" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <div className="fw-bold mb-2">Quick Links</div>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link text-secondary">Home</a></li>
              <li><a href="#" className="footer-link text-secondary">Hotels</a></li>
              <li><a href="#" className="footer-link text-secondary">Tourist Places</a></li>
              <li><a href="#" className="footer-link text-secondary">Tour Packages</a></li>
              <li><a href="#" className="footer-link text-secondary">Blogs</a></li>
              <li><a href="#" className="footer-link text-secondary">Contact</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <div className="fw-bold mb-2">Information</div>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link text-secondary">About Us</a></li>
              <li><a href="#" className="footer-link text-secondary">Terms & Conditions</a></li>
              <li><a href="#" className="footer-link text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="footer-link text-secondary">FAQs</a></li>
              <li><a href="#" className="footer-link text-secondary">Become a Partner</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <div className="fw-bold mb-2">Contact Us</div>
            <div className="text-secondary small mb-1"><i className="bi bi-geo-alt me-2"></i> Blue Area, Islamabad, Pakistan 44000</div>
            <div className="text-secondary small mb-1"><i className="bi bi-telephone me-2"></i> +92 312 1234567</div>
            <div className="text-secondary small mb-3"><i className="bi bi-envelope me-2"></i> info@travelars.pk</div>
            <div className="footer-newsletter mt-3">
              <strong className="text-white">Subscribe to Newsletter</strong>
              <form className="d-flex mt-2">
                <input type="email" className="form-control bg-dark text-white border-secondary me-2" placeholder="Your email address" />
                <button type="submit" className="btn btn-outline-light">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center text-secondary small mt-4 pt-3 border-top border-dark">
          &copy; {new Date().getFullYear()} Travelars. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 
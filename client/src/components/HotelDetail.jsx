import React from "react";
import "./hotelDetail.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function HotelDetail() {
  const hotel = useSelector((state) => state.hotel.hotelDetail);
  if (!hotel?.id) return <p>No place selected</p>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <div className="hoteldetail-root">
      <button
        className="hoteldetail-backbtn"
        onClick={() => navigate("/hotels")}>
        &#8592; Back to Hotels
      </button>
      <div className="hoteldetail-main">
        <div className="hoteldetail-imgcol">
          <img className="placedetail-img" src={hotel.image} alt={hotel.name} />
        </div>
        <div className="hoteldetail-infocol">
          <div className="hoteldetail-rating-badge">
            <i className="bi bi-star-fill" /> 4.8
          </div>
          <h1 className="hoteldetail-title">{hotel.name}</h1>
          <div className="hoteldetail-meta">
            <span className="hoteldetail-meta-item">
              <i className="bi bi-geo-alt" /> Lahore
            </span>
            <span className="hoteldetail-meta-item">
              <i className="bi bi-currency-dollar" /> Luxury
            </span>
          </div>
          <div className="hoteldetail-desc">
            Experience luxury and comfort at Pearl Continental Hotel, Lahore.
            Enjoy world-class amenities, fine dining, and a prime location in
            the heart of the city.
          </div>
          <hr className="hoteldetail-divider" />
          <div className="hoteldetail-price-row">
            <div>
              <div className="hoteldetail-price-label">Price per night</div>
              <div className="hoteldetail-price">$150</div>
            </div>
            <button className="hoteldetail-bookbtn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

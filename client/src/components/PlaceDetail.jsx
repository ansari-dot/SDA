import React from "react";
import "./placeDetail.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
export default function PlaceDetail() {
  console.log(useSelector((state) => state.place.placeDetail));
  const place = useSelector((state) => state.place.placeDetail);
  console.log(place);
  const navigate = useNavigate();

  if (!place?.id) return <p>No place selected</p>;

  return (
    <div className="placedetail-root">
      <button
        className="placedetail-backbtn"
        onClick={() => navigate("/places")}>
        &#8592; Back to Places
      </button>
      <div className="placedetail-main">
        <div className="placedetail-imgcol">
          <img className="placedetail-img" src={place.image} alt={place.name} />
        </div>
        <div className="placedetail-infocol">
          <div className="placedetail-region-badge">{place.region}</div>
          <h1 className="placedetail-title">{place.name}</h1>
          <div className="placedetail-desc">{place.desc}</div>
          <hr className="placedetail-divider" />
          <div className="placedetail-action-row">
            <button className="placedetail-explorebtn">Explore More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./placePage.css";
import { useDispatch } from "react-redux";
import { setPlace } from "../redux/placeSlice";
import { useNavigate } from "react-router";
const places = [
  {
    id: 1,
    image: "/images/hunza.jpg",
    region: "Gilgit-Baltistan",
    name: "Hunza Valley",
    desc: "A mountainous valley known for its breathtaking landscapes and rich cultural heritage.",
  },
  {
    id: 2,
    image: "/images/swat.jpg",
    region: "Khyber Pakhtunkhwa",
    name: "Swat Valley",
    desc: 'Known as the "Switzerland of the East" for its snow-capped mountains and lush green meadows.',
  },
  {
    id: 3,
    image: "/images/lahorefort.jpg",
    region: "Lahore, Punjab",
    name: "Lahore Fort",
    desc: "A historic fortress and UNESCO World Heritage site representing the rich Mughal heritage.",
  },
  {
    id: 4,
    image: "/images/mohenjo.jpg",
    region: "Sindh",
    name: "Mohenjo-daro",
    desc: "One of the world's earliest major urban settlements, dating back to the Indus Valley Civilization.",
  },
  {
    id: 5,
    image: "/images/fairymeadows.jpg",
    region: "Gilgit-Baltistan",
    name: "Fairy Meadows",
    desc: "A lush green plateau at the base of Nanga Parbat, offering spectacular views of the mountain.",
  },
  {
    id: 6,
    image: "/images/badshahi.jpg",
    region: "Lahore, Punjab",
    name: "Badshahi Mosque",
    desc: "One of the largest mosques in the world, showcasing magnificent Mughal architecture.",
  },
];

const activities = [
  { image: "/images/trekking.jpg", name: "Trekking & Hiking" },
  { image: "/images/culture.jpg", name: "Cultural Tours" },
  { image: "/images/wildlife.jpg", name: "Wildlife Safaris" },
  { image: "/images/mountain.jpg", name: "Mountain Climbing" },
];
export default function PlacePage() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const handleExplore = (p) => {
    dispatch(setPlace(p));
    naviagte("/place-detail");
  };

  return (
    <div className="placepage-root">
      {/* Hero Section */}
      <section className="placepage-hero">
        <h1 className="placepage-hero-title">
          Discover the Beauty of Pakistan
        </h1>
        <p className="placepage-hero-desc">
          Explore stunning landscapes, rich cultural heritage, and unforgettable
          experiences across Pakistan's most beautiful destinations.
        </p>
      </section>

      {/* Places Grid Section */}
      <section className="placepage-main">
        <div className="placepage-grid">
          {places.map((p, i) => (
            <div className="placepage-card" key={i}>
              <div
                className="placepage-img"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="placepage-info">
                <div className="placepage-region">@ {p.region}</div>
                <div className="placepage-name">{p.name}</div>
                <div className="placepage-desc">{p.desc}</div>
                <button
                  className="placepage-btn"
                  onClick={() => handleExplore(p)}>
                  Explore More &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Activities Section */}
      <section className="placepage-activities">
        <h2 className="placepage-activities-title">
          Popular Activities in Pakistan
        </h2>
        <p className="placepage-activities-desc">
          Experience the best of Pakistan with these popular activities and
          adventures.
        </p>
        <div className="placepage-activities-grid">
          {activities.map((a, i) => (
            <div className="placepage-activity-card" key={i}>
              <div
                className="placepage-activity-img"
                style={{ backgroundImage: `url(${a.image})` }}
              />
              <div className="placepage-activity-name">{a.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="placepage-cta">
        <h2 className="placepage-cta-title">Ready to Explore Pakistan?</h2>
        <p className="placepage-cta-desc">
          Book your adventure today and discover the beauty and culture of
          Pakistan.
        </p>
        <div className="placepage-cta-actions">
          <button className="placepage-cta-btn placepage-cta-browse">
            Browse Tour Packages
          </button>
          <button className="placepage-cta-btn placepage-cta-contact">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import "./hero.css";

const heroImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

export default function Hero() {
  return (
    <div className="hero-section">
      <div
        className="hero-slide"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Animated overlay for visual beauty */}
        <div className="hero-animated-overlay">
          <svg width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg-overlay">
            <circle cx="200" cy="120" r="60" fill="#ffe100" fillOpacity="0.12">
              <animate attributeName="cy" values="120;180;120" dur="6s" repeatCount="indefinite" />
            </circle>
            <rect x="1100" y="60" width="90" height="90" rx="30" fill="#21747b" fillOpacity="0.10">
              <animate attributeName="y" values="60;120;60" dur="7s" repeatCount="indefinite" />
            </rect>
            <polygon points="700,60 730,120 670,120" fill="#21747b" fillOpacity="0.13">
              <animate attributeName="points" values="700,60 730,120 670,120;700,100 730,160 670,160;700,60 730,120 670,120" dur="8s" repeatCount="indefinite" />
            </polygon>
            <circle cx="1240" cy="320" r="40" fill="#ffe100" fillOpacity="0.10">
              <animate attributeName="cx" values="1240;1200;1240" dur="9s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div className="hero-overlay">
          <motion.h1
            className="hero-heading"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover Pakistan<br />Like Never Before
          </motion.h1>
          <motion.p
            className="hero-subheading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From the peaks of the Karakoram to the vibrant streets of Lahore, your adventure starts here. Explore breathtaking destinations, unique cultures, and unforgettable journeys with Travelars.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button className="hero-btn hero-btn-primary">Explore Destinations</button>
            <button className="hero-btn hero-btn-outline">Get Travel Advice</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Hero from "../components/Hero.jsx";
import AovStats from "../components/AovStats.jsx";
import AovHowItWorks from "../components/AovHowItWorks.jsx";
import Destinations from "../components/Destinations.jsx";
import Hotels from "../components/Hotels.jsx";
import Reviews from "../components/Reviews.jsx";
import Blogs from "../components/Blogs.jsx";
import CoverLetter from "../components/CoverLetter.jsx";
import HomePackages from "../components/HomePackages.jsx";

const Home = () => {
  return (
    <>
      <section className="home-hero-section bg-dark text-white p-0 m-0"><Hero /></section>
      <section className="home-stats-section py-5 bg-light"><div className="container-fluid px-2 px-md-4"><AovStats /></div></section>
      <section className="home-hiw-section py-5 bg-white"><div className="container-fluid px-2 px-md-4"><AovHowItWorks /></div></section>
      <section className="home-destinations-section py-5 bg-light"><div className="container-fluid px-2 px-md-4"><Destinations /></div></section>
      <section className="home-hotels-section py-5 bg-white"><div className="container-fluid px-2 px-md-4"><Hotels /></div></section>
      <section className="home-packages-section py-5 bg-light"><div className="container-fluid px-2 px-md-4"><HomePackages /></div></section>
      <section className="home-reviews-section py-5 bg-light"><div className="container-fluid px-2 px-md-4"><Reviews /></div></section>
      <section className="home-blogs-section py-5 bg-white"><div className="container-fluid px-2 px-md-4"><Blogs /></div></section>
      <section className="home-coverletter-section py-5 bg-light"><div className="container-fluid px-2 px-md-4"><CoverLetter /></div></section>
    </>
  );
};

export default Home;

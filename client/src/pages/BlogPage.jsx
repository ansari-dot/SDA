import React from "react";
import "./blogPage.css";

const blogs = [
  {
    image: "/images/blog1.jpg",
    category: "Travel Tips",
    title: "10 Essential Tips for Traveling in Pakistan",
    desc: "Discover the must-know tips for a safe and enjoyable journey across Pakistan's diverse regions.",
  },
  {
    image: "/images/blog2.jpg",
    category: "Culture",
    title: "Exploring Pakistan's Rich Heritage",
    desc: "Dive into the vibrant culture, traditions, and history that make Pakistan a unique destination.",
  },
  {
    image: "/images/blog3.jpg",
    category: "Adventure",
    title: "Top 5 Adventure Destinations in Pakistan",
    desc: "From the Karakoram to the Himalayas, explore the best spots for thrill-seekers and nature lovers.",
  },
  {
    image: "/images/blog4.jpg",
    category: "Food",
    title: "A Foodie's Guide to Pakistani Cuisine",
    desc: "Savor the flavors of Pakistan with our guide to the country's most delicious and iconic dishes.",
  },
  {
    image: "/images/blog5.jpg",
    category: "Nature",
    title: "The Most Beautiful Lakes in Pakistan",
    desc: "A visual journey through Pakistan's stunning lakes, from Saif-ul-Malook to Attabad Lake.",
  },
  {
    image: "/images/blog6.jpg",
    category: "Guides",
    title: "How to Plan Your First Trip to Pakistan",
    desc: "Step-by-step advice for first-time visitors, from visas to must-see destinations.",
  },
];

export default function BlogPage() {
  return (
    <div className="blogpage-root">
      {/* Hero Section */}
      <section className="blogpage-hero">
        <h1 className="blogpage-hero-title">Travel Stories & Guides</h1>
        <p className="blogpage-hero-desc">
          Get inspired by our latest travel stories, tips, and guides for exploring Pakistan.
        </p>
      </section>

      {/* Blog Grid Section */}
      <section className="blogpage-main">
        <div className="blogpage-grid">
          {blogs.map((b, i) => (
            <div className="blogpage-card" key={i}>
              <div className="blogpage-img" style={{ backgroundImage: `url(${b.image})` }} />
              <div className="blogpage-info">
                <div className="blogpage-category-badge">{b.category}</div>
                <div className="blogpage-title">{b.title}</div>
                <div className="blogpage-desc">{b.desc}</div>
                <button className="blogpage-readbtn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
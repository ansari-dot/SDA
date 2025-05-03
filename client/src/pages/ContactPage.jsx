import React from "react";
import "./contactPage.css";

const faqs = [
  {
    question: "How can I book a hotel through Travelers?",
    answer:
      "You can book a hotel by browsing our Hotels section, selecting your desired property, and following the booking process. You'll need to provide your travel dates, guest information, and payment details to complete the reservation.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), bank transfers, and selected mobile payment platforms. All transactions are secure and encrypted.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "You can cancel or modify your booking subject to the cancellation policy of the specific hotel or tour package. Some bookings may have free cancellation up to a certain date, while others might have non-refundable policies.",
  },
  {
    question: "Do you offer travel insurance?",
    answer:
      "Yes, we offer insurance options that you can add during the booking process. We recommend adding travel insurance to protect your trip from unexpected circumstances.",
  },
  {
    question: "Do I need a visa to visit Pakistan?",
    answer:
      "Most foreign nationals require a visa to visit Pakistan. However, visa requirements vary by nationality. We can provide guidance on visa applications, but we recommend checking with the Pakistani embassy or consulate in your country for the most up-to-date information.",
  },
];

export default function ContactPage() {
  return (
    <div className="contactpage-root">
      {/* Hero Section */}
      <section className="contactpage-hero">
        <h1 className="contactpage-hero-title">Get in Touch</h1>
        <p className="contactpage-hero-desc">
          Have questions or need assistance? We're here to help you plan your perfect Pakistan adventure.
        </p>
      </section>

      {/* Contact Info & Form Section */}
      <section className="contactpage-main">
        <div className="contactpage-main-container">
          <div className="contactpage-info-card">
            <h2 className="contactpage-info-title">Contact Information</h2>
            <div className="contactpage-info-list">
              <div className="contactpage-info-item">
                <strong>Office Address</strong>
                <div>Blue Area, Islamabad, Pakistan 44000</div>
              </div>
              <div className="contactpage-info-item">
                <strong>Phone Number</strong>
                <div>+92 301 1234567</div>
              </div>
              <div className="contactpage-info-item">
                <strong>Email Address</strong>
                <div>info@travelers.pk</div>
              </div>
              <div className="contactpage-info-item">
                <strong>Working Hours</strong>
                <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                <div>Saturday: 10:30 AM - 4:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
            <div className="contactpage-info-map">
              {/* Placeholder for map or image */}
              <div className="contactpage-info-map-placeholder">
                <span className="bi bi-image" style={{ fontSize: 32, color: '#bbb' }} />
              </div>
            </div>
          </div>
          <div className="contactpage-form-card">
            <h2 className="contactpage-form-title">Send Us a Message</h2>
            <form className="contactpage-form">
              <div className="contactpage-form-row">
                <div className="contactpage-form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="contactpage-form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
              <div className="contactpage-form-row">
                <div className="contactpage-form-group">
                  <label>Phone Number</label>
                  <input type="text" placeholder="+92 300 1234567" />
                </div>
                <div className="contactpage-form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="e.g., Booking Inquiry" />
                </div>
              </div>
              <div className="contactpage-form-group">
                <label>Your Message</label>
                <textarea rows={4} placeholder="How can we help you?" />
              </div>
              <button className="contactpage-form-btn" type="submit">
                <span className="bi bi-send" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contactpage-faq">
        <h2 className="contactpage-faq-title">Frequently Asked Questions</h2>
        <div className="contactpage-faq-list">
          {faqs.map((faq, i) => (
            <div className="contactpage-faq-item" key={i}>
              <div className="contactpage-faq-question">{faq.question}</div>
              <div className="contactpage-faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
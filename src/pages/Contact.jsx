import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Briefcase,
  Building2,
  MessageCircle,
  Clock,
  MapPin,
  Globe,
  Zap,
  User,
  MessageSquare,
  Send,
  ChevronLeft,
  Layers,
} from "lucide-react";
import SEO from "../components/SEO";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return;
    }
    setError("");

    const text = `*New Inquiry from Website*\n\n*Name:* ${formData.name.trim()}\n*Email:* ${formData.email.trim()}\n*Message:* ${formData.message.trim()}`;
    const whatsappUrl = `https://wa.me/919704585960?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact GK Nexergy",
    "url": "https://gknexergy.com/contact",
    "description": "Get in touch with GK Nexergy for enterprise AI solutions, digital transformation, and tech skills education.",
    "mainEntity": {
      "@type": "Organization",
      "name": "GK Nexergy",
      "url": "https://gknexergy.com",
      "telephone": "+91-9704585960",
      "email": "contact@gknexergy.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9704585960",
        "contactType": "customer service",
        "availableLanguage": ["English", "Telugu", "Hindi"]
      }
    }
  };

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us | AI & Digital Solutions Consultation | GK Nexergy"
        description="Connect with GK Nexergy specialists. Request a consultation for enterprise AI solutions, digital transformation, academy programs, or business inquiries."
        keywords="contact GK Nexergy, AI solutions consultation, digital transformation inquiry, software consulting, enterprise technology partner"
        canonical="https://gknexergy.com/contact"
        schema={contactSchema}
      />

      {/* Hero */}
      <section className="contact-hero">
        <Link
          to="/home#pages-stack-section"
          data-testid="back-to-stack-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60a5fa',
            fontSize: '0.75rem',
            fontWeight: 700,
            textDecoration: 'none',
            marginBottom: '14px',
            transition: 'all 0.2s ease',
            width: 'fit-content'
          }}
        >
          <ChevronLeft style={{ width: 14, height: 14 }} />
          <Layers style={{ width: 14, height: 14 }} />
          <span>Back to Home Stack of Cards</span>
        </Link>
        <h1>Let’s start a conversation.</h1>
        <p>Send us a direct WhatsApp message or choose from our channels below.</p>
      </section>

      {/* Contact Cards */}
      <section className="contact-cards-section">
        <div className="contact-card-grid">

          <article className="contact-card">
            <div className="card-top">
              <div className="card-icon blue">
                <Phone size={20} strokeWidth={2.2} />
              </div>
              <span className="card-eyebrow">Immediate Support</span>
            </div>
            <h3>Call or WhatsApp</h3>
            <p>
              Speak with our team about courses, mentorship, admissions, or the next step in your learning journey.
            </p>
            <div className="card-footer">
              <a href="tel:+919704585960" className="phone-link">
                +919704585960
              </a>
              <a
                href="https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses%20and%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </article>

          <article className="contact-card">
            <div className="card-top">
              <div className="card-icon indigo">
                <Mail size={20} strokeWidth={2.2} />
              </div>
              <span className="card-eyebrow">General Inquiries</span>
            </div>
            <h3>Email us</h3>
            <p>
              For questions about programs, partnerships, college tie-ups, or any information you would like in writing.
            </p>
            <div className="card-footer">
              <a href="mailto:contact@gknexergy.com" className="email-link">
                contact@gknexergy.com
              </a>
            </div>
          </article>

        </div>
      </section>

      {/* WhatsApp Fast Contact Form */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <div className="contact-form-badge">
              <MessageCircle size={15} />
              <span>DIRECT WHATSAPP INQUIRY</span>
            </div>
            <h2>Quick Inquiry Form</h2>
            <p>
              Fill out the form below to initiate an immediate chat with our team on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-whatsapp-form">
            {error && <div className="contact-form-error">{error}</div>}

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="contact-name">
                  Your Name <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <User size={18} className="input-icon" />
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">
                  Email Address <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                Your Message <span className="req">*</span>
              </label>
              <div className="input-wrap textarea-wrap">
                <MessageSquare size={18} className="input-icon textarea-icon" />
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="How can we help you? Describe your requirements, questions, or learning goals..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-action-row">
              <button type="submit" className="whatsapp-submit-btn">
                <MessageCircle size={19} />
                <span>Send via WhatsApp</span>
                <Send size={16} className="btn-send-arrow" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Response Hours */}
      <section className="response-hours-wrapper">
        <div className="response-hours-container">
          <div className="response-hours-glow" />

          <div className="response-hours-icon-circle">
            <Clock size={22} strokeWidth={2} />
          </div>

          <div className="response-hours-badge">
            <span className="response-hours-pulse" />
            RESPONSE HOURS & AVAILABILITY
          </div>

          <h2 className="response-hours-title">Monday – Saturday</h2>
          <p className="response-hours-time">9:00 AM – 7:00 PM IST</p>

          <div className="response-hours-meta-row">
            <div className="response-hours-pill">
              <MapPin size={13} />
              India Headquarters
            </div>
            <div className="response-hours-pill">
              <Globe size={13} />
              Worldwide Remote Support
            </div>
            <div className="response-hours-pill">
              <Zap size={13} />
              Fast Response Across Time Zones
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Github } from "lucide-react";
import "./Footer.css";
import { Users, Briefcase, Globe } from "lucide-react";
const Footer = () => (
  <footer className="site-footer" data-testid="main-footer">
    <div className="footer-container">
      <div className="footer-grid">
        {/* 1. Brand Section */}
        <div className="footer-brand-col">
          <Link to="/home" className="footer-logo-link" data-testid="footer-logo">
            <img
              src="/images/gklogo.png"
              alt="GK Nexergy Logo"
              className="footer-logo-img"
            />
          </Link>
          <div className="footer-tagline-wrapper">
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Users className="h-4 w-4" />
              </span>
              <span>Empowering People.</span>
            </div>
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Briefcase className="h-4 w-4" />
              </span>
              <span>Enabling Businesses.</span>
            </div>
            <div className="footer-tagline-item">
              <span className="tagline-icon">
                <Globe className="h-4 w-4" />
              </span>
              <span>Transforming Communities.</span>
            </div>
          </div>
        </div>

        {/* 2. Contact Section */}
        <div className="footer-contact-col">
          <h3 className="footer-col-heading">Contact Us</h3>
          <div className="footer-contact-list">
            <a
              href="mailto:contact@gknexergy.com"
              className="footer-contact-item"
              data-testid="footer-email"
            >
              <div className="footer-contact-icon">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "11px", color: "var(--footer-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Email Inquiry
                </span>
                <span>contact@gknexergy.com</span>
              </div>
            </a>

            <a
              href="tel:+919704585960"
              className="footer-contact-item"
              data-testid="footer-phone"
            >
              <div className="footer-contact-icon">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "11px", color: "var(--footer-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Phone Helpline
                </span>
                <span>Phone — +919704585960</span>
              </div>
            </a>
          </div>
        </div>

        {/* 3. Social Links Section */}
        <div className="footer-social-col">
          <h3 className="footer-col-heading">Connect With Us</h3>
          <p className="footer-social-subtext">
            Stay tuned with our latest updates, academy announcements, and engineering breakthroughs.
          </p>

          <div className="footer-social-icons">
            {[
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              { Icon: Github, href: "https://github.com", label: "GitHub" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={`${label} — Coming Soon`}
                data-testid={`footer-social-${i}`}
                className="footer-social-btn"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="footer-launch-pill">
            <span className="footer-status-dot"></span>
            <span>Social media channels launching soon</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          © {new Date().getFullYear()} GK Nexergy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

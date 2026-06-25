import './layout.css';
import './footer.css';
import stewardLogo from '../../assets/steward-logo.png';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <a href="#" aria-label="Steward home" className="footer-logo-wrap">
              <img
                src={stewardLogo}
                alt="Steward"
                className="footer-logo-img"
              />
            </a>
            <p className="text-body" style={{ fontSize: '0.88rem', maxWidth: '260px', lineHeight: 1.65 }}>
              Mission Control for Restaurant Operations. Built for operators who need it to just work.
            </p>
            <div className="pilot-badge" style={{ marginTop: '1.25rem' }}>
              <span className="pulse-dot" />
              Pilot v0.1 · Active
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="footer-title">Platform</h4>
            <div className="footer-links-group">
              <a href="#product-story">Kitchen Display</a>
              <a href="#product-story">Menu Management</a>
              <a href="#product-story">Live Analytics</a>
              <a href="#product-story">QR Ordering</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-title">Company</h4>
            <div className="footer-links-group">
              <a href="#team">About Us</a>
              <a href={`${adminUrl}/login`}>Admin Login</a>
              <a href="mailto:hello@steward.app">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="footer-title">Legal</h4>
            <div className="footer-links-group">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-body" style={{ fontSize: '0.8rem' }}>© 2026 Steward. All rights reserved.</p>
          <p className="text-body" style={{ fontSize: '0.8rem' }}>Currently in pilot. Built for restaurant operators.</p>
        </div>
      </div>
    </footer>
  );
}

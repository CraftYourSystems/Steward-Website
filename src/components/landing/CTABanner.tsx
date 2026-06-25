import '../landing/landing.css';
import './cta-banner.css';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';

export default function CTABanner() {
  return (
    <section className="cta-banner-section" aria-label="Call to action">
      <div className="cta-banner-bg" aria-hidden="true" />
      <div className="container">
        <div className="cta-banner-inner animate-fade-up">
          <div className="cta-banner-text">
            <div className="cta-banner-badge">
              <span className="cta-pulse-dot" />
              <span>Join our pilot programme</span>
            </div>
            <h2 className="cta-banner-heading">
              Ready to grow your restaurant?
            </h2>
            <p className="cta-banner-sub">
              Join hundreds of restaurants already using Steward.
            </p>
          </div>
          <a href={`${adminUrl}/login`} className="btn btn-accent cta-banner-btn">
            Book a Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

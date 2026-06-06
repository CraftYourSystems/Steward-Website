import { useState, useEffect } from 'react';
import './layout.css';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change / link click
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled glass-panel' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" aria-label="Steward home">
            <div className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M12 3L4 7v5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V7L12 3z" fill="currentColor"/>
              </svg>
            </div>
            <span className="logo-text">Steward</span>
          </a>

          <ul className="navbar-links" role="list">
            <li><a href="#product-story">Product</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>

          <div className="navbar-cta">
            <a href={`${adminUrl}/login`} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.83rem', minHeight: '40px' }}>
              Login
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {open && <div className="nav-overlay" onClick={closeDrawer} aria-hidden="true" />}

      <div className={`nav-drawer ${open ? 'nav-drawer--open' : ''}`} role="dialog" aria-label="Mobile menu" aria-modal="true">
        <div className="nav-drawer-inner">
          <a href="#product-story" className="drawer-link" onClick={closeDrawer}>Product</a>
          <a href="#how-it-works" className="drawer-link" onClick={closeDrawer}>How It Works</a>
          <a href="#team"         className="drawer-link" onClick={closeDrawer}>Team</a>
          <a href="#faq"          className="drawer-link" onClick={closeDrawer}>FAQ</a>
          <a href={`${adminUrl}/login`} className="btn btn-primary drawer-cta" onClick={closeDrawer}>
            Login
          </a>
        </div>
      </div>
    </>
  );
}

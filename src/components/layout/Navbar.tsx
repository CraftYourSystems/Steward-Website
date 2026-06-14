import { useState, useEffect } from 'react';
import './layout.css';

const WHATSAPP_URL = 'https://wa.me/919000730352?text=Hi%20I%20came%20across%20Steward%20and%20would%20like%20to%20book%20a%20demo%20for%20my%20restaurant.';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Sun icon — shown in dark mode (click to switch to light)
function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  );
}

// Moon icon — shown in light mode (click to switch to dark)
function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            <a href={WHATSAPP_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '0.55rem 1.1rem', fontSize: '0.83rem', minHeight: '40px' }}>
              Book a Demo
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
          {/* Theme toggle inside drawer */}
          <div className="drawer-theme-row">
            <span className="drawer-theme-label">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
          </div>

          <a href="#product-story" className="drawer-link" onClick={closeDrawer}>Product</a>
          <a href="#how-it-works" className="drawer-link" onClick={closeDrawer}>How It Works</a>
          <a href="#team"         className="drawer-link" onClick={closeDrawer}>Team</a>
          <a href="#faq"          className="drawer-link" onClick={closeDrawer}>FAQ</a>
          <a href={WHATSAPP_URL} className="btn btn-primary drawer-cta" target="_blank" rel="noopener noreferrer" onClick={closeDrawer}>
            Book a Demo
          </a>
        </div>
      </div>
    </>
  );
}

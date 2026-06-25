import { useState, useEffect } from 'react';
import stewardLogo from '../../assets/steward-logo.png';
import './layout.css';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';

interface NavbarProps {
  isDinner: boolean;
  toggleDinner: () => void;
}

export default function Navbar({ isDinner, toggleDinner }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['product-story', 'how-it-works', 'team', 'faq'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.15, rootMargin: '-20% 0px -50% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(o => {
        if (o) o.observer.disconnect();
      });
    };
  }, []);

  // Close drawer on route change / link click
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled glass-panel' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" aria-label="Steward home">
            <img
              src={stewardLogo}
              alt="Steward"
              className="navbar-logo-img"
            />
          </a>

          <ul className="navbar-links" role="list">
            <li><a href="#product-story" className={activeSection === 'product-story' ? 'navbar-link-active' : ''}>Product</a></li>
            <li><a href="#how-it-works" className={activeSection === 'how-it-works' ? 'navbar-link-active' : ''}>How It Works</a></li>
            <li><a href="#team" className={activeSection === 'team' ? 'navbar-link-active' : ''}>Team</a></li>
            <li><a href="#faq" className={activeSection === 'faq' ? 'navbar-link-active' : ''}>FAQ</a></li>
          </ul>

          <div className="navbar-cta">
            {/* Dinner Service dark mode toggle */}
            <button
              className="dinner-toggle"
              onClick={toggleDinner}
              aria-label={isDinner ? 'Switch to Brunch Service (light mode)' : 'Switch to Dinner Service (dark mode)'}
              title={isDinner ? 'Brunch Service' : 'Dinner Service'}
            >
              {isDinner ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
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

          {/* Dinner toggle in drawer */}
          <button className="drawer-link" onClick={() => { toggleDinner(); closeDrawer(); }} style={{ textAlign: 'left', cursor: 'pointer' }}>
            {isDinner ? '☀️ Brunch Service' : '🌙 Dinner Service'}
          </button>

          <a href={`${adminUrl}/login`} className="btn btn-primary drawer-cta" onClick={closeDrawer}>
            Login
          </a>
        </div>
      </div>
    </>
  );
}


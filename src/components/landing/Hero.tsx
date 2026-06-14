import './hero.css';

const WHATSAPP_URL = 'https://wa.me/919000730352?text=Hi%20I%20came%20across%20Steward%20and%20would%20like%20to%20book%20a%20demo%20for%20my%20restaurant.';

export default function Hero() {
  return (
    <section className="hero-section" aria-label="Hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">

        {/* ── Content Block ── */}
        <div className="hero-content">
          <div className="animate-fade-up">
            <div className="pilot-badge" style={{ marginBottom: '2rem' }}>
              <span className="pulse-dot" />
              Steward Pilot · v0.1 is live
            </div>
          </div>

          <h1 className="heading-xl animate-fade-up delay-100">
            Mission Control<br />
            <span className="accent-text">for Restaurant</span><br />
            Operations.
          </h1>

          <p className="text-body-lg hero-sub animate-fade-up delay-200">
            One unified platform to coordinate your kitchen, manage menus, and read live analytics — during the shift, not after it.
          </p>

          <div className="hero-actions animate-fade-up delay-300">
            <a href={WHATSAPP_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Book a Demo
            </a>
            <a href="#product-story" className="btn btn-secondary">See How It Works</a>
          </div>

          <div className="hero-proof animate-fade-up delay-400">
            <div className="proof-item">
              <span className="proof-value">≤ 12ms</span>
              <span className="proof-label">Order sync latency</span>
            </div>
            <div className="proof-divider" aria-hidden="true" />
            <div className="proof-item">
              <span className="proof-value">4 roles</span>
              <span className="proof-label">Purpose-built views</span>
            </div>
            <div className="proof-divider" aria-hidden="true" />
            <div className="proof-item">
              <span className="proof-value">∞ tables</span>
              <span className="proof-label">No seat limits</span>
            </div>
          </div>
        </div>

        {/* ── KDS Visual ── */}
        <div className="hero-visual animate-fade-up delay-400" aria-hidden="true">
          <div className="kds-window glass-panel">

            <div className="kds-titlebar">
              <div className="kds-dots">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              </div>
              <span className="kds-window-label text-mono">Steward KDS · Dinner Service</span>
              <span className="kds-live-chip">
                <span className="pulse-dot" style={{ width: 5, height: 5 }} />
                LIVE
              </span>
            </div>

            <div className="kds-body">
              {/* Station header */}
              <div className="kds-station-header">
                <span className="text-mono" style={{ color: 'var(--text-dim)' }}>Station 1 — Grill</span>
                <span className="text-mono" style={{ color: 'var(--text-dim)' }}>3 active · 2 queued</span>
              </div>

              <div className="kds-grid">
                <div className="kds-card urgent">
                  <div className="kds-card-top">
                    <span className="kds-table text-mono">T-4</span>
                    <span className="kds-timer text-mono urgent-color">14:22</span>
                  </div>
                  <div className="kds-items">
                    <div>1× Burger <span className="mod">no onion</span></div>
                    <div>2× Fries</div>
                  </div>
                  <div className="kds-card-footer">
                    <span className="kds-badge kds-badge--urgent">Overdue</span>
                  </div>
                </div>

                <div className="kds-card cooking">
                  <div className="kds-card-top">
                    <span className="kds-table text-mono">T-9</span>
                    <span className="kds-timer text-mono cooking-color">06:05</span>
                  </div>
                  <div className="kds-items">
                    <div>1× Grilled Chicken</div>
                    <div>1× Risotto</div>
                  </div>
                  <div className="kds-card-footer">
                    <span className="kds-badge kds-badge--cooking">Cooking</span>
                  </div>
                </div>

                <div className="kds-card ready">
                  <div className="kds-card-top">
                    <span className="kds-table text-mono">T-12</span>
                    <span className="kds-timer text-mono ready-color">11:48</span>
                  </div>
                  <div className="kds-items">
                    <div>1× Steak <span className="mod">med-rare</span></div>
                    <div>1× Salad ✓</div>
                  </div>
                  <div className="kds-card-footer">
                    <span className="kds-badge kds-badge--ready">Ready to plate</span>
                  </div>
                </div>
              </div>

              {/* Alert bar */}
              <div className="kds-alert-bar">
                <span className="alert-dot" />
                <span className="text-mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  <strong style={{ color: 'var(--text)' }}>Station 2</strong> running 4 min behind avg · Rush mode active
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

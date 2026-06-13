import './landing.css';

const validationAreas = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'KDS Reliability',
    description: 'Can our kitchen display system keep up during a real Friday rush? We\'re stress-testing ticket routing, cook-time tracking, and station assignments under live service pressure.',
    status: 'Testing now',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
      </svg>
    ),
    title: 'Menu Sync Speed',
    description: 'When a chef 86s an item in the admin panel, how fast does it disappear from the guest\'s phone? We\'re measuring real-world propagation times across devices.',
    status: 'Testing now',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Guest QR Ordering',
    description: 'Do guests actually prefer scanning a QR code to waiting for a server? We\'re tracking adoption rates, order accuracy, and guest satisfaction at the table.',
    status: 'Testing now',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Live Analytics Value',
    description: 'Is seeing revenue and item velocity during the shift actually useful — or just noise? We\'re learning when and how operators check this data mid-service.',
    status: 'Gathering data',
  },
];

export default function EarlyPilot() {
  return (
    <section className="early-pilot-section section" id="early-pilot" aria-labelledby="early-pilot-heading">
      <div className="container">
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="pilot-badge" style={{ margin: '0 auto 1.5rem' }}>
            <span className="pulse-dot" />
            Early Pilot · Active
          </div>
          <h2 className="heading-lg" id="early-pilot-heading">
            What we&rsquo;re <span className="accent-text">validating</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '52ch', margin: '1rem auto 0' }}>
            Steward is in early pilot testing with Venna Cafe. Here&rsquo;s what we&rsquo;re actively measuring and refining before expanding to more partners.
          </p>
        </div>

        <div className="pilot-grid">
          {validationAreas.map((area, i) => (
            <div
              key={area.title}
              className="pilot-card animate-fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="pilot-card-header">
                <div className="feature-icon" aria-hidden="true">{area.icon}</div>
                <span className="pilot-status-chip">
                  <span className="pulse-dot" style={{ width: 5, height: 5 }} />
                  {area.status}
                </span>
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.6rem' }}>{area.title}</h3>
              <p className="text-body">{area.description}</p>
            </div>
          ))}
        </div>

        <div className="pilot-cta animate-fade-up" style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="text-body" style={{ maxWidth: '48ch', margin: '0 auto', fontSize: '0.9rem' }}>
            Interested in being an early partner? We&rsquo;re looking for operators who want to shape the product alongside us.
          </p>
          <a href="mailto:hello@steward.app" className="btn btn-secondary" style={{ marginTop: '1.25rem' }}>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

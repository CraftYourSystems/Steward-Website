import './landing.css';

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Zero-Latency KDS',
    description: 'Tickets fire to specific stations the instant an order is placed. Course pacing and cook-time sync are built in from day one.',
    outcome: 'Faster table turns',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
      </svg>
    ),
    title: 'Global Menu Control',
    description: 'Update pricing, add modifiers, or 86 an item in seconds. One change syncs everywhere — QR menus, KDS, and manager views.',
    outcome: 'Zero ordering errors',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Live Analytics',
    description: 'Revenue, cover counts, and item velocity update in real time. Make decisions during the shift — not after reading last night\'s spreadsheet.',
    outcome: 'Decisions that matter',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'QR Ordering',
    description: 'Guests scan, browse, and submit orders from their own devices. No app download. Orders appear on the KDS within milliseconds.',
    outcome: 'Less front-of-house load',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Role-Based Views',
    description: 'Servers, kitchen staff, and managers each see an interface purpose-built for their role. No training sessions. No confusion mid-service.',
    outcome: 'Instant team adoption',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Real-Time Sync',
    description: 'Every update — menu change, order status, 86 item — propagates across all connected devices instantly. No refresh, no delay.',
    outcome: 'No dropped tickets',
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section section" id="features" aria-labelledby="features-heading">
      <div className="container">
        <div className="features-header animate-fade-up">
          <p className="label" style={{ justifyContent: 'center' }}>Capabilities</p>
          <h2 className="heading-lg" id="features-heading">
            Built for <span className="accent-text">operational excellence</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '50ch', margin: '1rem auto 0' }}>
            Every feature is designed around the pressure of a busy service — not an office demo.
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '3rem' }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card animate-fade-up"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="feature-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="heading-sm" style={{ marginBottom: '0.6rem' }}>{f.title}</h3>
              <p className="text-body">{f.description}</p>
              <div className="feature-outcome">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {f.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

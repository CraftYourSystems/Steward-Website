import './landing.css';

const cysUrl = 'https://503a2626.craftyoursystems-website.pages.dev/';

const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L4 7v5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V7L12 3z"/>
      </svg>
    ),
    tag: 'Product',
    title: 'Steward',
    description: 'Restaurant operations platform currently in pilot testing and active validation.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    tag: 'Studio',
    title: 'CYS',
    description: 'A small team focused on building practical software, automation, and operational tools.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    tag: 'Connect',
    title: 'Work With Us',
    description: 'Interested in collaborating, testing Steward, discussing a product idea, or exploring future partnerships? We\u2019d love to connect.',
  },
];

export default function BuiltByCYS() {
  return (
    <section className="cys-section section" id="team" aria-labelledby="cys-heading">
      <div className="container">
        <div className="animate-fade-up" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="label">Built by CYS</p>
          <h2 className="heading-lg" id="cys-heading">
            Building products that solve{' '}
            <span className="accent-text">real problems.</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '56ch' }}>
            CYS is a student-led product team focused on creating practical software for real-world operations.
            Steward is our first public product, currently being validated through pilot testing with Venna Cafe.
            We&rsquo;re building, testing, learning, and iterating alongside real users.
          </p>
        </div>

        <div className="cys-grid">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="cys-card animate-fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="cys-card-icon" aria-hidden="true">{card.icon}</div>
              <div className="cys-card-tag">{card.tag}</div>
              <h3 className="heading-sm" style={{ marginBottom: '0.6rem' }}>{card.title}</h3>
              <p className="text-body">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="cys-actions animate-fade-up" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <a href={cysUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Explore CYS
          </a>
          <a href="mailto:hello@steward.app" className="btn btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

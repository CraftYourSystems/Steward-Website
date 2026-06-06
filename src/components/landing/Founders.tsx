import './landing.css';

const founders = [
  {
    name: 'Sammy',
    role: 'Product & Engineering',
    bio: 'Obsessed with making Steward fast and reliable under the pressure of a real dinner service. Every millisecond counts.',
    initial: 'S',
  },
  {
    name: 'Co-Founder',
    role: 'Design & Operations',
    bio: '[Placeholder] — ensuring the product feels native to a physical restaurant environment. Real workflows, not theory.',
    initial: '—',
  },
  {
    name: 'Co-Founder',
    role: 'Backend & Infrastructure',
    bio: '[Placeholder] — architecting the systems that keep Steward running during your busiest Saturday night.',
    initial: '—',
  },
];

export default function Founders() {
  return (
    <section className="founders-section section" id="team" aria-labelledby="founders-heading">
      <div className="container">
        <div className="animate-fade-up" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="label">The Team</p>
          <h2 className="heading-lg" id="founders-heading">
            Small team. <span className="accent-text">Tight focus.</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '52ch' }}>
            We're building Steward alongside our pilot partners. Every feature solves a real problem that surfaced during a real service.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((f, i) => (
            <div key={i} className="founder-card animate-fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="founder-role-tag">{f.role}</div>
              <h3 className="heading-sm" style={{ marginBottom: '0.65rem' }}>{f.name}</h3>
              <p className="text-body">{f.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

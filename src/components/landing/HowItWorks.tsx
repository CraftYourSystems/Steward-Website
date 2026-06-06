import './landing.css';

const steps = [
  {
    title: 'Import your menu',
    body: 'Paste in your existing menu or build from scratch. Categories, modifiers, dietary flags — done in minutes.',
  },
  {
    title: 'Configure your floor',
    body: 'Map tables, assign kitchen stations, and set service zones. Steward adapts every workflow to your layout.',
  },
  {
    title: 'Onboard your team',
    body: 'Invite staff and assign roles. Servers, kitchen, and managers each get a view built for their daily reality.',
  },
  {
    title: 'Open for service',
    body: 'Orders flow from guest to kitchen in real time. Steward runs in the background and stays out of the way.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section section" id="how-it-works" aria-labelledby="how-heading">
      <div className="container">
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Setup</p>
          <h2 className="heading-lg" id="how-heading">
            Up and running in <span className="accent-text">an afternoon</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '46ch', margin: '1rem auto 0' }}>
            No six-week implementation. No dedicated IT team. No training days.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-item animate-fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="step-num">0{i + 1}</div>
              <h3 className="heading-sm" style={{ marginBottom: '0.65rem' }}>{s.title}</h3>
              <p className="text-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

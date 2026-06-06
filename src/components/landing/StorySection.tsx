import './landing.css';

export default function StorySection() {
  return (
    <section className="story-section section" id="story">
      <div className="container">
        <div className="story-grid">
          <div className="story-content animate-fade-up">
            <p className="label">The Problem</p>
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
              Service shouldn't feel <br/>like <span className="accent-text">managing chaos.</span>
            </h2>
            <div className="text-body-lg" style={{ marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                Most restaurants run on disconnected systems. The POS doesn't talk to the kitchen. The menu takes days to update. Managers pull reports the next morning to see what went wrong.
              </p>
              <p>
                Steward changes the architecture of your service. One unified engine coordinates the floor, routes tickets, and surfaces data instantly.
              </p>
            </div>
          </div>
          <div className="story-visual animate-fade-up delay-200">
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: 'var(--shadow-glow)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M12 3L4 7v5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V7L12 3z"/></svg>
              </div>
              <div className="text-mono" style={{ color: 'var(--accent)' }}>System Synced</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

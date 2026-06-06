import '../landing/landing.css';

export default function PilotForm() {
  return (
    <section className="pilot-section section" id="pilot" aria-labelledby="pilot-heading">
      <div className="pilot-glow" aria-hidden="true" />
      <div className="container">
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}>
          <p className="label" style={{ justifyContent: 'center' }}>Early Access</p>
          <h2 className="heading-lg" id="pilot-heading">
            Join the <span className="accent-text">Steward Pilot</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '50ch', margin: '1rem auto 0' }}>
            We're onboarding a select group of restaurant partners to shape Steward alongside us. No commitment required.
          </p>
        </div>

        <div className="pilot-form-wrap animate-fade-up delay-200">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="pilot-name">Full Name</label>
              <input type="text" id="pilot-name" placeholder="Jane Doe" autoComplete="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="pilot-restaurant">Restaurant Name</label>
              <input type="text" id="pilot-restaurant" placeholder="The Local Kitchen" required />
            </div>

            <div className="form-group">
              <label htmlFor="pilot-email">Work Email</label>
              <input type="email" id="pilot-email" placeholder="jane@restaurant.com" autoComplete="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="pilot-role">Your Role</label>
              <select id="pilot-role" required defaultValue="">
                <option value="" disabled>Select your role…</option>
                <option value="owner">Owner / Operator</option>
                <option value="gm">General Manager</option>
                <option value="chef">Executive Chef</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}>
              Submit Application
            </button>
          </form>

          <p className="text-body" style={{ textAlign: 'center', fontSize: '0.78rem', marginTop: '1.25rem', color: 'var(--text-dim)' }}>
            We respond to every application personally — usually within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

import './landing.css';

export default function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="container">
        <div className="pilot-partner-showcase animate-fade-up">
          <div className="partner-label">
            <span className="pulse-dot" />
            <span className="text-mono" style={{ color: 'var(--green)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
              CURRENT PILOT PARTNER
            </span>
          </div>
          <div className="partner-name">Venna Cafe</div>
          <p className="text-body" style={{ maxWidth: '48ch', textAlign: 'center', margin: '0 auto' }}>
            Steward is live at Venna Cafe, our first pilot partner. We&rsquo;re working side-by-side with their team to validate every feature in a real service environment.
          </p>
        </div>
      </div>
    </div>
  );
}

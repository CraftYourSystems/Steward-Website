import './landing.css';
import './signature.css';

export default function SignatureSection() {
  return (
    <section className="section" id="signature" style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Inside a Service</p>
          <h2 className="heading-lg">
            The anatomy of a <span className="accent-text">Steward order</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Watch how a single order flows seamlessly from the guest's device, through the kitchen, to the manager's live analytics.
          </p>
        </div>

        <div className="signature-flow animate-fade-up">
          <div className="flow-step">
            <div className="flow-icon">📱</div>
            <h3 className="heading-md">1. Guest Orders</h3>
            <p className="text-body">Guest scans QR code and sends order directly from their phone.</p>
          </div>
          <div className="flow-connector animate-pulse"></div>
          <div className="flow-step">
            <div className="flow-icon">⚡</div>
            <h3 className="heading-md">2. System Routes</h3>
            <p className="text-body">Steward instantly parses items, modifies pacing, and routes to specific stations.</p>
          </div>
          <div className="flow-connector animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="flow-step">
            <div className="flow-icon">🍳</div>
            <h3 className="heading-md">3. Kitchen Cooks</h3>
            <p className="text-body">Grill, cold, and hot stations receive their items with synchronized cook times.</p>
          </div>
          <div className="flow-connector animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="flow-step">
            <div className="flow-icon">📊</div>
            <h3 className="heading-md">4. Data Syncs</h3>
            <p className="text-body">Revenue, item velocity, and table turn data hit the manager's dashboard instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

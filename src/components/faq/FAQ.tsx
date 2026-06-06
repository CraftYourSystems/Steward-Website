import '../landing/landing.css';
import '../../components/faq/faq.css';

const faqs = [
  {
    q: 'Does this replace my POS?',
    a: 'Steward focuses on kitchen operations, order routing, and analytics. It handles QR-based guest ordering directly. For traditional in-person payments, we integrate with select existing POS systems.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'Most restaurants are fully configured in an afternoon. No complex hardware installations — just browser-based tablets and a 30-minute setup call with the team.',
  },
  {
    q: 'What hardware do I need?',
    a: 'Steward runs in any modern browser. You can use existing iPads, Android tablets, or touch-screen monitors. We don\'t require any proprietary hardware.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'Pilot partners join without a long-term commitment. We work together to make sure Steward is genuinely right for your operation before locking anything in.',
  },
];

export default function FAQ() {
  return (
    <section className="faq-section section" id="faq" aria-labelledby="faq-heading">
      <div className="container" style={{ maxWidth: '760px' }}>
        <div className="animate-fade-up" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="label">FAQ</p>
          <h2 className="heading-lg" id="faq-heading">
            Common <span className="accent-text">questions</span>
          </h2>
        </div>

        <div className="faq-list animate-fade-up delay-100">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>{f.q}</h3>
              <p className="text-body">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

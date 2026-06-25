import { useReducer } from 'react';
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

type State = { openIndex: number | null };
type Action = { type: 'TOGGLE'; index: number };

function reducer(state: State, action: Action): State {
  if (action.type === 'TOGGLE') {
    return { openIndex: state.openIndex === action.index ? null : action.index };
  }
  return state;
}

export default function FAQ() {
  const [state, dispatch] = useReducer(reducer, { openIndex: null });

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
          {faqs.map((f, i) => {
            const isOpen = state.openIndex === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-trigger"
                  onClick={() => dispatch({ type: 'TOGGLE', index: i })}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <h3 className="heading-sm faq-question">{f.q}</h3>
                  <svg
                    className={`faq-chevron ${isOpen ? 'faq-chevron--open' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="faq-collapse"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer">
                    <p className="text-body">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


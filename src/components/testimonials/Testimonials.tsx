import '../landing/landing.css';

const testimonials = [
  {
    stars: '★★★★★',
    quote: '"Since switching to Steward, we\'ve shaved an average of 4 minutes off every table turn. The KDS routing is exactly what a busy service needs."',
    name: '[Pilot Partner]',
    role: 'GM, Osteria',
    initial: 'O',
  },
  {
    stars: '★★★★★',
    quote: '"Seeing item-level revenue live during service has completely changed how we staff our Friday nights. This is the data we always needed."',
    name: '[Pilot Partner]',
    role: 'Owner, Lumina',
    initial: 'L',
  },
  {
    stars: '★★★★★',
    quote: '"We 86 an item in the admin panel and it vanishes from the guest\'s phone in seconds. No more awkward table conversations."',
    name: '[Pilot Partner]',
    role: 'Head Chef, Ember',
    initial: 'E',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Early Partners</p>
          <h2 className="heading-lg" id="testimonials-heading">
            What operators are <span className="accent-text">saying</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '48ch', margin: '1rem auto 0' }}>
            Early pilot partners, speaking honestly. <em style={{ color: 'var(--text-dim)', fontStyle: 'normal', fontSize: '0.85rem' }}>(placeholders — real quotes in progress)</em>
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card animate-fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="testimonial-stars">{t.stars}</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initial}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

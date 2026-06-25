import { useState, useRef } from 'react';
import '../landing/landing.css';

const testimonials = [
  {
    stars: '★★★★★',
    quote: '"Since switching to Steward, we\'ve shaved an average of 4 minutes off every table turn. The KDS routing is exactly what a busy service needs."',
    name: 'Chef Marcus',
    role: 'GM, Osteria',
    initial: 'O',
    gradient: 'linear-gradient(135deg, #EEB76F 0%, #EE9F6F 100%)'
  },
  {
    stars: '★★★★★',
    quote: '"Seeing item-level revenue live during service has completely changed how we staff our Friday nights. This is the data we always needed."',
    name: 'Sarah Jenkins',
    role: 'Owner, Lumina',
    initial: 'L',
    gradient: 'linear-gradient(135deg, #3DBEAA 0%, #3DA8BE 100%)'
  },
  {
    stars: '★★★★★',
    quote: '"We 86 an item in the admin panel and it vanishes from the guest\'s phone in seconds. No more awkward table conversations."',
    name: 'David Lin',
    role: 'Head Chef, Ember',
    initial: 'E',
    gradient: 'linear-gradient(135deg, #8B6FD4 0%, #5B2D9E 100%)'
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    setDragOffset(0);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    // Limit drag movement slightly for boundaries
    if ((currentIndex === 0 && delta > 0) || (currentIndex === testimonials.length - 1 && delta < 0)) {
      setDragOffset(delta * 0.4);
    } else {
      setDragOffset(delta);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    const threshold = 60; // minimum drag distance in px
    if (dragOffset < -threshold && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setDragOffset(0);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="testimonials-section section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Early Partners</p>
          <h2 className="heading-lg" id="testimonials-heading">
            What operators are <span className="accent-text">saying</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '48ch', margin: '1rem auto 0', color: 'var(--text-dim)' }}>
            Steward runs live in busy services. Here is honest feedback from early pilots.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="testimonials-carousel-wrapper">
          <div 
            ref={containerRef}
            className={`testimonials-slider-track ${isDragging ? 'grabbing' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform: `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`,
              touchAction: 'pan-y'
            }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`testimonial-slide-item ${currentIndex === i ? 'active' : ''}`}
              >
                <div className="testimonial-card glass-dark">
                  <div className="testimonial-stars">{t.stars}</div>
                  <p className="testimonial-quote">{t.quote}</p>
                  <div className="testimonial-author">
                    <div 
                      className="author-avatar-gradient text-mono"
                      style={{ background: t.gradient }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="carousel-nav-controls">
            <button 
              className="carousel-arrow prev" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              ←
            </button>
            
            <div className="carousel-dots-list">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              className="carousel-arrow next" 
              onClick={handleNext}
              disabled={currentIndex === testimonials.length - 1}
              aria-label="Next slide"
            >
              →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

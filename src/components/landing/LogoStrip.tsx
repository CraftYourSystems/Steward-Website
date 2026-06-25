import { useEffect, useRef, useState } from 'react';
import './landing.css';

const brands = [
  {
    name: 'Urban Kitchen',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    name: 'Bella Italiano',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 3h6a4 4 0 0 1 0 8H6v8h8" /><path d="M6 11h6a4 4 0 0 1 0 8H6" />
      </svg>
    )
  },
  {
    name: 'Spice Route',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    )
  },
  {
    name: 'Harvest & Co.',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 3v18M6 12h12M18 3v18" />
      </svg>
    )
  },
  {
    name: 'Grill House',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="12,2 22,22 2,22" />
      </svg>
    )
  },
  {
    name: 'Ocean Breeze',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M2 12c4-4 8-4 12 0s8 4 12 0" /><path d="M2 17c4-4 8-4 12 0s8 4 12 0" />
      </svg>
    )
  },
  {
    name: 'Venna Cafe',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 8h1a3 3 0 0 1 0 6h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      </svg>
    )
  },
  {
    name: 'Garden Table',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      </svg>
    )
  },
  {
    name: 'Ember & Oak',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 22h20L12 2z" /><path d="M12 9v6M9 12h6" />
      </svg>
    )
  },
  {
    name: 'Silk Road',
    icon: (
      <svg className="logo-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M2 3h20v4H2V3zm3 4h14v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7z" />
      </svg>
    )
  }
];

export default function LogoStrip() {
  const doubled = [...brands, ...brands];
  const trackRef = useRef<HTMLDivElement>(null);
  const [posX, setPosX] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(0);
  const requestRef = useRef<number>(0);

  const speed = 0.5; // Pixels scrolled per frame

  const animate = () => {
    if (isDragging.current) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    setPosX(prevX => {
      const track = trackRef.current;
      if (!track) return prevX;

      const halfWidth = track.scrollWidth / 2;
      let nextX = prevX - speed;
      if (nextX <= -halfWidth) {
        nextX += halfWidth; // seamlessly loop back
      }
      return nextX;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startPos.current = posX;
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    let nextX = startPos.current + delta;

    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      // Loop bounds logic to ensure infinite dragging bounds
      if (nextX > 0) {
        nextX -= halfWidth;
      } else if (nextX <= -halfWidth) {
        nextX += halfWidth;
      }
    }
    setPosX(nextX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="logo-strip">
      <div className="container" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <p
          className="text-mono"
          style={{
            color: 'var(--text-dim)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Trusted by top restaurants
        </p>
      </div>

      {/* Infinite marquee scroll with drag */}
      <div className="marquee-wrapper logo-grab-wrapper">
        <div 
          ref={trackRef}
          className={`marquee-track-draggable ${isDragging.current ? 'grabbing' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ 
            transform: `translateX(${posX}px)`,
            display: 'flex',
            width: 'max-content',
            touchAction: 'none'
          }}
        >
          {doubled.map((brand, i) => (
            <span key={i} className="brand-logo-item-draggable">
              <span className="brand-icon-wrap" aria-hidden="true">
                {brand.icon}
              </span>
              <span className="brand-name-text text-mono">{brand.name}</span>
              <span className="marquee-dot-divider" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

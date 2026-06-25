import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Attaches mouse-move listeners to a card element for 3D tilt.
 * Writes --rx and --ry CSS custom properties for perspective rotation.
 */
export function useMagneticCard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const maxTilt = 6; // degrees

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--rx', `${x * maxTilt}deg`);
      el.style.setProperty('--ry', `${-y * maxTilt}deg`);
    };

    const handleLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return ref;
}

/**
 * Animates a number from `start` to `target` using easeOutCubic.
 * Triggers when the element enters the viewport.
 */
export function useCountUp(target: number, duration = 1200, start = 0) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          const startTime = performance.now();
          const range = target - start;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(start + range * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, start]);

  return { value, ref };
}

/**
 * Returns a `triggerBurst(x, y)` function that spawns CSS particle elements.
 */
export function useParticleBurst() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ensure a persistent container exists in the DOM
  useEffect(() => {
    let container = document.querySelector('.particle-container') as HTMLDivElement | null;
    if (!container) {
      container = document.createElement('div');
      container.className = 'particle-container';
      document.body.appendChild(container);
    }
    containerRef.current = container;
  }, []);

  const triggerBurst = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#EEB76F', '#F5C880', '#3DBEAA', '#A8E6D7', '#5B2D9E', '#fff'];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const velocity = 40 + Math.random() * 60;
      const px = Math.cos(angle) * velocity;
      const py = Math.sin(angle) * velocity;

      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        background: ${colors[i % colors.length]};
        --px: ${px}px;
        --py: ${py}px;
        width: ${4 + Math.random() * 4}px;
        height: ${4 + Math.random() * 4}px;
      `;

      container.appendChild(particle);

      // Clean up after animation
      setTimeout(() => particle.remove(), 750);
    }
  }, []);

  return { triggerBurst };
}

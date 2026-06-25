import { useState, useEffect, useRef } from 'react';
import './landing.css';

const steps = [
  {
    id: 0,
    title: 'Import your menu',
    body: 'Paste in your existing menu or build from scratch. Categories, modifiers, dietary flags — done in minutes.',
    visual: (
      <div className="setup-visual-box menu-setup animate-spring-in">
        <div className="file-drop-mock text-mono">
          <span className="upload-icon">📄</span>
          <span className="upload-filename">bistro-menu.csv</span>
          <div className="upload-progress-bar"><div className="progress-fill" style={{ width: '85%' }} /></div>
        </div>
        <div className="imported-items-tags">
          <span className="import-tag tag-1 text-mono">Classic Burger +</span>
          <span className="import-tag tag-2 text-mono">Truffle Fries +</span>
          <span className="import-tag tag-3 text-mono">Caesar Salad +</span>
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: 'Configure your floor',
    body: 'Map tables, assign kitchen stations, and set service zones. Steward adapts every workflow to your layout.',
    visual: (
      <div className="setup-visual-box floor-setup animate-spring-in">
        <div className="floor-grid-mock">
          <div className="floor-table active text-mono">Table 1</div>
          <div className="floor-table text-mono">Table 2</div>
          <div className="floor-table text-mono">Table 3</div>
          <div className="floor-table text-mono">Table 4</div>
        </div>
        <div className="assign-badge text-mono">Assign Station: Grill</div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Onboard your team',
    body: 'Invite staff and assign roles. Servers, kitchen, and managers each get a view built for their daily reality.',
    visual: (
      <div className="setup-visual-box team-setup animate-spring-in">
        <div className="team-list-mock">
          <div className="team-row text-mono">
            <span>Chef Marcus</span> 
            <span className="role-tag chef">KITCHEN</span>
          </div>
          <div className="team-row text-mono">
            <span>Sarah Jenkins</span> 
            <span className="role-tag server">SERVER</span>
          </div>
          <div className="team-row text-mono">
            <span>David Lin</span> 
            <span className="role-tag manager">MANAGER</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Open for service',
    body: 'Orders flow from guest to kitchen in real time. Steward runs in the background and stays out of the way.',
    visual: (
      <div className="setup-visual-box service-setup animate-spring-in">
        <div className="service-status-mock">
          <div className="status-indicator">
            <span className="pulse-dot" style={{ width: 6, height: 6 }} /> 
            LIVE SERVICE ACTIVE
          </div>
          <div className="ticker-val text-mono">42 orders synced</div>
        </div>
      </div>
    )
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Sync active index and SVG line fill during scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll offset based on section viewport position
      const totalDist = rect.height - windowHeight / 2;
      const currentPos = -rect.top + windowHeight / 3;

      const percent = Math.min(Math.max(currentPos / totalDist, 0), 1);
      setScrollPercent(percent);

      // Determine active index
      const stepIndex = Math.min(Math.floor(percent * 4), 3);
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="how-section section" 
      id="how-it-works" 
      aria-labelledby="how-heading"
      ref={sectionRef}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
          <p className="label" style={{ justifyContent: 'center' }}>Setup Timeline</p>
          <h2 className="heading-lg" id="how-heading">
            Up and running in <span className="accent-text">an afternoon</span>
          </h2>
          <p className="text-body-lg" style={{ marginTop: '1rem', maxWidth: '46ch', margin: '1rem auto 0', color: 'var(--text-dim)' }}>
            No six-week implementation. No dedicated IT team. No training days.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-container">
          
          {/* Left Column: Interactive Cards with SVG line */}
          <div className="timeline-left">
            
            {/* SVG line overlay */}
            <div className="timeline-svg-wrapper">
              <svg className="timeline-svg-line" viewBox="0 0 10 100" preserveAspectRatio="none">
                {/* Background path */}
                <path d="M 5 0 L 5 100" fill="none" stroke="var(--border-md)" strokeWidth="2" />
                {/* Active path */}
                <path 
                  d="M 5 0 L 5 100" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="3.5" 
                  strokeDasharray="100" 
                  strokeDashoffset={100 - (scrollPercent * 100)}
                  style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                />
              </svg>
            </div>

            <div className="timeline-cards-list">
              {steps.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`timeline-step-card ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="timeline-node text-mono">0{idx + 1}</div>
                  <div className="timeline-card-content">
                    <h3 className="heading-sm">{s.title}</h3>
                    <p className="text-body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="timeline-right">
            <div className="timeline-visual-panel glass-dark">
              <div className="panel-header text-mono">
                <span>Steward Console · Setup Step 0{activeStep + 1}</span>
                <span className="panel-dot" />
              </div>
              <div className="panel-body">
                {steps[activeStep].visual}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

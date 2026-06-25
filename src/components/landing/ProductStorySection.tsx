import { useState, useEffect, useRef } from 'react';
import { useParticleBurst } from '../../hooks/usePhysics';
import './story.css';

interface ChapterProps {
  step: string;
  headline: string;
  body: string;
  visual: React.ReactNode;
  reversed?: boolean;
  accentColor?: string;
}

function Chapter({ step, headline, body, visual, reversed = false, accentColor = 'var(--accent)' }: ChapterProps) {
  return (
    <div className={`chapter ${reversed ? 'chapter--reversed' : ''}`}>
      <div className="chapter-content animate-fade-up">
        <div className="chapter-step text-mono" style={{ color: accentColor }}>
          {step}
        </div>
        <h3 className="heading-lg chapter-headline"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <p className="text-body-lg chapter-body">{body}</p>
      </div>
      <div className="chapter-visual animate-fade-up delay-200">
        {visual}
      </div>
    </div>
  );
}

/* ── CHAPTER 1: Interactive Order Ticket ── */
function OrderTicket() {
  const [extraPickles, setExtraPickles] = useState(true);
  const [bacon, setBacon] = useState(false);
  const [gfBun, setGfBun] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const { triggerBurst } = useParticleBurst();

  // Price calculations
  const baseBurgerPrice = 18.00;
  const saladPrice = 24.00;
  const waterPrice = 5.00;
  
  let modifiersPrice = 0;
  if (extraPickles) modifiersPrice += 1.00;
  if (bacon) modifiersPrice += 2.50;
  if (gfBun) modifiersPrice += 1.50;

  const total = baseBurgerPrice + modifiersPrice + saladPrice + waterPrice;

  const handlePlaceOrder = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setOrderSent(true);
  };

  return (
    <div className="story-card order-ticket-card">
      <div className="story-card-header">
        <div className="story-card-dots">
          <span /><span /><span />
        </div>
        <span className="text-mono story-card-title">QR Menu · Table 7</span>
        <span className="live-badge">
          <span className="pulse-dot" style={{ width: 5, height: 5 }} />
          ACTIVE
        </span>
      </div>
      
      <div className="story-card-body" style={{ position: 'relative' }}>
        
        {/* Modifiers List */}
        <div className="order-line">
          <span className="order-qty">1×</span>
          <div className="order-info">
            <span className="order-name">Classic Burger</span>
            <div className="order-modifiers-picker">
              <label className="mod-checkbox text-mono">
                <input 
                  type="checkbox" 
                  checked={extraPickles} 
                  onChange={(e) => setExtraPickles(e.target.checked)} 
                />
                <span className="chk-box" />
                Extra pickles (+$1.00)
              </label>
              <label className="mod-checkbox text-mono">
                <input 
                  type="checkbox" 
                  checked={bacon} 
                  onChange={(e) => setBacon(e.target.checked)} 
                />
                <span className="chk-box" />
                Add crispy bacon (+$2.50)
              </label>
              <label className="mod-checkbox text-mono">
                <input 
                  type="checkbox" 
                  checked={gfBun} 
                  onChange={(e) => setGfBun(e.target.checked)} 
                />
                <span className="chk-box" />
                Gluten-free bun (+$1.50)
              </label>
            </div>
            <span className="order-mod text-mono">
              Modifiers: no sesame
              {extraPickles && ', extra pickles'}
              {bacon && ', add bacon'}
              {gfBun && ', GF bun'}
            </span>
          </div>
          <span className="order-price">${(baseBurgerPrice + modifiersPrice).toFixed(2)}</span>
        </div>

        <div className="order-line">
          <span className="order-qty">2×</span>
          <div className="order-info">
            <span className="order-name">Caesar Salad</span>
          </div>
          <span className="order-price">${saladPrice.toFixed(2)}</span>
        </div>

        <div className="order-line">
          <span className="order-qty">1×</span>
          <div className="order-info">
            <span className="order-name">Sparkling Water</span>
          </div>
          <span className="order-price">${waterPrice.toFixed(2)}</span>
        </div>

        <div className="order-separator" />
        
        <div className="order-total">
          <span>Total</span>
          <span className="text-mono">${total.toFixed(2)}</span>
        </div>

        <button 
          className={`story-submit-btn ${orderSent ? 'sent' : ''}`}
          onClick={handlePlaceOrder}
          disabled={orderSent}
        >
          {orderSent ? (
            <>
              Order Sent ✓
            </>
          ) : (
            <>
              Place Order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </>
          )}
        </button>
        <p className="story-card-note text-mono">Try selecting modifiers and placing the order!</p>

        {/* Success flying ticket overlay */}
        {orderSent && (
          <div className="order-success-overlay animate-spring-in">
            <div className="overlay-badge">⚡</div>
            <h4 className="text-mono">Rerouting Order...</h4>
            <p className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
              Table 7 order successfully synced. Splitting ticket to kitchen stations...
            </p>
            <button 
              onClick={() => setOrderSent(false)}
              className="btn btn-secondary text-mono" 
              style={{ fontSize: '0.6rem', padding: '0.3rem 0.6rem', marginTop: '0.5rem' }}
            >
              Order Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── CHAPTER 2: SVG Routing Diagram ── */
function RoutingDiagram() {
  const [grillCount, setGrillCount] = useState(0);
  const [coldCount, setColdCount] = useState(0);
  const [barCount, setBarCount] = useState(0);

  const [grillFlash, setGrillFlash] = useState(false);
  const [coldFlash, setColdFlash] = useState(false);
  const [barFlash, setBarFlash] = useState(false);

  useEffect(() => {
    // Set up synchronized intervals that flash the station chips as SVG dots arrive
    const interval = setInterval(() => {
      // Grill dot arrives
      setTimeout(() => {
        setGrillFlash(true);
        setGrillCount(c => c + 1);
        setTimeout(() => setGrillFlash(false), 800);
      }, 2500);

      // Cold dot arrives
      setTimeout(() => {
        setColdFlash(true);
        setColdCount(c => c + 1);
        setTimeout(() => setColdFlash(false), 800);
      }, 3500);

      // Bar dot arrives
      setTimeout(() => {
        setBarFlash(true);
        setBarCount(c => c + 1);
        setTimeout(() => setBarFlash(false), 800);
      }, 4500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="story-card routing-diagram-card">
      <div className="story-card-header">
        <div className="story-card-dots"><span /><span /><span /></div>
        <span className="text-mono story-card-title">Steward Intelligent Router</span>
        <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--aqua-vivid)' }}>12ms latency</span>
      </div>

      <div className="story-card-body" style={{ padding: '1.25rem' }}>
        
        {/* Source Table node */}
        <div className="route-node route-node--source">
          <div className="route-icon">📱</div>
          <div>
            <div className="heading-sm text-mono">Table 7 Order Ticket</div>
            <div className="text-mono" style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>4 items · split instantly</div>
          </div>
        </div>

        {/* SVG Routing paths with flowing dots */}
        <div className="routing-svg-container">
          <svg viewBox="0 0 300 80" className="routing-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-grill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="grad-cold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--aqua-vivid)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--aqua-vivid)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="grad-bar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--purple-mid)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--purple-mid)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Path lines */}
            <path d="M 150 0 C 150 40, 50 30, 50 80" fill="none" stroke="var(--border-md)" strokeWidth="1.5" />
            <path d="M 150 0 L 150 80" fill="none" stroke="var(--border-md)" strokeWidth="1.5" />
            <path d="M 150 0 C 150 40, 250 30, 250 80" fill="none" stroke="var(--border-md)" strokeWidth="1.5" />

            {/* Flowing animated circles */}
            <circle r="5" fill="var(--accent)" className="flowing-dot dot-grill">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 150 0 C 150 40, 50 30, 50 80" calcMode="linear" />
            </circle>
            <circle r="5" fill="var(--aqua-vivid)" className="flowing-dot dot-cold">
              <animateMotion dur="6s" begin="1s" repeatCount="indefinite" path="M 150 0 L 150 80" calcMode="linear" />
            </circle>
            <circle r="5" fill="var(--purple-mid)" className="flowing-dot dot-bar">
              <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M 150 0 C 150 40, 250 30, 250 80" calcMode="linear" />
            </circle>
          </svg>
        </div>

        {/* Destination stations with counters */}
        <div className="route-stations">
          
          <div className={`station-chip station-chip--grill ${grillFlash ? 'flash' : ''}`}>
            <span>🔥</span>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Grill</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Burger</div>
            </div>
            {grillFlash && (
              <span className="float-badge text-mono animate-float-up">+1</span>
            )}
            <span className="station-counter text-mono">{grillCount}</span>
          </div>

          <div className={`station-chip station-chip--cold ${coldFlash ? 'flash' : ''}`}>
            <span>🥗</span>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Cold</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>2× Salad</div>
            </div>
            {coldFlash && (
              <span className="float-badge text-mono animate-float-up">+2</span>
            )}
            <span className="station-counter text-mono">{coldCount * 2}</span>
          </div>

          <div className={`station-chip station-chip--bar ${barFlash ? 'flash' : ''}`}>
            <span>🫧</span>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Bar</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Water</div>
            </div>
            {barFlash && (
              <span className="float-badge text-mono animate-float-up">+1</span>
            )}
            <span className="station-counter text-mono">{barCount}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── CHAPTER 3: Live Analytics Dashboard ── */
function AnalyticsDashboard() {
  const countRevRef = useRef<HTMLDivElement>(null);
  const countCovRef = useRef<HTMLDivElement>(null);
  const countTicketRef = useRef<HTMLDivElement>(null);

  const [revVal, setRevVal] = useState(4800);
  const [covVal, setCovVal] = useState(110);
  const [tktVal, setTktVal] = useState(38);

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Set up custom count up when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart

            setRevVal(Math.round(4800 + (4867 - 4800) * eased));
            setCovVal(Math.round(110 + (119 - 110) * eased));
            setTktVal(Math.round(38.0 + (40.8 - 38.0) * eased));

            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const el = countRevRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const barData = [
    { hour: '5p', covers: 22 },
    { hour: '6p', covers: 45 },
    { hour: '7p', covers: 68 },
    { hour: '8p', covers: 100, peak: true },
    { hour: '9p', covers: 92, peak: true },
    { hour: '10p', covers: 72 },
    { hour: '11p', covers: 38 }
  ];

  return (
    <div className="story-card analytics-dashboard-card" ref={countRevRef}>
      <div className="story-card-header">
        <div className="story-card-dots"><span /><span /><span /></div>
        <span className="text-mono story-card-title">Live Analytics · Shift Dashboard</span>
        <span className="live-badge">
          <span className="pulse-dot" style={{ width: 5, height: 5 }} />
          LIVE FEED
        </span>
      </div>

      <div className="story-card-body" style={{ padding: '1rem' }}>
        
        {/* Metric Cards Row */}
        <div className="an-stats">
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Revenue</div>
            <div className="an-stat-value text-mono">${revVal}</div>
            <div className="an-stat-trend text-mono">↑ 14% vs last Fri</div>
          </div>
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Covers</div>
            <div className="an-stat-value text-mono" ref={countCovRef}>{covVal}</div>
            <div className="an-stat-trend text-mono">↑ 12 vs avg</div>
          </div>
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Avg Ticket</div>
            <div className="an-stat-value text-mono" ref={countTicketRef}>${tktVal.toFixed(1)}</div>
            <div className="an-stat-trend text-mono">↑ $3.20 vs avg</div>
          </div>
        </div>

        {/* Hoverable Bar Chart */}
        <div className="an-chart-label text-mono">Covers by hour (tonight)</div>
        <div className="an-chart-bars-container">
          
          <div className="an-chart-bars">
            {barData.map((data, i) => (
              <div 
                key={i} 
                className="an-bar-col"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className={`an-bar ${data.peak ? 'an-bar--peak' : ''}`}
                  style={{ height: `${data.covers}%` }}
                />
                <span className="text-mono an-bar-label">{data.hour}</span>
              </div>
            ))}
          </div>

          {/* Hover Tooltip display */}
          {hoveredBar !== null && (
            <div className="chart-tooltip text-mono animate-spring-in">
              <span className="tooltip-hour">{barData[hoveredBar].hour} Covers</span>
              <span className="tooltip-value">{barData[hoveredBar].covers} guests served</span>
            </div>
          )}
        </div>

        {/* Top selling indicator */}
        <div className="an-top-item">
          <span className="text-mono" style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>TOP SELLING TONIGHT</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', justifyItems: 'center', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600 }}>Smash Burger</span>
            <span className="text-mono" style={{ color: 'var(--aqua-vivid)', fontSize: '0.75rem', marginLeft: 'auto' }}>47 orders</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductStorySection() {
  return (
    <section className="story-section section" id="product-story" aria-labelledby="story-heading">
      <div className="container">

        {/* Section header */}
        <div className="story-header animate-fade-up">
          <p className="label" style={{ justifyContent: 'center' }}>Product Storytelling</p>
          <h2 className="heading-lg" id="story-heading">
            From chaos to <span className="accent-text">control</span>, in one shift.
          </h2>
          <p className="text-body-lg story-lead">
            Walk through an evening service and watch how Steward orchestrates every moment — from the first QR scan to the final analytics.
          </p>
        </div>

        {/* Chapter 1 */}
        <Chapter
          step="01 / Guest Orders"
          headline="A guest scans. An order <span class='accent-text'>appears instantly.</span>"
          body="No app download. No server relay. A guest scans the table QR code, selects customized modifiers, and submits. Their order is live in your system before they put their phone down."
          visual={<OrderTicket />}
        />

        {/* Chapter 2 */}
        <Chapter
          step="02 / Order Routing"
          headline="Steward <span class='accent-text'>routes every item</span> to the right station."
          body="The moment an order fires, Steward's routing engine splits it by station — Grill, Cold, Bar — while accounting for course pacing and cook times. Your kitchen stays coordinated without anyone shouting across the pass."
          visual={<RoutingDiagram />}
          reversed
          accentColor="var(--aqua-vivid)"
        />

        {/* Chapter 3 */}
        <Chapter
          step="03 / Live Insights"
          headline="See everything <span class='accent-text'>as it happens.</span>"
          body="Revenue, cover counts, and item velocity update the moment tickets close. You're not reading last night's spreadsheet — you're looking at a live feed. Make calls during the shift, when they still matter."
          visual={<AnalyticsDashboard />}
          accentColor="var(--accent)"
        />

      </div>
    </section>
  );
}

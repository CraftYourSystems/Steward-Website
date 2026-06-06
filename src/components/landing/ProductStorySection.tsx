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

/* ── Mini UI components rendered inside chapters ── */
function OrderTicket() {
  return (
    <div className="story-card">
      <div className="story-card-header">
        <div className="story-card-dots">
          <span /><span /><span />
        </div>
        <span className="text-mono story-card-title">QR Order · Table 7</span>
        <span className="live-badge">
          <span className="pulse-dot" style={{ width: 5, height: 5 }} />
          LIVE
        </span>
      </div>
      <div className="story-card-body">
        <div className="order-line">
          <span className="order-qty">1×</span>
          <div className="order-info">
            <span className="order-name">Classic Burger</span>
            <span className="order-mod text-mono">no sesame, extra pickles</span>
          </div>
          <span className="order-price">$18</span>
        </div>
        <div className="order-line">
          <span className="order-qty">2×</span>
          <div className="order-info">
            <span className="order-name">Caesar Salad</span>
          </div>
          <span className="order-price">$24</span>
        </div>
        <div className="order-line">
          <span className="order-qty">1×</span>
          <div className="order-info">
            <span className="order-name">Sparkling Water</span>
          </div>
          <span className="order-price">$5</span>
        </div>
        <div className="order-separator" />
        <div className="order-total">
          <span>Total</span>
          <span>$47.00</span>
        </div>
        <button className="story-submit-btn">
          Place Order
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <p className="story-card-note text-mono">No app. No account. Just scan and order.</p>
      </div>
    </div>
  );
}

function RoutingDiagram() {
  return (
    <div className="story-card">
      <div className="story-card-header">
        <div className="story-card-dots"><span /><span /><span /></div>
        <span className="text-mono story-card-title">Steward Routing Engine</span>
        <span className="text-mono" style={{ fontSize: '0.65rem', color: 'var(--green)' }}>12ms</span>
      </div>
      <div className="story-card-body" style={{ padding: '1.25rem' }}>
        {/* Order Source */}
        <div className="route-node route-node--source">
          <div className="route-icon">📱</div>
          <div>
            <div className="heading-sm">Table 7 Order</div>
            <div className="text-mono" style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>3 items · fired instantly</div>
          </div>
        </div>

        {/* Arrow down */}
        <div className="route-arrow">
          <div className="route-arrow-line" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--accent)"><path d="M6 0v10M1 5l5 5 5-5" stroke="var(--accent)" strokeWidth="1.5" fill="none"/></svg>
        </div>

        {/* Routing engine */}
        <div className="route-engine">
          <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent)' }}>Routing Intelligence</span>
          <div className="route-engine-tags">
            <span className="route-tag">Course pacing</span>
            <span className="route-tag">Cook-time sync</span>
            <span className="route-tag">Station load</span>
          </div>
        </div>

        {/* Arrow down */}
        <div className="route-arrow">
          <div className="route-arrow-line" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--accent)"><path d="M6 0v10M1 5l5 5 5-5" stroke="var(--accent)" strokeWidth="1.5" fill="none"/></svg>
        </div>

        {/* Stations */}
        <div className="route-stations">
          <div className="station-chip station-chip--grill">
            <span>🔥</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>Grill</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Burger</div>
            </div>
          </div>
          <div className="station-chip station-chip--cold">
            <span>🥗</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>Cold</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>2× Salad</div>
            </div>
          </div>
          <div className="station-chip station-chip--bar">
            <span>🫧</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>Bar</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Water</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  return (
    <div className="story-card">
      <div className="story-card-header">
        <div className="story-card-dots"><span /><span /><span /></div>
        <span className="text-mono story-card-title">Analytics · Tonight · Live</span>
      </div>
      <div className="story-card-body" style={{ padding: '1rem' }}>
        {/* Stat row */}
        <div className="an-stats">
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Revenue</div>
            <div className="an-stat-value">$4,820</div>
            <div className="an-stat-trend">↑ 14% vs last Fri</div>
          </div>
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Covers</div>
            <div className="an-stat-value">118</div>
            <div className="an-stat-trend">↑ 12 vs avg</div>
          </div>
          <div className="an-stat-card">
            <div className="text-mono an-stat-label">Avg Ticket</div>
            <div className="an-stat-value">$40.8</div>
            <div className="an-stat-trend">↑ $3.20 vs avg</div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="an-chart-label text-mono">Covers by hour (tonight)</div>
        <div className="an-chart-bars">
          {[22, 45, 68, 100, 92, 72, 38].map((h, i) => (
            <div key={i} className="an-bar-col">
              <div
                className={`an-bar ${h >= 90 ? 'an-bar--peak' : ''}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-mono an-bar-label">
                {['5p','6p','7p','8p','9p','10p','11p'][i]}
              </span>
            </div>
          ))}
        </div>

        {/* Top items */}
        <div className="an-top-item">
          <span className="text-mono" style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>TOP ITEM TONIGHT</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600 }}>Classic Burger</span>
            <span className="text-mono" style={{ color: 'var(--green)', fontSize: '0.75rem' }}>47 sold</span>
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
          body="No app download. No server relay. A guest scans the table QR code, browses a menu you control in real time, and submits. Their order is live in your system before they put their phone down."
          visual={<OrderTicket />}
        />

        {/* Chapter 2 */}
        <Chapter
          step="02 / Order Routing"
          headline="Steward <span class='accent-text'>routes every item</span> to the right station."
          body="The moment an order fires, Steward's routing engine splits it by station — Grill, Cold, Bar — while accounting for course pacing and cook times. Your kitchen stays coordinated without anyone shouting across the pass."
          visual={<RoutingDiagram />}
          reversed
          accentColor="var(--green)"
        />

        {/* Chapter 3 */}
        <Chapter
          step="03 / Live Insights"
          headline="See everything <span class='accent-text'>as it happens.</span>"
          body="Revenue, cover counts, and item velocity update the moment tickets close. You're not reading last night's spreadsheet — you're looking at a live feed. Make calls during the shift, when they still matter."
          visual={<AnalyticsDashboard />}
          accentColor="var(--amber)"
        />

      </div>
    </section>
  );
}

import { useState, useEffect, useReducer } from 'react';
import { useMagneticCard, useParticleBurst } from '../../hooks/usePhysics';
import './hero.css';

const WHATSAPP_URL = 'https://wa.me/919000730352?text=Hi%20I%20came%20across%20Steward%20and%20would%20like%20to%20book%20a%20demo%20for%20my%20restaurant.';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface SimulatorState {
  stage: number;
  cart: CartItem[];
  paymentMethod: 'cash' | 'upi' | 'card';
  isPlaying: boolean;
  orderNumber: number;
}

const initialItems = [
  { id: 'burger', name: 'Smash Burger', price: 14.00, description: 'Double grass-fed beef, secret sauce' },
  { id: 'fries', name: 'Truffle Fries', price: 6.50, description: 'Parmesan, rosemary, garlic aioli' },
  { id: 'soda', name: 'Citrus Soda', price: 3.50, description: 'Fresh squeezed lime & orange' }
];

const STAGES = [
  { id: 'scan', label: '1. Scan QR' },
  { id: 'menu', label: '2. Browse Menu' },
  { id: 'cart', label: '3. Cart Review' },
  { id: 'payment', label: '4. Checkout' },
  { id: 'placed', label: '5. Success' },
  { id: 'kds', label: '6. Kitchen KDS' },
  { id: 'completed', label: '7. Live Metrics' }
];

const initialState: SimulatorState = {
  stage: 0,
  cart: [
    { id: 'burger', name: 'Smash Burger', price: 14.00, qty: 1 },
    { id: 'fries', name: 'Truffle Fries', price: 6.50, qty: 1 }
  ],
  paymentMethod: 'upi',
  isPlaying: true,
  orderNumber: 104
};

function reducer(state: SimulatorState, action: any): SimulatorState {
  switch (action.type) {
    case 'SET_STAGE':
      return { 
        ...state, 
        stage: action.stage,
        isPlaying: false
      };
    case 'NEXT_STAGE':
      const nextStage = (state.stage + 1) % STAGES.length;
      return {
        ...state,
        stage: nextStage,
        // Reset cart when looping back to beginning
        ...(nextStage === 0 ? { 
          cart: [
            { id: 'burger', name: 'Smash Burger', price: 14.00, qty: 1 },
            { id: 'fries', name: 'Truffle Fries', price: 6.50, qty: 1 }
          ],
          paymentMethod: 'upi'
        } : {})
      };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.item.id);
      let newCart;
      if (existing) {
        newCart = state.cart.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        newCart = [...state.cart, { ...action.item, qty: 1 }];
      }
      return { ...state, cart: newCart, isPlaying: false };
    }
    case 'REMOVE_FROM_CART': {
      const existing = state.cart.find(i => i.id === action.id);
      if (!existing) return state;
      let newCart;
      if (existing.qty <= 1) {
        newCart = state.cart.filter(i => i.id !== action.id);
      } else {
        newCart = state.cart.map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i);
      }
      return { ...state, cart: newCart, isPlaying: false };
    }
    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.method, isPlaying: false };
    case 'INCREMENT_ORDER':
      return { ...state, orderNumber: state.orderNumber + 1 };
    case 'RESET_DEMO':
      return {
        ...initialState,
        orderNumber: state.orderNumber + 1,
        isPlaying: true
      };
    default:
      return state;
  }
}

export default function Hero() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cardRef = useMagneticCard<HTMLDivElement>();
  const { triggerBurst } = useParticleBurst();

  // Autoplay intervals per stage
  useEffect(() => {
    if (!state.isPlaying) return;

    let delay = 4000;
    if (state.stage === 0) delay = 3500; // scan
    if (state.stage === 4) delay = 2500; // placed
    if (state.stage === 5) delay = 7500; // kds flow
    if (state.stage === 6) delay = 5000; // completed metrics

    const timeout = setTimeout(() => {
      dispatch({ type: 'NEXT_STAGE' });
    }, delay);

    return () => clearTimeout(timeout);
  }, [state.stage, state.isPlaying]);

  // Stage details calculation
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Scanning animation stage trigger
  const [isScanning, setIsScanning] = useState(false);
  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      dispatch({ type: 'SET_STAGE', stage: 1 });
    }, 1200);
  };

  // Payment trigger particle effect
  const handlePlaceOrder = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    dispatch({ type: 'SET_STAGE', stage: 4 });
  };

  // KDS Lane animation state
  const [kdsLane, setKdsLane] = useState<'new' | 'preparing' | 'ready'>('new');
  const [kdsTime, setKdsTime] = useState(0);

  useEffect(() => {
    if (state.stage === 5) {
      setKdsLane('new');
      setKdsTime(0);

      const interval = setInterval(() => {
        setKdsTime(t => t + 1);
      }, 1000);

      const t1 = setTimeout(() => setKdsLane('preparing'), 2200);
      const t2 = setTimeout(() => setKdsLane('ready'), 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [state.stage]);

  // Analytics rolling counters
  const [valRevenue, setValRevenue] = useState(4820);
  const [valCovers, setValCovers] = useState(118);

  useEffect(() => {
    if (state.stage === 6) {
      const startRev = 4820;
      const endRev = Math.round(4820 + total);
      const startCov = 118;
      const endCov = 119;
      
      const duration = 1800;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setValRevenue(Math.round(startRev + (endRev - startRev) * eased));
        setValCovers(Math.round(startCov + (endCov - startCov) * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [state.stage, total]);

  return (
    <section className="hero-section" aria-label="Hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />
      <div className="hero-glow-3" aria-hidden="true" />
      <div className="container">

        {/* ── Content Block ── */}
        <div className="hero-content">
          <div className="animate-fade-up">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span className="hero-eyebrow-text">Steward Premium · Order Simulator</span>
            </div>
          </div>

          <h1 className="hero-title animate-fade-up delay-100">
            Mission Control<br />
            <span className="line-accent">for Restaurants</span><br />
            that mean it.
          </h1>

          <p className="text-body-lg hero-sub animate-fade-up delay-200">
            A beautiful, live coordination engine for guest ordering, kitchen tickets routing, and shift-time analytics. Explore the flow in the interactive panel.
          </p>

          <div className="hero-actions animate-fade-up delay-300">
            <a href={WHATSAPP_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Book a Demo
            </a>
            <a href="#product-story" className="btn btn-secondary">Walkthrough</a>
          </div>

          <div className="hero-proof animate-fade-up delay-400">
            <div className="proof-item">
              <span className="proof-value">≤ 12ms</span>
              <span className="proof-label">Order sync latency</span>
            </div>
            <div className="proof-divider" aria-hidden="true" />
            <div className="proof-item">
              <span className="proof-value">4 roles</span>
              <span className="proof-label">Purpose-built views</span>
            </div>
            <div className="proof-divider" aria-hidden="true" />
            <div className="proof-item">
              <span className="proof-value">∞ tables</span>
              <span className="proof-label">No seat limits</span>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE SIMULATOR PANEL ── */}
        <div className="hero-visual animate-fade-up delay-400">
          <div ref={cardRef} className="kds-window simulator-window">
            
            {/* Header controls & Auto-play toggle */}
            <div className="kds-titlebar simulator-header">
              <div className="kds-dots">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              </div>
              <span className="kds-window-label text-mono">Steward Flow Simulator</span>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                className={`simulator-play-toggle ${state.isPlaying ? 'playing' : 'paused'}`}
                title={state.isPlaying ? "Pause Simulation" : "Play Simulation"}
                aria-label={state.isPlaying ? "Pause" : "Play"}
              >
                {state.isPlaying ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="4" height="16"/><rect x="16" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                )}
                <span className="text-mono" style={{ fontSize: '0.6rem', marginLeft: '3px' }}>
                  {state.isPlaying ? 'AUTO' : 'MANUAL'}
                </span>
              </button>
            </div>

            {/* Stages horizontal indicator */}
            <div className="simulator-tabs">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => dispatch({ type: 'SET_STAGE', stage: idx })}
                  className={`simulator-tab-btn ${state.stage === idx ? 'active' : ''}`}
                >
                  <span className="tab-dot" />
                  <span className="tab-label">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Main Stage Viewport */}
            <div className="simulator-body">
              
              {/* STAGE 0: Scan QR */}
              {state.stage === 0 && (
                <div className="simulator-view scan-view fade-in-fast">
                  <div className="phone-frame">
                    <div className="phone-screen camera-screen">
                      <div className="camera-header">
                        <span className="text-mono">Table 7 Order</span>
                      </div>
                      <div className="scanner-target">
                        <div className="scanner-corner tl" />
                        <div className="scanner-corner tr" />
                        <div className="scanner-corner bl" />
                        <div className="scanner-corner br" />
                        
                        <div className="scanner-qr-wrapper">
                          <svg className="scanner-qr" viewBox="0 0 100 100" fill="currentColor">
                            <rect x="10" y="10" width="20" height="20" />
                            <rect x="15" y="15" width="10" height="10" fill="var(--surface)" />
                            <rect x="70" y="10" width="20" height="20" />
                            <rect x="75" y="15" width="10" height="10" fill="var(--surface)" />
                            <rect x="10" y="70" width="20" height="20" />
                            <rect x="15" y="75" width="10" height="10" fill="var(--surface)" />
                            <rect x="40" y="40" width="20" height="20" />
                            <rect x="40" y="10" width="10" height="20" />
                            <rect x="70" y="45" width="20" height="10" />
                            <rect x="45" y="75" width="15" height="15" />
                          </svg>
                        </div>

                        <div className={`scan-laser ${isScanning ? 'scanning' : ''}`} />
                      </div>
                      
                      <p className="scanner-instruction text-mono">
                        {isScanning ? 'Syncing with menu server...' : 'Scan QR code to view Table 7 menu'}
                      </p>
                      
                      <button 
                        onClick={handleScanClick}
                        className="btn btn-primary scan-btn text-mono"
                        disabled={isScanning}
                      >
                        {isScanning ? 'Syncing...' : 'Scan QR'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 1: Menu Browsing */}
              {state.stage === 1 && (
                <div className="simulator-view menu-view fade-in-fast">
                  <div className="phone-frame">
                    <div className="phone-screen menu-screen">
                      <div className="menu-header">
                        <div>
                          <div className="menu-restaurant text-mono">Bistro 7</div>
                          <div className="menu-table text-mono">Table 7 · Guest</div>
                        </div>
                        <div className="menu-cart-icon">
                          🛒
                          {state.cart.length > 0 && (
                            <span className="cart-badge-count">{state.cart.reduce((a, b) => a + b.qty, 0)}</span>
                          )}
                        </div>
                      </div>

                      <div className="menu-category-tabs">
                        <span className="category-tab active text-mono">Mains</span>
                        <span className="category-tab text-mono">Sides</span>
                        <span className="category-tab text-mono">Drinks</span>
                      </div>

                      <div className="menu-items-list">
                        {initialItems.map(item => {
                          const cartQty = state.cart.find(i => i.id === item.id)?.qty || 0;
                          return (
                            <div key={item.id} className="menu-item-row">
                              <div className="item-info">
                                <div className="item-name text-mono">{item.name}</div>
                                <div className="item-desc">{item.description}</div>
                                <div className="item-price text-mono">${item.price.toFixed(2)}</div>
                              </div>
                              <div className="item-actions">
                                {cartQty > 0 ? (
                                  <div className="qty-selector">
                                    <button 
                                      className="qty-btn"
                                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
                                    >-</button>
                                    <span className="qty-val text-mono">{cartQty}</span>
                                    <button 
                                      className="qty-btn"
                                      onClick={() => dispatch({ type: 'ADD_TO_CART', item })}
                                    >+</button>
                                  </div>
                                ) : (
                                  <button 
                                    className="add-to-cart-btn text-mono"
                                    onClick={() => dispatch({ type: 'ADD_TO_CART', item })}
                                  >
                                    Add +
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {state.cart.length > 0 && (
                        <div className="view-cart-bar animate-slide-up">
                          <span className="text-mono">Total: ${total.toFixed(2)}</span>
                          <button 
                            className="btn btn-primary view-cart-btn text-mono"
                            onClick={() => dispatch({ type: 'SET_STAGE', stage: 2 })}
                          >
                            Review Cart →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: Cart Review */}
              {state.stage === 2 && (
                <div className="simulator-view cart-view-stage fade-in-fast">
                  <div className="phone-frame">
                    <div className="phone-screen cart-screen">
                      <div className="phone-back-header">
                        <button className="back-btn text-mono" onClick={() => dispatch({ type: 'SET_STAGE', stage: 1 })}>← Menu</button>
                        <span className="text-mono">Review Cart</span>
                      </div>

                      <div className="cart-list">
                        {state.cart.length === 0 ? (
                          <div className="empty-cart text-mono">Cart is empty!</div>
                        ) : (
                          state.cart.map(item => (
                            <div key={item.id} className="cart-item-row text-mono">
                              <span className="item-qty-name">{item.qty}x {item.name}</span>
                              <span className="item-total-price">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="cart-totals text-mono">
                        <div className="total-line">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="total-line">
                          <span>Tax & Fees (10%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="total-line grand-total">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="order-type-picker">
                        <div className="picker-option active text-mono">Dine-In (Table 7)</div>
                      </div>

                      <button 
                        className="btn btn-primary checkout-btn text-mono"
                        onClick={() => dispatch({ type: 'SET_STAGE', stage: 3 })}
                        disabled={state.cart.length === 0}
                      >
                        Proceed to Pay →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Payment */}
              {state.stage === 3 && (
                <div className="simulator-view payment-view fade-in-fast">
                  <div className="phone-frame">
                    <div className="phone-screen payment-screen">
                      <div className="phone-back-header">
                        <button className="back-btn text-mono" onClick={() => dispatch({ type: 'SET_STAGE', stage: 2 })}>← Cart</button>
                        <span className="text-mono">Payment</span>
                      </div>

                      <p className="pay-amount-label text-mono">Amount to pay</p>
                      <h2 className="pay-amount text-mono">${total.toFixed(2)}</h2>

                      <div className="payment-options">
                        <div 
                          className={`payment-option-card ${state.paymentMethod === 'upi' ? 'selected' : ''}`}
                          onClick={() => dispatch({ type: 'SET_PAYMENT', method: 'upi' })}
                        >
                          <div className="option-icon">📱</div>
                          <div className="option-details">
                            <div className="option-title text-mono">Scan & Pay (UPI)</div>
                            <div className="option-desc">Display dynamic QR code</div>
                          </div>
                        </div>

                        <div 
                          className={`payment-option-card ${state.paymentMethod === 'card' ? 'selected' : ''}`}
                          onClick={() => dispatch({ type: 'SET_PAYMENT', method: 'card' })}
                        >
                          <div className="option-icon">💳</div>
                          <div className="option-details">
                            <div className="option-title text-mono">Credit/Debit Card</div>
                            <div className="option-desc">Secure checkout via Razorpay</div>
                          </div>
                        </div>

                        <div 
                          className={`payment-option-card ${state.paymentMethod === 'cash' ? 'selected' : ''}`}
                          onClick={() => dispatch({ type: 'SET_PAYMENT', method: 'cash' })}
                        >
                          <div className="option-icon">💵</div>
                          <div className="option-details">
                            <div className="option-title text-mono">Pay at Counter</div>
                            <div className="option-desc">Cash payment after eating</div>
                          </div>
                        </div>
                      </div>

                      <button 
                        className="btn btn-primary place-order-btn text-mono"
                        onClick={handlePlaceOrder}
                      >
                        ⚡ Place Order
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: Placed Success */}
              {state.stage === 4 && (
                <div className="simulator-view placed-view fade-in-fast">
                  <div className="phone-frame">
                    <div className="phone-screen success-screen">
                      <div className="success-icon-wrap animate-spring-in">
                        <svg className="success-checkmark" viewBox="0 0 52 52">
                          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                          <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                      </div>

                      <h3 className="success-title text-mono">Order Received</h3>
                      <p className="success-order-num text-mono">Order #{state.orderNumber}</p>
                      
                      <div className="success-details text-mono">
                        <div>Table 7 · Dine-In</div>
                        <div className="success-items-preview">
                          {state.cart.map(i => `${i.qty}x ${i.name}`).join(', ')}
                        </div>
                      </div>

                      <p className="success-routing-note text-mono">
                        Sending order ticket to Kitchen Display System (KDS)...
                      </p>

                      <div className="pulse-loader" />
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: Kitchen KDS Kanban */}
              {state.stage === 5 && (
                <div className="simulator-view kds-view-stage fade-in-fast">
                  <div className="kds-station-header">
                    <span className="text-mono" style={{ color: 'var(--text-dim)' }}>Grill & Mains Station</span>
                    <span className="text-mono text-mono-blink" style={{ color: 'var(--aqua-vivid)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="pulse-dot" style={{ width: 5, height: 5 }} />
                      LIVE ORDERS
                    </span>
                  </div>

                  <div className="kds-lanes-container">
                    
                    {/* NEW LANE */}
                    <div className="kds-lane-col">
                      <div className="lane-header text-mono">NEW ({kdsLane === 'new' ? '1' : '0'})</div>
                      <div className="lane-content">
                        {kdsLane === 'new' && (
                          <div className="kds-ticket-card new animate-spring-in">
                            <div className="ticket-header text-mono">
                              <span>T-7 (#{state.orderNumber})</span>
                              <span className="ticket-timer-val">
                                00:{kdsTime < 10 ? `0${kdsTime}` : kdsTime}
                              </span>
                            </div>
                            <div className="ticket-items">
                              {state.cart.map(item => (
                                <div key={item.id}>{item.qty}x {item.name}</div>
                              ))}
                            </div>
                            <div className="ticket-actions">
                              <span className="kds-badge kds-badge--urgent">Accepting...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PREPARING LANE */}
                    <div className="kds-lane-col">
                      <div className="lane-header text-mono">PREPARING ({kdsLane === 'preparing' ? '1' : '0'})</div>
                      <div className="lane-content">
                        {kdsLane === 'preparing' && (
                          <div className="kds-ticket-card cooking animate-spring-in">
                            <div className="ticket-header text-mono">
                              <span>T-7 (#{state.orderNumber})</span>
                              <span className="ticket-timer-val text-accent">
                                00:{kdsTime < 10 ? `0${kdsTime}` : kdsTime}
                              </span>
                            </div>
                            <div className="ticket-items">
                              {state.cart.map(item => (
                                <div key={item.id}>{item.qty}x {item.name}</div>
                              ))}
                            </div>
                            <div className="ticket-actions">
                              <span className="kds-badge kds-badge--cooking">Grill Active</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* READY LANE */}
                    <div className="kds-lane-col">
                      <div className="lane-header text-mono">READY TO PLATE ({kdsLane === 'ready' ? '1' : '0'})</div>
                      <div className="lane-content">
                        {kdsLane === 'ready' && (
                          <div className="kds-ticket-card ready animate-spring-in">
                            <div className="ticket-header text-mono">
                              <span>T-7 (#{state.orderNumber})</span>
                              <span className="ticket-timer-val text-aqua">
                                00:{kdsTime < 10 ? `0${kdsTime}` : kdsTime}
                              </span>
                            </div>
                            <div className="ticket-items">
                              {state.cart.map(item => (
                                <div key={item.id}>{item.qty}x {item.name}</div>
                              ))}
                            </div>
                            <div className="ticket-actions">
                              <span className="kds-badge kds-badge--ready">Ready ✓</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STAGE 6: Analytics Dashboard */}
              {state.stage === 6 && (
                <div className="simulator-view completed-view-stage fade-in-fast">
                  <div className="analytics-header">
                    <span className="text-mono">Bistro 7 · Real-Time Metrics</span>
                    <span className="analytics-pill text-mono">LIVE SHIFT</span>
                  </div>

                  <div className="analytics-grid">
                    <div className="analytics-card">
                      <div className="analytics-card-label text-mono">Shift Revenue</div>
                      <div className="analytics-card-val text-mono text-gradient-glow">${valRevenue.toFixed(2)}</div>
                      <div className="analytics-card-sub text-mono text-aqua">+{total.toFixed(2)} (Table 7 order)</div>
                    </div>

                    <div className="analytics-card">
                      <div className="analytics-card-label text-mono">Covers (Guests)</div>
                      <div className="analytics-card-val text-mono">{valCovers}</div>
                      <div className="analytics-card-sub text-mono text-aqua">+1 cover added</div>
                    </div>

                    <div className="analytics-card">
                      <div className="analytics-card-label text-mono">Avg Ticket Prep</div>
                      <div className="analytics-card-val text-mono">7.8m</div>
                      <div className="analytics-card-sub text-mono text-accent">-0.4m below threshold</div>
                    </div>
                  </div>

                  {/* Staggered chart bars */}
                  <div className="analytics-chart-wrap">
                    <div className="chart-title text-mono">Orders by Hour (12:00 - 18:00)</div>
                    <div className="chart-bars">
                      <div className="chart-bar-col">
                        <div className="chart-bar" style={{ height: '40%' }} />
                        <span className="chart-bar-label text-mono">12p</span>
                      </div>
                      <div className="chart-bar-col">
                        <div className="chart-bar" style={{ height: '75%' }} />
                        <span className="chart-bar-label text-mono">1p</span>
                      </div>
                      <div className="chart-bar-col">
                        <div className="chart-bar" style={{ height: '55%' }} />
                        <span className="chart-bar-label text-mono">2p</span>
                      </div>
                      <div className="chart-bar-col">
                        <div className="chart-bar" style={{ height: '35%' }} />
                        <span className="chart-bar-label text-mono">3p</span>
                      </div>
                      <div className="chart-bar-col">
                        <div className="chart-bar" style={{ height: '90%' }} />
                        <span className="chart-bar-label text-mono">4p</span>
                      </div>
                      <div className="chart-bar-col">
                        <div className="chart-bar highlight animate-grow-height" style={{ height: '100%' }} />
                        <span className="chart-bar-label text-mono">5p</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                    <button 
                      onClick={() => dispatch({ type: 'RESET_DEMO' })}
                      className="btn btn-secondary reset-demo-btn text-mono"
                    >
                      🔄 Restart Flow Simulator
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

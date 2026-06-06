import { useState } from 'react';
import './landing.css';

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState('kds');

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="label" style={{ justifyContent: 'center' }}>One Platform</p>
          <h2 className="heading-lg">
            Purpose-built interfaces<br/>for <span className="accent-text">every role</span>
          </h2>
        </div>

        <div className="showcase-tabs" style={{ justifyContent: 'center' }}>
          <button className={`tab-btn ${activeTab === 'kds' ? 'active' : ''}`} onClick={() => setActiveTab('kds')}>Kitchen Staff</button>
          <button className={`tab-btn ${activeTab === 'manager' ? 'active' : ''}`} onClick={() => setActiveTab('manager')}>Floor Manager</button>
          <button className={`tab-btn ${activeTab === 'guest' ? 'active' : ''}`} onClick={() => setActiveTab('guest')}>Guest Ordering</button>
          <button className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
        </div>

        <div className="showcase-visual animate-fade-up">
          {activeTab === 'kds' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="text-mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>[ KDS Interface Render ]</div>
              <p className="text-body">High-contrast, touch-optimized ticket routing interface.</p>
            </div>
          )}
          {activeTab === 'manager' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="text-mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>[ Manager Floor Plan Render ]</div>
              <p className="text-body">Live table statuses, pacing alerts, and staff assignments.</p>
            </div>
          )}
          {activeTab === 'guest' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="text-mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>[ Mobile Web Menu Render ]</div>
              <p className="text-body">Frictionless, app-free QR ordering directly from the table.</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="text-mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>[ Analytics Dashboard Render ]</div>
              <p className="text-body">Live revenue, cover velocity, and item performance data.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

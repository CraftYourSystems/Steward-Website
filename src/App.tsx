import { useEffect, useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/landing/Hero';
import LogoStrip from './components/landing/LogoStrip';
import ProductStorySection from './components/landing/ProductStorySection';
import FeaturesSection from './components/landing/FeaturesSection';
import EarlyPilot from './components/landing/EarlyPilot';
import HowItWorks from './components/landing/HowItWorks';
import BuiltByCYS from './components/landing/Founders';
import FAQ from './components/faq/FAQ';
import './index.css';

type Theme = 'dark' | 'light';

function App() {
  useScrollReveal();

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      // Persist preference across sessions
      const saved = localStorage.getItem('steward-theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
      // Respect system preference on first visit
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch (e) {
      // Safe fallback if localStorage or matchMedia is blocked/unavailable
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('steward-theme', theme);
    } catch (e) {
      // Ignore if localStorage is blocked
    }
  }, [theme]);

  const toggleTheme = () => {
    // Brief transition class so all colours animate smoothly
    document.documentElement.classList.add('theme-transitioning');
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  };

  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <LogoStrip />

        {/* ── Signature narrative: walk through a full service ── */}
        <ProductStorySection />

        <div className="section-divider" />
        <FeaturesSection />

        <div className="section-divider" />
        <EarlyPilot />

        <div className="section-divider" />
        <HowItWorks />

        <div className="section-divider" />
        <BuiltByCYS />

        <div className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;

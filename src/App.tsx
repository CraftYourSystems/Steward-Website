import { useScrollReveal } from './hooks/useScrollReveal';
import { useDinnerMode } from './hooks/useDinnerMode';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/landing/Hero';
import LogoStrip from './components/landing/LogoStrip';
import ProductStorySection from './components/landing/ProductStorySection';
import FeaturesSection from './components/landing/FeaturesSection';
import EarlyPilot from './components/landing/EarlyPilot';
import HowItWorks from './components/landing/HowItWorks';
import BuiltByCYS from './components/landing/Founders';
import Testimonials from './components/testimonials/Testimonials';
import CTABanner from './components/landing/CTABanner';
import FAQ from './components/faq/FAQ';
import './index.css';

function App() {
  useScrollReveal();
  const { isDinner, toggleDinner } = useDinnerMode();

  return (
    <div className="app-container">
      {/* ── Ambient floating blobs ── */}
      <div className="ambient-blob ambient-blob--amber"  aria-hidden="true" />
      <div className="ambient-blob ambient-blob--teal"   aria-hidden="true" />
      <div className="ambient-blob ambient-blob--purple" aria-hidden="true" />

      <Navbar isDinner={isDinner} toggleDinner={toggleDinner} />
      <main>
        <Hero />
        <LogoStrip />

        {/* ── Signature narrative: walk through a full service ── */}
        <ProductStorySection />

        <div className="section-divider" />
        <FeaturesSection />

        <div className="section-divider" />
        <HowItWorks />

        <div className="section-divider" />
        <EarlyPilot />

        <div className="section-divider" />
        <Testimonials />

        <div className="section-divider" />
        <BuiltByCYS />

        <div className="section-divider" />
        <FAQ />

        {/* ── CTA Banner before footer ── */}
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;


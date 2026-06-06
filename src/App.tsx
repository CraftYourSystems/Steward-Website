import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/landing/Hero';
import LogoStrip from './components/landing/LogoStrip';
import ProductStorySection from './components/landing/ProductStorySection';
import FeaturesSection from './components/landing/FeaturesSection';
import Testimonials from './components/testimonials/Testimonials';
import HowItWorks from './components/landing/HowItWorks';
import Founders from './components/landing/Founders';
import FAQ from './components/faq/FAQ';
import './index.css';

function App() {
  useScrollReveal();

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />

        {/* ── Signature narrative: walk through a full service ── */}
        <ProductStorySection />

        <div className="section-divider" />
        <FeaturesSection />

        <div className="section-divider" />
        <Testimonials />

        <div className="section-divider" />
        <HowItWorks />

        <div className="section-divider" />
        <Founders />

        <div className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;

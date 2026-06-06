import './landing.css';

export default function LogoStrip() {
  const logos = ['Gusto', 'Osteria', 'Lumina', 'Ember', 'Mercato'];
  return (
    <div className="logo-strip">
      <div className="container">
        <p className="label">Trusted by forward-thinking operators</p>
        <div className="logo-grid">
          {logos.map((name) => (
            <div key={name} className="logo-item">{name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

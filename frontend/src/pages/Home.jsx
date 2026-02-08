import { Link } from 'react-router-dom';
import { templates } from '../data/templates';
import FloatingHearts from '../components/FloatingHearts';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <FloatingHearts />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Créez votre page d'amour
          </h1>
          <p className="hero-subtitle">
            Surprenez votre bien-aimé(e) avec une page personnalisée pour la Saint-Valentin.
            Choisissez un template, ajoutez vos photos et textes, et partagez le lien magique.
          </p>
          <div className="hero-actions">
            <Link to="/templates" className="btn btn-primary btn-lg">
              Commencer maintenant
            </Link>
            <a href="#how-it-works" className="btn btn-secondary btn-lg">
              Comment ça marche ?
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Personnalisable</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">1 min</span>
              <span className="stat-label">Pour créer</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-heart-big">💕</div>
          <div className="hero-card-preview">
            <div className="preview-inner">
              <span className="preview-emoji">💌</span>
              <p>Mon amour, chaque jour avec toi est un cadeau...</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section how-it-works">
        <h2 className="section-title">Comment ça marche ?</h2>
        <p className="section-subtitle">3 étapes simples pour créer votre déclaration d'amour</p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">🎨</div>
            <h3>Choisissez un template</h3>
            <p>Parcourez nos designs romantiques et sélectionnez celui qui vous correspond.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">✍️</div>
            <h3>Personnalisez</h3>
            <p>Ajoutez vos photos de couple, vos textes d'amour et vos souvenirs.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">💌</div>
            <h3>Partagez</h3>
            <p>Générez un lien unique et envoyez-le à votre bien-aimé(e) !</p>
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="section templates-preview">
        <h2 className="section-title">Nos Templates</h2>
        <p className="section-subtitle">Des designs créés avec amour pour votre Saint-Valentin</p>

        <div className="templates-grid">
          {templates.map(template => (
            <Link to={`/editor/${template.id}`} key={template.id} className="template-card card">
              <div
                className="template-card-preview"
                style={{ background: template.bgGradient }}
              >
                <div className="template-card-overlay">
                  <span className="template-card-cta">Utiliser ce template</span>
                </div>
              </div>
              <div className="template-card-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className="template-card-meta">
                  <span>{template.slots.photos.length} photos</span>
                  <span>{template.slots.texts.length} textes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/templates" className="btn btn-primary">
            Voir tous les templates
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="section products-section">
        <h2 className="section-title">Offrez un cadeau physique</h2>
        <p className="section-subtitle">Transformez votre page d'amour en un cadeau tangible</p>

        <div className="products-grid">
          <div className="product-card card">
            <div className="product-icon">📖</div>
            <h3>Livre d'Amour</h3>
            <p>Un magnifique livre relié avec votre page imprimée.</p>
            <span className="product-price">29,99 EUR</span>
          </div>
          <div className="product-card card">
            <div className="product-icon">📅</div>
            <h3>Calendrier</h3>
            <p>Un calendrier personnalisé avec votre design.</p>
            <span className="product-price">19,99 EUR</span>
          </div>
          <div className="product-card card">
            <div className="product-icon">🖼️</div>
            <h3>Cadre Photo</h3>
            <p>Un cadre élégant prêt à accrocher.</p>
            <span className="product-price">24,99 EUR</span>
          </div>
          <div className="product-card card">
            <div className="product-icon">🎨</div>
            <h3>Poster</h3>
            <p>Un poster grand format de haute qualité.</p>
            <span className="product-price">14,99 EUR</span>
          </div>
        </div>
      </section>
    </div>
  );
}

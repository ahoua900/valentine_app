import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { templates, products } from '../data/templates';
import { useProject } from '../context/ProjectContext';
import './Order.css';

export default function Order() {
  const { projectId } = useParams();
  const { state, dispatch } = useProject();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'France',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    dispatch({ type: 'LOAD_PROJECT', payload: { projectId } });
  }, [projectId]);

  const project = state.projects.find(p => p.id === projectId);
  const template = project ? templates.find(t => t.id === project.templateId) : null;

  if (!project || !template) {
    return (
      <div className="section" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💔</div>
        <h2>Projet introuvable</h2>
        <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
          Créez d'abord votre page d'amour avant de commander.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Commencer
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setOrderForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  if (orderSubmitted) {
    return (
      <div className="order-page">
        <div className="order-success">
          <div className="success-icon">🎉</div>
          <h2>Commande envoyée !</h2>
          <p>
            Merci pour votre commande ! Vous recevrez un email de confirmation avec les détails
            de suivi de votre {selectedProduct?.name}.
          </p>
          <div className="success-actions">
            <Link to={`/preview/${project.id}`} className="btn btn-secondary">
              Voir ma page d'amour
            </Link>
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="section">
        <h1 className="section-title">Commander un cadeau</h1>
        <p className="section-subtitle">
          Transformez votre page "{template.name}" en un cadeau physique
        </p>

        {/* Product Selection */}
        <div className="products-selection">
          {products.map(product => (
            <div
              key={product.id}
              className={`product-select-card card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="product-select-icon">{product.icon}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-select-price">{product.price.toFixed(2)} EUR</div>
              {selectedProduct?.id === product.id && (
                <div className="product-check">&#10003;</div>
              )}
            </div>
          ))}
        </div>

        {/* Order Form */}
        {selectedProduct && (
          <div className="order-form-section">
            <div className="order-summary card">
              <h3>Récapitulatif</h3>
              <div className="summary-row">
                <span>{selectedProduct.icon} {selectedProduct.name}</span>
                <span>{selectedProduct.price.toFixed(2)} EUR</span>
              </div>
              <div className="summary-row">
                <span>Template</span>
                <span>{template.name}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{selectedProduct.price.toFixed(2)} EUR</span>
              </div>
            </div>

            <form className="order-form card" onSubmit={handleSubmit}>
              <h3>Informations de livraison</h3>

              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={orderForm.name}
                  onChange={handleInputChange}
                  placeholder="Marie Dupont"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={handleInputChange}
                  placeholder="marie@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  placeholder="123 Rue de l'Amour"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={orderForm.city}
                    onChange={handleInputChange}
                    placeholder="Paris"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input
                    type="text"
                    name="zip"
                    value={orderForm.zip}
                    onChange={handleInputChange}
                    placeholder="75001"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pays</label>
                <select name="country" value={orderForm.country} onChange={handleInputChange}>
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Canada">Canada</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                Commander - {selectedProduct.price.toFixed(2)} EUR
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

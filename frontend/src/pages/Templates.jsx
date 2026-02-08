import { useState } from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../data/templates';
import './Templates.css';

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'romantique', label: 'Romantique' },
  { id: 'moderne', label: 'Moderne' },
  { id: 'poetique', label: 'Poétique' },
  { id: 'histoire', label: 'Histoire' },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="templates-page">
      <div className="section">
        <h1 className="section-title">Choisissez votre template</h1>
        <p className="section-subtitle">
          Sélectionnez le design qui correspond le mieux à votre histoire d'amour
        </p>

        {/* Category filters */}
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="templates-full-grid">
          {filtered.map(template => (
            <Link to={`/editor/${template.id}`} key={template.id} className="template-full-card card">
              <div
                className="template-full-preview"
                style={{ background: template.bgGradient }}
              >
                <div className="template-full-overlay">
                  <span className="template-full-cta btn btn-primary btn-sm">
                    Utiliser ce template
                  </span>
                </div>
                <div className="template-preview-content">
                  <span className="template-preview-emoji">
                    {template.category === 'romantique' ? '🌹' :
                     template.category === 'moderne' ? '✨' :
                     template.category === 'poetique' ? '🦋' : '📖'}
                  </span>
                </div>
              </div>
              <div className="template-full-info">
                <div className="template-full-header">
                  <h3>{template.name}</h3>
                  <span className="template-category-badge">{template.category}</span>
                </div>
                <p>{template.description}</p>
                <div className="template-full-meta">
                  <span>📷 {template.slots.photos.length} photos</span>
                  <span>✍️ {template.slots.texts.length} textes</span>
                  <span>📐 {template.layout}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
            <p>Aucun template dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { templates } from '../data/templates';
import { useProject } from '../context/ProjectContext';
import FloatingHearts from '../components/FloatingHearts';
import './Preview.css';

export default function Preview() {
  const { projectId } = useParams();
  const { state, dispatch } = useProject();

  useEffect(() => {
    dispatch({ type: 'LOAD_PROJECT', payload: { projectId } });
  }, [projectId]);

  const project = state.projects.find(p => p.id === projectId);
  const template = project ? templates.find(t => t.id === project.templateId) : null;

  if (!project || !template) {
    return (
      <div className="preview-page">
        <div className="preview-not-found">
          <div className="not-found-emoji">💔</div>
          <h2>Page introuvable</h2>
          <p>Cette page d'amour n'existe pas ou a été supprimée.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Créer votre propre page
          </Link>
        </div>
      </div>
    );
  }

  const texts = project.texts || {};
  const photos = project.photos || {};

  return (
    <div className="preview-page">
      <FloatingHearts />

      <div className="preview-container" style={{ background: template.bgGradient }}>

        {template.layout === 'classic' && (
          <div className="pv-classic">
            <h1 className="pv-title">{texts.title || 'Mon amour...'}</h1>
            <div className="pv-main-photo pv-shape-heart">
              {photos['main-photo'] ? (
                <img src={photos['main-photo']} alt="" />
              ) : (
                <div className="pv-placeholder">💕</div>
              )}
            </div>
            <p className="pv-message">{texts.message || ''}</p>
            <div className="pv-row">
              {['photo-1', 'photo-2'].map(id => (
                <div key={id} className="pv-small-photo">
                  {photos[id] ? <img src={photos[id]} alt="" /> : <div className="pv-placeholder-sm">📷</div>}
                </div>
              ))}
            </div>
            <p className="pv-signature">{texts.signature || ''}</p>
          </div>
        )}

        {template.layout === 'modern' && (
          <div className="pv-modern">
            <div className="pv-hero-img">
              {photos['hero-photo'] ? <img src={photos['hero-photo']} alt="" /> : <div className="pv-placeholder-wide">📷</div>}
            </div>
            <h1 className="pv-title-modern">{texts.title || 'Toi & Moi'}</h1>
            <p className="pv-subtitle-modern">{texts.subtitle || ''}</p>
            <div className="pv-circles">
              {['photo-left', 'photo-right'].map(id => (
                <div key={id} className="pv-circle-photo">
                  {photos[id] ? <img src={photos[id]} alt="" /> : <div className="pv-placeholder-circle">💕</div>}
                </div>
              ))}
            </div>
            <p className="pv-message-modern">{texts.message || ''}</p>
            <p className="pv-date-modern">{texts.date || ''}</p>
          </div>
        )}

        {template.layout === 'poetic' && (
          <div className="pv-poetic">
            <h1 className="pv-title-poetic">{texts['poem-title'] || 'Ode à mon amour'}</h1>
            <div className="pv-oval-photo">
              {photos['couple-photo'] ? <img src={photos['couple-photo']} alt="" /> : <div className="pv-placeholder-oval">🌹</div>}
            </div>
            <p className="pv-poem">{texts.poem || ''}</p>
            <div className="pv-memories">
              {['memory-1', 'memory-2', 'memory-3'].map(id => (
                <div key={id} className="pv-memory-photo">
                  {photos[id] ? <img src={photos[id]} alt="" /> : <div className="pv-placeholder-sm">🌸</div>}
                </div>
              ))}
            </div>
            <p className="pv-dedication">{texts.dedication || ''}</p>
          </div>
        )}

        {template.layout === 'timeline' && (
          <div className="pv-timeline">
            <h1 className="pv-title-tl">{texts['couple-names'] || 'Notre Histoire'}</h1>
            <div className="pv-tl-items">
              {[
                { photoId: 'first-meet', textId: 'story-1', label: 'Notre rencontre' },
                { photoId: 'first-date', textId: 'story-2', label: 'Premier rendez-vous' },
                { photoId: 'special-moment', textId: 'story-3', label: 'Moment spécial' },
                { photoId: 'today', textId: 'story-4', label: 'Aujourd\'hui' },
              ].map((step, idx) => (
                <div key={step.photoId} className="pv-tl-item">
                  <div className="pv-tl-dot">{idx + 1}</div>
                  <div className="pv-tl-card">
                    <div className="pv-tl-photo">
                      {photos[step.photoId] ? <img src={photos[step.photoId]} alt="" /> : <div className="pv-placeholder-sm">📷</div>}
                    </div>
                    <h3>{step.label}</h3>
                    <p>{texts[step.textId] || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="preview-actions">
        <Link to={`/editor/${project.templateId}`} className="btn btn-secondary">
          Modifier
        </Link>
        <Link to={`/order/${project.id}`} className="btn btn-gold">
          Commander un cadeau
        </Link>
        <Link to="/" className="btn btn-primary">
          Créer votre page
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { templates } from '../data/templates';
import { useProject } from '../context/ProjectContext';
import PhotoUpload from '../components/PhotoUpload';
import './Editor.css';

export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useProject();
  const [activeTab, setActiveTab] = useState('photos');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = templates.find(t => t.id === templateId);

  useEffect(() => {
    if (!template) return;

    if (!state.currentProject || state.currentProject.templateId !== templateId) {
      dispatch({ type: 'CREATE_PROJECT', payload: { templateId } });
    }
  }, [templateId]);

  if (!template) {
    return (
      <div className="section" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>Template introuvable</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-light)' }}>
          Ce template n'existe pas.
        </p>
        <Link to="/templates" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Voir les templates
        </Link>
      </div>
    );
  }

  const project = state.currentProject;
  if (!project) return null;

  const handlePhotoChange = (slotId, photoData) => {
    dispatch({
      type: 'UPDATE_PHOTO',
      payload: { projectId: project.id, slotId, photoData },
    });
  };

  const handleTextChange = (slotId, text) => {
    dispatch({
      type: 'UPDATE_TEXT',
      payload: { projectId: project.id, slotId, text },
    });
  };

  const handlePublish = () => {
    dispatch({ type: 'PUBLISH_PROJECT', payload: { projectId: project.id } });
    setShareModalOpen(true);
  };

  const shareLink = project.shareLink || `${window.location.origin}/love/${project.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const filledPhotos = Object.values(project.photos).filter(Boolean).length;
  const filledTexts = Object.values(project.texts).filter(Boolean).length;
  const totalSlots = template.slots.photos.length + template.slots.texts.length;
  const filledSlots = filledPhotos + filledTexts;
  const progress = Math.round((filledSlots / totalSlots) * 100);

  return (
    <div className="editor">
      {/* Header */}
      <div className="editor-header">
        <div className="editor-header-inner">
          <div>
            <h1 className="editor-title">{template.name}</h1>
            <p className="editor-subtitle">{template.description}</p>
          </div>
          <div className="editor-header-actions">
            <button onClick={() => navigate(`/preview/${project.id}`)} className="btn btn-secondary btn-sm">
              Aperçu
            </button>
            <button onClick={handlePublish} className="btn btn-primary btn-sm">
              Publier & Partager
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="editor-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{progress}% complété ({filledSlots}/{totalSlots})</span>
        </div>
      </div>

      <div className="editor-layout">
        {/* Sidebar: Edit panel */}
        <div className="editor-sidebar">
          <div className="editor-tabs">
            <button
              className={`editor-tab ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              📷 Photos ({filledPhotos}/{template.slots.photos.length})
            </button>
            <button
              className={`editor-tab ${activeTab === 'texts' ? 'active' : ''}`}
              onClick={() => setActiveTab('texts')}
            >
              ✍️ Textes ({filledTexts}/{template.slots.texts.length})
            </button>
          </div>

          <div className="editor-panel">
            {activeTab === 'photos' && (
              <div className="panel-content">
                {template.slots.photos.map(slot => (
                  <PhotoUpload
                    key={slot.id}
                    slot={slot}
                    value={project.photos[slot.id]}
                    onChange={handlePhotoChange}
                  />
                ))}
              </div>
            )}

            {activeTab === 'texts' && (
              <div className="panel-content">
                {template.slots.texts.map(slot => (
                  <div key={slot.id} className="text-slot">
                    <label className="text-slot-label">{slot.label}</label>
                    {slot.maxLength > 200 ? (
                      <textarea
                        placeholder={slot.placeholder}
                        value={project.texts[slot.id] || ''}
                        onChange={(e) => handleTextChange(slot.id, e.target.value)}
                        maxLength={slot.maxLength}
                        rows={4}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={slot.placeholder}
                        value={project.texts[slot.id] || ''}
                        onChange={(e) => handleTextChange(slot.id, e.target.value)}
                        maxLength={slot.maxLength}
                      />
                    )}
                    <span className="text-slot-count">
                      {(project.texts[slot.id] || '').length}/{slot.maxLength}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview panel */}
        <div className="editor-preview">
          <div className="preview-frame" style={{ background: template.bgGradient }}>
            <TemplatePreview template={template} project={project} />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="modal-overlay" onClick={() => setShareModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShareModalOpen(false)}>
              &times;
            </button>
            <div className="modal-icon">🎉</div>
            <h2>Votre page est prête !</h2>
            <p>Partagez ce lien avec votre bien-aimé(e)</p>

            <div className="share-link-box">
              <input type="text" readOnly value={shareLink} />
              <button onClick={handleCopyLink} className="btn btn-primary btn-sm">
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>

            <div className="share-actions">
              <button
                onClick={() => navigate(`/preview/${project.id}`)}
                className="btn btn-secondary"
              >
                Voir l'aperçu
              </button>
              <button
                onClick={() => navigate(`/order/${project.id}`)}
                className="btn btn-gold"
              >
                Commander un cadeau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplatePreview({ template, project }) {
  const texts = project.texts || {};
  const photos = project.photos || {};

  if (template.layout === 'classic') {
    return (
      <div className="tpl-classic">
        <h2 className="tpl-title">{texts.title || 'Mon amour...'}</h2>
        <div className="tpl-main-photo">
          {photos['main-photo'] ? (
            <img src={photos['main-photo']} alt="Photo principale" />
          ) : (
            <div className="tpl-placeholder">💕</div>
          )}
        </div>
        <p className="tpl-message">{texts.message || 'Votre message d\'amour apparaîtra ici...'}</p>
        <div className="tpl-photos-row">
          {['photo-1', 'photo-2'].map(id => (
            <div key={id} className="tpl-small-photo">
              {photos[id] ? (
                <img src={photos[id]} alt="" />
              ) : (
                <div className="tpl-placeholder-sm">📷</div>
              )}
            </div>
          ))}
        </div>
        <p className="tpl-signature">{texts.signature || 'Avec tout mon amour...'}</p>
      </div>
    );
  }

  if (template.layout === 'modern') {
    return (
      <div className="tpl-modern">
        <div className="tpl-hero-photo">
          {photos['hero-photo'] ? (
            <img src={photos['hero-photo']} alt="" />
          ) : (
            <div className="tpl-placeholder-wide">📷</div>
          )}
        </div>
        <h2 className="tpl-title-modern">{texts.title || 'Toi & Moi'}</h2>
        <p className="tpl-subtitle-modern">{texts.subtitle || 'Notre histoire d\'amour'}</p>
        <div className="tpl-circles-row">
          {['photo-left', 'photo-right'].map(id => (
            <div key={id} className="tpl-circle-photo">
              {photos[id] ? (
                <img src={photos[id]} alt="" />
              ) : (
                <div className="tpl-placeholder-circle">💕</div>
              )}
            </div>
          ))}
        </div>
        <p className="tpl-message-modern">{texts.message || 'Votre message ici...'}</p>
        <p className="tpl-date-modern">{texts.date || '14 Février 2026'}</p>
      </div>
    );
  }

  if (template.layout === 'poetic') {
    return (
      <div className="tpl-poetic">
        <h2 className="tpl-title-poetic">{texts['poem-title'] || 'Ode à mon amour'}</h2>
        <div className="tpl-oval-photo">
          {photos['couple-photo'] ? (
            <img src={photos['couple-photo']} alt="" />
          ) : (
            <div className="tpl-placeholder-oval">🌹</div>
          )}
        </div>
        <p className="tpl-poem">{texts.poem || 'Votre poème apparaîtra ici...'}</p>
        <div className="tpl-memories-row">
          {['memory-1', 'memory-2', 'memory-3'].map(id => (
            <div key={id} className="tpl-memory-photo">
              {photos[id] ? (
                <img src={photos[id]} alt="" />
              ) : (
                <div className="tpl-placeholder-sm">🌸</div>
              )}
            </div>
          ))}
        </div>
        <p className="tpl-dedication">{texts.dedication || 'Pour toi, mon unique rose...'}</p>
      </div>
    );
  }

  if (template.layout === 'timeline') {
    const steps = [
      { photoId: 'first-meet', textId: 'story-1', label: 'Notre rencontre' },
      { photoId: 'first-date', textId: 'story-2', label: 'Premier rendez-vous' },
      { photoId: 'special-moment', textId: 'story-3', label: 'Moment spécial' },
      { photoId: 'today', textId: 'story-4', label: 'Aujourd\'hui' },
    ];

    return (
      <div className="tpl-timeline">
        <h2 className="tpl-title-timeline">{texts['couple-names'] || 'Marie & Jean'}</h2>
        <div className="tpl-timeline-items">
          {steps.map((step, idx) => (
            <div key={step.photoId} className={`tpl-timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <div className="tpl-timeline-dot">{idx + 1}</div>
              <div className="tpl-timeline-card">
                <div className="tpl-timeline-photo">
                  {photos[step.photoId] ? (
                    <img src={photos[step.photoId]} alt="" />
                  ) : (
                    <div className="tpl-placeholder-sm">📷</div>
                  )}
                </div>
                <h4>{step.label}</h4>
                <p>{texts[step.textId] || '...'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="tpl-fallback">Preview</div>;
}

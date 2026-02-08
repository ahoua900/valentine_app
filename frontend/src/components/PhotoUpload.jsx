import { useRef } from 'react';

export default function PhotoUpload({ slot, value, onChange }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(slot.id, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const shapeStyles = {
    heart: { borderRadius: '50%' },
    circle: { borderRadius: '50%' },
    oval: { borderRadius: '50%' },
    rounded: { borderRadius: '16px' },
    rectangle: { borderRadius: '12px' },
  };

  return (
    <div className="photo-upload-slot" style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#8B0000',
        marginBottom: '8px',
      }}>
        {slot.label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        style={{
          width: Math.min(slot.width, 300),
          height: Math.min(slot.height, 300),
          border: value ? 'none' : '3px dashed #FFB6C1',
          background: value ? `url(${value}) center/cover no-repeat` : '#FFF0F3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          ...(shapeStyles[slot.shape] || shapeStyles.rounded),
        }}
      >
        {!value && (
          <div style={{ textAlign: 'center', color: '#8B6B6B' }}>
            <div style={{ fontSize: '2rem', marginBottom: '4px' }}>📷</div>
            <div style={{ fontSize: '0.8rem' }}>Cliquez pour ajouter</div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {value && (
        <button
          onClick={() => onChange(slot.id, null)}
          style={{
            marginTop: '8px',
            background: 'none',
            color: '#E8394D',
            fontSize: '0.8rem',
            textDecoration: 'underline',
          }}
        >
          Supprimer la photo
        </button>
      )}
    </div>
  );
}

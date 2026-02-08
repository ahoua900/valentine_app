import { useEffect, useState } from 'react';

const hearts = ['💕', '❤️', '💖', '💗', '💘', '💝', '🌹', '💐'];

export default function FloatingHearts() {
  const [heartElements, setHeartElements] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: hearts[i % hearts.length],
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 8}s`,
      fontSize: `${0.8 + Math.random() * 1.2}rem`,
    }));
    setHeartElements(generated);
  }, []);

  return (
    <>
      {heartElements.map(h => (
        <div
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            fontSize: h.fontSize,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </>
  );
}

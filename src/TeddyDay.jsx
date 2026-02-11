import { useEffect, useMemo, useState } from 'react';
import './TeddyDay.css';

// Import teddy images
import teddy1 from './assets/teddy_1.jpg';
import teddy2 from './assets/teddy_2.jpg';
import teddy3 from './assets/teddy_3.jpg';
import teddy4 from './assets/teddy_4.svg';
import teddy5 from './assets/teddy_5.jpg';
import teddy6 from './assets/teddy_6.svg';

const TeddyDay = ({ onImageSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const teddyImages = [
    { id: 1, src: teddy1, name: 'teddy_1.jpg' },
    { id: 2, src: teddy2, name: 'teddy_2.jpg' },
    { id: 3, src: teddy3, name: 'teddy_3.jpg' },
    { id: 4, src: teddy4, name: 'teddy_4.svg' },
    { id: 5, src: teddy5, name: 'teddy_5.jpg' },
    { id: 6, src: teddy6, name: 'teddy_6.svg' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const floatingDecorations = useMemo(
    () =>
      Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => ({
        key: `float-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        fontSize: `${Math.random() > 0.5 ? '2rem' : '1.5rem'}`,
        symbol: Math.random() > 0.5 ? '🧸' : '💕',
      })),
    [isMobile]
  );

  const handleImageClick = (index, imageSrc, imageName) => {
    setSelectedIndex(index);

    // Small delay for visual feedback before transition
    setTimeout(() => {
      if (onImageSelect) {
        onImageSelect(imageSrc, imageName);
      }
    }, 600);
  };

  return (
    <div className="teddy-day-container">
      {/* Floating decorative hearts and teddies */}
      {floatingDecorations.map(decoration => (
        <div
          key={decoration.key}
          className="floating-decoration"
          style={{
            left: decoration.left,
            top: decoration.top,
            animationDelay: decoration.animationDelay,
            animationDuration: decoration.animationDuration,
            fontSize: decoration.fontSize,
          }}
        >
          {decoration.symbol}
        </div>
      ))}

      <div className="teddy-day-content">
        <p className="teddy-day-subtitle">
          Choose one
        </p>
        <div className="teddy-grid">
          {teddyImages.map((teddy, index) => (
            <div
              key={teddy.id}
              className={`teddy-card ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleImageClick(index, teddy.src, teddy.name)}
            >
              <img
                src={teddy.src}
                alt={`Mystery Teddy ${teddy.id}`}
                className="teddy-image"
              />
              <div className="teddy-number">#{teddy.id}</div>
            </div>
          ))}
        </div>

        <p className="teddy-day-hint">
          ✨ Click any teddy to start your puzzle adventure! ✨
        </p>
      </div>
    </div>
  );
};

export default TeddyDay;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import './TeddyDay.css';

// Import teddy images
import teddy1 from './assets/teddy_1.jpg';
import teddy2 from './assets/teddy_2.jpg';
import teddy3 from './assets/teddy_3.jpg';
import teddy4 from './assets/teddy_4.svg';
import teddy5 from './assets/teddy_5.jpg';
import teddy6 from './assets/teddy_6.svg';

const TeddyDay = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const teddyImages = [
    { id: 1, src: teddy1, name: 'teddy_1.jpg' },
    { id: 2, src: teddy2, name: 'teddy_2.jpg' },
    { id: 3, src: teddy3, name: 'teddy_3.jpg' },
    { id: 4, src: teddy4, name: 'teddy_4.svg' },
    { id: 5, src: teddy5, name: 'teddy_5.jpg' },
    { id: 6, src: teddy6, name: 'teddy_6.svg' },
  ];

  const handleImageClick = (index, imageSrc, imageName) => {
    setSelectedIndex(index);
    
    // Small delay for visual feedback before navigation
    setTimeout(() => {
      navigate(`/teddy-jigsaw?image=${imageName}`, { 
        state: { imageSrc, imageName } 
      });
    }, 600);
  };

  return (
    <div className="teddy-day-container">
      {/* Floating decorative hearts and teddies */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`float-${i}`}
          className="floating-decoration"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            fontSize: `${Math.random() > 0.5 ? '2rem' : '1.5rem'}`,
          }}
        >
          {Math.random() > 0.5 ? '🧸' : '💕'}
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

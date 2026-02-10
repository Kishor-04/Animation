import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeddyComplete.css';

// Import teddy images
import teddy1 from './assets/teddy_1.jpg';
import teddy2 from './assets/teddy_2.jpg';
import teddy3 from './assets/teddy_3.jpg';
import teddy4 from './assets/teddy_4.svg';
import teddy5 from './assets/teddy_5.jpg';
import teddy6 from './assets/teddy_6.svg';

const TeddyComplete = ({ imageSrc: propImageSrc, imageName: propImageName, onPlayAgain }) => {
  const [showContent, setShowContent] = useState(false);
  
  const imageSrc = propImageSrc || teddy1;
  const imageName = propImageName || 'teddy_1.jpg';

  const imageMap = {
    'teddy_1.jpg': teddy1,
    'teddy_2.jpg': teddy2,
    'teddy_3.jpg': teddy3,
    'teddy_4.svg': teddy4,
    'teddy_5.jpg': teddy5,
    'teddy_6.svg': teddy6,
  };

  const displayImage = imageMap[imageName] || imageSrc;

  useEffect(() => {
    // Play completion sound
    const completeSound = new Audio('/assets/complete.mp3');
    completeSound.play().catch(e => console.log('Audio play failed:', e));

    // Show content after brief delay
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  }, []);

  const handlePlayAgain = () => {
    if (onPlayAgain) {
      onPlayAgain();
    }
  };

  // Generate heart confetti
  const heartConfetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    emoji: ['💕', '❤️', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)],
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    size: 1 + Math.random() * 2,
    animationType: Math.random() > 0.5 ? 'fall-left' : 'fall-right',
  }));

  return (
    <div className="teddy-complete-container">
      {/* Heart Confetti */}
      {heartConfetti.map(heart => (
        <div
          key={heart.id}
          className={`heart-confetti ${heart.animationType}`}
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Floating background decorations */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`bg-${i}`}
          className="floating-bg-decoration"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            opacity: 0.1 + Math.random() * 0.2,
          }}
        >
          🧸
        </div>
      ))}

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="complete-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            {/* Completed Teddy Image */}
            <motion.div
              className="completed-image-wrapper"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                type: 'spring',
                stiffness: 200,
                delay: 0.2 
              }}
            >
              <img
                src={displayImage}
                alt="Completed Teddy"
                className="completed-teddy-image"
              />
            </motion.div>

            {/* Success Title */}
            <motion.h1
              className="complete-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Happy Teddy Day!
            </motion.h1>

            {/* Heartfelt Message */}
            <motion.div
              className="complete-message"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="message-text">
                Teddy Day celebration shows how much care a person takes of his loved ones
              </p>
              <div className="message-decoration">
                <span>💕</span>
                <span>🧸</span>
                <span>💕</span>
              </div>
            </motion.div>

            {/* Success Badge */}
            <motion.div
              className="success-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                delay: 1.1,
                duration: 0.8,
                type: 'spring',
                stiffness: 200 
              }}
            >
              <div className="badge-inner">
                <span className="badge-icon">🎉</span>
                <span className="badge-text">Puzzle Master!</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="action-buttons"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <motion.button
                className="play-again-button"
                onClick={handlePlayAgain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again 🧸
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle effects */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default TeddyComplete;

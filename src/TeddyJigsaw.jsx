import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeddyJigsaw.css';

// Import teddy images
import teddy1 from './assets/teddy_1.jpg';
import teddy2 from './assets/teddy_2.jpg';
import teddy3 from './assets/teddy_3.jpg';
import teddy4 from './assets/teddy_4.svg';
import teddy5 from './assets/teddy_5.jpg';
import teddy6 from './assets/teddy_6.svg';

const ROWS = 4;
const COLS = 3;
const PIECE_SIZE = 120;
const SNAP_THRESHOLD = 15;
const SOLUTION_START_X = 650;
const SOLUTION_START_Y = 100;

const TeddyJigsaw = ({ imageSrc: propImageSrc, imageName: propImageName, onComplete }) => {
  const [pieces, setPieces] = useState([]);
  const [snappedPieces, setSnappedPieces] = useState(new Set());
  const [imageSrc, setImageSrc] = useState(propImageSrc || null);
  const [imageName, setImageName] = useState(propImageName || '');
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [justSnapped, setJustSnapped] = useState(null);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // 'success' | 'fail' | null
  const [showFullImage, setShowFullImage] = useState(false);
  
  const snapSoundRef = useRef(null);
  const completeSoundRef = useRef(null);

  const imageMap = {
    'teddy_1.jpg': teddy1,
    'teddy_2.jpg': teddy2,
    'teddy_3.jpg': teddy3,
    'teddy_4.svg': teddy4,
    'teddy_5.jpg': teddy5,
    'teddy_6.svg': teddy6,
  };

  useEffect(() => {
    // Initialize image from props
    if (propImageSrc && propImageName) {
      setImageSrc(propImageSrc);
      setImageName(propImageName);
    } else {
      // Fallback to first teddy if no image specified
      setImageSrc(teddy1);
      setImageName('teddy_1.jpg');
    }

    // Initialize sound effects
    snapSoundRef.current = new Audio('/assets/snap.mp3');
    completeSoundRef.current = new Audio('/assets/complete.mp3');
  }, [propImageSrc, propImageName]);

  useEffect(() => {
    if (imageSrc) {
      initializePuzzle();
    }
  }, [imageSrc]);

  useEffect(() => {
    if (snappedPieces.size === ROWS * COLS && !isComplete) {
      setIsComplete(true);
      setCheckResult('success');
      setShowFullImage(true);
      completeSoundRef.current?.play().catch(e => console.log('Audio play failed:', e));
      // Transition to complete screen after 3 seconds total
      setTimeout(() => {
        if (onComplete) {
          onComplete(imageSrc, imageName);
        }
      }, 3000);
    }
  }, [snappedPieces, isComplete, imageSrc, imageName, onComplete]);

  useEffect(() => {
    // Show/hide check button when at least 50% pieces are placed
    setShowCheckButton(snappedPieces.size >= Math.floor((ROWS * COLS) * 0.5));
  }, [snappedPieces]);

  const generateTabPattern = () => {
    const pattern = [];
    for (let row = 0; row < ROWS; row++) {
      pattern[row] = [];
      for (let col = 0; col < COLS; col++) {
        pattern[row][col] = {
          top: row === 0 ? 0 : -pattern[row - 1][col].bottom,
          right: col === COLS - 1 ? 0 : Math.random() > 0.5 ? 1 : -1,
          bottom: row === ROWS - 1 ? 0 : Math.random() > 0.5 ? 1 : -1,
          left: col === 0 ? 0 : -pattern[row][col - 1].right,
        };
      }
    }
    return pattern;
  };

  const generateJigsawPath = (row, col, tabPattern) => {
    const size = PIECE_SIZE;
    const tabSize = size * 0.2;
    const tabDepth = size * 0.15;
    
    const tabs = tabPattern[row][col];
    
    let path = `M 0 0`;
    
    // Top edge
    if (tabs.top === 0) {
      path += ` L ${size} 0`;
    } else {
      const mid = size / 2;
      const direction = tabs.top;
      path += ` L ${mid - tabSize} 0`;
      path += ` Q ${mid - tabSize} ${-tabDepth * direction} ${mid} ${-tabDepth * direction}`;
      path += ` Q ${mid + tabSize} ${-tabDepth * direction} ${mid + tabSize} 0`;
      path += ` L ${size} 0`;
    }
    
    // Right edge
    if (tabs.right === 0) {
      path += ` L ${size} ${size}`;
    } else {
      const mid = size / 2;
      const direction = tabs.right;
      path += ` L ${size} ${mid - tabSize}`;
      path += ` Q ${size + tabDepth * direction} ${mid - tabSize} ${size + tabDepth * direction} ${mid}`;
      path += ` Q ${size + tabDepth * direction} ${mid + tabSize} ${size} ${mid + tabSize}`;
      path += ` L ${size} ${size}`;
    }
    
    // Bottom edge
    if (tabs.bottom === 0) {
      path += ` L 0 ${size}`;
    } else {
      const mid = size / 2;
      const direction = tabs.bottom;
      path += ` L ${mid + tabSize} ${size}`;
      path += ` Q ${mid + tabSize} ${size + tabDepth * direction} ${mid} ${size + tabDepth * direction}`;
      path += ` Q ${mid - tabSize} ${size + tabDepth * direction} ${mid - tabSize} ${size}`;
      path += ` L 0 ${size}`;
    }
    
    // Left edge
    if (tabs.left === 0) {
      path += ` L 0 0`;
    } else {
      const mid = size / 2;
      const direction = tabs.left;
      path += ` L 0 ${mid + tabSize}`;
      path += ` Q ${-tabDepth * direction} ${mid + tabSize} ${-tabDepth * direction} ${mid}`;
      path += ` Q ${-tabDepth * direction} ${mid - tabSize} 0 ${mid - tabSize}`;
      path += ` L 0 0`;
    }
    
    path += ` Z`;
    return path;
  };

  const initializePuzzle = () => {
    const tabPattern = generateTabPattern();
    const newPieces = [];
    
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const pieceId = row * COLS + col;
        const correctX = SOLUTION_START_X + col * PIECE_SIZE;
        const correctY = SOLUTION_START_Y + row * PIECE_SIZE;
        
        // Scatter pieces widely across viewport (avoiding solution area on right)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxX = Math.max(500, viewportWidth - PIECE_SIZE - 550); // Avoid right side UI
        const maxY = Math.max(400, viewportHeight - PIECE_SIZE - 250); // Avoid top/bottom UI
        
        const randomX = 30 + Math.random() * maxX;
        const randomY = 140 + Math.random() * maxY; // Start below progress bar
        const randomRotation = 0; // No rotation for easier identification
        
        newPieces.push({
          id: pieceId,
          row,
          col,
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          correctX,
          correctY,
          path: generateJigsawPath(row, col, tabPattern),
          imageOffsetX: -col * PIECE_SIZE,
          imageOffsetY: -row * PIECE_SIZE,
        });
      }
    }
    
    setPieces(newPieces);
    setSnappedPieces(new Set());
    setIsComplete(false);
  };

  const handleDragEnd = (event, info, piece) => {
    if (snappedPieces.has(piece.id)) return;

    const newX = piece.x + info.offset.x;
    const newY = piece.y + info.offset.y;
    
    // Grid-only snapping: Check if piece is near its CORRECT grid position
    const distanceToCorrect = Math.sqrt(
      Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
    );
    
    if (distanceToCorrect < SNAP_THRESHOLD) {
      // Snap to correct position
      setPieces(prev =>
        prev.map(p =>
          p.id === piece.id
            ? { ...p, x: piece.correctX, y: piece.correctY, rotation: 0 }
            : p
        )
      );
      
      setSnappedPieces(prev => new Set([...prev, piece.id]));
      setJustSnapped(piece.id);
      
      // Clear animation after delay (650ms gives buffer after 600ms sparkle animation)
      setTimeout(() => setJustSnapped(null), 650);
      
      snapSoundRef.current?.play().catch(e => console.log('Audio play failed:', e));
    } else {
      // Update position
      setPieces(prev =>
        prev.map(p =>
          p.id === piece.id ? { ...p, x: newX, y: newY } : p
        )
      );
    }
  };

  const handleCheckPuzzle = () => {
    const totalPieces = ROWS * COLS;
    const correctPieces = snappedPieces.size;
    const accuracyPercentage = Math.round((correctPieces / totalPieces) * 100);
    
    const requiredAccuracy = 60;
    
    if (accuracyPercentage >= requiredAccuracy) {
      // Success! 60% or more pieces are correct
      setCheckResult('success');
      setIsComplete(true);
      setCountdown(3);
      completeSoundRef.current?.play().catch(e => console.log('Audio play failed:', e));
    } else {
      // Not enough correct pieces
      setCheckResult('fail');
      
      // Reset fail message after 3 seconds
      setTimeout(() => {
        setCheckResult(null);
      }, 3000);
    }
  };

  const progressPercentage = Math.round((snappedPieces.size / (ROWS * COLS)) * 100);

  return (
    <div className="teddy-jigsaw-container">
      {/* Floating hearts decoration */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          💕
        </div>
      ))}

      <div className="puzzle-header">
        <p className="puzzle-hint">Complete the picture</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          >
            <motion.span 
              className="progress-text"
              key={`count-${snappedPieces.size}`}
              initial={{ scale: 1.5, color: '#ffd700' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.4 }}
            >
              {snappedPieces.size} / {ROWS * COLS}
            </motion.span>
          </div>
        </div>
        
        {/* Check Puzzle Button */}
        <AnimatePresence>
          {showCheckButton && !isComplete && (
            <motion.button
              className="check-puzzle-button"
              onClick={handleCheckPuzzle}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              ✓
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Feedback Messages */}
        <AnimatePresence>
          {checkResult === 'fail' && (
            <motion.div
              className="check-feedback fail"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="feedback-icon">❌</div>
              <div className="feedback-text">
                <p className="accuracy-display">{progressPercentage}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="puzzle-play-area">
        {/* Grid boxes with ghost images */}
        <div className="grid-container">
          {pieces.map(piece => (
            <div
              key={`grid-${piece.id}`}
              className="grid-box"
              style={{
                position: 'absolute',
                left: piece.correctX - SOLUTION_START_X,
                top: piece.correctY - SOLUTION_START_Y,
                width: PIECE_SIZE,
                height: PIECE_SIZE,
              }}
            >
              <svg
                width={PIECE_SIZE}
                height={PIECE_SIZE}
                viewBox={`0 0 ${PIECE_SIZE} ${PIECE_SIZE}`}
                style={{ overflow: 'visible' }}
              >
                <path
                  d={piece.path}
                  fill="none"
                  stroke="#ff69b4"
                  strokeWidth={snappedPieces.has(piece.id) ? "1" : "3"}
                  strokeDasharray="5,5"
                  opacity={snappedPieces.has(piece.id) ? "0.2" : "0.6"}
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Puzzle pieces */}
        <div className="pieces-container">
          <AnimatePresence>
            {pieces.map(piece => (
            <motion.div
              key={piece.id}
              drag={!snappedPieces.has(piece.id)}
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={(event, info) => handleDragEnd(event, info, piece)}
              initial={{ opacity: 0, scale: 0.5, x: piece.x, y: piece.y }}
              animate={{
                opacity: 1,
                scale: justSnapped === piece.id ? [1, 1.15, 1] : 1,
                rotate: piece.rotation,
                ...(snappedPieces.has(piece.id) ? { x: piece.x, y: piece.y } : {}),
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 30,
                opacity: { duration: 0.6, ease: 'easeOut' },
                scale: { duration: 0.5, ease: 'easeInOut' }
              }}
              className={`puzzle-piece ${snappedPieces.has(piece.id) ? 'snapped' : ''} ${justSnapped === piece.id ? 'just-snapped' : ''}`}
              style={{
                position: 'absolute',
                width: PIECE_SIZE,
                height: PIECE_SIZE,
                cursor: snappedPieces.has(piece.id) ? 'not-allowed' : 'grab',
              }}
              whileHover={!snappedPieces.has(piece.id) ? {} : {}}
              whileDrag={{ cursor: 'grabbing', zIndex: 1000 }}
            >
              <svg
                width={PIECE_SIZE}
                height={PIECE_SIZE}
                viewBox={`0 0 ${PIECE_SIZE} ${PIECE_SIZE}`}
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <clipPath id={`clip-${piece.id}`}>
                    <path d={piece.path} />
                  </clipPath>
                </defs>
                <image
                  href={imageSrc}
                  width={COLS * PIECE_SIZE}
                  height={ROWS * PIECE_SIZE}
                  x={piece.imageOffsetX}
                  y={piece.imageOffsetY}
                  clipPath={`url(#clip-${piece.id})`}
                  preserveAspectRatio="xMidYMid slice"
                />
                <path
                  d={piece.path}
                  fill="none"
                  stroke={snappedPieces.has(piece.id) ? '#ff69b4' : '#ffb6c1'}
                  strokeWidth="2"
                  opacity="0.5"
                />
              </svg>              
              {/* Connection sparkles */}
              {justSnapped === piece.id && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="connection-sparkle"
                      initial={{ 
                        x: PIECE_SIZE / 2, 
                        y: PIECE_SIZE / 2,
                        scale: 0,
                        opacity: 1
                      }}
                      animate={{ 
                        x: PIECE_SIZE / 2 + Math.cos((i * Math.PI * 2) / 8) * 60,
                        y: PIECE_SIZE / 2 + Math.sin((i * Math.PI * 2) / 8) * 60,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0]
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}            </motion.div>
          ))}
        </AnimatePresence>
        </div>

        {/* Full Image Reveal on Completion */}
        <AnimatePresence>
          {showFullImage && (
            <motion.div
              className="full-image-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.15 }}
              transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="glow-overlay" />
              <img 
                src={imageSrc} 
                alt="Completed Puzzle"
                className="revealed-image"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeddyJigsaw;

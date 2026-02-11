import { useEffect, useMemo, useRef, useState } from 'react';
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

const getPuzzleLayout = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth <= 768;
  
  // Enhanced desktop sizing for better visibility
  const pieceSize = viewportWidth <= 360 ? 72 : 
                    viewportWidth <= 480 ? 82 : 
                    viewportWidth <= 768 ? 92 : 
                    viewportWidth <= 1024 ? 140 : 160;
  
  const gridWidth = pieceSize * COLS;
  const gridHeight = pieceSize * ROWS;

  const gridStartX = isMobile
    ? Math.max(12, Math.floor((viewportWidth - gridWidth) / 2))
    : Math.floor((viewportWidth - gridWidth) / 2);

  const gridStartY = isMobile ? 24 : 120;
  const playAreaMinHeight = isMobile
    ? Math.max(gridStartY + gridHeight + pieceSize * 3 + 90, Math.round(viewportHeight * 0.92))
    : Math.max(720, viewportHeight - 200);

  return {
    isMobile,
    pieceSize,
    gridWidth,
    gridHeight,
    gridStartX,
    gridStartY,
    playAreaMinHeight,
    snapThreshold: Math.max(14, Math.round(pieceSize * 0.15)),
    viewportWidth,
  };
};

const TeddyJigsaw = ({ imageSrc: propImageSrc, imageName: propImageName, onComplete }) => {
  const [pieces, setPieces] = useState([]);
  const [snappedPieces, setSnappedPieces] = useState(new Set());
  const [imageSrc, setImageSrc] = useState(propImageSrc || null);
  const [imageName, setImageName] = useState(propImageName || '');
  const [isComplete, setIsComplete] = useState(false);
  const [layout, setLayout] = useState(() => getPuzzleLayout());
  const [justSnapped, setJustSnapped] = useState(null);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // 'success' | 'fail' | null
  const [showFullImage, setShowFullImage] = useState(false);

  const snapSoundRef = useRef(null);
  const completeSoundRef = useRef(null);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: layout.isMobile ? 8 : 15 }).map((_, i) => ({
        key: `heart-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 3}s`,
      })),
    [layout.isMobile]
  );

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
    const handleResize = () => {
      setLayout(getPuzzleLayout());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (imageSrc) {
      initializePuzzle();
    }
  }, [imageSrc, layout]);

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

  const generateJigsawPath = (row, col, tabPattern, pieceSize) => {
    const size = pieceSize;
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
    const { gridStartX, gridStartY, isMobile, pieceSize, playAreaMinHeight, viewportWidth } = layout;
    const tabPattern = generateTabPattern();
    const newPieces = [];
    const scatterTop = isMobile ? gridStartY + pieceSize * ROWS + 28 : 140;
    const scatterHeight = Math.max(120, playAreaMinHeight - scatterTop - pieceSize - 20);
    const maxDesktopX = Math.max(30, gridStartX - pieceSize - 24);

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const pieceId = row * COLS + col;
        const correctX = gridStartX + col * pieceSize;
        const correctY = gridStartY + row * pieceSize;
        const randomX = isMobile
          ? 12 + Math.random() * Math.max(12, viewportWidth - pieceSize - 24)
          : 20 + Math.random() * maxDesktopX;
        const randomY = scatterTop + Math.random() * scatterHeight;

        newPieces.push({
          id: pieceId,
          row,
          col,
          x: randomX,
          y: randomY,
          rotation: 0,
          correctX,
          correctY,
          path: generateJigsawPath(row, col, tabPattern, pieceSize),
          imageOffsetX: -col * pieceSize,
          imageOffsetY: -row * pieceSize,
        });
      }
    }

    setPieces(newPieces);
    setSnappedPieces(new Set());
    setIsComplete(false);
    setShowFullImage(false);
    setCheckResult(null);
    setJustSnapped(null);
  };

  const handleDragEnd = (event, info, piece) => {
    if (snappedPieces.has(piece.id)) return;

    const newX = piece.x + info.offset.x;
    const newY = piece.y + info.offset.y;

    // Grid-only snapping: Check if piece is near its CORRECT grid position
    const distanceToCorrect = Math.sqrt(
      Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
    );

    if (distanceToCorrect < layout.snapThreshold) {
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
      {floatingHearts.map(heart => (
        <div
          key={heart.key}
          className="floating-heart"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration,
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

      <div className="puzzle-play-area" style={{ minHeight: `${layout.playAreaMinHeight}px` }}>
        {/* Grid boxes with ghost images */}
        <div
          className="grid-container"
          style={{
            left: layout.gridStartX,
            top: layout.gridStartY,
            width: layout.gridWidth,
            height: layout.gridHeight,
          }}
        >
          {pieces.map(piece => (
            <div
              key={`grid-${piece.id}`}
              className="grid-box"
              style={{
                position: 'absolute',
                left: piece.correctX - layout.gridStartX,
                top: piece.correctY - layout.gridStartY,
                width: layout.pieceSize,
                height: layout.pieceSize,
              }}
            >
              <svg
                width={layout.pieceSize}
                height={layout.pieceSize}
                viewBox={`0 0 ${layout.pieceSize} ${layout.pieceSize}`}
                style={{ overflow: 'visible' }}
              >
                <path
                  d={piece.path}
                  fill="none"
                  stroke="#ff69b4"
                  strokeWidth={snappedPieces.has(piece.id) ? '1' : '3'}
                  strokeDasharray="5,5"
                  opacity={snappedPieces.has(piece.id) ? '0.2' : '0.6'}
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
                  scale: { duration: 0.5, ease: 'easeInOut' },
                }}
                className={`puzzle-piece ${snappedPieces.has(piece.id) ? 'snapped' : ''} ${justSnapped === piece.id ? 'just-snapped' : ''}`}
                style={{
                  position: 'absolute',
                  width: layout.pieceSize,
                  height: layout.pieceSize,
                  cursor: snappedPieces.has(piece.id) ? 'not-allowed' : 'grab',
                }}
                whileHover={!snappedPieces.has(piece.id) ? {} : {}}
                whileDrag={{ cursor: 'grabbing', zIndex: 1000 }}
              >
                <svg
                  width={layout.pieceSize}
                  height={layout.pieceSize}
                  viewBox={`0 0 ${layout.pieceSize} ${layout.pieceSize}`}
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <clipPath id={`clip-${piece.id}`}>
                      <path d={piece.path} />
                    </clipPath>
                  </defs>
                  <image
                    href={imageSrc}
                    width={COLS * layout.pieceSize}
                    height={ROWS * layout.pieceSize}
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
                          x: layout.pieceSize / 2,
                          y: layout.pieceSize / 2,
                          scale: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: layout.pieceSize / 2 + Math.cos((i * Math.PI * 2) / 8) * Math.max(32, layout.pieceSize * 0.45),
                          y: layout.pieceSize / 2 + Math.sin((i * Math.PI * 2) / 8) * Math.max(32, layout.pieceSize * 0.45),
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Full Image Reveal on Completion */}
        <AnimatePresence>
          {showFullImage && (
            <motion.div
              className="full-image-reveal"
              style={{
                left: layout.gridStartX,
                top: layout.gridStartY,
                width: layout.gridWidth,
                height: layout.gridHeight,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.06 }}
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

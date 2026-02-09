import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChocolateSilk.css'

const ChocolateSilk = () => {
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [eatenPieces, setEatenPieces] = useState(new Set())
  const [showCelebration, setShowCelebration] = useState(false)

  // Special messages for each chocolate piece
  const messages = [
    "We started with jokes and small talk, but somewhere between the laughs, you became my entire world.",
    "I used to call you my best friend. Now, I call you the person I can't imagine living without.",
    "It's funny how 'hello' turned into 'I'm so glad you're here,' and then slowly turned into 'I love you.'",
    "We don't need a label to prove what we have; the way my heart beats when I see you says it all.",
    "You were the best part of my life as a friend, and you're the only part I want as my everything.",
    "My days used to be just routine; now, they're a countdown until I get to talk to you again.",
    "I never used to believe in 'soulmates' until our friendship turned into this beautiful, deep love.",
    "Before you, I was just living. With you, I'm finally starting to understand what happiness actually feels like.",
    "You've changed my perspective on everything—I see beauty in the world because I see it in you.",
    "Even on my hardest days, the thought of you is the peace I always come home to.",
    "I admire your strength and your reasons, and I hope you know I'm not going anywhere. I'm yours, always.",
    "You are the most incredible person I've ever known. Loving you is the easiest thing I've ever done.",
    "The way you handle life with such grace makes me fall for you more every single day.",
    "I don't need a title to be devoted to you. You are, and will always be, the person I love the most.",
    "If I had to choose between the whole world and you, I'd choose you every time, without a second thought.",
  ]

  const handlePieceClick = (index) => {
    if (!eatenPieces.has(index)) {
      setSelectedPiece(index)
    }
  }

  const closeMessage = () => {
    if (selectedPiece !== null) {
      const newEatenPieces = new Set([...eatenPieces, selectedPiece])
      setEatenPieces(newEatenPieces)
      
      // Check if all pieces are eaten
      if (newEatenPieces.size === messages.length) {
        setTimeout(() => {
          setShowCelebration(true)
        }, 800)
      }
    }
    setSelectedPiece(null)
  }

  // If all pieces eaten, show celebration page
  if (showCelebration) {
    return (
      <div className="celebration-container">
        {/* Ambient floating hearts */}
        <div className="ambient-hearts">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="floating-heart-ambient"
              style={{
                left: `${15 + i * 15}%`,
                fontSize: `${1.5 + Math.random() * 1}rem`
              }}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{
                y: '-10vh',
                opacity: [0, 0.3, 0.3, 0],
                x: [0, 30, -20, 40, 0]
              }}
              transition={{
                duration: 15 + i * 2,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        {/* Light particles */}
        <div className="light-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="light-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="celebration-main"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div 
            className="celebration-chocolate-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0
            }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 150,
              damping: 12
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🍫
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="celebration-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Happy Chocolate Day
          </motion.h1>
          
          <motion.div 
            className="celebration-divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="divider-heart">💝</span>
          </motion.div>
          
          <motion.p 
            className="celebration-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Every piece of chocolate holds a memory, every bite a moment we've shared.
          </motion.p>
          
          <motion.p 
            className="celebration-submessage"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            Thank you for making every day sweeter 💝
          </motion.p>
        </motion.div>
        
        {/* Elegant confetti */}
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              style={{
                left: '50%',
                background: ['#d4a574', '#8b4513', '#cd853f', '#deb887', '#d2691e'][i % 5]
              }}
              initial={{ y: -20, x: 0, opacity: 1, scale: 1 }}
              animate={{
                y: '100vh',
                x: (Math.random() - 0.5) * 800,
                opacity: [1, 1, 0.5, 0],
                rotate: Math.random() * 720,
                scale: [1, 0.8, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 1.5,
                delay: (i * 0.05) + Math.random() * 0.3,
                ease: [0.34, 0.0, 0.68, 1]
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="chocolate-container">
      {/* Header Text */}
      <motion.div
        className="chocolate-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="chocolate-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          Click each piece of chocolate
        </motion.h1>
        <motion.p 
          className="chocolate-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          to discover a special message 💝
        </motion.p>
      </motion.div>

      {/* Chocolate Bar with 3D Pieces */}
      <div className="chocolate-wrapper">
        {/* Glow effect behind chocolate */}
        <motion.div 
          className="chocolate-glow"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="chocolate-bar">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className="chocolate-piece-wrapper"
              onClick={() => !eatenPieces.has(index) && handlePieceClick(index)}
            >
              <AnimatePresence mode="wait">
                {!eatenPieces.has(index) ? (
                  <motion.div
                    className="chocolate-piece"
                    whileHover={{
                      y: -15,
                      scale: 1.05,
                      filter: "brightness(1.4)",
                      transition: { duration: 0.3, type: "spring" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    exit={{
                      opacity: 0,
                      scale: 0.2,
                      rotateX: 180,
                      rotateZ: 360,
                      y: -100,
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                  >
                    {/* Clickable overlay for better interaction */}
                    <div className="click-overlay"></div>
                    {/* Top face */}
                    <div className="face top-face"></div>
                    {/* Front face */}
                    <div className="face front-face"></div>
                    {/* Right face */}
                    <div className="face right-face"></div>
                    {/* Left face */}
                    <div className="face left-face"></div>
                    {/* Back face */}
                    <div className="face back-face"></div>
                    {/* Bottom face */}
                    <div className="face bottom-face"></div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="eaten-shadow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedPiece !== null && (
          <>
            {/* Particle burst effect */}
            <motion.div className="particle-burst">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="burst-particle"
                  initial={{ 
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1 
                  }}
                  animate={{
                    x: Math.cos(i * 12) * (100 + Math.random() * 200),
                    y: Math.sin(i * 12) * (100 + Math.random() * 200),
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="message-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMessage}
            >
              {/* Background floating hearts */}
              <div className="overlay-hearts">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="overlay-heart"
                    initial={{ 
                      y: window.innerHeight + 50,
                      x: Math.random() * window.innerWidth,
                      opacity: 0,
                      rotate: 0
                    }}
                    animate={{
                      y: -100,
                      opacity: [0, 0.7, 0.7, 0],
                      rotate: Math.random() * 360,
                      scale: [0.5, 1.2, 1, 0.8]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {['❤️', '💕', '💖', '💝'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="message-card"
                initial={{ scale: 0, rotateY: 180, z: -500 }}
                animate={{
                  scale: 1,
                  rotateY: 0,
                  z: 0
                }}
                exit={{
                  scale: 0,
                  rotateY: 180,
                  z: -500,
                  transition: { duration: 0.4 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  mass: 1
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sparkle effects around card */}
                <div className="card-sparkles">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="card-sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="message-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div 
                    className="message-piece-icon"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🍫
                  </motion.div>
                  
                  <motion.h2 
                    className="message-text"
                    initial={{ scale: 0.9 }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      textShadow: [
                        "0 0 20px rgba(255, 182, 193, 0.5)",
                        "0 0 30px rgba(255, 182, 193, 0.8)",
                        "0 0 20px rgba(255, 182, 193, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {messages[selectedPiece]}
                  </motion.h2>
                  
                  <motion.button
                    className="message-close-btn"
                    onClick={closeMessage}
                    whileHover={{ 
                      scale: 1.15,
                      boxShadow: "0 8px 30px rgba(139, 69, 19, 0.6)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 4px 15px rgba(0, 0, 0, 0.4)",
                        "0 6px 25px rgba(139, 69, 19, 0.5)",
                        "0 4px 15px rgba(0, 0, 0, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    Eat this piece 🍫
                  </motion.button>
                </motion.div>
                
                {/* Inner floating hearts */}
                <div className="message-hearts">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="floating-heart"
                      initial={{ y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        y: -150,
                        opacity: 0,
                        scale: [0, 1.5, 1, 0],
                        x: Math.sin(i * 2) * 60
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChocolateSilk

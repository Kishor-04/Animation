import { useEffect, useState } from 'react'
import './App.css'

function RoseDay() {
  const [petals, setPetals] = useState([])
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Generate floating petals (increased for more beauty)
    const petalArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 8,
      duration: 10 + Math.random() * 15
    }))
    setPetals(petalArray)

    // Generate hearts (increased for more cuteness)
    const heartArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      duration: 8 + Math.random() * 10
    }))
    setHearts(heartArray)

    // Generate sparkles (increased for more magical effect)
    const sparkleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      duration: 2 + Math.random() * 4
    }))
    setSparkles(sparkleArray)
  }, [])

  useEffect(() => {
    // Show text after 5 seconds
    const timer = setTimeout(() => {
      setShowText(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rose-day-container">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source
            src="https://res.cloudinary.com/djkdzdfry/video/upload/v1770457225/rose_tekeqr.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Floating Rose Petals */}
      <div className="petals-container">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              animationDelay: `${petal.animationDelay}s`,
              animationDuration: `${petal.duration}s`
            }}
          >🌹</div>
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.animationDelay}s`,
              animationDuration: `${heart.duration}s`
            }}
          >❤️</div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="sparkles-container">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.animationDelay}s`,
              animationDuration: `${sparkle.duration}s`
            }}
          >✨</div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        {showText && (
          <>
            {/* Corner Roses */}
            <div className="corner-rose top-left">🌹</div>
            <div className="corner-rose top-right">🌹</div>
            <div className="corner-rose bottom-left">🌹</div>
            <div className="corner-rose bottom-right">🌹</div>
            
            {/* Main Title */}
            <div className="rose-day-text-container">
              <h1 className="rose-day-text">
                Happy Rose Day 🌹
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RoseDay

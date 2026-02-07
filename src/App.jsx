import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [petals, setPetals] = useState([])
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    // Generate floating petals
    const petalArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }))
    setPetals(petalArray)

    // Generate hearts
    const heartArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      duration: 8 + Math.random() * 7
    }))
    setHearts(heartArray)

    // Generate sparkles
    const sparkleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 2,
      duration: 2 + Math.random() * 3
    }))
    setSparkles(sparkleArray)
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
        <div className="title-container">
          <h1 className="main-title">
         
          </h1>
        </div>

        

      </div>
    </div>
  )
}

export default App
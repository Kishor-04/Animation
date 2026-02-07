import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Valentine.css'

function Valentine() {
  const navigate = useNavigate()
  const noButtonRef = useRef(null)
  const [noButtonStyle, setNoButtonStyle] = useState({})
  const [hasEscaped, setHasEscaped] = useState(false)
  const [noButtonAnimation, setNoButtonAnimation] = useState('')
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)
  const [teddyBears, setTeddyBears] = useState([])
  const [hearts, setHearts] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate teddy bears
    const bearArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }))
    setTeddyBears(bearArray)

    // Generate floating hearts
    const heartArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 4,
      duration: 8 + Math.random() * 5
    }))
    setHearts(heartArray)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Check proximity to No button
  useEffect(() => {
    if (!noButtonRef.current) return

    const button = noButtonRef.current
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - buttonCenterX, 2) +
      Math.pow(mousePosition.y - buttonCenterY, 2)
    )

    // Proximity radius - button escapes when cursor is within 120px
    const proximityRadius = 120

    if (distance < proximityRadius && distance > 0 && isNoButtonVisible) {
      handleNoEscape()
    }
  }, [mousePosition, isNoButtonVisible])

  const handleYesClick = () => {
    navigate('/rose-day')
  }

  const handleNoEscape = () => {
    // Make button disappear briefly then reappear at new position
    setIsNoButtonVisible(false)
    setHasEscaped(true)
    
    setTimeout(() => {
      // Generate random position - anywhere on screen
      const newTop = Math.random() * 95 // 0% to 95%
      const newLeft = Math.random() * 95 // 0% to 95%
      
      // 18 different animation types
      const animations = [
        'bounce-away',
        'spin-away',
        'disappear',
        'zigzag',
        'shake-away',
        'jump-away',
        'slide-left',
        'slide-right',
        'slide-up',
        'slide-down',
        'flip-out',
        'wobble-away',
        'shrink-grow',
        'rotate-flip',
        'elastic-away',
        'swing-away',
        'pulse-shrink',
        'spiral-out'
      ]
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      
      setNoButtonStyle({
        top: `${newTop}%`,
        left: `${newLeft}%`
      })
      setNoButtonAnimation(randomAnimation)
      setIsNoButtonVisible(true)
      
      setTimeout(() => {
        setNoButtonAnimation('')
      }, 400)
    }, 200)
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    handleNoEscape()
  }

  return (
    <div className="valentine-container">
      {/* Floating Teddy Bears */}
      <div className="bears-container">
        {teddyBears.map((bear) => (
          <div
            key={bear.id}
            className="teddy-bear"
            style={{
              left: `${bear.left}%`,
              top: `${bear.top}%`,
              animationDelay: `${bear.animationDelay}s`,
              animationDuration: `${bear.duration}s`
            }}
          >🧸</div>
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart-float"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.animationDelay}s`,
              animationDuration: `${heart.duration}s`
            }}
          >💕</div>
        ))}
      </div>

      {/* Main Content */}
      <div className="valentine-content">
        <div className="teddy-header">
          <span className="teddy-big">🧸</span>
        </div>
        
        <h1 className="valentine-title">
          Will You Be My Valentine? 💖
        </h1>

        <div className="buttons-container">
          <button 
            className="yes-button"
            onClick={handleYesClick}
          >
            Yes! 💕
          </button>

          {isNoButtonVisible && (
            <button
              ref={noButtonRef}
              className={`no-button ${noButtonAnimation} ${hasEscaped ? 'escaped' : ''}`}
              style={hasEscaped ? noButtonStyle : {}}
              onClick={handleNoClick}
              onTouchStart={handleNoEscape}
            >
              No 😢
            </button>
          )}
        </div>

        <div className="teddy-footer">
          <span className="teddy-emoji">🧸</span>
          <span className="teddy-emoji">💝</span>
          <span className="teddy-emoji">🧸</span>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="corner-teddy top-left">🧸</div>
      <div className="corner-teddy top-right">🧸</div>
      <div className="corner-teddy bottom-left">🧸</div>
      <div className="corner-teddy bottom-right">🧸</div>
    </div>
  )
}

export default Valentine

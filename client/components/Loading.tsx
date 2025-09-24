interface LoadingSpinnerProps {
  type?: 'orbital' | 'dots' | 'wave'
  message?: string
}

function LoadingSpinner({
  type = 'orbital',
  message = 'Loading...',
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (type) {
      case 'orbital':
        return (
          <div className="loading-spinner orbital-spinner glow-effect">
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="center-dot"></div>
          </div>
        )

      case 'dots':
        return (
          <div className="loading-spinner dots-spinner glow-effect">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )

      case 'wave':
        return (
          <div className="loading-spinner wave-spinner glow-effect">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        )

      default:
        return (
          <div className="loading-spinner orbital-spinner glow-effect">
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="center-dot"></div>
          </div>
        )
    }
  }

  return (
    <div className="loading-container">
      {renderSpinner()}
      <div className="loading-text">{message}</div>
    </div>
  )
}

export default LoadingSpinner

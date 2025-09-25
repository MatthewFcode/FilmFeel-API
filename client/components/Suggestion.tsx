import { useState, useEffect } from 'react'
import { useMoviesByMood, useAllMoods } from '../hooks/useMovies.ts'
import LoadingSpinner from './Loading.tsx'
import { Movie } from '../../models/movies.ts'

function Suggestion() {
  const [selectedMood, setSelectedMood] = useState('')
  const [suggestedMovie, setSuggestedMovie] = useState<Movie | null>(null)

  const {
    data: moods,
    isError: isMoodError,
    isPending: isMoodPending,
    error: moodError,
  } = useAllMoods()

  const {
    data: moodMovies,
    isError: isMovieMoodError,
    isPending: isMovieMoodPending,
    error: movieError,
  } = useMoviesByMood(selectedMood)

  const genRandomMovie = () => {
    if (moodMovies && moodMovies.length > 0) {
      const random = moodMovies[Math.floor(Math.random() * moodMovies.length)]
      setSuggestedMovie(random)
    }
  }

  useEffect(() => {
    if (moodMovies && moodMovies.length > 0) {
      genRandomMovie()
    }
  }, [moodMovies])

  // Show specific error messages
  if (isMoodError) {
    return (
      <div className="suggestion-container">
        <h2>Error Loading Moods</h2>
        <p>Error: {moodError?.message || 'Unknown error'}</p>
        <p>Check your browser console and network tab for more details.</p>
      </div>
    )
  }

  if (isMovieMoodError) {
    return (
      <div className="suggestion-container">
        <h2>Error Loading Movies</h2>
        <p>Error: {movieError?.message || 'Unknown error'}</p>
        <p>Selected mood: {selectedMood}</p>
      </div>
    )
  }

  // Show what's currently loading
  if (isMoodPending) {
    return (
      <div>
        <LoadingSpinner />
        <p>Loading moods...</p>
      </div>
    )
  }

  if (isMovieMoodPending && selectedMood) {
    return (
      <div>
        <LoadingSpinner />
        <p>Loading movies for mood: {selectedMood}</p>
      </div>
    )
  }

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood)
    setSuggestedMovie(null)
  }

  return (
    <div className="suggestion-container">
      {/* Header Section */}
      <div className="suggestion-header">
        <h1>Film Suggestion Generator</h1>
        <p>
          Click a mood tag from below and get a film recommendation generated
          from our database
        </p>
        <p>Press the regenerate button if you dont like the look of it</p>
      </div>

      {/* Mood Tags */}
      <div className="mood-tags-container">
        {moods?.map((mood, index) => (
          <button
            onClick={() => handleMoodClick(mood)}
            key={index}
            className="mood-tag"
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Movie Card */}
      {suggestedMovie && (
        <div className="movie-card">
          <div className="movie-content">
            <div className="movie-poster">
              {suggestedMovie.poster ? (
                <img src={suggestedMovie.poster} alt={suggestedMovie.title} />
              ) : (
                <div className="poster-placeholder">🎬</div>
              )}
            </div>

            <div className="movie-details">
              <h2>{suggestedMovie.title}</h2>

              <div className="movie-meta">
                <div className="rating">⭐ {suggestedMovie.rating}</div>
                <div className="release-date">
                  {suggestedMovie.release_date}
                </div>
                <div className="mood-indicator">{selectedMood}</div>
              </div>

              <div className="movie-overview">{suggestedMovie.overview}</div>

              <button
                onClick={() => genRandomMovie()}
                className="regenerate-button"
              >
                Regenerate 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No movie selected state */}
      {!selectedMood && (
        <div className="no-movie-state">
          <div className="icon">🎭</div>
          <p>Select a mood above to get started!</p>
        </div>
      )}

      {/* No movies found for selected mood */}
      {selectedMood &&
        !isMovieMoodPending &&
        (!moodMovies || moodMovies.length === 0) && (
          <div className="no-movie-state">
            <div className="icon">😞</div>
            <p>No movies found for mood: {selectedMood}</p>
          </div>
        )}
    </div>
  )
}

export default Suggestion

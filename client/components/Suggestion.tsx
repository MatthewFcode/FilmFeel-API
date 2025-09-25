import { useState, useEffect } from 'react'
import { useMoviesByMood, useAllMoods } from '../hooks/useMovies.ts'
import LoadingSpinner from './Loading.tsx'
function Suggestion() {
  const [selectedMood, setSelectedMood] = useState('')
  const [suggestedMovie, setSuggestedMovie] = useState()

  const {
    data: moods,
    isError: isMoodError,
    isPending: isMoodPending,
  } = useAllMoods()

  const {
    data: moodMovies,
    isError: isMovieMoodError,
    isPending: isMovieMoodPending,
  } = useMoviesByMood(selectedMood)

  if (isMoodError || isMovieMoodError) {
    return <div>...Error Loading Data</div>
  }

  if (isMoodPending || isMovieMoodPending) {
    return <LoadingSpinner />
  }

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood)
    setSuggestedMovie(null)
  }

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

  return (
    <div>
      <div>
        <h1>Film Suggestion Generator</h1>
        <p>
          Click a mood tag from below and get a film recomendation generated
          from our database 🍿
        </p>
        <p>Press the regenerate button if you dont like the look of it 🫡</p>
      </div>
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
      {suggestedMovie && (
        <div>
          <h2>sug</h2>
        </div>
      )}
    </div>
  )
}

export default Suggestion

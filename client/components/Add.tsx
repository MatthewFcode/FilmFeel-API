import { useAddMovie } from '../hooks/useMovies.ts'
import { FormEvent, useState } from 'react'

function Add() {
  const [titleInput, setTitleInput] = useState('')
  const [moodInput, setMoodInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const addMovie = useAddMovie()

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      await addMovie.mutateAsync({ title: titleInput, mood: moodInput })
      setTitleInput('')
      setMoodInput('')
      setMessage({
        type: 'success',
        text: '🎬 Movie added successfully! Thanks for contributing to our database!',
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'title') {
      setTitleInput(value)
    } else if (name === 'mood') {
      setMoodInput(value)
    }
  }

  return (
    <div className="add-form-container">
      {/* Header Section */}
      <div className="form-header">
        <h1>Contribute to our Database❗</h1>
        <h2>What do we need from you?</h2>
        <p>
          It is simple. We just need the title of a movie you watched and the
          mood you were in before you watched and then we enrich this data and
          make it available to the masses.
        </p>
        <p>For us this ensures API data that is interactive and reliable💪</p>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h1>Add a Film</h1>

        {/* Success/Error Messages */}
        {message.text && (
          <div className={`form-message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleAdd}>
          {/* Title Input */}
          <div className="form-group">
            <div className="input-group">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={titleInput}
                onChange={handleChange}
                placeholder="Enter the movie title you watched..."
                required
                disabled={isSubmitting}
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          {/* Mood Input */}
          <div className="form-group">
            <div className="input-group">
              <label htmlFor="mood">Your Mood</label>
              <input
                type="text"
                name="mood"
                id="mood"
                value={moodInput}
                onChange={handleChange}
                placeholder="What mood were you in when you decided to watch this film..."
                required
                disabled={isSubmitting}
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Movie...' : '🎬 Add to Database'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add

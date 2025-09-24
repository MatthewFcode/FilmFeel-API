import { useAllMoods } from '../hooks/useMovies.ts'
import LoadingSpinner from './Loading.tsx'
function Docs() {
  const { data: moods, isError, isPending } = useAllMoods()

  if (isError) {
    return <div>...Error Loading Mood Tags</div>
  }

  if (isPending) {
    return <LoadingSpinner />
  }

  const structure = `{
  id: number
  title: string
  rating: number
  overview: string
  release_date: string 
  poster: string
  language: string 
  mood: string
}`

  const example = `{
  "id": 1,
  "title": "Inception",
  "rating": 8.37,
  "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible:, the implantation of another person's idea into a target's subconscious.",
  "release_date": "2010-07-15",
  "poster": "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", 
  "language": "en",
  "mood": "Angry"
}`
  return (
    <div>
      <h1>API Docs | Documentation</h1>
      <h3>About</h3>
      <p>
        This is a multi purposed REST API that lets you make GET and POST
        request to our API. We group our data with mood tags that groups a list
        films and their associated mood tags that real people were in when they
        decided to watch these films. When you input the name of the movie you
        watched and the mood you were in it is added to our API along with alot
        of other data about that film that we take care of 😉 What this means?
        We have quality data from real people and we are keeping it freely
        available to you!
      </p>
      <h3>How to use❓ | Requests and Endpoints</h3>
      <p>Requesting all the data: </p>
      <p>Requesting data by tag: </p>
      <p>
        The API can take a get request with no API tag and then return all the
        data in the API. Adding a tag to the query will give you back all the
        films with that tag.
      </p>
      <h4>Structure</h4>
      <pre>{structure}</pre>
      <h4>Shape of the returned data</h4>
      <pre>{example}</pre>

      <h3>Mood Tags that for grouping our API data</h3>
      {moods?.map((mood, index) => (
        <li key={index}>{mood}</li>
      ))}

      <h3>CORS (Cross Origin Resource Sharing)</h3>
      <p>
        We do not have any CORS restrictions on our API meaning that developers
      </p>
    </div>
  )
}

export default Docs

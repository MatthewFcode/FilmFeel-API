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
  "overview": "Cobb, a skilled thief who commits corporate espionage.",
  "release_date": "2010-07-15",
  "poster": "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  "language": "en",
  "mood": "Angry"
}`

  return (
    <div>
      <h1>API Docs | Documentation 📝</h1>

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
      <p>
        Requesting all the data:{' '}
        <pre>
          <code>GET https://filmfeel-api.onrender.com/api/v1/movies</code>
        </pre>
      </p>
      <p>
        Requesting data by tag:{' '}
        <pre>
          <code>GET https://filmfeel-api.onrender.com/api/v1/movies/Sad</code>
        </pre>
        (Sad is an example of a mood)
      </p>
      <p>
        The API can take a get request with no API tag and then return all the
        data in the API. Adding a tag to the query will give you back all the
        films with that tag.
      </p>

      <h4>Structure</h4>
      <pre>
        <code>{structure}</code>
      </pre>

      <h4>Shape of the returned data</h4>
      <pre>
        <code>{example}</code>
      </pre>

      <h3>Mood Tags for grouping our API data</h3>
      <div className="mood-tags-container">
        {moods?.map((mood, index) => (
          <span key={index} className="mood-tag">
            {mood}
          </span>
        ))}
      </div>

      <h3 id="cors">CORS (Cross Origin Resource Sharing)</h3>
      <p>
        CORS is a browser security feature that controls whether a website
        running on one domain is allowed to request resources from a different
        domain.
      </p>
      <p>
        For the FilmFeels API, there are no CORS restrictions in place. This
        means:
      </p>
      <ul>
        <li>
          Any client (a browser, mobile app, or another server) can call the
          API.
        </li>
        <li>
          You dont need to worry about providing extra headers or authentication
          just to get data.
        </li>
        <li>The API is completely open for developers to use freely.</li>
      </ul>
      <p>
        Because the API is open, its very easy to test, prototype, and integrate
        into projects. If you plan to build something in production on top of
        this, you may still want to add your own security layers (such as rate
        limiting or authentication) in your app to prevent misuse.
      </p>
    </div>
  )
}

export default Docs

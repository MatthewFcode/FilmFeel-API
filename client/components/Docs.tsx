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
  return (
    <div>
      <h1>Documentation</h1>
      <h3>About</h3>
      <p>
        This is a multi purposed REST API that lets you make GET and POST
        request to our API. We group our data with mood tags that groups a list
        movies and their associated mood tags that real people were in when they
        decided to watch these movies. When you input the name of the movie you
        watched and the mood you were in it is added to our API along with alot
        of other data about that film that we take care of 😉 What this means?
        We have quality data from real people and we are keeping it freely
        available to you!
      </p>
      <h3>How to use❓</h3>
      <p></p>
      <h3>Mood Tags that for grouping our API data</h3>
      {moods.map((mood, index) => (
        <li>{mood.mood}</li>
      ))}

      <h3>CORS (Cross Origin Resource Sharing)</h3>
      <p>
        We do not have any CORS restrictions on our API meaning that developers
      </p>
    </div>
  )
}

export default Docs

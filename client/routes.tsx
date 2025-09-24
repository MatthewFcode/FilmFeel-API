import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Docs from './components/Docs.tsx'
import Suggestion from './components/Suggestion.tsx'
import Add from './components/Add.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/documentation" element={<Docs />} />
    <Route path="/suggestion" element={<Suggestion />} />
    <Route path="/add-film" element={<Add />} />
  </Route>,
)
export default routes

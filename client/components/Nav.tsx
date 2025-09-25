import { Link } from 'react-router'
import { HashLink } from 'react-router-hash-link'

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <h2>Film Feels API 🎞️</h2>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>
        <li>
          <HashLink smooth to="/documentation#cors">
            CORS Restrictions
          </HashLink>
        </li>
        <li>
          <Link to="/add-film">Add a Film</Link>
        </li>
        <li>
          <Link to="/suggestion">Film Suggestion</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

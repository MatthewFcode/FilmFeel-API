import { Outlet } from 'react-router'
import Nav from './Nav.tsx'

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App

import { Outlet } from 'react-router'
import Nav from './Nav.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

function App() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket('wss://filmfeels.borb.nz/')

    ws.onopen = () => {
      console.log('Websocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'database_change') {
        queryClient.invalidateQueries({ queryKey: ['all-moods'] })
      }
    }
  })

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

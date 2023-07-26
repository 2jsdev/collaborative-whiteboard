import React, { useEffect } from 'react'
import WhiteboardPage from './features/whiteboard/pages/WhiteboardPage'
import { connectWithSocketServer } from './features/whiteboard/services/socketConnection'

const App: React.FC = () => {

  // useEffect(() => {
  //   connectWithSocketServer()
  // }, [])

  return (
    <>
      <WhiteboardPage/>
    </>
  )
}

export default App

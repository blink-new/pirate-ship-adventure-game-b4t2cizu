import { useState } from 'react'
import { GameScreen } from './components/GameScreen'
import { StartScreen } from './components/StartScreen'
import { GameProvider } from './contexts/GameContext'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <GameProvider>
      <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-blue-600 overflow-hidden">
        {!gameStarted ? (
          <StartScreen onStart={() => setGameStarted(true)} />
        ) : (
          <GameScreen />
        )}
      </div>
    </GameProvider>
  )
}

export default App
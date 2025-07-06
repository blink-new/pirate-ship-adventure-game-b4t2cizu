import { useEffect, useCallback, useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import { GameMap } from './GameMap'
import { ShipControls } from './ShipControls'
import { CrewPanel } from './CrewPanel'
import { GameHUD } from './GameHUD'
import { IslandScene } from './IslandScene'
import { VictoryScreen } from './VictoryScreen'
import { EnemyAI } from './EnemyAI'

export function GameScreen() {
  const { state, dispatch } = useGame()
  const [keys, setKeys] = useState<Set<string>>(new Set())

  // Handle keyboard input for ship movement
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setKeys(prev => new Set(prev).add(event.key.toLowerCase()))
  }, [])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setKeys(prev => {
      const newKeys = new Set(prev)
      newKeys.delete(event.key.toLowerCase())
      return newKeys
    })
  }, [])

  // Ship movement logic
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (state.gamePhase !== 'sailing') return

      let newX = state.ship.x
      let newY = state.ship.y
      let newRotation = state.ship.rotation

      // Movement controls
      if (keys.has('w') || keys.has('arrowup')) {
        newX += Math.cos(newRotation * Math.PI / 180) * 2
        newY += Math.sin(newRotation * Math.PI / 180) * 2
      }
      if (keys.has('s') || keys.has('arrowdown')) {
        newX -= Math.cos(newRotation * Math.PI / 180) * 1
        newY -= Math.sin(newRotation * Math.PI / 180) * 1
      }
      if (keys.has('a') || keys.has('arrowleft')) {
        newRotation -= 3
      }
      if (keys.has('d') || keys.has('arrowright')) {
        newRotation += 3
      }

      // Boundary checks
      newX = Math.max(20, Math.min(980, newX))
      newY = Math.max(20, Math.min(580, newY))

      // Check if reached destination
      const distance = Math.sqrt(
        Math.pow(newX - state.destination.x, 2) + 
        Math.pow(newY - state.destination.y, 2)
      )

      if (distance < 50 && !state.islandReached) {
        dispatch({ type: 'REACH_ISLAND' })
        dispatch({ type: 'ADD_MESSAGE', payload: 'Ahoy! You\'ve reached the treasure island!' })
      }

      dispatch({
        type: 'MOVE_SHIP',
        payload: { x: newX, y: newY, rotation: newRotation }
      })
    }, 16) // ~60 FPS

    return () => clearInterval(gameLoop)
  }, [keys, state.ship, state.gamePhase, state.destination, state.islandReached, dispatch])

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Crew AI messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (state.gamePhase !== 'sailing') return

      const messages = [
        'Captain Jack: "Steady as she goes, Captain!"',
        'Gunner Pete: "Cannons ready for battle!"',
        'Lookout Sam: "I see clear waters ahead!"',
        'Captain Jack: "The treasure island draws near!"',
        'Gunner Pete: "Watch out for enemy ships!"',
        'Lookout Sam: "Storm clouds on the horizon!"'
      ]

      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      dispatch({ type: 'ADD_MESSAGE', payload: randomMessage })
    }, 5000)

    return () => clearInterval(messageInterval)
  }, [state.gamePhase, dispatch])

  if (state.gamePhase === 'victory') {
    return <VictoryScreen />
  }

  if (state.gamePhase === 'island') {
    return <IslandScene />
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-400 via-blue-500 to-blue-700 overflow-hidden">
      {/* Game World */}
      <GameMap />
      
      {/* Enemy AI */}
      <EnemyAI />
      
      {/* UI Overlays */}
      <GameHUD />
      <CrewPanel />
      <ShipControls />
      
      {/* Cloud effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-20 left-1/2 w-40 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}
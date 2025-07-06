import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Map, X } from 'lucide-react'

export function GameMap() {
  const { state, dispatch } = useGame()

  return (
    <div className="relative w-full h-full">
      {/* Water texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Player Ship */}
      <div
        className="absolute w-12 h-12 text-4xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-linear"
        style={{
          left: `${state.ship.x}px`,
          top: `${state.ship.y}px`,
          transform: `translate(-50%, -50%) rotate(${state.ship.rotation}deg)`,
        }}
      >
        ⛵
      </div>

      {/* Destination Island */}
      <div
        className="absolute w-16 h-16 text-5xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
        style={{
          left: `${state.destination.x}px`,
          top: `${state.destination.y}px`,
        }}
      >
        🏝️
      </div>

      {/* Path indicator */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <path
              id="path-to-island"
              d={`M ${state.ship.x} ${state.ship.y} Q ${(state.ship.x + state.destination.x) / 2} ${(state.ship.y + state.destination.y) / 2 - 50} ${state.destination.x} ${state.destination.y}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </defs>
          <use href="#path-to-island" className="animate-pulse" />
        </svg>
      </div>

      {/* Enemies */}
      {state.enemies.map((enemy) => (
        <div
          key={enemy.id}
          className="absolute w-10 h-10 text-3xl transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
          style={{
            left: `${enemy.x}px`,
            top: `${enemy.y}px`,
            transform: `translate(-50%, -50%) rotate(${enemy.rotation}deg)`,
          }}
        >
          {enemy.type === 'pirate' ? '🏴‍☠️' : '⛈️'}
        </div>
      ))}

      {/* Map Toggle Button */}
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_MAP' })}
        className="absolute top-4 left-4 bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
        size="sm"
      >
        <Map className="w-4 h-4 mr-2" />
        Map
      </Button>

      {/* Map Overlay */}
      {state.mapVisible && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-amber-100 p-6 rounded-lg border-4 border-amber-600 shadow-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-amber-900">Treasure Map</h3>
              <Button
                onClick={() => dispatch({ type: 'TOGGLE_MAP' })}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <p className="text-amber-800 font-medium">
                  Distance to treasure: {Math.round(state.distanceToDestination)} leagues
                </p>
              </div>
              
              <div className="bg-white/50 p-3 rounded">
                <p className="text-sm text-amber-700">
                  <span className="font-semibold">Captain's Log:</span> Follow the path to the treasure island. 
                  Beware of rival pirates and storms along the way!
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">⛵ → 🏝️</div>
                  <p className="text-xs text-amber-600">Your ship → Treasure Island</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Distance indicator */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        Distance: {Math.round(state.distanceToDestination)} leagues
      </div>
    </div>
  )
}
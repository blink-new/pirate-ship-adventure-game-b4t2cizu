import { useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Pickaxe, Treasure, ArrowLeft } from 'lucide-react'

export function IslandScene() {
  const { state, dispatch } = useGame()
  const [digging, setDigging] = useState(false)
  const [digProgress, setDigProgress] = useState(0)

  const handleDigTreasure = () => {
    if (digging) return

    setDigging(true)
    setDigProgress(0)

    const digInterval = setInterval(() => {
      setDigProgress(prev => {
        if (prev >= 100) {
          clearInterval(digInterval)
          setDigging(false)
          dispatch({ type: 'FIND_TREASURE' })
          dispatch({ type: 'ADD_MESSAGE', payload: 'Treasure found! 1000 coins added to your chest!' })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleReturnToSea = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-green-300 flex items-center justify-center p-4">
      {/* Island background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-400">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-yellow-200 via-orange-200 to-green-300"></div>
        
        {/* Palm trees */}
        <div className="absolute bottom-20 left-10 text-8xl">🌴</div>
        <div className="absolute bottom-24 right-20 text-9xl">🌴</div>
        <div className="absolute bottom-32 left-1/3 text-7xl">🌴</div>
        <div className="absolute bottom-28 right-1/3 text-8xl">🌴</div>
        
        {/* Beach elements */}
        <div className="absolute bottom-10 left-1/4 text-4xl">🐚</div>
        <div className="absolute bottom-12 right-1/4 text-3xl">⭐</div>
        <div className="absolute bottom-8 left-2/3 text-4xl">🦀</div>
        
        {/* Treasure chest area */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-6xl">
          {state.treasureFound ? '💰' : '📦'}
        </div>
      </div>

      {/* UI Card */}
      <Card className="relative z-10 max-w-md w-full bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-600 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-amber-900 flex items-center justify-center">
            <Treasure className="w-8 h-8 mr-2" />
            Treasure Island
          </CardTitle>
          <p className="text-amber-800">
            You've reached the legendary treasure island!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!state.treasureFound ? (
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🏝️</div>
              
              <div className="space-y-2">
                <p className="text-amber-800">
                  The treasure is buried somewhere on this island. 
                  Use your tools to dig it up!
                </p>
                
                {digging && (
                  <div className="space-y-2">
                    <Progress value={digProgress} className="w-full" />
                    <p className="text-sm text-amber-700">
                      Digging... {Math.round(digProgress)}%
                    </p>
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleDigTreasure}
                disabled={digging}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-6 text-lg shadow-lg"
              >
                <Pickaxe className="w-5 h-5 mr-2" />
                {digging ? 'Digging...' : 'Dig for Treasure'}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-6xl animate-pulse">💰</div>
              
              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-4 rounded-lg border-2 border-yellow-400">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  Treasure Found!
                </h3>
                <p className="text-yellow-700 mb-2">
                  You've discovered a magnificent treasure chest!
                </p>
                <p className="text-2xl font-bold text-yellow-800">
                  +1000 Coins! 💰
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-amber-800">
                  Congratulations, Captain! Your adventure is complete.
                </p>
                
                <Button
                  onClick={handleReturnToSea}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3 px-6 text-lg shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Return to Sea
                </Button>
              </div>
            </div>
          )}
          
          {/* Current stats */}
          <div className="bg-white/50 p-3 rounded-lg border border-amber-300">
            <div className="flex justify-between items-center">
              <span className="text-amber-800 font-medium">Total Coins:</span>
              <span className="text-amber-900 font-bold">{state.coins}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
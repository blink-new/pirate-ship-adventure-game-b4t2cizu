import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, RotateCcw, Star } from 'lucide-react'

export function VictoryScreen() {
  const { state, dispatch } = useGame()

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center p-4">
      {/* Celebration effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🎉</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce delay-300">🎊</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce delay-500">✨</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-700">🌟</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce delay-1000">🎆</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce delay-1200">🎇</div>
      </div>

      <Card className="relative z-10 max-w-2xl w-full bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-500 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="w-20 h-20 text-yellow-600 animate-pulse" />
          </div>
          <CardTitle className="text-5xl font-bold text-yellow-800 bg-gradient-to-r from-yellow-700 to-orange-600 bg-clip-text text-transparent">
            Victory!
          </CardTitle>
          <p className="text-2xl text-yellow-700 font-bold">
            Congratulations, Captain! 🏴‍☠️
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-8xl">🏆</div>
            
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-lg border-4 border-yellow-400">
              <h3 className="text-3xl font-bold text-yellow-800 mb-4">
                Adventure Complete!
              </h3>
              <p className="text-lg text-yellow-700 mb-4">
                You have successfully navigated the treacherous seas, avoided enemy pirates and storms, 
                reached the treasure island, and discovered the legendary treasure!
              </p>
              <div className="text-4xl font-bold text-yellow-800 mb-4">
                💰 {state.coins} Coins Earned! 💰
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/50 p-4 rounded-lg border-2 border-blue-300">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-blue-900">Navigation</h4>
                <p className="text-sm text-blue-800">Successfully reached the island</p>
              </div>
              
              <div className="bg-white/50 p-4 rounded-lg border-2 border-red-300">
                <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-bold text-red-900">Combat</h4>
                <p className="text-sm text-red-800">Survived enemy encounters</p>
              </div>
              
              <div className="bg-white/50 p-4 rounded-lg border-2 border-green-300">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-900">Treasure</h4>
                <p className="text-sm text-green-800">Found the legendary treasure</p>
              </div>
            </div>
            
            <div className="bg-amber-100 p-4 rounded-lg border-2 border-amber-400">
              <h3 className="font-bold text-amber-900 mb-2">Your Crew Says:</h3>
              <div className="space-y-1 text-sm text-amber-800">
                <p>• <span className="font-semibold">Captain Jack:</span> "Well done, Captain! The finest voyage I've ever been on!"</p>
                <p>• <span className="font-semibold">Gunner Pete:</span> "Our cannons served us well! Ready for the next adventure!"</p>
                <p>• <span className="font-semibold">Lookout Sam:</span> "The horizon calls for more adventures, Captain!"</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              onClick={handlePlayAgain}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 px-8 text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Sail Again! ⚓
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
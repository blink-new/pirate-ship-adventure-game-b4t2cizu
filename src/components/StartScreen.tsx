import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Anchor, Map, Sword } from 'lucide-react'

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-600 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Anchor className="w-16 h-16 text-amber-700" />
          </div>
          <CardTitle className="text-4xl font-bold text-amber-900 bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            Pirate Ship Adventure
          </CardTitle>
          <p className="text-lg text-amber-800 font-medium">
            Ahoy Captain! Your treasure awaits on the distant island!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
              <Map className="w-8 h-8 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Navigate</h3>
              <p className="text-sm text-center text-blue-800">
                Use your map to sail to the treasure island
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
              <Sword className="w-8 h-8 text-red-600" />
              <h3 className="font-semibold text-red-900">Battle</h3>
              <p className="text-sm text-center text-red-800">
                Avoid rival pirates and dangerous storms
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
              <span className="text-2xl">💰</span>
              <h3 className="font-semibold text-yellow-900">Treasure</h3>
              <p className="text-sm text-center text-yellow-800">
                Dig up treasure and earn 1000 coins!
              </p>
            </div>
          </div>
          
          <div className="bg-amber-100 p-4 rounded-lg border-2 border-amber-300">
            <h3 className="font-bold text-amber-900 mb-2">Your Crew:</h3>
            <div className="space-y-1 text-sm text-amber-800">
              <p>• <span className="font-semibold">Captain Jack</span> - Navigator</p>
              <p>• <span className="font-semibold">Gunner Pete</span> - Weapons Master</p>
              <p>• <span className="font-semibold">Lookout Sam</span> - Scout</p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              onClick={onStart}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-8 text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Set Sail! ⚓
            </Button>
            
            <p className="text-sm text-amber-700">
              Use WASD or Arrow Keys to steer your ship
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
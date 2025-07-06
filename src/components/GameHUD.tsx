import { useGame } from '@/contexts/GameContext'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Coins } from 'lucide-react'

export function GameHUD() {
  const { state } = useGame()

  return (
    <div className="absolute top-4 right-4 space-y-2 z-40">
      {/* Health Bar */}
      <Card className="bg-black/50 backdrop-blur-sm border-red-500/50">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-400" />
            <div className="flex-1 min-w-[120px]">
              <Progress value={state.health} className="h-2" />
            </div>
            <span className="text-white text-sm font-medium">{state.health}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Coins */}
      <Card className="bg-black/50 backdrop-blur-sm border-yellow-500/50">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white text-sm font-medium">{state.coins} coins</span>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      {state.messages.length > 0 && (
        <Card className="bg-black/50 backdrop-blur-sm border-blue-500/50 max-w-xs">
          <CardContent className="p-3">
            <div className="space-y-1">
              {state.messages.slice(-3).map((message, index) => (
                <p key={index} className="text-white text-xs leading-tight">
                  {message}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
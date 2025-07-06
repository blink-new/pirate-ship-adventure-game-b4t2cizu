import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

export function ShipControls() {
  return (
    <Card className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm border-blue-500/50">
      <CardContent className="p-3">
        <div className="text-center">
          <p className="text-white text-xs mb-2 font-medium">Ship Controls</p>
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded">
              <ArrowUp className="w-4 h-4 text-white" />
            </div>
            <div></div>
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-white text-xs mt-2">or WASD</p>
        </div>
      </CardContent>
    </Card>
  )
}
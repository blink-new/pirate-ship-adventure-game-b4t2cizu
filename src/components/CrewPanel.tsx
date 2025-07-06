import { useGame } from '@/contexts/GameContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'

export function CrewPanel() {
  const { state } = useGame()

  return (
    <Card className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm border-amber-500/50 max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Crew
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {state.crew.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white text-xs font-medium">{member.name}</p>
                <p className="text-gray-300 text-xs">{member.role}</p>
              </div>
              <Badge
                variant={member.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
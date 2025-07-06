import { useEffect } from 'react'
import { useGame } from '@/contexts/GameContext'

export function EnemyAI() {
  const { state, dispatch } = useGame()

  // Spawn enemies periodically
  useEffect(() => {
    if (state.gamePhase !== 'sailing') return

    const spawnInterval = setInterval(() => {
      // Don't spawn too many enemies
      if (state.enemies.length >= 4) return

      // Randomly spawn pirate ships or storms
      const enemyType = Math.random() < 0.6 ? 'pirate' : 'storm'
      const id = `enemy-${Date.now()}-${Math.random()}`
      
      // Spawn at random edge of screen
      const side = Math.floor(Math.random() * 4)
      let x, y
      
      switch (side) {
        case 0: // top
          x = Math.random() * 1000
          y = -50
          break
        case 1: // right
          x = 1050
          y = Math.random() * 600
          break
        case 2: // bottom
          x = Math.random() * 1000
          y = 650
          break
        case 3: // left
          x = -50
          y = Math.random() * 600
          break
        default:
          x = 0
          y = 0
      }

      const enemy = {
        id,
        x,
        y,
        rotation: Math.random() * 360,
        type: enemyType,
        health: enemyType === 'pirate' ? 100 : 50,
        speed: enemyType === 'pirate' ? 1 : 0.5
      }

      dispatch({ type: 'SPAWN_ENEMY', payload: enemy })
    }, 8000) // Spawn every 8 seconds

    return () => clearInterval(spawnInterval)
  }, [state.gamePhase, state.enemies.length, dispatch])

  // Move enemies and check collisions
  useEffect(() => {
    if (state.gamePhase !== 'sailing') return

    const moveInterval = setInterval(() => {
      state.enemies.forEach(enemy => {
        // Move towards player or randomly
        const dx = state.ship.x - enemy.x
        const dy = state.ship.y - enemy.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // If too far from play area, remove enemy
        if (distance > 800) {
          dispatch({ type: 'REMOVE_ENEMY', payload: enemy.id })
          return
        }

        // Check collision with player
        if (distance < 40) {
          const damage = enemy.type === 'pirate' ? 15 : 10
          dispatch({ type: 'DAMAGE_SHIP', payload: damage })
          dispatch({ type: 'REMOVE_ENEMY', payload: enemy.id })
          
          const message = enemy.type === 'pirate' 
            ? 'Gunner Pete: "We\'ve been hit by pirates!"' 
            : 'Lookout Sam: "Storm damage to the ship!"'
          dispatch({ type: 'ADD_MESSAGE', payload: message })
          return
        }

        // Move enemy (simple AI - move towards player for pirates, random for storms)
        let newX = enemy.x
        let newY = enemy.y

        if (enemy.type === 'pirate' && distance > 50) {
          // Move towards player
          newX += (dx / distance) * enemy.speed
          newY += (dy / distance) * enemy.speed
        } else {
          // Random movement for storms or when too close
          newX += (Math.random() - 0.5) * enemy.speed * 2
          newY += (Math.random() - 0.5) * enemy.speed * 2
        }

        // Update enemy position
        dispatch({ 
          type: 'UPDATE_ENEMY', 
          payload: { id: enemy.id, x: newX, y: newY, rotation: enemy.rotation }
        })
      })
    }, 100) // Move every 100ms

    return () => clearInterval(moveInterval)
  }, [state.gamePhase, state.enemies, state.ship, dispatch])

  return null // This component only handles AI logic
}
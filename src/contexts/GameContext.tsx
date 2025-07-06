import React, { createContext, useContext, useReducer } from 'react'

export interface ShipPosition {
  x: number
  y: number
  rotation: number
}

export interface Enemy {
  id: string
  x: number
  y: number
  rotation: number
  type: 'pirate' | 'storm'
  health: number
  speed: number
}

export interface CrewMember {
  id: string
  name: string
  role: 'navigator' | 'gunner' | 'lookout'
  health: number
  status: 'active' | 'injured' | 'busy'
  message?: string
}

export interface GameState {
  ship: ShipPosition
  enemies: Enemy[]
  crew: CrewMember[]
  coins: number
  health: number
  gamePhase: 'sailing' | 'island' | 'treasure' | 'victory'
  mapVisible: boolean
  destination: { x: number; y: number }
  distanceToDestination: number
  islandReached: boolean
  treasureFound: boolean
  messages: string[]
}

type GameAction =
  | { type: 'MOVE_SHIP'; payload: { x: number; y: number; rotation: number } }
  | { type: 'SPAWN_ENEMY'; payload: Enemy }
  | { type: 'REMOVE_ENEMY'; payload: string }
  | { type: 'UPDATE_ENEMY'; payload: { id: string; x: number; y: number; rotation: number } }
  | { type: 'DAMAGE_SHIP'; payload: number }
  | { type: 'HEAL_SHIP'; payload: number }
  | { type: 'TOGGLE_MAP' }
  | { type: 'REACH_ISLAND' }
  | { type: 'FIND_TREASURE' }
  | { type: 'ADD_COINS'; payload: number }
  | { type: 'UPDATE_CREW'; payload: CrewMember[] }
  | { type: 'ADD_MESSAGE'; payload: string }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  ship: { x: 50, y: 50, rotation: 0 },
  enemies: [],
  crew: [
    { id: '1', name: 'Captain Jack', role: 'navigator', health: 100, status: 'active' },
    { id: '2', name: 'Gunner Pete', role: 'gunner', health: 100, status: 'active' },
    { id: '3', name: 'Lookout Sam', role: 'lookout', health: 100, status: 'active' },
  ],
  coins: 0,
  health: 100,
  gamePhase: 'sailing',
  mapVisible: false,
  destination: { x: 800, y: 200 },
  distanceToDestination: 0,
  islandReached: false,
  treasureFound: false,
  messages: []
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE_SHIP': {
      const newShip = { ...action.payload }
      const distance = Math.sqrt(
        Math.pow(newShip.x - state.destination.x, 2) + 
        Math.pow(newShip.y - state.destination.y, 2)
      )
      
      return {
        ...state,
        ship: newShip,
        distanceToDestination: distance
      }
    }
    
    case 'SPAWN_ENEMY':
      return {
        ...state,
        enemies: [...state.enemies, action.payload]
      }
    
    case 'REMOVE_ENEMY':
      return {
        ...state,
        enemies: state.enemies.filter(e => e.id !== action.payload)
      }
    
    case 'UPDATE_ENEMY':
      return {
        ...state,
        enemies: state.enemies.map(e => 
          e.id === action.payload.id 
            ? { ...e, x: action.payload.x, y: action.payload.y, rotation: action.payload.rotation }
            : e
        )
      }
    
    case 'DAMAGE_SHIP':
      return {
        ...state,
        health: Math.max(0, state.health - action.payload)
      }
    
    case 'HEAL_SHIP':
      return {
        ...state,
        health: Math.min(100, state.health + action.payload)
      }
    
    case 'TOGGLE_MAP':
      return {
        ...state,
        mapVisible: !state.mapVisible
      }
    
    case 'REACH_ISLAND':
      return {
        ...state,
        gamePhase: 'island',
        islandReached: true
      }
    
    case 'FIND_TREASURE':
      return {
        ...state,
        gamePhase: 'victory',
        treasureFound: true,
        coins: state.coins + 1000
      }
    
    case 'ADD_COINS':
      return {
        ...state,
        coins: state.coins + action.payload
      }
    
    case 'UPDATE_CREW':
      return {
        ...state,
        crew: action.payload
      }
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages.slice(-4), action.payload]
      }
    
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      }
    
    case 'RESET_GAME':
      return initialState
    
    default:
      return state
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
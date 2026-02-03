// Game state management
export interface Decision {
  sceneId: string;
  choiceId: string;
  choiceText: string;
  consequence: string;
  chaosLevel: number;
  timestamp: number;
}

export interface GameState {
  currentSceneId: string;
  decisions: Decision[];
  totalChaos: number;
  startTime: number;
  isComplete: boolean;
  darkMode: boolean;
}

const STORAGE_KEY = 'oafs-adventure-state';

export function getInitialState(): GameState {
  return {
    currentSceneId: 'start',
    decisions: [],
    totalChaos: 0,
    startTime: Date.now(),
    isComplete: false,
    darkMode: false,
  };
}

export function saveGame(state: GameState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function loadGame(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearGame(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getChaosLabel(chaos: number): string {
  if (chaos <= -3) return 'Surprisingly Responsible';
  if (chaos <= 0) return 'Mildly Sensible';
  if (chaos <= 3) return 'Chaotic Energy';
  if (chaos <= 6) return 'Maximum Oaf Mode';
  return 'Legendary Disaster';
}

export function getChaosEmoji(chaos: number): string {
  if (chaos <= -3) return '😇';
  if (chaos <= 0) return '🙂';
  if (chaos <= 3) return '😅';
  if (chaos <= 6) return '🤪';
  return '💀';
}

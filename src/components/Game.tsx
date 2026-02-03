'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getScene, Scene, Choice } from '@/lib/story';
import { GameState, Decision, getInitialState, saveGame, loadGame, clearGame } from '@/lib/gameState';
import Background from './Background';
import DialogueBubble from './DialogueBubble';
import ChoiceButton from './ChoiceButton';
import StoryTracker from './StoryTracker';
import EndingScreen from './EndingScreen';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load game state on mount
  useEffect(() => {
    setMounted(true);
    const saved = loadGame();
    if (saved) {
      setGameState(saved);
    }
  }, []);

  // Update current scene when game state changes
  useEffect(() => {
    const scene = getScene(gameState.currentSceneId);
    setCurrentScene(scene || null);
  }, [gameState.currentSceneId]);

  // Save game state when it changes
  useEffect(() => {
    if (mounted) {
      saveGame(gameState);
    }
  }, [gameState, mounted]);

  const handleChoice = useCallback((choice: Choice) => {
    setIsTransitioning(true);
    
    const newDecision: Decision = {
      sceneId: gameState.currentSceneId,
      choiceId: choice.id,
      choiceText: choice.text,
      consequence: choice.consequence,
      chaosLevel: choice.chaosLevel,
      timestamp: Date.now(),
    };

    // Small delay for transition effect
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentSceneId: choice.nextScene,
        decisions: [...prev.decisions, newDecision],
        totalChaos: prev.totalChaos + choice.chaosLevel,
        isComplete: getScene(choice.nextScene)?.ending !== undefined,
      }));
      setIsTransitioning(false);
    }, 500);
  }, [gameState.currentSceneId]);

  const handleRestart = useCallback(() => {
    clearGame();
    setGameState(getInitialState());
    setIsTransitioning(false);
  }, []);

  if (!mounted || !currentScene) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          🍕
        </motion.div>
      </div>
    );
  }

  // Show ending screen if we've reached an ending
  if (currentScene.ending) {
    return (
      <>
        <Background type={currentScene.background} mood={currentScene.mood} />
        <EndingScreen
          scene={currentScene}
          decisions={gameState.decisions}
          totalChaos={gameState.totalChaos}
          onRestart={handleRestart}
        />
      </>
    );
  }

  return (
    <>
      <Background type={currentScene.background} mood={currentScene.mood} />
      
      {/* Main game container */}
      <div className="relative min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <motion.h1 
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🍕 The Oafs&apos; Adventure
            </motion.h1>
            <div className="flex items-center gap-3">
              <motion.button
                className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                onClick={() => setShowTracker(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📜 Story ({gameState.decisions.length})
              </motion.button>
              <motion.button
                className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Restart
              </motion.button>
            </div>
          </div>
        </header>

        {/* Scene content */}
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Scene Title */}
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {currentScene.title}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </motion.div>

                {/* Narration */}
                <motion.div
                  className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300 italic leading-relaxed">
                    {currentScene.narration}
                  </p>
                </motion.div>

                {/* Dialogue */}
                {currentScene.dialogue && (
                  <div className="mb-8">
                    {currentScene.dialogue.map((line, index) => (
                      <DialogueBubble
                        key={`${currentScene.id}-${index}`}
                        speaker={line.speaker}
                        text={line.text}
                        speakerName={line.speakerName}
                        index={index}
                      />
                    ))}
                  </div>
                )}

                {/* Choices */}
                {currentScene.choices && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-400 text-center mb-4">
                      What do Josiah and Graham do?
                    </p>
                    {currentScene.choices.map((choice, index) => (
                      <ChoiceButton
                        key={choice.id}
                        choice={choice}
                        index={index}
                        onClick={() => handleChoice(choice)}
                        disabled={isTransitioning}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Transition overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 bg-black z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="text-6xl"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                🍕
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Story tracker sidebar */}
      <StoryTracker
        decisions={gameState.decisions}
        totalChaos={gameState.totalChaos}
        isOpen={showTracker}
        onClose={() => setShowTracker(false)}
      />
    </>
  );
}

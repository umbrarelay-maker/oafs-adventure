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

    // Smooth transition
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentSceneId: choice.nextScene,
        decisions: [...prev.decisions, newDecision],
        totalChaos: prev.totalChaos + choice.chaosLevel,
        isComplete: getScene(choice.nextScene)?.ending !== undefined,
      }));
      setIsTransitioning(false);
    }, 600);
  }, [gameState.currentSceneId]);

  const handleRestart = useCallback(() => {
    clearGame();
    setGameState(getInitialState());
    setIsTransitioning(false);
  }, []);

  if (!mounted || !currentScene) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <motion.div
          className="text-[#4a4a4a] font-heading text-xl tracking-widest"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Loading...
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
        {/* Header - minimal and elegant */}
        <header className="fixed top-0 left-0 right-0 z-30 px-6 py-5">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <motion.h1 
              className="font-heading text-[#7a7875] text-sm tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              The Oafs&apos; Adventure
            </motion.h1>
            <div className="flex items-center gap-2">
              <motion.button
                className="px-4 py-2 rounded-lg text-[#6a6865] text-xs tracking-wide
                  hover:text-[#9a9895] hover:bg-[#ffffff05] transition-all duration-300"
                onClick={() => setShowTracker(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                History · {gameState.decisions.length}
              </motion.button>
              <motion.button
                className="px-4 py-2 rounded-lg text-[#6a6865] text-xs tracking-wide
                  hover:text-[#9a9895] hover:bg-[#ffffff05] transition-all duration-300"
                onClick={handleRestart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Restart
              </motion.button>
            </div>
          </div>
        </header>

        {/* Scene content */}
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Scene Title */}
                <motion.div
                  className="mb-10 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl text-[#e8e6e3] mb-4 tracking-tight">
                    {currentScene.title}
                  </h2>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#3a3a3a] to-transparent mx-auto" />
                </motion.div>

                {/* Narration */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p className="text-[#a09d99] leading-[1.9] text-center italic">
                    {currentScene.narration}
                  </p>
                </motion.div>

                {/* Dialogue */}
                {currentScene.dialogue && (
                  <div className="mb-12">
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
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <p className="text-[0.8125rem] text-[#5a5855] text-center mb-6 tracking-wide">
                      What do they do?
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

        {/* Transition overlay - elegant fade */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 bg-[#0f0f0f] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
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

'use client';

import { motion } from 'framer-motion';
import { Scene } from '@/lib/story';
import { Decision, getChaosLabel, getChaosEmoji } from '@/lib/gameState';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface EndingScreenProps {
  scene: Scene;
  decisions: Decision[];
  totalChaos: number;
  onRestart: () => void;
}

export default function EndingScreen({ scene, decisions, totalChaos, onRestart }: EndingScreenProps) {
  const ending = scene.ending!;

  useEffect(() => {
    // Celebration effect on mount
    if (ending.type === 'heroic' || ending.type === 'mildly_successful') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (ending.type === 'bizarre') {
      // Weird confetti for bizarre endings
      confetti({
        particleCount: 100,
        spread: 180,
        shapes: ['circle', 'square'],
        colors: ['#ff0', '#ff00ff', '#00ffff'],
        origin: { y: 0.5 }
      });
    }
  }, [ending.type]);

  const getEndingGradient = () => {
    switch (ending.type) {
      case 'heroic':
        return 'from-yellow-900/30 via-amber-900/30 to-orange-900/30';
      case 'mildly_successful':
        return 'from-green-900/30 via-emerald-900/30 to-teal-900/30';
      case 'bizarre':
        return 'from-purple-900/30 via-fuchsia-900/30 to-pink-900/30';
      case 'catastrophic':
        return 'from-red-900/30 via-rose-900/30 to-pink-900/30';
      default:
        return 'from-gray-900/30 to-gray-800/30';
    }
  };

  const getEndingBorder = () => {
    switch (ending.type) {
      case 'heroic':
        return 'border-yellow-500/50';
      case 'mildly_successful':
        return 'border-green-500/50';
      case 'bizarre':
        return 'border-purple-500/50';
      case 'catastrophic':
        return 'border-red-500/50';
      default:
        return 'border-gray-500/50';
    }
  };

  const getEndingLabel = () => {
    switch (ending.type) {
      case 'heroic':
        return '🏆 HEROIC ENDING';
      case 'mildly_successful':
        return '✨ SUCCESS ENDING';
      case 'bizarre':
        return '🌀 BIZARRE ENDING';
      case 'catastrophic':
        return '💥 CATASTROPHIC ENDING';
      default:
        return '📖 THE END';
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`max-w-2xl w-full rounded-3xl p-8 bg-gradient-to-br ${getEndingGradient()} 
          backdrop-blur-lg border-2 ${getEndingBorder()} shadow-2xl`}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Ending Type Badge */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-bold tracking-wider">
            {getEndingLabel()}
          </span>
        </motion.div>

        {/* Emoji */}
        <motion.div
          className="text-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="text-8xl">{ending.emoji}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {ending.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-center leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {ending.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-3xl mb-1">{getChaosEmoji(totalChaos)}</p>
            <p className="text-sm text-gray-400">Chaos Level</p>
            <p className="font-bold text-white">{getChaosLabel(totalChaos)}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-3xl mb-1">📊</p>
            <p className="text-sm text-gray-400">Decisions Made</p>
            <p className="font-bold text-white">{decisions.length}</p>
          </div>
        </motion.div>

        {/* Play Again Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold 
              text-lg shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Play Again
          </motion.button>
          <p className="text-xs text-gray-500 mt-4">
            There are {4} different endings to discover!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

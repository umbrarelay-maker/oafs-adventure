'use client';

import { motion } from 'framer-motion';
import { Scene } from '@/lib/story';
import { Decision, getChaosLabel } from '@/lib/gameState';
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
    // Subtle celebration for good endings
    if (ending.type === 'heroic' || ending.type === 'mildly_successful') {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#b8a07a', '#8a9dc4', '#a88a9c'],
        disableForReducedMotion: true,
      });
    } else if (ending.type === 'bizarre') {
      confetti({
        particleCount: 40,
        spread: 140,
        shapes: ['circle'],
        colors: ['#6a6a6a', '#8a8a8a', '#4a4a4a'],
        origin: { y: 0.5 },
        disableForReducedMotion: true,
      });
    }
  }, [ending.type]);

  const getEndingStyle = () => {
    switch (ending.type) {
      case 'heroic':
        return {
          bg: 'bg-[#1a1814]/80',
          border: 'border-[#3a3428]/50',
          accent: 'text-[#b8a07a]',
          badge: 'bg-[#2a2418]/60 border-[#3a3428]/40',
        };
      case 'mildly_successful':
        return {
          bg: 'bg-[#141a18]/80',
          border: 'border-[#283a32]/50',
          accent: 'text-[#7aa88a]',
          badge: 'bg-[#182a20]/60 border-[#283a32]/40',
        };
      case 'bizarre':
        return {
          bg: 'bg-[#1a141a]/80',
          border: 'border-[#3a2838]/50',
          accent: 'text-[#a88a9c]',
          badge: 'bg-[#2a1828]/60 border-[#3a2838]/40',
        };
      case 'catastrophic':
        return {
          bg: 'bg-[#1a1414]/80',
          border: 'border-[#3a2828]/50',
          accent: 'text-[#b87a7a]',
          badge: 'bg-[#2a1818]/60 border-[#3a2828]/40',
        };
      default:
        return {
          bg: 'bg-[#161616]/80',
          border: 'border-[#2a2a2a]/50',
          accent: 'text-[#8a8a8a]',
          badge: 'bg-[#1a1a1a]/60 border-[#2a2a2a]/40',
        };
    }
  };

  const getEndingLabel = () => {
    switch (ending.type) {
      case 'heroic':
        return 'Heroic Ending';
      case 'mildly_successful':
        return 'Success';
      case 'bizarre':
        return 'Bizarre Ending';
      case 'catastrophic':
        return 'Catastrophe';
      default:
        return 'The End';
    }
  };

  const style = getEndingStyle();

  return (
    <motion.div
      className="min-h-screen px-6 py-12 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`max-w-lg w-full rounded-2xl p-10 ${style.bg} 
          backdrop-blur-xl border ${style.border}`}
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Ending Type Badge */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-2 rounded-full ${style.badge} border
            text-xs tracking-[0.15em] uppercase ${style.accent}`}>
            {getEndingLabel()}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-heading text-2xl md:text-3xl text-center text-[#e8e6e3] mb-6 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {ending.title}
        </motion.h1>

        {/* Divider */}
        <motion.div 
          className="w-12 h-px bg-[#3a3a3a] mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />

        {/* Description */}
        <motion.p
          className="text-[#a09d99] text-center leading-[1.8] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {ending.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-center p-4 rounded-xl bg-[#ffffff02] border border-[#ffffff08]">
            <p className="text-xs text-[#6a6865] tracking-wide uppercase mb-2">Chaos Level</p>
            <p className="font-heading text-[#c4c2bf]">{getChaosLabel(totalChaos)}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#ffffff02] border border-[#ffffff08]">
            <p className="text-xs text-[#6a6865] tracking-wide uppercase mb-2">Decisions</p>
            <p className="font-heading text-[#c4c2bf]">{decisions.length}</p>
          </div>
        </motion.div>

        {/* Play Again Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl bg-[#ffffff05] border border-[#ffffff10]
              text-[#e0dedb] font-medium tracking-wide
              hover:bg-[#ffffff08] hover:border-[#ffffff15] transition-all duration-300"
            onClick={onRestart}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Play Again
          </motion.button>
          <p className="text-xs text-[#4a4845] mt-6 tracking-wide">
            4 different endings to discover
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

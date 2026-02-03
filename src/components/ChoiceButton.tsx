'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/lib/story';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onClick: () => void;
  disabled?: boolean;
}

export default function ChoiceButton({ choice, index, onClick, disabled }: ChoiceButtonProps) {
  const getChaosColor = () => {
    if (choice.chaosLevel <= -1) return 'hover:border-green-400 hover:bg-green-900/30';
    if (choice.chaosLevel === 0) return 'hover:border-yellow-400 hover:bg-yellow-900/30';
    if (choice.chaosLevel === 1) return 'hover:border-orange-400 hover:bg-orange-900/30';
    return 'hover:border-red-400 hover:bg-red-900/30';
  };

  const getChaosIndicator = () => {
    if (choice.chaosLevel <= -1) return '😇';
    if (choice.chaosLevel === 0) return '🤔';
    if (choice.chaosLevel === 1) return '😅';
    return '🔥';
  };

  return (
    <motion.button
      className={`w-full text-left p-4 rounded-xl border-2 border-white/20 bg-white/5 
        backdrop-blur-sm transition-all duration-300 ${getChaosColor()}
        disabled:opacity-50 disabled:cursor-not-allowed group`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
      whileHover={{ scale: 1.02, x: 10 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl group-hover:scale-125 transition-transform">
          {getChaosIndicator()}
        </span>
        <div className="flex-1">
          <p className="text-white font-medium">{choice.text}</p>
          <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {choice.consequence}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

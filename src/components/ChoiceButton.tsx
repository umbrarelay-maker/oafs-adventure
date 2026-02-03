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
  // Subtle visual indicator based on chaos level
  const getChaosStyle = () => {
    if (choice.chaosLevel <= -1) return {
      hover: 'hover:border-[#4a6a5a]/40 hover:bg-[#1a2a22]/30',
      indicator: 'bg-[#3a5a4a]/30',
      dot: 'bg-[#6a9a7a]'
    };
    if (choice.chaosLevel === 0) return {
      hover: 'hover:border-[#5a5a4a]/40 hover:bg-[#2a2a1a]/30',
      indicator: 'bg-[#4a4a3a]/30',
      dot: 'bg-[#9a9a6a]'
    };
    if (choice.chaosLevel === 1) return {
      hover: 'hover:border-[#6a5a4a]/40 hover:bg-[#2a221a]/30',
      indicator: 'bg-[#5a4a3a]/30',
      dot: 'bg-[#b89a6a]'
    };
    return {
      hover: 'hover:border-[#6a4a4a]/40 hover:bg-[#2a1a1a]/30',
      indicator: 'bg-[#5a3a3a]/30',
      dot: 'bg-[#b86a6a]'
    };
  };

  const style = getChaosStyle();

  return (
    <motion.button
      className={`w-full text-left p-5 rounded-xl border border-[#ffffff08] bg-[#ffffff02]
        backdrop-blur-sm transition-all duration-300 ${style.hover}
        disabled:opacity-40 disabled:cursor-not-allowed group`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08 + 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start gap-4">
        {/* Subtle dot indicator */}
        <div className={`w-2 h-2 rounded-full ${style.dot} mt-2 opacity-60 
          group-hover:opacity-100 transition-opacity`} />
        <div className="flex-1">
          <p className="text-[#e0dedb] font-medium leading-relaxed">
            {choice.text}
          </p>
          <p className="text-[0.8125rem] text-[#6a6865] mt-2 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300">
            {choice.consequence}
          </p>
        </div>
        {/* Subtle arrow */}
        <motion.span 
          className="text-[#4a4a4a] opacity-0 group-hover:opacity-100 transition-opacity mt-1"
          initial={{ x: -4 }}
          whileHover={{ x: 0 }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}

'use client';

import { motion } from 'framer-motion';

interface CharacterPortraitProps {
  character: 'josiah' | 'graham' | 'both' | 'narrator' | 'other';
  speakerName?: string;
  mood?: 'normal' | 'excited' | 'worried' | 'happy';
  speaking?: boolean;
}

export default function CharacterPortrait({ character, speakerName, speaking = false }: CharacterPortraitProps) {
  // Elegant initial-based portraits
  const getInitial = () => {
    switch (character) {
      case 'josiah':
        return 'J';
      case 'graham':
        return 'G';
      case 'both':
        return 'J&G';
      case 'narrator':
        return '✦';
      case 'other':
        return speakerName?.[0]?.toUpperCase() || '?';
      default:
        return '?';
    }
  };

  // Sophisticated muted colors
  const getCharacterStyle = () => {
    switch (character) {
      case 'josiah':
        return {
          bg: 'bg-[#1a1f2e]',
          border: 'border-[#2a3548]',
          text: 'text-[#8a9dc4]',
        };
      case 'graham':
        return {
          bg: 'bg-[#231a1f]',
          border: 'border-[#3d2a33]',
          text: 'text-[#c49a8a]',
        };
      case 'both':
        return {
          bg: 'bg-[#1f1a24]',
          border: 'border-[#352a3d]',
          text: 'text-[#a88aac]',
        };
      case 'narrator':
        return {
          bg: 'bg-transparent',
          border: 'border-[#2a2a2a]',
          text: 'text-[#6a6a6a]',
        };
      case 'other':
        return {
          bg: 'bg-[#1a1f1d]',
          border: 'border-[#2a3530]',
          text: 'text-[#8ac4a8]',
        };
      default:
        return {
          bg: 'bg-[#1a1a1a]',
          border: 'border-[#2a2a2a]',
          text: 'text-[#8a8a8a]',
        };
    }
  };

  const getName = () => {
    if (speakerName) return speakerName;
    switch (character) {
      case 'josiah':
        return 'Josiah';
      case 'graham':
        return 'Graham';
      case 'both':
        return 'Both';
      case 'narrator':
        return 'Narrator';
      default:
        return '';
    }
  };

  const style = getCharacterStyle();

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full ${style.bg} border ${style.border} 
          flex items-center justify-center font-heading ${style.text}
          text-sm tracking-wide`}
        animate={speaking ? { 
          borderColor: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)']
        } : {}}
        transition={{ duration: 2, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
      >
        {getInitial()}
      </motion.div>
      <span className={`font-medium text-sm tracking-wide ${
        character === 'narrator' ? 'italic text-[#6a6a6a]' : 'text-[#9a9895]'
      }`}>
        {getName()}
      </span>
    </motion.div>
  );
}

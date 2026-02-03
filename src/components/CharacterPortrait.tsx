'use client';

import { motion } from 'framer-motion';

interface CharacterPortraitProps {
  character: 'josiah' | 'graham' | 'both' | 'narrator' | 'other';
  speakerName?: string;
  mood?: 'normal' | 'excited' | 'worried' | 'happy';
  speaking?: boolean;
}

export default function CharacterPortrait({ character, speakerName, mood = 'normal', speaking = false }: CharacterPortraitProps) {
  // Fun emoji-based character portraits
  const getCharacterEmoji = () => {
    switch (character) {
      case 'josiah':
        return '🧔';
      case 'graham':
        return '👨‍🦰';
      case 'both':
        return '👬';
      case 'narrator':
        return '📖';
      case 'other':
        return '👤';
      default:
        return '❓';
    }
  };

  const getCharacterColor = () => {
    switch (character) {
      case 'josiah':
        return 'from-blue-500 to-blue-700';
      case 'graham':
        return 'from-orange-500 to-orange-700';
      case 'both':
        return 'from-purple-500 to-purple-700';
      case 'narrator':
        return 'from-gray-500 to-gray-700';
      case 'other':
        return 'from-green-500 to-green-700';
      default:
        return 'from-gray-400 to-gray-600';
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

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCharacterColor()} flex items-center justify-center text-2xl shadow-lg`}
        animate={speaking ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: speaking ? Infinity : 0 }}
      >
        {getCharacterEmoji()}
      </motion.div>
      <span className={`font-bold text-sm tracking-wide uppercase ${
        character === 'narrator' ? 'italic text-gray-400' : 'text-white'
      }`}>
        {getName()}
      </span>
    </motion.div>
  );
}

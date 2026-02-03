'use client';

import { motion } from 'framer-motion';
import CharacterPortrait from './CharacterPortrait';

interface DialogueBubbleProps {
  speaker: 'josiah' | 'graham' | 'both' | 'narrator' | 'other';
  text: string;
  speakerName?: string;
  index: number;
}

export default function DialogueBubble({ speaker, text, speakerName, index }: DialogueBubbleProps) {
  const isNarrator = speaker === 'narrator';
  
  const getBubbleColor = () => {
    switch (speaker) {
      case 'josiah':
        return 'bg-blue-900/50 border-blue-500/30';
      case 'graham':
        return 'bg-orange-900/50 border-orange-500/30';
      case 'both':
        return 'bg-purple-900/50 border-purple-500/30';
      case 'narrator':
        return 'bg-gray-800/50 border-gray-500/30';
      case 'other':
        return 'bg-green-900/50 border-green-500/30';
      default:
        return 'bg-gray-800/50 border-gray-500/30';
    }
  };

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      {!isNarrator && (
        <CharacterPortrait 
          character={speaker} 
          speakerName={speakerName}
          speaking={true}
        />
      )}
      <motion.div
        className={`mt-2 ${!isNarrator ? 'ml-14' : ''} p-4 rounded-xl ${getBubbleColor()} border backdrop-blur-sm`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.15 + 0.1 }}
      >
        <p className={`${isNarrator ? 'italic text-gray-300' : 'text-white'} leading-relaxed`}>
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
}

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
  
  // Subtle, sophisticated styling
  const getBubbleStyle = () => {
    switch (speaker) {
      case 'josiah':
        return 'bg-[#0f1218]/60 border-[#1f2738]/60';
      case 'graham':
        return 'bg-[#180f14]/60 border-[#2a1a22]/60';
      case 'both':
        return 'bg-[#140f18]/60 border-[#241a2e]/60';
      case 'narrator':
        return 'bg-transparent border-transparent';
      case 'other':
        return 'bg-[#0f1614]/60 border-[#1a2822]/60';
      default:
        return 'bg-[#141414]/60 border-[#1f1f1f]/60';
    }
  };

  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {!isNarrator && (
        <CharacterPortrait 
          character={speaker} 
          speakerName={speakerName}
          speaking={true}
        />
      )}
      <motion.div
        className={`${!isNarrator ? 'mt-3 ml-13' : ''} 
          ${!isNarrator ? `p-5 rounded-2xl ${getBubbleStyle()} border backdrop-blur-sm` : 'py-2'}
          ${!isNarrator ? 'ml-[52px]' : ''}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.1 }}
      >
        <p className={`leading-relaxed ${
          isNarrator 
            ? 'italic text-[#7a7875] text-[0.95rem]' 
            : 'text-[#d4d2cf] text-[1.0625rem]'
        }`}>
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
}

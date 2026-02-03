'use client';

import { motion } from 'framer-motion';

interface BackgroundProps {
  type: 'apartment' | 'street' | 'pizza_shop' | 'alley' | 'rooftop' | 'sewer' | 'parade' | 'hospital' | 'news_studio';
  mood: 'normal' | 'tense' | 'chaotic' | 'triumphant' | 'disaster';
}

export default function Background({ type, mood }: BackgroundProps) {
  const getBackgroundGradient = () => {
    switch (type) {
      case 'apartment':
        return 'from-slate-900 via-slate-800 to-slate-900';
      case 'street':
        return 'from-indigo-900 via-purple-900 to-slate-900';
      case 'pizza_shop':
        return 'from-amber-900 via-orange-900 to-red-900';
      case 'alley':
        return 'from-gray-900 via-slate-900 to-black';
      case 'rooftop':
        return 'from-sky-900 via-indigo-900 to-purple-900';
      case 'sewer':
        return 'from-gray-900 via-green-900 to-gray-900';
      case 'parade':
        return 'from-pink-900 via-purple-900 to-indigo-900';
      case 'hospital':
        return 'from-cyan-900 via-teal-900 to-slate-900';
      case 'news_studio':
        return 'from-red-900 via-rose-900 to-slate-900';
      default:
        return 'from-gray-900 to-black';
    }
  };

  const getMoodOverlay = () => {
    switch (mood) {
      case 'tense':
        return 'bg-yellow-500/5';
      case 'chaotic':
        return 'bg-red-500/10';
      case 'triumphant':
        return 'bg-green-500/10';
      case 'disaster':
        return 'bg-red-600/20';
      default:
        return '';
    }
  };

  const getEmojis = () => {
    switch (type) {
      case 'apartment':
        return ['🛋️', '📺', '🪴', '💡'];
      case 'street':
        return ['🏠', '🚗', '🌳', '🚶'];
      case 'pizza_shop':
        return ['🍕', '🧀', '🍝', '🥤'];
      case 'alley':
        return ['🗑️', '🐱', '📦', '🌙'];
      case 'rooftop':
        return ['⭐', '🌙', '🏙️', '🌃'];
      case 'sewer':
        return ['🐀', '💧', '🕳️', '🔦'];
      case 'parade':
        return ['🎉', '🎭', '🎪', '🎊'];
      case 'hospital':
        return ['🏥', '💉', '🩺', '🚑'];
      case 'news_studio':
        return ['📺', '🎙️', '📸', '💡'];
      default:
        return ['✨'];
    }
  };

  const emojis = getEmojis();

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      {/* Mood overlay */}
      <div className={`absolute inset-0 ${getMoodOverlay()} transition-all duration-500`} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {emojis.map((emoji, index) => (
          <motion.div
            key={`${type}-${index}`}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              rotate: Math.random() * 360 
            }}
            animate={{ 
              y: [null, '-10%', '110%'],
              rotate: [null, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 20 + index * 5, 
              repeat: Infinity,
              ease: 'linear',
              delay: index * 2
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Chaos pulse for chaotic mood */}
      {mood === 'chaotic' && (
        <motion.div
          className="absolute inset-0 bg-red-500/10"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
      
      {/* Triumph glow for triumphant mood */}
      {mood === 'triumphant' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-500/5 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

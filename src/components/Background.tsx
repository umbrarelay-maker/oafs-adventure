'use client';

import { motion } from 'framer-motion';

interface BackgroundProps {
  type: 'apartment' | 'street' | 'pizza_shop' | 'alley' | 'rooftop' | 'sewer' | 'parade' | 'hospital' | 'news_studio';
  mood: 'normal' | 'tense' | 'chaotic' | 'triumphant' | 'disaster';
}

export default function Background({ type, mood }: BackgroundProps) {
  // Sophisticated, muted gradients - grayscale with subtle color hints
  const getBackgroundGradient = () => {
    switch (type) {
      case 'apartment':
        return 'from-[#0f0f0f] via-[#141416] to-[#0f0f0f]';
      case 'street':
        return 'from-[#0f0f12] via-[#12121a] to-[#0f0f0f]';
      case 'pizza_shop':
        return 'from-[#141210] via-[#161412] to-[#0f0f0f]';
      case 'alley':
        return 'from-[#0a0a0a] via-[#0d0d0d] to-[#080808]';
      case 'rooftop':
        return 'from-[#0f1014] via-[#101218] to-[#0f0f0f]';
      case 'sewer':
        return 'from-[#0d0d0d] via-[#0f100f] to-[#0a0a0a]';
      case 'parade':
        return 'from-[#110f12] via-[#14121a] to-[#0f0f0f]';
      case 'hospital':
        return 'from-[#0f1110] via-[#101412] to-[#0f0f0f]';
      case 'news_studio':
        return 'from-[#120f0f] via-[#141010] to-[#0f0f0f]';
      default:
        return 'from-[#0f0f0f] to-[#0a0a0a]';
    }
  };

  // Subtle mood overlays
  const getMoodOverlay = () => {
    switch (mood) {
      case 'tense':
        return 'bg-amber-950/5';
      case 'chaotic':
        return 'bg-rose-950/5';
      case 'triumphant':
        return 'bg-emerald-950/5';
      case 'disaster':
        return 'bg-red-950/8';
      default:
        return '';
    }
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      {/* Mood overlay - very subtle */}
      <div className={`absolute inset-0 ${getMoodOverlay()} transition-all duration-700`} />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Elegant radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(107, 127, 168, 0.03) 0%, transparent 50%)',
        }}
      />
      
      {/* Very subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />
      
      {/* Mood-specific subtle effects */}
      {mood === 'chaotic' && (
        <motion.div
          className="absolute inset-0 bg-rose-950/5"
          animate={{ opacity: [0, 0.03, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      
      {mood === 'triumphant' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(184, 160, 122, 0.04) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

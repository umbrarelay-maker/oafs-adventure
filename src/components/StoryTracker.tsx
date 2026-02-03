'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Decision } from '@/lib/gameState';
import { getChaosLabel } from '@/lib/gameState';

interface StoryTrackerProps {
  decisions: Decision[];
  totalChaos: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryTracker({ decisions, totalChaos, isOpen, onClose }: StoryTrackerProps) {
  // Get subtle indicator color based on chaos
  const getChaosIndicator = (level: number) => {
    if (level <= -1) return 'bg-[#4a6a5a]';
    if (level === 0) return 'bg-[#5a5a4a]';
    if (level === 1) return 'bg-[#6a5a4a]';
    return 'bg-[#6a4a4a]';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[340px] bg-[#0f0f0f]/98 backdrop-blur-xl 
              border-l border-[#ffffff08] z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-lg text-[#e8e6e3] tracking-tight">Story History</h2>
                <button
                  onClick={onClose}
                  className="text-[#4a4845] hover:text-[#8a8a8a] transition-colors text-xl"
                >
                  ×
                </button>
              </div>
              
              {/* Chaos Summary */}
              <div className="mb-8 p-5 rounded-xl bg-[#ffffff02] border border-[#ffffff08]">
                <p className="text-xs text-[#6a6865] tracking-wide uppercase mb-3">Overall Chaos</p>
                <p className="font-heading text-[#c4c2bf] text-lg">{getChaosLabel(totalChaos)}</p>
                <div className="mt-3 w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #4a6a5a 0%, #6a6a4a 50%, #6a4a4a 100%)'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(5, (totalChaos + 5) * 10))}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
              
              {/* Decision Timeline */}
              <div className="space-y-3">
                {decisions.length === 0 ? (
                  <p className="text-[#5a5855] text-center italic text-sm py-8">
                    Your story awaits...
                  </p>
                ) : (
                  decisions.map((decision, index) => (
                    <motion.div
                      key={`${decision.sceneId}-${decision.timestamp}`}
                      className="p-4 rounded-xl bg-[#ffffff02] border border-[#ffffff06]
                        hover:border-[#ffffff10] transition-colors"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${getChaosIndicator(decision.chaosLevel)} mt-2`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#d4d2cf] leading-relaxed">{decision.choiceText}</p>
                          <p className="text-xs text-[#5a5855] mt-2">{decision.consequence}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {decisions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#ffffff08] text-center">
                  <p className="text-xs text-[#4a4845] tracking-wide">
                    {decisions.length} decision{decisions.length !== 1 ? 's' : ''} made
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

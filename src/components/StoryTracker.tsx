'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Decision } from '@/lib/gameState';
import { getChaosLabel, getChaosEmoji } from '@/lib/gameState';

interface StoryTrackerProps {
  decisions: Decision[];
  totalChaos: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryTracker({ decisions, totalChaos, isOpen, onClose }: StoryTrackerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-l border-white/10 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">📜 Story So Far</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Chaos Meter */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">Chaos Level</p>
                  <p className="text-3xl mb-1">{getChaosEmoji(totalChaos)}</p>
                  <p className="text-lg font-bold text-white">{getChaosLabel(totalChaos)}</p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, (totalChaos + 5) * 10))}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Decision Timeline */}
              <div className="space-y-3">
                {decisions.length === 0 ? (
                  <p className="text-gray-400 text-center italic">
                    No decisions yet. Your story awaits!
                  </p>
                ) : (
                  decisions.map((decision, index) => (
                    <motion.div
                      key={`${decision.sceneId}-${decision.timestamp}`}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">
                          {decision.chaosLevel <= -1 ? '✅' : decision.chaosLevel === 0 ? '➡️' : decision.chaosLevel === 1 ? '⚠️' : '🔥'}
                        </span>
                        <div>
                          <p className="text-sm text-white">{decision.choiceText}</p>
                          <p className="text-xs text-gray-400 mt-1">{decision.consequence}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {decisions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400">
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

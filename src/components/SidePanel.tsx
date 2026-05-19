'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Location } from '@/types';
import { StoryCard } from './StoryCard';

interface SidePanelProps {
  location: Location | null;
  onClose: () => void;
}

export function SidePanel({ location, onClose }: SidePanelProps) {
  return (
    <AnimatePresence>
      {location && (
        <motion.aside
          key="side-panel"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[400] flex flex-col overflow-hidden"
        >
          {/* Panel header bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0 bg-white">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Poveste locului
            </span>
            <button
              onClick={onClose}
              aria-label="Închide panoul"
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <StoryCard location={location} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

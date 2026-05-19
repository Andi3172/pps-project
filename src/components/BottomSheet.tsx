'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Location } from '@/types';
import { StoryCard } from './StoryCard';

interface BottomSheetProps {
  location: Location | null;
  onClose: () => void;
}

export function BottomSheet({ location, onClose }: BottomSheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (location) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [location]);

  return (
    <AnimatePresence>
      {location && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[400]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-[500] bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Închide"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X size={18} className="text-slate-600" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-5 pb-8 pt-3">
              <StoryCard location={location} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

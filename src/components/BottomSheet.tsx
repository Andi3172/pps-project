'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Location } from '@/types';
import { StoryCard } from './StoryCard';

/* ─── Generic BottomSheet (children variant) ──────────────────── */
interface GenericBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Height of the sheet as a CSS value, default '80vh' */
  maxHeight?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  maxHeight = '80vh',
}: GenericBottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[400]"
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-[500] bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{ maxHeight }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Închide"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
            >
              <X size={18} className="text-slate-600" />
            </button>
            {/* Content */}
            <div className="overflow-y-auto flex-1 pt-2">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Story Bottom Sheet (location detail variant) ────────────── */
interface StoryBottomSheetProps {
  location: Location | null;
  onClose: () => void;
}

export function StoryBottomSheet({ location, onClose }: StoryBottomSheetProps) {
  return (
    <BottomSheet isOpen={!!location} onClose={onClose} maxHeight="82vh">
      {location && (
        <div className="px-5 pb-8 pt-1">
          <StoryCard location={location} />
        </div>
      )}
    </BottomSheet>
  );
}

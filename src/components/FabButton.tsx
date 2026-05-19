'use client';

import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';

interface FabButtonProps {
  onClick: () => void;
}

export function FabButton({ onClick }: FabButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 18, stiffness: 400 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label="Contribuie cu o poveste"
      className="absolute bottom-6 right-4 z-[300] flex items-center gap-2.5 bg-indigo-500 hover:bg-indigo-600 text-white pl-4 pr-5 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 font-semibold text-sm transition-colors"
    >
      <PenLine size={18} />
      <span>Contribuie</span>
    </motion.button>
  );
}

'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export function FloatingHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', damping: 20 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-[300] pointer-events-none"
    >
      <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/60">
        <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-xl">
          <MapPin size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">
            Povestea Pietei Romane
          </h1>
          <p className="text-[10px] text-slate-500 leading-tight">
            Descopera istoria ascunsa a orasului.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

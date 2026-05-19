'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, Send } from 'lucide-react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'idle' | 'success';

export function ContributeModal({ isOpen, onClose }: ContributeModalProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName('');
    setStory('');
    setImageFile(null);
    setFormState('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP: strictly no network requests — just update UI state
    setFormState('success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[600]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 380 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[700] bg-white rounded-3xl shadow-2xl max-w-lg mx-auto overflow-hidden"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Contribuie cu o poveste
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adaugă povestea ta despre Piata Romana
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Închide"
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 px-8 py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 300, delay: 0.1 }}
                    >
                      <CheckCircle2 size={64} className="text-indigo-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Mulțumim!
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                      Povestea ta va fi verificată înainte de publicare.
                      Apreciem contribuția ta la istoria vie a Pieței Romane!
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-2 px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors"
                    >
                      Închide
                    </button>
                  </motion.div>
                ) : (
                  /* Form State */
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 px-6 py-5"
                  >
                    {/* Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contributor-name"
                        className="text-xs font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        Numele tău
                      </label>
                      <input
                        id="contributor-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ex: Maria Ionescu"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Story field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contributor-story"
                        className="text-xs font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        Povestea ta
                      </label>
                      <textarea
                        id="contributor-story"
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        required
                        rows={5}
                        placeholder="Spune-ne o amintire, un fapt sau o poveste legată de Piata Romana..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Image upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Fotografie (opțional)
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`relative flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                          isDragging
                            ? 'border-indigo-400 bg-indigo-50'
                            : imageFile
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          id="contributor-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                        />
                        <Upload
                          size={22}
                          className={imageFile ? 'text-emerald-500' : 'text-slate-400'}
                        />
                        <span className="text-xs text-slate-500 text-center">
                          {imageFile
                            ? `✓ ${imageFile.name}`
                            : 'Click sau trage o imagine aici'}
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all text-sm"
                    >
                      <Send size={16} />
                      Trimite povestea
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

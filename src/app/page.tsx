'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Map, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { CommunityPost } from '@/types';
import { locations, communityPosts as seedPosts } from '@/data/locations';
import { CommunityPostCard, LocationStoryCard } from '@/components/FeedStoryCard';

/* ─── Inline Compose Box ───────────────────────────────────────── */
interface ComposeBoxProps {
  onSubmit: (post: Omit<CommunityPost, 'id' | 'createdAt'>) => void;
}

function ComposeBox({ onSubmit }: ComposeBoxProps) {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !story.trim()) return;
    // MVP: client-side only — no network requests
    onSubmit({ name: name.trim(), story: story.trim(), tag: 'Piața Romană', imageUrl: imageUrl.trim() || undefined });
    setName('');
    setStory('');
    setImageUrl('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500" />
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Contribuie cu o poveste
        </h2>
      </div>

      {submitted ? (
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-emerald-800 leading-snug">
            Mulțumim! Povestea ta va fi verificată înainte de publicare.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name */}
          <input
            id="compose-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Numele tău"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
          />
          {/* Story */}
          <textarea
            id="compose-story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            rows={3}
            placeholder="Spune-ne o amintire sau un fapt despre Piața Romană..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all resize-none"
          />
          {/* Image URL */}
          <input
            id="compose-image-url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Link imagine (opțional)"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
          />
          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all text-sm"
          >
            <Send size={15} />
            Publică povestea
          </button>
        </form>
      )}
    </div>
  );
}

/* ─── Map Banner ───────────────────────────────────────────────── */
function MapBanner() {
  return (
    <Link
      href="/map"
      className="group flex items-center justify-between gap-3 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.99] text-white px-5 py-4 rounded-2xl shadow-md shadow-indigo-500/25 transition-all"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold leading-tight">
          Explorează Harta Interactivă
        </span>
        <span className="text-xs text-indigo-200">
          6 locuri cu povești — Piața Romană, București
        </span>
      </div>
      <Map
        size={28}
        className="flex-shrink-0 opacity-80 group-hover:scale-110 transition-transform"
      />
    </Link>
  );
}

/* ─── Feed Page ────────────────────────────────────────────────── */
export default function FeedPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(seedPosts);

  const handleNewPost = (data: Omit<CommunityPost, 'id' | 'createdAt'>) => {
    const newPost: CommunityPost = {
      ...data,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* ── Page Header ─────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-xl flex-shrink-0">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">
              Povestea Pieței Romane
            </h1>
            <p className="text-[10px] text-gray-500">
              Descopera istoria ascunsa a orasului.
            </p>
          </div>
        </div>
      </header>

      {/* ── Feed Body ───────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-5 flex flex-col gap-4">
        {/* Map CTA banner */}
        <MapBanner />

        {/* Compose box */}
        <ComposeBox onSubmit={handleNewPost} />

        {/* Section label */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Povești din comunitate
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Community posts */}
        {posts.map((post) => (
          <CommunityPostCard key={post.id} post={post} />
        ))}

        {/* Section label */}
        <div className="flex items-center gap-3 py-1 mt-2">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Locuri cu istorie
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Location cards */}
        {locations.map((loc) => (
          <LocationStoryCard key={loc.id} location={loc} />
        ))}

        {/* Footer spacer */}
        <div className="h-8" />
      </main>
    </div>
  );
}

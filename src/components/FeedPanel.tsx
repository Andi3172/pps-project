'use client';

import { useState } from 'react';
import { Send, CheckCircle2, BookOpen, Users } from 'lucide-react';
import { Location, CommunityPost } from '@/types';
import { CommunityPostCard, LocationStoryCard } from './FeedStoryCard';

type ActiveTab = 'official' | 'community';

interface FeedPanelProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  officialLocations: Location[];
  communityPosts: CommunityPost[];
  onNewPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'source'>) => void;
  onSelectOnMap?: (location: Location) => void;
}

/* ─── Compose Box ────────────────────────────────────────────── */
function ComposeBox({
  onSubmit,
}: {
  onSubmit: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'source'>) => void;
}) {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !story.trim()) return;
    onSubmit({
      name: name.trim(),
      story: story.trim(),
      tag: 'Piața Romană',
      imageUrl: imageUrl.trim() || undefined,
    });
    setName('');
    setStory('');
    setImageUrl('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500" />
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Contribuie cu o poveste
        </h2>
      </div>

      {submitted ? (
        <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-3">
          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-emerald-800 leading-snug">
            Mulțumim! Povestea ta va fi verificată înainte de publicare.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <input
            id="compose-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Numele tău"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
          />
          <textarea
            id="compose-story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            rows={3}
            placeholder="Spune-ne o amintire sau un fapt despre Piața Romană..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all resize-none"
          />
          <input
            id="compose-image-url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Link imagine (opțional)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all text-sm"
          >
            <Send size={14} />
            Publică povestea
          </button>
        </form>
      )}
    </div>
  );
}

/* ─── Tab Toggle ──────────────────────────────────────────────── */
function TabToggle({
  active,
  onChange,
}: {
  active: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      <button
        onClick={() => onChange('official')}
        className={`flex items-center gap-1.5 flex-1 justify-center py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
          active === 'official'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <BookOpen size={13} />
        Istorie Oficială
      </button>
      <button
        onClick={() => onChange('community')}
        className={`flex items-center gap-1.5 flex-1 justify-center py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
          active === 'community'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Users size={13} />
        Poveștile Comunității
      </button>
    </div>
  );
}

/* ─── Feed Panel ──────────────────────────────────────────────── */
export function FeedPanel({
  activeTab,
  onTabChange,
  officialLocations,
  communityPosts,
  onNewPost,
  onSelectOnMap,
}: FeedPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Sticky top: app title + toggle */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 pt-4 pb-3 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs">✦</span>
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
        <TabToggle active={activeTab} onChange={onTabChange} />
      </div>

      {/* Scrollable feed body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {activeTab === 'community' && (
          <>
            <ComposeBox onSubmit={onNewPost} />
            {communityPosts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                Fii primul care contribuie cu o poveste!
              </p>
            )}
            {communityPosts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </>
        )}

        {activeTab === 'official' && (
          <>
            {officialLocations.map((loc) => (
              <LocationStoryCard
                key={loc.id}
                location={loc}
                onSelectOnMap={onSelectOnMap}
              />
            ))}
          </>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { Location, CommunityPost } from '@/types';

/* ─────────────────────────────────────────────
   Community Post Card
───────────────────────────────────────────── */
interface CommunityCardProps {
  post: CommunityPost;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

const avatarColors: Record<number, string> = {
  0: 'bg-indigo-100 text-indigo-700',
  1: 'bg-rose-100 text-rose-700',
  2: 'bg-amber-100 text-amber-700',
  3: 'bg-emerald-100 text-emerald-700',
  4: 'bg-violet-100 text-violet-700',
};

function getAvatarColor(name: string): string {
  const idx = name.charCodeAt(0) % 5;
  return avatarColors[idx] ?? avatarColors[0];
}

export function CommunityPostCard({ post }: CommunityCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3">
      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${getAvatarColor(post.name)}`}
          aria-label={`Avatar pentru ${post.name}`}
        >
          {getInitial(post.name)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 leading-tight">
            {post.name}
          </span>
          <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
        </div>
        {/* Location tag */}
        <div className="ml-auto flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 flex-shrink-0">
          <MapPin size={10} className="text-indigo-400" />
          <span className="text-[10px] font-medium text-gray-500 truncate max-w-[120px]">
            {post.tag}
          </span>
        </div>
      </div>

      {/* Story text */}
      <p className="text-sm text-gray-700 leading-relaxed">{post.story}</p>

      {/* Image */}
      {post.imageUrl && (
        <a
          href={post.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
        >
          <ExternalLink size={12} />
          Vezi imaginea
        </a>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────
   Location Story Card (Feed variant)
───────────────────────────────────────────── */
interface LocationCardProps {
  location: Location;
}

const categoryMeta: Record<string, { label: string; color: string }> = {
  cafe: { label: 'Cafenea', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  restaurant: { label: 'Restaurant', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  university: { label: 'Universitate', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  landmark: { label: 'Reper Istoric', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  pub: { label: 'Pub', color: 'bg-orange-50 text-orange-700 border-orange-100' },
};

export function LocationStoryCard({ location }: LocationCardProps) {
  const meta = categoryMeta[location.category] ?? categoryMeta.landmark;

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5 select-none flex-shrink-0">
          {location.iconEmoji}
        </span>
        <div className="flex flex-col gap-1.5 min-w-0">
          <h2 className="text-base font-bold text-gray-900 leading-snug">
            {location.name}
          </h2>
          <span
            className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.color}`}
          >
            {meta.label}
          </span>
        </div>
      </div>

      {/* Current */}
      <p className="text-sm text-gray-700 leading-relaxed">{location.current}</p>

      {/* Divider */}
      <div className="border-t border-gray-50" />

      {/* Historical */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          Trecut
        </span>
        <p className="text-sm text-gray-600 leading-relaxed">{location.historical}</p>
      </div>

      {/* Fun Fact */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-3.5 flex gap-2.5">
        <Sparkles size={15} className="text-indigo-500 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest">
            Știai că...
          </span>
          <p className="text-sm text-indigo-900 leading-relaxed font-medium">
            {location.funFact}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-0.5">
        <Link
          href="/map"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors group"
        >
          <MapPin size={12} className="group-hover:scale-110 transition-transform" />
          Vezi pe hartă
        </Link>
        {location.sourceUrl && (
          <a
            href={location.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ExternalLink size={11} />
            Sursă
          </a>
        )}
      </div>
    </article>
  );
}

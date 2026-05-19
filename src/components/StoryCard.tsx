'use client';

import { useState } from 'react';
import { Location } from '@/types';
import { ExternalLink, Lightbulb, History, MapPin, ImageOff } from 'lucide-react';

interface StoryCardProps {
  location: Location;
}

const categoryColors: Record<string, string> = {
  cafe: 'bg-amber-100 text-amber-700',
  restaurant: 'bg-rose-100 text-rose-700',
  university: 'bg-indigo-100 text-indigo-700',
  landmark: 'bg-emerald-100 text-emerald-700',
  pub: 'bg-orange-100 text-orange-700',
};

const categoryLabels: Record<string, string> = {
  cafe: 'Cafenea',
  restaurant: 'Restaurant',
  university: 'Universitate',
  landmark: 'Reper Istoric',
  pub: 'Pub',
};

function ImageBlock({ imageUrl }: { imageUrl?: string }) {
  const [errored, setErrored] = useState(false);

  if (!imageUrl || errored) {
    return (
      <div className="w-full h-36 rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400 select-none">
        <ImageOff size={24} strokeWidth={1.5} />
        <span className="text-xs font-medium">Fără imagine disponibilă</span>
      </div>
    );
  }

  return (
    <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export function StoryCard({ location }: StoryCardProps) {
  return (
    <div className="flex flex-col gap-4 px-1">
      {/* Image */}
      <ImageBlock imageUrl={location.imageUrl} />

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase ${
              categoryColors[location.category] ?? 'bg-gray-100 text-gray-600'
            }`}
          >
            {categoryLabels[location.category] ?? location.category}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none mt-0.5 select-none">
            {location.iconEmoji}
          </span>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {location.name}
          </h2>
        </div>
      </div>

      {/* Current */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={15} className="text-indigo-500" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Prezent
          </h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{location.current}</p>
      </section>

      {/* Historical */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <History size={15} className="text-indigo-500" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Trecut
          </h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{location.historical}</p>
      </section>

      {/* Fun Fact */}
      <section className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={15} className="text-indigo-600" />
          <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
            Știai că...
          </h3>
        </div>
        <p className="text-sm text-indigo-900 leading-relaxed font-medium">
          {location.funFact}
        </p>
      </section>

      {/* Source link */}
      {location.sourceUrl && (
        <a
          href={location.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 transition-colors group"
        >
          <ExternalLink
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
          Sursă / Referință
        </a>
      )}
    </div>
  );
}

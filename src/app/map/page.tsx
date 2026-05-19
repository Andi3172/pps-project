'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Location } from '@/types';
import { BottomSheet } from '@/components/BottomSheet';
import { SidePanel } from '@/components/SidePanel';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Dynamically import MapView with SSR disabled.
 * Prevents Leaflet's "window is not defined" error in Next.js App Router.
 */
const MapView = dynamic(
  () => import('@/components/MapView').then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-500 font-medium">
            Se încarcă harta...
          </span>
        </div>
      </div>
    ),
  }
);

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-slate-100">
      {/* Map fills the entire viewport */}
      <div className="absolute inset-0">
        <MapView
          selectedLocation={selectedLocation}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* Back button — top left */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-[300] flex items-center gap-2 bg-white/90 backdrop-blur-md hover:bg-white active:scale-95 text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-2xl shadow-md border border-white/60 transition-all"
      >
        <ArrowLeft size={16} className="text-indigo-500" />
        Înapoi la Povești
      </Link>

      {/* Title pill — centered */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[300] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/60">
          <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            Povestea Pieței Romane · 6 locuri
          </p>
        </div>
      </div>

      {/* Responsive story panel */}
      {isDesktop ? (
        <SidePanel location={selectedLocation} onClose={handleClosePanel} />
      ) : (
        <BottomSheet location={selectedLocation} onClose={handleClosePanel} />
      )}
    </main>
  );
}

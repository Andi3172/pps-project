'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { BookText, Map } from 'lucide-react';
import { Location, CommunityPost } from '@/types';
import { locations, seedCommunityPosts, MAP_CENTER, MAP_ZOOM } from '@/data/locations';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FeedPanel } from '@/components/FeedPanel';
import { SidePanel } from '@/components/SidePanel';
import { BottomSheet, StoryBottomSheet } from '@/components/BottomSheet';

/** Dynamic import: prevents Leaflet SSR "window is not defined" crash */
const MapView = dynamic(
  () => import('@/components/MapView').then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-500 font-medium">Se încarcă harta...</span>
        </div>
      </div>
    ),
  }
);

type ActiveTab = 'official' | 'community';
const LS_KEY = 'pps_community_posts';

export default function DashboardPage() {
  /* ── Persistent community posts via localStorage ── */
  const [communityPosts, setCommunityPosts] = useLocalStorage<CommunityPost[]>(
    LS_KEY,
    seedCommunityPosts
  );

  /* ── View state ── */
  const [activeTab, setActiveTab] = useState<ActiveTab>('official');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isFeedOpen, setIsFeedOpen] = useState(false); // mobile feed bottom sheet

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  /* ── Filtered locations for map markers ── */
  const visibleLocations = activeTab === 'official' ? locations : [];

  /* ── Handlers ── */
  const handleMarkerClick = useCallback((loc: Location) => {
    setSelectedLocation(loc);
    setIsFeedOpen(false); // close feed sheet when opening story
  }, []);

  const handleCloseStory = useCallback(() => setSelectedLocation(null), []);

  const handleNewPost = useCallback(
    (data: Omit<CommunityPost, 'id' | 'createdAt' | 'source'>) => {
      const post: CommunityPost = {
        ...data,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
        source: 'community',
      };
      setCommunityPosts((prev) => [post, ...prev]);
    },
    [setCommunityPosts]
  );

  const handleSelectOnMap = useCallback((loc: Location) => {
    setActiveTab('official');
    setSelectedLocation(loc);
    setIsFeedOpen(false);
  }, []);

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedLocation(null); // clear marker selection when switching tabs
  }, []);

  /* ── Common feed props ── */
  const feedProps = {
    activeTab,
    onTabChange: handleTabChange,
    officialLocations: locations,
    communityPosts,
    onNewPost: handleNewPost,
    onSelectOnMap: handleSelectOnMap,
  };

  /* ─────────────────── DESKTOP LAYOUT ─────────────────── */
  if (isDesktop) {
    return (
      <div className="flex h-dvh overflow-hidden bg-slate-100">
        {/* Left: Map (60%) */}
        <div className="relative flex-[6]">
          <MapView
            locations={visibleLocations}
            selectedLocation={selectedLocation}
            onMarkerClick={handleMarkerClick}
          />
          {/* Story overlay on map */}
          <SidePanel location={selectedLocation} onClose={handleCloseStory} />
        </div>

        {/* Right: Feed panel (40%) */}
        <div className="flex-[4] bg-gray-50 border-l border-gray-200 overflow-hidden flex flex-col">
          <FeedPanel {...feedProps} />
        </div>
      </div>
    );
  }

  /* ─────────────────── MOBILE LAYOUT ──────────────────── */
  return (
    <div className="relative w-full h-dvh overflow-hidden bg-slate-100">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <MapView
          locations={visibleLocations}
          selectedLocation={selectedLocation}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* App title pill */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[300] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-white/60">
          <p className="text-xs font-bold text-slate-800 whitespace-nowrap">
            Povestea Pieței Romane
          </p>
        </div>
      </div>

      {/* FAB — toggle feed / map */}
      {!isFeedOpen && !selectedLocation && (
        <button
          onClick={() => setIsFeedOpen(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all"
        >
          <BookText size={17} />
          Vezi Poveștile
        </button>
      )}

      {/* Map FAB (when feed is open) */}
      {isFeedOpen && (
        <button
          onClick={() => setIsFeedOpen(false)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[600] flex items-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-lg transition-all"
        >
          <Map size={17} />
          Înapoi la hartă
        </button>
      )}

      {/* Story bottom sheet (marker click) */}
      <StoryBottomSheet location={selectedLocation} onClose={handleCloseStory} />

      {/* Feed bottom sheet (FAB click) */}
      <BottomSheet
        isOpen={isFeedOpen && !selectedLocation}
        onClose={() => setIsFeedOpen(false)}
        maxHeight="90vh"
      >
        <FeedPanel {...feedProps} />
      </BottomSheet>
    </div>
  );
}

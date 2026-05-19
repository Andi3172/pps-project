export type LocationCategory =
  | 'cafe'
  | 'restaurant'
  | 'university'
  | 'landmark'
  | 'pub';

/** Discriminator: whether the item originates from official curation or the community */
export type ItemSource = 'official' | 'community';

export interface Location {
  id: string;
  name: string;
  /** [latitude, longitude] */
  coordinates: [number, number];
  /** Place type — drives marker/card color and label */
  category: LocationCategory;
  /** Discriminator for the toggle filter */
  source: ItemSource;
  /** Short description of the current state of the place */
  current: string;
  /** Historical background / past context */
  historical: string;
  /** Highlighted fun or surprising fact */
  funFact: string;
  /** Optional URL linking to a source / reference */
  sourceUrl?: string;
  /** Emoji icon rendered on the map marker */
  iconEmoji: string;
  /** Array of image URLs displayed as a horizontal gallery in the story card */
  imageUrls?: string[];
}

export interface CommunityPost {
  id: string;
  /** Display name of the contributor */
  name: string;
  /** The story text submitted */
  story: string;
  /** Location tag / label */
  tag: string;
  /** ISO date string, used for display only */
  createdAt: string;
  /** Optional image URL provided by contributor */
  imageUrl?: string;
  /** Always 'community' — used for filtering */
  source: 'community';
}

export interface ContributeFormData {
  name: string;
  story: string;
  imageUrl: string;
}

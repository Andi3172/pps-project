export type LocationCategory =
  | 'cafe'
  | 'restaurant'
  | 'university'
  | 'landmark'
  | 'pub';

export interface Location {
  id: string;
  name: string;
  /** [latitude, longitude] */
  coordinates: [number, number];
  category: LocationCategory;
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
}

export interface ContributeFormData {
  name: string;
  story: string;
  imageUrl: string;
}

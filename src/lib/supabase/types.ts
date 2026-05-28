// ── Supabase Database Types ──
// These match the Supabase schema we'll create

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  avatar_emoji: string;
  city: string;
  spotify_id: string | null;
  top_artists: string[];
  top_genres: string[];
  current_song: string | null;
  current_artist: string | null;
  privacy_level: 1 | 2 | 3 | 4;
  is_online: boolean;
  badge_number: string | null;
  member_since: string;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  user_a: string;
  user_b: string;
  score: number;
  shared_artists: string[];
  shared_genres: string[];
  calculated_at: string;
}

export interface RadarSession {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  current_song: string | null;
  current_artist: string | null;
  is_active: boolean;
  updated_at: string;
}

export interface RadioChannel {
  id: string;
  host_id: string;
  title: string;
  current_track: string | null;
  current_artist: string | null;
  listeners_count: number;
  is_live: boolean;
  genres: string[];
  created_at: string;
}

export interface Creator {
  id: string;
  user_id: string;
  followers_count: number;
  genre_focus: string;
  is_verified: boolean;
  current_track: string | null;
  current_artist: string | null;
  listeners_count: number;
}

export interface Event {
  id: string;
  name: string;
  distance: string;
  tag: string;
  time: string;
  icon: string;
  tip: string;
}

// ── Demo Data ──
// Used until real Supabase/Spotify backend is connected

export const ME = {
  name: "Alex",
  avatar: "star",
  avatarEmoji: "⭐",
  genres: ["Indie", "Alt-Rock", "Shoegaze", "Post-Punk"],
  artists: [
    "Arctic Monkeys",
    "Tame Impala",
    "Interpol",
    "Radiohead",
    "Bloc Party",
  ],
  song: "505",
  songArtist: "Arctic Monkeys",
  city: "Zürich",
  badge: "#0012",
  since: "März 2026",
};

export interface DemoUser {
  id: number;
  name: string;
  avatar: string;
  match: number;
  dist: number;
  x: number;
  y: number;
  song: string;
  songArtist: string;
  genres: string[];
  artists: string[];
  online: boolean;
}

export const USERS: DemoUser[] = [
  {
    id: 1, name: "Lea M.", avatar: "🎧", match: 94, dist: 50,
    x: 52, y: 37, song: "Do I Wanna Know?", songArtist: "Arctic Monkeys",
    genres: ["Indie", "Alt-Rock", "Shoegaze"],
    artists: ["Arctic Monkeys", "Radiohead", "Interpol", "Tame Impala"],
    online: true,
  },
  {
    id: 2, name: "Nico R.", avatar: "🥁", match: 88, dist: 780,
    x: 68, y: 27, song: "Obstacle 1", songArtist: "Interpol",
    genres: ["Indie", "Post-Punk", "Shoegaze"],
    artists: ["Interpol", "Bloc Party", "The Strokes", "Tame Impala"],
    online: true,
  },
  {
    id: 3, name: "Tim F.", avatar: "🎸", match: 79, dist: 230,
    x: 38, y: 44, song: "Weird Fishes", songArtist: "Radiohead",
    genres: ["Alt-Rock", "Experimental"],
    artists: ["Radiohead", "Thom Yorke", "Atoms for Peace"],
    online: true,
  },
  {
    id: 4, name: "Sara P.", avatar: "🎤", match: 76, dist: 340,
    x: 30, y: 63, song: "Die Hard", songArtist: "Kendrick Lamar",
    genres: ["Hip-Hop", "Neo-Soul", "Jazz"],
    artists: ["Kendrick Lamar", "Frank Ocean", "Little Simz"],
    online: false,
  },
  {
    id: 5, name: "Jonas K.", avatar: "🎵", match: 71, dist: 120,
    x: 64, y: 58, song: "Glassworks", songArtist: "Philip Glass",
    genres: ["Electronic", "Techno", "Ambient"],
    artists: ["Aphex Twin", "Four Tet", "Burial", "BICEP"],
    online: true,
  },
  {
    id: 6, name: "Anna K.", avatar: "🎺", match: 65, dist: 890,
    x: 74, y: 64, song: "Electric Feel", songArtist: "MGMT",
    genres: ["Psychedelic", "Indie", "Electronic"],
    artists: ["MGMT", "Tame Impala", "Unknown Mortal Orchestra"],
    online: true,
  },
  {
    id: 7, name: "Mia B.", avatar: "🎹", match: 59, dist: 1200,
    x: 22, y: 34, song: "Good Days", songArtist: "SZA",
    genres: ["R&B", "Pop", "Soul"],
    artists: ["SZA", "Beyoncé", "Solange"],
    online: false,
  },
];

export const CREATORS = [
  {
    id: 1, name: "Dani T.", avatar: "🎧", followers: "31.2k",
    genre: "Hip-Hop Curation", track: "J Dilla – Donuts",
    verified: true, online: false, listeners: 23,
  },
  {
    id: 2, name: "Marek V.", avatar: "🎙️", followers: "12.4k",
    genre: "Dark Electronic", track: "Burial – Archangel",
    verified: true, online: true, listeners: 11,
  },
  {
    id: 3, name: "Julia P.", avatar: "🪗", followers: "8.1k",
    genre: "Indie / Folk", track: "Bon Iver – Holocene",
    verified: false, online: true, listeners: 7,
  },
  {
    id: 4, name: "Lena M.", avatar: "🎻", followers: "5.6k",
    genre: "Modern Classical", track: "Nils Frahm – Says",
    verified: false, online: true, listeners: 4,
  },
];

export const RADIO_TRACKS = [
  {
    title: "Do I Wanna Know?", artist: "Arctic Monkeys",
    host: "Lea M.", hostAvatar: "🎧", listeners: 12,
    match: 94, duration: 238, genres: ["Indie", "Alt-Rock"],
  },
  {
    title: "Motion Picture Soundtrack", artist: "Radiohead",
    host: "Nico R.", hostAvatar: "🥁", listeners: 7,
    match: 88, duration: 254, genres: ["Experimental"],
  },
  {
    title: "Die Hard", artist: "Kendrick Lamar",
    host: "Sara P.", hostAvatar: "🎤", listeners: 23,
    match: 76, duration: 273, genres: ["Hip-Hop", "Rap"],
  },
  {
    title: "Glassworks", artist: "Philip Glass",
    host: "Jonas K.", hostAvatar: "🎵", listeners: 4,
    match: 71, duration: 301, genres: ["Electronic", "Ambient"],
  },
];

export const EVENTS = [
  {
    name: "Club XT9 – Night Session", dist: "800m", tag: "Techno",
    time: "23:00 heute", icon: "🎛️",
    tip: "4 deiner Matches gehen hin",
  },
  {
    name: "Hive – Indie Night", dist: "1.2km", tag: "Indie",
    time: "22:00 Fr", icon: "🎸",
    tip: "Lea M. hat Interesse",
  },
  {
    name: "Rote Fabrik – Live Jazz", dist: "2.1km", tag: "Jazz",
    time: "20:00 Sa", icon: "🎷",
    tip: "Match 76% mit der Setlist",
  },
];

export const SCAN_ARTISTS = [
  "Arctic Monkeys", "Radiohead", "Tame Impala", "Interpol", "Bloc Party",
  "The National", "War on Drugs", "Beach House", "Slowdive", "Fontaines D.C.",
  "Nick Cave", "PJ Harvey", "Portishead", "Massive Attack", "Suede",
];

// ── Utility functions ──

export function getMatchColor(score: number): string {
  if (score >= 90) return "var(--color-sm-teal-glow)";
  if (score >= 78) return "var(--color-sm-green-glow)";
  if (score >= 62) return "var(--color-sm-glow)";
  if (score >= 48) return "var(--color-sm-amber-glow)";
  return "var(--color-sm-pink-glow)";
}

export function getMatchColorClass(score: number): string {
  if (score >= 90) return "text-sm-teal-glow";
  if (score >= 78) return "text-sm-green-glow";
  if (score >= 62) return "text-sm-glow";
  if (score >= 48) return "text-sm-amber-glow";
  return "text-sm-pink-glow";
}

export function formatDistance(dist: number): string {
  if (dist < 1000) return `${dist}m`;
  return `${(dist / 1000).toFixed(1)}km`;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

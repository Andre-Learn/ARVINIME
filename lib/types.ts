export interface Anime {
  id: string
  title: string
  description: string
  poster: string
  banner?: string
  genres: string[]
  status: 'ongoing' | 'completed' | 'upcoming'
  rating?: number
  releaseYear?: number
  totalEpisodes?: number
  currentEpisode?: number
}

export interface Episode {
  id: string
  animeId: string
  number: number
  title: string
  thumbnail?: string
  duration?: string
  streamUrl?: string
}

export interface WatchHistory {
  animeId: string
  episodeId: string
  episodeNumber: number
  watchedAt: number
  progress?: number
  title: string
  poster: string
}

export interface Bookmark {
  animeId: string
  title: string
  poster: string
  addedAt: number
}

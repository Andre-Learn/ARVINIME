import { Anime, Episode } from './types'

// Mock anime data for demonstration
export const mockAnimeList: Anime[] = [
  {
    id: '1',
    title: 'Solo Leveling',
    description: 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter, gains a unique ability that allows him to level up indefinitely.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=800&fit=crop',
    genres: ['Action', 'Fantasy', 'Adventure'],
    status: 'ongoing',
    rating: 9.2,
    releaseYear: 2024,
    totalEpisodes: 12,
    currentEpisode: 8
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    description: 'A boy swallows a cursed talisman and becomes host to a powerful curse, joining a school of sorcerers to find a way to exorcise the curse and save his own life.',
    poster: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop',
    genres: ['Action', 'Supernatural', 'School'],
    status: 'ongoing',
    rating: 9.0,
    releaseYear: 2020,
    totalEpisodes: 24,
    currentEpisode: 24
  },
  {
    id: '3',
    title: 'Demon Slayer',
    description: 'A young boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon. He joins the Demon Slayer Corps to avenge his family.',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=800&fit=crop',
    genres: ['Action', 'Supernatural', 'Historical'],
    status: 'ongoing',
    rating: 8.9,
    releaseYear: 2019,
    totalEpisodes: 44,
    currentEpisode: 44
  },
  {
    id: '4',
    title: 'Attack on Titan',
    description: 'In a world where humanity lives within enormous walled cities to protect themselves from Titans, a young boy vows to exterminate them after a Titan destroys his hometown.',
    poster: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=800&fit=crop',
    genres: ['Action', 'Drama', 'Fantasy'],
    status: 'completed',
    rating: 9.5,
    releaseYear: 2013,
    totalEpisodes: 87,
    currentEpisode: 87
  },
  {
    id: '5',
    title: 'One Piece',
    description: 'Monkey D. Luffy sets off on a journey to find the legendary treasure One Piece and become the King of Pirates.',
    poster: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1920&h=800&fit=crop',
    genres: ['Action', 'Adventure', 'Comedy'],
    status: 'ongoing',
    rating: 9.1,
    releaseYear: 1999,
    totalEpisodes: 1100,
    currentEpisode: 1100
  },
  {
    id: '6',
    title: 'My Hero Academia',
    description: 'In a world where most people have superpowers, a boy without powers dreams of becoming a hero and enrolls in a prestigious hero academy.',
    poster: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=800&fit=crop',
    genres: ['Action', 'School', 'Superhero'],
    status: 'ongoing',
    rating: 8.5,
    releaseYear: 2016,
    totalEpisodes: 138,
    currentEpisode: 138
  },
  {
    id: '7',
    title: 'Spy x Family',
    description: 'A spy must build a fake family to execute a mission, not realizing that the girl he adopts is a telepath and his wife is an assassin.',
    poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    status: 'ongoing',
    rating: 8.8,
    releaseYear: 2022,
    totalEpisodes: 37,
    currentEpisode: 37
  },
  {
    id: '8',
    title: 'Chainsaw Man',
    description: 'A young man merges with his pet devil to become a devil-human hybrid, joining an organization that hunts devils.',
    poster: 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=800&fit=crop',
    genres: ['Action', 'Supernatural', 'Horror'],
    status: 'ongoing',
    rating: 8.7,
    releaseYear: 2022,
    totalEpisodes: 12,
    currentEpisode: 12
  },
  {
    id: '9',
    title: 'Frieren: Beyond Journey\'s End',
    description: 'An elf mage who was part of the hero\'s party that defeated the Demon King sets out on a new journey to understand humanity.',
    poster: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=800&fit=crop',
    genres: ['Fantasy', 'Adventure', 'Drama'],
    status: 'ongoing',
    rating: 9.3,
    releaseYear: 2023,
    totalEpisodes: 28,
    currentEpisode: 28
  },
  {
    id: '10',
    title: 'Bocchi the Rock!',
    description: 'A socially anxious girl who is an exceptional guitarist joins a band and tries to overcome her fears.',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=800&fit=crop',
    genres: ['Comedy', 'Music', 'Slice of Life'],
    status: 'completed',
    rating: 8.9,
    releaseYear: 2022,
    totalEpisodes: 12,
    currentEpisode: 12
  },
  {
    id: '11',
    title: 'Blue Lock',
    description: 'Japan\'s Football Association creates a radical training program to create the world\'s best striker.',
    poster: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920&h=800&fit=crop',
    genres: ['Sports', 'Drama', 'Action'],
    status: 'ongoing',
    rating: 8.6,
    releaseYear: 2022,
    totalEpisodes: 24,
    currentEpisode: 24
  },
  {
    id: '12',
    title: 'Vinland Saga',
    description: 'A young Viking warrior seeks revenge against the man who killed his father, becoming entangled in a brutal war.',
    poster: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=450&fit=crop',
    banner: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop',
    genres: ['Action', 'Historical', 'Drama'],
    status: 'ongoing',
    rating: 9.1,
    releaseYear: 2019,
    totalEpisodes: 48,
    currentEpisode: 48
  }
]

export const generateEpisodes = (animeId: string, count: number): Episode[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${animeId}-ep-${i + 1}`,
    animeId,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=320&h=180&fit=crop`,
    duration: `${Math.floor(Math.random() * 5) + 20}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  }))
}

export const getAnimeById = (id: string): Anime | undefined => {
  return mockAnimeList.find(anime => anime.id === id)
}

export const getTrendingAnime = (): Anime[] => {
  return mockAnimeList.slice(0, 6)
}

export const getOngoingAnime = (): Anime[] => {
  return mockAnimeList.filter(anime => anime.status === 'ongoing')
}

export const getPopularAnime = (): Anime[] => {
  return [...mockAnimeList].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6)
}

export const getCompletedAnime = (): Anime[] => {
  return mockAnimeList.filter(anime => anime.status === 'completed')
}

export const searchAnime = (query: string): Anime[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockAnimeList.filter(anime => 
    anime.title.toLowerCase().includes(lowercaseQuery) ||
    anime.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
  )
}

export const getFeaturedAnime = (): Anime => {
  return mockAnimeList[0]
}

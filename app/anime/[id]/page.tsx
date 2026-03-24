"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  Star, 
  Calendar, 
  Film, 
  ChevronDown,
  ChevronUp,
  ArrowLeft 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAnimeById, generateEpisodes } from "@/lib/mock-data"
import { useBookmarks } from "@/hooks/use-local-storage"
import { Anime, Episode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>
}

export default function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = use(params)
  const [anime, setAnime] = useState<Anime | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAllEpisodes, setShowAllEpisodes] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    const loadAnime = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const animeData = getAnimeById(id)
      if (animeData) {
        setAnime(animeData)
        setEpisodes(generateEpisodes(id, animeData.currentEpisode || 12))
      }
      setIsLoading(false)
    }

    loadAnime()
  }, [id])

  const handleBookmark = () => {
    if (anime) {
      toggleBookmark({
        animeId: anime.id,
        title: anime.title,
        poster: anime.poster,
        addedAt: Date.now(),
      })
    }
  }

  const displayedEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 12)
  const hasMoreEpisodes = episodes.length > 12

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Banner Skeleton */}
        <div className="relative h-[50vh] w-full animate-pulse bg-secondary" />
        
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Poster Skeleton */}
            <div className="w-full md:w-64">
              <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-secondary" />
            </div>
            
            {/* Info Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-10 w-3/4 animate-pulse rounded-lg bg-secondary" />
              <div className="h-6 w-1/2 animate-pulse rounded-lg bg-secondary" />
              <div className="h-24 w-full animate-pulse rounded-lg bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Anime Not Found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Banner */}
      <div className="relative h-[40vh] w-full md:h-[50vh]">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-secondary" />
        )}
        <Image
          src={anime.banner || anime.poster}
          alt={anime.title}
          fill
          priority
          className={cn(
            "object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        
        {/* Back Button */}
        <Link
          href="/"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-colors hover:bg-background/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-8 md:-mt-32 md:flex-row">
          {/* Poster */}
          <div className="relative z-10 mx-auto w-48 flex-shrink-0 md:mx-0 md:w-64">
            <div className="-mt-24 overflow-hidden rounded-xl shadow-2xl md:mt-0">
              <Image
                src={anime.poster}
                alt={anime.title}
                width={256}
                height={384}
                className="aspect-[2/3] w-full object-cover"
              />
            </div>

            {/* Action Buttons - Mobile */}
            <div className="mt-4 flex gap-2 md:hidden">
              <Link href={`/watch/${anime.id}?ep=1`} className="flex-1">
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Watch
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmark}
                className={cn(isBookmarked(anime.id) && "text-primary")}
              >
                {isBookmarked(anime.id) ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="relative z-10 flex-1">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{anime.title}</h1>

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              {anime.rating && (
                <div className="flex items-center gap-1 rounded-lg bg-yellow-500/20 px-3 py-1.5">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-yellow-500">
                    {anime.rating}
                  </span>
                </div>
              )}
              {anime.releaseYear && (
                <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{anime.releaseYear}</span>
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg px-3 py-1.5 font-medium",
                  anime.status === "ongoing"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-blue-500/20 text-blue-400"
                )}
              >
                {anime.status.charAt(0).toUpperCase() + anime.status.slice(1)}
              </div>
              {anime.totalEpisodes && (
                <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5">
                  <Film className="h-4 w-4 text-muted-foreground" />
                  <span>{anime.totalEpisodes} Episodes</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mb-4 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mb-6 text-muted-foreground">{anime.description}</p>

            {/* Action Buttons - Desktop */}
            <div className="hidden gap-3 md:flex">
              <Link href={`/watch/${anime.id}?ep=1`}>
                <Button size="lg" className="gap-2 rounded-xl px-8">
                  <Play className="h-5 w-5 fill-current" />
                  Watch Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBookmark}
                className={cn("gap-2 rounded-xl", isBookmarked(anime.id) && "border-primary text-primary")}
              >
                {isBookmarked(anime.id) ? (
                  <>
                    <BookmarkCheck className="h-5 w-5" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-5 w-5" />
                    Add to Bookmarks
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Episodes</h2>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {displayedEpisodes.reverse().map((episode) => (
              <Link
                key={episode.id}
                href={`/watch/${anime.id}?ep=${episode.number}`}
              >
                <div className="group relative overflow-hidden rounded-xl bg-secondary transition-all hover:ring-2 hover:ring-primary">
                  <div className="aspect-video">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <span className="text-2xl font-bold text-primary/50">
                        {episode.number}
                      </span>
                    </div>
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <Play className="h-4 w-4 fill-current text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <p className="text-sm font-medium">Episode {episode.number}</p>
                    {episode.duration && (
                      <p className="text-xs text-muted-foreground">
                        {episode.duration}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMoreEpisodes && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                className="gap-2"
              >
                {showAllEpisodes ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show All {episodes.length} Episodes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

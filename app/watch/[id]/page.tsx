"use client"

import { useState, useEffect, useCallback } from "react"
import { use } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  List,
  Play,
  ArrowLeft,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAnimeById, generateEpisodes } from "@/lib/mock-data"
import { useContinueWatching, useWatchHistory } from "@/hooks/use-local-storage"
import { Anime, Episode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface WatchPageProps {
  params: Promise<{ id: string }>
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const episodeNumber = parseInt(searchParams.get("ep") || "1")
  
  const [anime, setAnime] = useState<Anime | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [showEpisodeList, setShowEpisodeList] = useState(false)
  
  const { updateProgress } = useContinueWatching()
  const { addToHistory } = useWatchHistory()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const animeData = getAnimeById(id)
      if (animeData) {
        setAnime(animeData)
        const episodeList = generateEpisodes(id, animeData.currentEpisode || 12)
        setEpisodes(episodeList)
        
        const ep = episodeList.find((e) => e.number === episodeNumber) || episodeList[0]
        setCurrentEpisode(ep)
      }
      setIsLoading(false)
    }

    loadData()
  }, [id, episodeNumber])

  // Track watch progress
  useEffect(() => {
    if (anime && currentEpisode) {
      const historyItem = {
        animeId: anime.id,
        episodeId: currentEpisode.id,
        episodeNumber: currentEpisode.number,
        watchedAt: Date.now(),
        progress: 30,
        title: anime.title,
        poster: anime.poster,
      }
      
      updateProgress(historyItem)
      addToHistory(historyItem)
    }
  }, [anime, currentEpisode, updateProgress, addToHistory])

  const navigateEpisode = useCallback(
    (direction: "prev" | "next") => {
      if (!currentEpisode) return
      const newEpNumber =
        direction === "prev"
          ? currentEpisode.number - 1
          : currentEpisode.number + 1
      const newEp = episodes.find((e) => e.number === newEpNumber)
      if (newEp) {
        window.history.pushState(null, "", `/watch/${id}?ep=${newEpNumber}`)
        setCurrentEpisode(newEp)
      }
    },
    [currentEpisode, episodes, id]
  )

  const hasPrevEpisode = currentEpisode && currentEpisode.number > 1
  const hasNextEpisode =
    currentEpisode && currentEpisode.number < episodes.length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="aspect-video w-full animate-pulse bg-secondary" />
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="h-8 w-1/2 animate-pulse rounded-lg bg-secondary" />
        </div>
      </div>
    )
  }

  if (!anime || !currentEpisode) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Episode Not Found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-black", isTheaterMode && "pb-0")}>
      {/* Video Player Section */}
      <div
        className={cn(
          "relative w-full bg-black",
          isTheaterMode ? "h-[calc(100vh-64px)]" : "aspect-video max-h-[80vh]"
        )}
      >
        {/* Mock Video Player - Replace with actual player/iframe */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Play className="h-10 w-10 fill-current" />
            </div>
            <p className="text-lg text-muted-foreground">
              Video Player Placeholder
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {anime.title} - Episode {currentEpisode.number}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Replace this with an iframe or video element for actual streaming
            </p>
          </div>
        </div>

        {/* Player Controls Overlay */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/anime/${anime.id}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-white md:text-lg">
                {anime.title}
              </h1>
              <p className="text-xs text-gray-300 md:text-sm">
                Episode {currentEpisode.number}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Episode Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasPrevEpisode}
                onClick={() => navigateEpisode("prev")}
                className="gap-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasNextEpisode}
                onClick={() => navigateEpisode("next")}
                className="gap-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEpisodeList(!showEpisodeList)}
                className={cn(
                  "h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20",
                  showEpisodeList && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <List className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className={cn(
                  "h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20",
                  isTheaterMode && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isTheaterMode ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Episode List Panel */}
      {!isTheaterMode && (
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Anime Info */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{anime.title}</h2>
              <p className="text-muted-foreground">
                Episode {currentEpisode.number} of {episodes.length}
              </p>
            </div>
            <Link href={`/anime/${anime.id}`}>
              <Button variant="outline" className="gap-2">
                View Details
              </Button>
            </Link>
          </div>

          {/* Episode Grid */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              All Episodes
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => {
                    window.history.pushState(
                      null,
                      "",
                      `/watch/${id}?ep=${episode.number}`
                    )
                    setCurrentEpisode(episode)
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-lg border p-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary/10",
                    episode.number === currentEpisode.number
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-foreground"
                  )}
                >
                  {episode.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Episode List (Theater Mode) */}
      {isTheaterMode && showEpisodeList && (
        <div className="fixed bottom-20 right-4 z-50 max-h-[50vh] w-80 overflow-hidden rounded-xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold">Episodes</h3>
          </div>
          <div className="max-h-[40vh] overflow-y-auto p-2">
            <div className="grid grid-cols-4 gap-2">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => {
                    window.history.pushState(
                      null,
                      "",
                      `/watch/${id}?ep=${episode.number}`
                    )
                    setCurrentEpisode(episode)
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-lg border p-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/10",
                    episode.number === currentEpisode.number
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary"
                  )}
                >
                  {episode.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

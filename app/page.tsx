"use client"

import { useState, useEffect } from "react"
import { Flame, Sparkles, Star, Trophy } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { AnimeSection } from "@/components/anime-section"
import { ContinueWatchingSection } from "@/components/continue-watching-section"
import {
  getFeaturedAnime,
  getTrendingAnime,
  getOngoingAnime,
  getPopularAnime,
  getCompletedAnime,
} from "@/lib/mock-data"
import { Anime } from "@/lib/types"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [featured, setFeatured] = useState<Anime | null>(null)
  const [trending, setTrending] = useState<Anime[]>([])
  const [ongoing, setOngoing] = useState<Anime[]>([])
  const [popular, setPopular] = useState<Anime[]>([])
  const [completed, setCompleted] = useState<Anime[]>([])

  useEffect(() => {
    // Simulate API fetch
    const loadData = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setFeatured(getFeaturedAnime())
      setTrending(getTrendingAnime())
      setOngoing(getOngoingAnime())
      setPopular(getPopularAnime())
      setCompleted(getCompletedAnime())
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading && !featured) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <div className="h-[70vh] min-h-[500px] w-full animate-pulse bg-secondary md:h-[80vh]" />
        
        {/* Section Skeletons */}
        <div className="space-y-8 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 md:px-8">
              <div className="mb-4 h-8 w-48 animate-pulse rounded-lg bg-secondary" />
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="aspect-[2/3] w-[140px] flex-shrink-0 animate-pulse rounded-xl bg-secondary md:w-[180px]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      {featured && <HeroSection anime={featured} />}

      {/* Continue Watching */}
      <ContinueWatchingSection />

      {/* Trending Anime */}
      <AnimeSection
        title="Trending Now"
        icon={<Flame className="h-6 w-6 text-orange-500" />}
        animeList={trending}
        isLoading={isLoading}
      />

      {/* Ongoing Anime */}
      <AnimeSection
        title="Currently Airing"
        icon={<Sparkles className="h-6 w-6 text-green-500" />}
        animeList={ongoing}
        isLoading={isLoading}
      />

      {/* Popular Anime */}
      <AnimeSection
        title="Most Popular"
        icon={<Star className="h-6 w-6 text-yellow-500" />}
        animeList={popular}
        isLoading={isLoading}
      />

      {/* Completed Anime */}
      <AnimeSection
        title="Completed Series"
        icon={<Trophy className="h-6 w-6 text-blue-500" />}
        animeList={completed}
        isLoading={isLoading}
      />
    </div>
  )
}

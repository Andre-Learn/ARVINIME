"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info } from "lucide-react"
import { Anime } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AnimeCardProps {
  anime: Anime
  className?: string
}

export function AnimeCard({ anime, className }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link href={`/anime/${anime.id}`}>
      <div
        className={cn(
          "group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-secondary transition-all duration-300",
          isHovered && "scale-105 shadow-2xl shadow-primary/20 z-10",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-secondary" />
        )}

        {/* Poster Image */}
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered && "scale-110 brightness-50",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Episode Badge */}
        {anime.currentEpisode && (
          <div className="absolute left-2 top-2 rounded-lg bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            EP {anime.currentEpisode}
          </div>
        )}

        {/* Status Badge */}
        <div
          className={cn(
            "absolute right-2 top-2 rounded-lg px-2 py-1 text-xs font-semibold backdrop-blur-sm",
            anime.status === "ongoing"
              ? "bg-green-500/90 text-white"
              : anime.status === "completed"
              ? "bg-blue-500/90 text-white"
              : "bg-yellow-500/90 text-black"
          )}
        >
          {anime.status.charAt(0).toUpperCase() + anime.status.slice(1)}
        </div>

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex gap-2">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
              <Play className="h-5 w-5 fill-current" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/80 text-foreground backdrop-blur-sm transition-transform hover:scale-110">
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title Gradient */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-12">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {anime.title}
          </h3>
          {anime.rating && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-xs text-gray-300">{anime.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Skeleton version for loading states
export function AnimeCardSkeleton() {
  return (
    <div className="aspect-[2/3] w-full animate-pulse overflow-hidden rounded-xl bg-secondary">
      <div className="h-full w-full bg-muted" />
    </div>
  )
}

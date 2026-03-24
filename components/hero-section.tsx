"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, Star } from "lucide-react"
import { Anime } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  anime: Anime
}

export function HeroSection({ anime }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="h-full w-full animate-pulse bg-secondary" />
        )}
        <Image
          src={anime.banner || anime.poster}
          alt={anime.title}
          fill
          priority
          className={cn(
            "object-cover transition-opacity duration-700",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-end pb-16 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-2xl">
            {/* Featured Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Featured</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {anime.title}
            </h1>

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {anime.rating && (
                <div className="flex items-center gap-1 rounded-lg bg-yellow-500/20 px-2 py-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-yellow-500">{anime.rating}</span>
                </div>
              )}
              {anime.releaseYear && (
                <span className="rounded-lg bg-secondary/50 px-2 py-1">{anime.releaseYear}</span>
              )}
              <span
                className={cn(
                  "rounded-lg px-2 py-1 font-medium",
                  anime.status === "ongoing"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-blue-500/20 text-blue-400"
                )}
              >
                {anime.status.charAt(0).toUpperCase() + anime.status.slice(1)}
              </span>
              {anime.currentEpisode && (
                <span className="rounded-lg bg-secondary/50 px-2 py-1">
                  EP {anime.currentEpisode} / {anime.totalEpisodes || "?"}
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="mb-4 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mb-6 line-clamp-3 text-pretty text-base text-muted-foreground md:text-lg">
              {anime.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link href={`/watch/${anime.id}?ep=1`}>
                <Button size="lg" className="gap-2 rounded-xl px-8 font-semibold shadow-lg shadow-primary/25">
                  <Play className="h-5 w-5 fill-current" />
                  Watch Now
                </Button>
              </Link>
              <Link href={`/anime/${anime.id}`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 rounded-xl px-8 font-semibold"
                >
                  <Info className="h-5 w-5" />
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

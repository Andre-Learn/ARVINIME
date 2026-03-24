"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, X, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useContinueWatching } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ContinueWatchingSection() {
  const { continueWatching, removeFromContinue } = useContinueWatching()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (continueWatching.length === 0) {
    return null
  }

  return (
    <section className="relative py-6">
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between px-4 md:px-8">
        <h2 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          <Clock className="h-6 w-6 text-primary" />
          Continue Watching
        </h2>
        <div className="hidden gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-4 md:gap-4 md:px-8"
        >
          {continueWatching.map((item) => (
            <div
              key={item.episodeId}
              className="group relative w-[280px] flex-shrink-0 md:w-[320px]"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                />

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.progress || 30}%` }}
                  />
                </div>

                {/* Play Overlay */}
                <Link
                  href={`/watch/${item.animeId}?ep=${item.episodeNumber}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Play className="h-6 w-6 fill-current" />
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeFromContinue(item.animeId)
                  }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Episode Badge */}
                <div className="absolute left-2 top-2 rounded-lg bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground">
                  EP {item.episodeNumber}
                </div>
              </div>

              {/* Info */}
              <div className="mt-2 px-1">
                <h3 className="truncate text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Episode {item.episodeNumber}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  )
}

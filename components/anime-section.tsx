"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Anime } from "@/lib/types"
import { AnimeCard, AnimeCardSkeleton } from "./anime-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimeSectionProps {
  title: string
  icon?: React.ReactNode
  animeList: Anime[]
  isLoading?: boolean
  className?: string
}

export function AnimeSection({
  title,
  icon,
  animeList,
  isLoading = false,
  className,
}: AnimeSectionProps) {
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

  return (
    <section className={cn("relative py-6", className)}>
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between px-4 md:px-8">
        <h2 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          {icon}
          {title}
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
          style={{
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "1rem",
          }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[140px] flex-shrink-0 md:w-[180px] lg:w-[200px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <AnimeCardSkeleton />
                </div>
              ))
            : animeList.map((anime) => (
                <div
                  key={anime.id}
                  className="w-[140px] flex-shrink-0 md:w-[180px] lg:w-[200px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <AnimeCard anime={anime} />
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

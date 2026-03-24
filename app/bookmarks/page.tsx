"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bookmark, Trash2, Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-secondary" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-xl bg-secondary"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Bookmark className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Bookmarks</h1>
              <p className="text-muted-foreground">
                {bookmarks.length} anime saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No bookmarks yet</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Start adding anime to your bookmarks to keep track of what you want
              to watch.
            </p>
            <Link href="/">
              <Button>Browse Anime</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.animeId}
                className="group relative overflow-hidden rounded-xl bg-secondary"
              >
                <Link href={`/anime/${bookmark.animeId}`}>
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={bookmark.poster}
                      alt={bookmark.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Link
                          href={`/watch/${bookmark.animeId}?ep=1`}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
                        >
                          <Play className="h-5 w-5 fill-current" />
                        </Link>
                        <Link
                          href={`/anime/${bookmark.animeId}`}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/80 text-foreground backdrop-blur-sm transition-transform hover:scale-110"
                        >
                          <Info className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>

                    {/* Title Gradient */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-12">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {bookmark.title}
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() => removeBookmark(bookmark.animeId)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all hover:bg-red-500 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

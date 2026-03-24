"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { History, Trash2, Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWatchHistory } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

export default function HistoryPage() {
  const { history, clearHistory } = useWatchHistory()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-secondary" />
          <div className="mt-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-secondary"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Group history by date
  const groupedHistory = history.reduce((groups, item) => {
    const date = new Date(item.watchedAt).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {} as Record<string, typeof history>)

  const dateGroups = Object.entries(groupedHistory)

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Watch History</h1>
                <p className="text-muted-foreground">
                  {history.length} episodes watched
                </p>
              </div>
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                onClick={clearHistory}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <History className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No watch history</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Start watching anime to build your history.
            </p>
            <Link href="/">
              <Button>Browse Anime</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {dateGroups.map(([date, items]) => (
              <div key={date}>
                <h2 className="mb-4 text-lg font-semibold text-muted-foreground">
                  {date === new Date().toDateString()
                    ? "Today"
                    : date === new Date(Date.now() - 86400000).toDateString()
                    ? "Yesterday"
                    : date}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <Link
                      key={`${item.animeId}-${item.episodeNumber}-${item.watchedAt}`}
                      href={`/watch/${item.animeId}?ep=${item.episodeNumber}`}
                    >
                      <div className="group flex gap-4 rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/50 hover:bg-card">
                        {/* Thumbnail */}
                        <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={item.poster}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          
                          {/* Progress Bar */}
                          {item.progress && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          )}

                          {/* Play Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Play className="h-4 w-4 fill-current" />
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Episode {item.episodeNumber}
                          </p>
                          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(item.watchedAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

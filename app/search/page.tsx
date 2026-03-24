"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimeCard, AnimeCardSkeleton } from "@/components/anime-card"
import { searchAnime, mockAnimeList } from "@/lib/mock-data"
import { Anime } from "@/lib/types"
import { cn } from "@/lib/utils"

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  
  const [searchInput, setSearchInput] = useState(query)
  const [results, setResults] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const genres = Array.from(
    new Set(mockAnimeList.flatMap((anime) => anime.genres))
  ).sort()

  const statuses = ["ongoing", "completed", "upcoming"]

  const performSearch = useCallback(async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    let filtered = query ? searchAnime(query) : mockAnimeList
    
    if (selectedGenre) {
      filtered = filtered.filter((anime) =>
        anime.genres.includes(selectedGenre)
      )
    }
    
    if (selectedStatus) {
      filtered = filtered.filter((anime) => anime.status === selectedStatus)
    }
    
    setResults(filtered)
    setIsLoading(false)
  }, [query, selectedGenre, selectedStatus])

  useEffect(() => {
    performSearch()
  }, [performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    } else {
      router.push("/search")
    }
  }

  const clearFilters = () => {
    setSelectedGenre(null)
    setSelectedStatus(null)
    setSearchInput("")
    router.push("/search")
  }

  const hasActiveFilters = selectedGenre || selectedStatus || query

  return (
    <div className="min-h-screen pb-16">
      {/* Search Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold">Search Anime</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title or genre..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-lg outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>

          {/* Filters */}
          <div className="space-y-4">
            {/* Genre Filter */}
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                Genres
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() =>
                      setSelectedGenre(selectedGenre === genre ? null : genre)
                    }
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                      selectedGenre === genre
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Status
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setSelectedStatus(selectedStatus === status ? null : status)
                    }
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-all",
                      selectedStatus === status
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                Found <span className="font-semibold text-foreground">{results.length}</span> anime
                {query && (
                  <>
                    {" "}for &quot;<span className="font-semibold text-foreground">{query}</span>&quot;
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No results found</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Try adjusting your search or filters to find what you&apos;re looking
              for.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-secondary" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

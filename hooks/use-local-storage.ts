"use client"

import { useState, useEffect, useCallback } from 'react'
import { WatchHistory, Bookmark } from '@/lib/types'

const WATCH_HISTORY_KEY = 'arvinime_watch_history'
const BOOKMARKS_KEY = 'arvinime_bookmarks'
const CONTINUE_WATCHING_KEY = 'arvinime_continue_watching'

// Watch History
export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistory[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(WATCH_HISTORY_KEY)
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const addToHistory = useCallback((item: WatchHistory) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.episodeId !== item.episodeId)
      const updated = [item, ...filtered].slice(0, 50)
      localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(WATCH_HISTORY_KEY)
    setHistory([])
  }, [])

  return { history, addToHistory, clearHistory }
}

// Bookmarks
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    if (stored) {
      setBookmarks(JSON.parse(stored))
    }
  }, [])

  const addBookmark = useCallback((item: Bookmark) => {
    setBookmarks(prev => {
      if (prev.some(b => b.animeId === item.animeId)) return prev
      const updated = [item, ...prev]
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeBookmark = useCallback((animeId: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.animeId !== animeId)
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isBookmarked = useCallback((animeId: string) => {
    return bookmarks.some(b => b.animeId === animeId)
  }, [bookmarks])

  const toggleBookmark = useCallback((item: Bookmark) => {
    if (isBookmarked(item.animeId)) {
      removeBookmark(item.animeId)
    } else {
      addBookmark(item)
    }
  }, [isBookmarked, removeBookmark, addBookmark])

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }
}

// Continue Watching
export function useContinueWatching() {
  const [continueWatching, setContinueWatching] = useState<WatchHistory[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(CONTINUE_WATCHING_KEY)
    if (stored) {
      setContinueWatching(JSON.parse(stored))
    }
  }, [])

  const updateProgress = useCallback((item: WatchHistory) => {
    setContinueWatching(prev => {
      const filtered = prev.filter(h => h.animeId !== item.animeId)
      const updated = [item, ...filtered].slice(0, 10)
      localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromContinue = useCallback((animeId: string) => {
    setContinueWatching(prev => {
      const updated = prev.filter(h => h.animeId !== animeId)
      localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return { continueWatching, updateProgress, removeFromContinue }
}

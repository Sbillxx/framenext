"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllTwibbon } from "@/lib/action";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
  slug: string;
  thumbnail: string;
}

interface UseSearchTwibbonsResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Twibbon[];
  isSearching: boolean;
  hasResults: boolean;
  clearSearch: () => void;
  selectResult: (twibbon: Twibbon) => void;
}

export const useSearchTwibbons = (onSelect?: (twibbon: Twibbon) => void, debounceMs: number = 300): UseSearchTwibbonsResult => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Twibbon[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [allTwibbons, setAllTwibbons] = useState<Twibbon[]>([]);

  // Load all twibbons once when hook initializes
  useEffect(() => {
    const loadTwibbons = async () => {
      try {
        const result = await getAllTwibbon();
        if (result.success && result.data) {
          setAllTwibbons(result.data);
        }
      } catch (error) {
        console.error("❌ useSearchTwibbons: Error loading twibbons:", error);
      }
    };

    loadTwibbons();
  }, []);

  // Debounced search function
  const performSearch = useCallback(
    (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      // Simulate async search with setTimeout for smooth UX
      setTimeout(() => {
        const filtered = allTwibbons.filter((twibbon) => {
          const searchLower = term.toLowerCase();
          return twibbon.name.toLowerCase().includes(searchLower) || twibbon.description.toLowerCase().includes(searchLower);
        });

        // Limit results to 5 for better UX
        setSearchResults(filtered.slice(0, 5));
        setIsSearching(false);
      }, 100); // Small delay for smooth animation
    },
    [allTwibbons]
  );

  // Debounce search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, performSearch, debounceMs]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const selectResult = useCallback(
    (twibbon: Twibbon) => {
      setSearchTerm(twibbon.name);
      setSearchResults([]);
      onSelect?.(twibbon);
    },
    [onSelect]
  );

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    hasResults: searchResults.length > 0,
    clearSearch,
    selectResult,
  };
};

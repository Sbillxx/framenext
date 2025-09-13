"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchTwibbons } from "@/hooks/useSearchTwibbons";
import { useDynamicUrl } from "@/hooks/useDynamicUrl";

interface SearchDropdownProps {
  className?: string;
  placeholder?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchDropdown({ className = "", placeholder = "Cari Kampanye", isMobile = false, onClose }: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getTwibbonUrl } = useDynamicUrl();

  const { searchTerm, setSearchTerm, searchResults, isSearching, hasResults, clearSearch, selectResult } = useSearchTwibbons((twibbon) => {
    // Navigate to twibbon when selected
    window.location.href = getTwibbonUrl(twibbon.slug);
  });

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle input blur (with delay to allow clicks)
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          selectResult(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle clear search
  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`
            w-full pl-4 pr-10 py-3 rounded-full border-2 text-sm focus:outline-none focus:ring-2 focus:ring-white 
            transition-all duration-300 ease-in-out hover:shadow-lg focus:shadow-lg transform hover:scale-105 focus:scale-105
            ${
              isMobile
                ? "bg-blue-500 border-white text-white placeholder-white focus:bg-blue-600 focus:border-blue-200"
                : "bg-blue-500 border-white text-white placeholder-white hover:bg-blue-600 hover:border-blue-200 focus:bg-blue-600 focus:border-blue-200"
            }
          `}
        />

        {/* Search Icon or Loading Spinner */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <motion.svg className="w-4 h-4 text-white transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ scale: 1.1, rotate: 5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </motion.svg>
          )}
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white hover:text-red-300 transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (hasResults || isSearching || searchTerm) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {/* Loading State */}
            {isSearching && (
              <div className="p-4 text-center text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                  <span>Mencari...</span>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isSearching && searchTerm && !hasResults && (
              <div className="p-4 text-center text-gray-500">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.798-6.086-2.134L3 15l1.914-2.134A7.962 7.962 0 0112 9a7.962 7.962 0 017.086 4.134L21 15l-2.914-2.134A7.962 7.962 0 0116 15z"
                  />
                </svg>
                <p className="text-sm">Tidak ada hasil untuk &quot;{searchTerm}&quot;</p>
                <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
              </div>
            )}

            {/* Search Results */}
            {!isSearching && hasResults && (
              <div className="py-2">
                {searchResults.map((twibbon, index) => (
                  <Link
                    key={twibbon.id}
                    href={getTwibbonUrl(twibbon.slug)}
                    onClick={() => {
                      selectResult(twibbon);
                      onClose?.();
                    }}
                  >
                    <motion.div
                      className={`
                        px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-l-4 
                        ${selectedIndex === index ? "bg-blue-50 border-blue-500" : "border-transparent hover:border-blue-200"}
                      `}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={`/api/images/twibbons/thumbnail/${twibbon.thumbnail}`} alt={twibbon.name} width={40} height={40} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{twibbon.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{twibbon.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-blue-600">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <motion.svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={selectedIndex === index ? { x: 2 } : { x: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* Show All Results */}
                {searchTerm && searchResults.length > 0 && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <Link href={`/jelajahi?search=${encodeURIComponent(searchTerm)}`} onClick={() => onClose?.()} className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Lihat semua hasil untuk &quot;{searchTerm}&quot;
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

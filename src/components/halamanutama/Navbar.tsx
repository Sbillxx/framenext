"use client";

import Image from "next/image";
// ... existing code ...
import { motion } from "framer-motion";
// ... existing code ...

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-7xl w-full mx-auto px-4 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/">
        <div className="flex items-center">
          <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-8 w-auto" />
        </div>
      </Link>

      {/* Right: Search Box + Button + Hamburger */}
      <div className="flex items-center space-x-10">
        {/* Search Box */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Cari Kampanye"
            className="pl-4 pr-10 py-3 rounded-full bg-blue-500 border-2 border-white text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white w-100 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:border-blue-200 hover:shadow-lg focus:bg-blue-600 focus:border-blue-200 focus:shadow-lg transform hover:scale-105 focus:scale-105"
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Orange Button */}
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: 1,
            boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative px-6 py-3 rounded-full bg-[#ff6600] text-white font-semibold overflow-hidden group"
        >
          {/* Ripple animation */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

          {/* Text */}
          <span className="relative z-10 flex items-center">+ Mulai Kampanye</span>

          {/* Glow effect */}
          <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
        </motion.button>

        {/* Hamburger Menu (3 lines) */}
        <button className="p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

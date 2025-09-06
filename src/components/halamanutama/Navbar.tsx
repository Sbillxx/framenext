"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSlideMenu = () => {
    setIsSlideMenuOpen(!isSlideMenuOpen);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <section className="bg-[#0268f8] fixed top-0 left-0 right-0 z-50 w-full">
        <nav className="max-w-5xl w-full mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/">
            <div className="flex items-center">
              {/* Mobile: Simple text logo */}
              <div className="md:hidden text-white font-bold text-xl">
                <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-5 w-auto" />
              </div>
              {/* Desktop: Full logo */}
              <div className="hidden md:block">
                <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-8 w-auto" />
              </div>
            </div>
          </Link>

          {/* Right: Search Box + Button + Hamburger */}
          <div className="flex items-center space-x-4 md:space-x-10">
            {/* Search Box - Hidden on mobile */}
            <div className="relative group hidden md:block">
              <input
                type="text"
                placeholder="Cari Kampanye"
                className="pl-4 pr-10 py-3 rounded-full bg-blue-500 border-2 border-white text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white w-100 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:border-blue-200 hover:shadow-lg focus:bg-blue-600 focus:border-blue-200 focus:shadow-lg transform hover:scale-105 focus:scale-105"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Orange Button - Hidden on mobile */}
            <Link href="/blank-page">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  rotate: 1,
                  boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative px-6 py-3 rounded-full bg-[#ff6600] text-white font-semibold overflow-hidden group hidden md:block"
              >
                {/* Ripple animation */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

                {/* Text */}
                <span className="relative z-10 flex items-center">+ Mulai Kampanye</span>

                {/* Glow effect */}
                <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
              </motion.button>
            </Link>

            {/* Desktop Hamburger Menu */}
            <motion.button
              onClick={toggleSlideMenu}
              className="hidden md:block p-2 rounded-md hover:bg-opacity-10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={isSlideMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  animate={
                    isSlideMenuOpen
                      ? {
                          d: "M6 18L18 6M6 6l12 12",
                        }
                      : {
                          d: "M4 6h16M4 12h16M4 18h16",
                        }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.button>

            {/* Mobile: Search Icon */}
            <button className="md:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hamburger Menu (3 lines) */}
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors md:hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  animate={
                    isMenuOpen
                      ? {
                          d: "M6 18L18 6M6 6l12 12",
                        }
                      : {
                          d: "M4 6h16M4 12h16M4 18h16",
                        }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu - Slides down */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[#0268f8] overflow-hidden shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Search Box for Mobile */}
                <motion.div className="relative" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <motion.input
                    type="text"
                    placeholder="Cari Kampanye"
                    className="w-full pl-4 pr-10 py-3 rounded-full bg-blue-500 border-2 border-white text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <motion.svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      color: "#ff6600",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </motion.svg>
                </motion.div>

                {/* Mobile Menu Items */}
                <div className="space-y-3">
                  <Link href="/" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Beranda
                  </Link>
                  <Link href="/jelajahi" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Jelajahi
                  </Link>
                  <Link href="/contoh" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Contoh
                  </Link>
                  <Link href="/tentang" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Tentang Kami
                  </Link>
                  <Link href="/viral" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Lagi Viral
                  </Link>
                  <Link href="/bantuan" className="block text-white hover:text-orange-300 transition-colors py-2">
                    Pusat Bantuan
                  </Link>
                </div>

                {/* Mobile CTA Button */}
                <Link href="/blank-page">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-6 py-3 rounded-full bg-[#ff6600] text-white font-semibold hover:bg-orange-600 transition-colors">
                    + Mulai Kampanye
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Background Blur Overlay */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0  bg-opacity-20 backdrop-blur-3xl z-40 md:hidden" onClick={toggleMenu} />}
      </AnimatePresence>

      {/* Desktop Slide-in Menu */}
      <AnimatePresence>
        {isSlideMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0  z-40 hidden md:block" onClick={toggleSlideMenu} />

            {/* Slide Menu */}
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-80 bg-[#0268f8] z-50 hidden md:block shadow-2xl">
              <div className="p-6 h-full flex flex-col max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <Link href="/tentang" className="block text-white hover:text-orange-300 transition-colors text-lg font-medium">
                      Tentang Kami
                    </Link>
                    <Link href="/viral" className="block text-white hover:text-orange-300 transition-colors text-lg font-medium">
                      Lagi Viral
                    </Link>
                    <Link href="/bantuan" className="block text-white hover:text-orange-300 transition-colors text-lg font-medium">
                      Pusat Bantuan
                    </Link>
                  </div>
                  <button onClick={toggleSlideMenu} className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Separator */}
                <div className="border-t border-white border-opacity-20 mb-8"></div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                  <button className="flex-1 px-4 py-3 border border-white text-white rounded-full hover:bg-white hover:text-[#0268f8] transition-all duration-200 font-medium">Masuk</button>
                  <button className="flex-1 px-4 py-3 bg-[#ff6600] text-white rounded-full hover:bg-orange-600 transition-all duration-200 font-medium">Daftar</button>
                </div>

                {/* Language Selector */}
                <div className="mt-auto flex items-center space-x-2 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">Bahasa Indonesia</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
}

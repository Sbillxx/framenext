"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Jumbotron() {
  return (
    <section className="bg-white ">
      <div className="max-w-5xl w-full mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-[#0268f8] rounded-4xl p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative shapes */}
          {/* <div className="absolute right-0 top-0 w-32 h-32 bg-[#ff6600] rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-400 rounded-full opacity-20 transform translate-x-12 translate-y-12"></div> */}

          {/* Mobile Layout */}
          <div className="lg:hidden text-center ">
            {/* Logo - Centered */}
            <div className="flex justify-center mb-6">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/images/frameid-jumobotron.png" alt="Frame ID Logo" width={200} height={60} className="h-32 w-auto" />
                </div>
              </Link>
            </div>

            {/* Main Heading */}
            {/* <h2 className="text-2xl font-bold text-white mb-4 text-left">Celebrate Moments with Twibbon</h2> */}

            {/* Sub Heading */}
            <h3 className="text-xl font-bold text-white mb-6 text-left">Enaknya pake Frame ID tuh..</h3>

            {/* Features List */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-white">Cepet & Gampang banget</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-white">Praktis Tinggal Upload</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-white">Tanpa Watermark</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-white">100% Gratis</span>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left Section - Branding */}
            <div className="text-white">
              {/* Logo */}
              <Link href="/">
                <div className="flex items-center mb-4">
                  <Image src="/images/jumbotron-revisi.png" alt="Frame ID Logo" width={200} height={60} className="h-40 w-auto" />
                </div>
              </Link>
            </div>

            {/* Right Section - Features & CTA */}
            <div className="text-white">
              {/* Headline */}

              {/* Features List */}
              <div className="space-y-3=5 mb-8 py-">
                <div className="flex items-center">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Enaknya pake Frame ID tuh..</h3>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Cepet & Gampang banget</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Praktis Tinggal Upload</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Tanpa Watermark</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#ff6600] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">100% Gratis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-center mt-8">
            {/* Mobile Layout - Blue Background */}
            <div className="lg:hidden w-full bg-[#0268f8] rounded-2xl p-8 -mx-8 -mb-8">
              <div className="flex justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-full px-4 py-2 rounded-full bg-[#ff6600] text-white font-bold text-xs overflow-hidden group"
                >
                  {/* Ripple animation */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

                  {/* Text */}
                  <span className="relative z-10 flex items-center">Gas, bikin Twibbonmu Sekarang!</span>

                  {/* Glow effect */}
                  <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
                </motion.button>
              </div>
            </div>

            {/* Desktop Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hidden lg:block relative px-8 py-3 rounded-full bg-[#ff6600] text-white font-bold text-lg overflow-hidden group"
            >
              {/* Ripple animation */}
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center">Gas, bikin Twibbonmu Sekarang!</span>

              {/* Glow effect */}
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

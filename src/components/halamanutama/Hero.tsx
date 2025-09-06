"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0268f8] h-75 lg:h-120 ">
      <div className="max-w-5xl w-full mx-auto px-4 md:px-2 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-80px)] lg:min-h-[50vh] pt-2">
        {/* Mobile Content - Left Aligned */}
        <div className="lg:hidden text-left w-full mt-10">
          <h1 className="text-xl md:text-2xl font-extrabold leading-tight mb-6 text-white">
            Celebrate Moments
            <br />
            with Twibbon
          </h1>
          <p className="text-sm md:text-base mb-8 text-white leading-relaxed">Dari momen kecil sampai event gede, kasih sentuhan keren pakai twibbon. Frame ID siap bikin momenmu naik level. Gratis gapake watermark!</p>

          {/* Mobile Button - Left Aligned */}
          <Link href="/blank-page">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative px-6 py-3 rounded-full bg-[#ff6600] text-white font-bold text-base overflow-hidden group w-auto"
            >
              {/* Ripple animation */}
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">+</span>
                Mulai Kampanye
              </span>

              {/* Glow effect */}
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
            </motion.button>
          </Link>
        </div>

        {/* Desktop Content - Left Side */}
        <div className="hidden lg:block lg:w-2/3 text-center lg:text-left mb-4 lg:mb-0 -mt-30">
          <h1 className="text-xl md:text-5xl font-extrabold leading-tight mb-5">Celebrate Moments with Twibbon</h1>
          <p className="text-sm md:text-l mb-8 max-w-lg mx-auto lg:mx-0 text-justify">
            Dari momen kecil sampai event gede, kasih sentuhan keren pakai <strong>twibbon</strong>, <strong>Frame ID</strong> siap bikin momenmu naik level. <strong>GRATIS TANPA WATERMARK!!</strong>
          </p>

          {/* Desktop Button */}
          <Link href="/blank-page">
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 1,
                boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative px-8 py-3 rounded-full bg-[#ff6600] text-white font-bold text-lg overflow-hidden group"
            >
              {/* Ripple animation */}
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center">+ Mulai Kampanye</span>

              {/* Glow effect */}
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
            </motion.button>
          </Link>
        </div>

        {/* Right: Icon PNG Placeholder - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:w-1/2 justify-center lg:justify-end">
          {/* Frameid White.png */}
          <div className="h-[500px] flex items-center justify-center mt-10">
            <Image src="/images/gabung.png" alt="Frame ID Logo" width={500} height={600} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

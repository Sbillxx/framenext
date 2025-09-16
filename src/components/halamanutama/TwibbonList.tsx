"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDynamicUrl } from "@/hooks/useDynamicUrl";
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

// Props sekarang opsional - komponen bisa mengambil data sendiri
interface TwibbonListProps {
  initialTwibbons?: Twibbon[];
  initialLoading?: boolean;
  autoFetch?: boolean; // Flag untuk auto fetch data
}

export default function TwibbonList({ initialTwibbons = [], initialLoading = true, autoFetch = true }: TwibbonListProps) {
  const { getTwibbonUrl } = useDynamicUrl();

  // State untuk mengelola data internal
  const [twibbons, setTwibbons] = useState<Twibbon[]>(initialTwibbons);
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(null);

  // Function untuk fetch data menggunakan server action
  const fetchTwibbons = async () => {
    try {
      console.log("🚀 TwibbonList: Fetching twibbons using server action...");
      setLoading(true);
      setError(null);

      const result = await getAllTwibbon();

      if (result.success && result.data) {
        console.log("✅ TwibbonList: Twibbons loaded successfully:", result.count);
        setTwibbons(result.data);
      } else {
        console.error("❌ TwibbonList: Failed to fetch twibbons:", result.error);
        setError(result.error || "Failed to fetch twibbons");
        setTwibbons([]);
      }
    } catch (error) {
      console.error("❌ TwibbonList: Error fetching twibbons:", error);
      setError("An error occurred while fetching twibbons");
      setTwibbons([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk auto fetch data saat component mount
  useEffect(() => {
    if (autoFetch && initialTwibbons.length === 0) {
      fetchTwibbons();
    }
  }, [autoFetch, initialTwibbons.length]);

  // Function untuk refresh data (bisa dipanggil dari luar)
  const refreshTwibbons = () => {
    fetchTwibbons();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} bulan yang lalu`;
    return `${Math.floor(diffInSeconds / 31536000)} tahun yang lalu`;
  };

  return (
    <section id="lagi-viral" className="bg-white-500 mb-11">
      <div className="container px-4 py-4 md:py-1 max-w-5xl w-full mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-2xl font-bold my-4 md:my-8 text-[#0268f8] flex items-center">
            <Image src="/images/fire2.png" alt="Viral Icon" width={48} height={48} className="mr-3 w-8 h-10 md:w-8 md:h-10 md:mr-5" />
            <span className="text-[#0268f8]">Lagi Viral</span>
          </h2>

          {/* Refresh Button */}
          <motion.button
            onClick={refreshTwibbons}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? "Loading..." : "Refresh"}
          </motion.button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-center text-gray-600">Loading twibbons...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 md:py-12">
            <div className="text-red-400 mb-4">
              <svg className="mx-auto h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">Error Loading Twibbons</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4">{error}</p>
            <motion.button onClick={refreshTwibbons} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Try Again
            </motion.button>
          </div>
        ) : twibbons.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">Belum ada twibbon viral</h3>
            <p className="text-gray-600 text-sm md:text-base">Twibbon akan muncul di sini setelah ditambahkan oleh admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {twibbons.map((twibbon, index) => (
              <motion.div
                key={twibbon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-lg overflow-hidden cursor-pointer"
              >
                <Link href={getTwibbonUrl(twibbon.slug)}>
                  <motion.div className="aspect-square relative w-full overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image src={`/api/images/twibbons/thumbnail/${twibbon.thumbnail}`} alt={twibbon.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                  </motion.div>
                  <div className="p-1.5 md:p-2">
                    {/* Judul dengan scroll kalo kepanjangan */}
                    <div className="overflow-hidden mb-1 md:mb-1.5">
                      <motion.div
                        className="font-semibold text-xs md:text-sm text-gray-800 whitespace-nowrap"
                        animate={
                          twibbon.name && twibbon.name.length > 20
                            ? {
                                x: [0, -100],
                              }
                            : {}
                        }
                        transition={{
                          duration: twibbon.name && twibbon.name.length > 20 ? 8 : 0,
                          repeat: twibbon.name && twibbon.name.length > 20 ? Infinity : 0,
                          ease: "linear",
                        }}
                        whileHover={{ color: "#0268f8" }}
                      >
                        {twibbon.name || "Judul Twibbon disini ea.."}
                      </motion.div>
                    </div>

                    {/* Row 1: Akun Creator */}
                    <div className="flex items-center mb-0.5 md:mb-1">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-200 mr-1 flex items-center justify-center text-[10px] md:text-xs text-gray-500">PP</div>
                      <span className="text-gray-600 text-[10px] md:text-xs">Akun Creator</span>
                    </div>

                    {/* Row 2: Jumlah Dukungan */}
                    <div className="flex items-center mb-0.5 md:mb-1">
                      <Image src="/images/orang2.png" alt="Icon Orang" width={200} height={200} className="mr-1 w-2.5 h-2.5 md:w-4 md:h-3" />
                      <span className="text-gray-600 text-[10px] md:text-xs">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
                    </div>

                    {/* Row 3: Waktu Pembuatan */}
                    <div className="flex items-center">
                      <Image src="/images/jam.png" alt="Icon Jam" width={200} height={200} className="mr-1 w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span className="text-gray-600 text-[10px] md:text-xs">{formatTimeAgo(twibbon.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Button Selengkapnya - HIDDEN */}
      {/* <div className="flex justify-center w-full mt-6 md:mt-8">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#ff6600] text-white font-semibold overflow-hidden group text-sm md:text-base"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>
          <span className="relative z-10 flex items-center">Selengkapnya</span>
          <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
        </motion.button>
      </div> */}
    </section>
  );
}

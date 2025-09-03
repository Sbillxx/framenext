"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
}

interface TwibbonListProps {
  twibbons: Twibbon[];
  loading: boolean;
}

export default function TwibbonList({ twibbons, loading }: TwibbonListProps) {
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
    <section className="bg-white-500 mb-11">
      <div className="container px-4 py-4 md:py-1 max-w-5xl w-full mx-auto">
        <div className="flex items-center justify-start mb-6 md:mb-8">
          <h2 className="text-2xl md:text-5xl font-bold my-4 md:my-8 text-[#0268f8] flex items-center">
            <Image src="/images/fire2.png" alt="Viral Icon" width={48} height={48} className="mr-3 w-40 h-9 md:w-auto md:h-auto md:mr-5" />
            <span className="text-[#0268f8]">Lagi Viral</span>
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading twibbons...</p>
        ) : twibbons.length === 0 ? (
          <p className="text-center text-gray-600">No twibbons found. Add some from the admin panel!</p>
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
                className="bg-white rounded-xl overflow-hidden cursor-pointer"
              >
                <Link href={`/twibbon/${twibbon.id}`}>
                  <motion.div className="aspect-square relative w-full overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image src={twibbon.url} alt={twibbon.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                  </motion.div>
                  <div className="p-2 md:p-4">
                    {/* Judul dengan scroll kalo kepanjangan */}
                    <div className="overflow-hidden mb-2 md:mb-3">
                      <motion.div
                        className="font-semibold text-sm md:text-lg text-gray-800 whitespace-nowrap"
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
                    <div className="flex items-center mb-1 md:mb-2">
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-200 mr-1 md:mr-2 flex items-center justify-center text-xs text-gray-500">PP</div>
                      <span className="text-gray-600 text-xs md:text-sm">Akun Creator</span>
                    </div>

                    {/* Row 2: Jumlah Dukungan */}
                    <div className="flex items-center mb-1 md:mb-2">
                      <Image src="/images/icon-orang.png" alt="Icon Orang" width={12} height={12} className="mr-1 md:mr-2 w-3 h-3 md:w-auto md:h-auto" />
                      <span className="text-gray-600 text-xs md:text-sm">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
                    </div>

                    {/* Row 3: Waktu Pembuatan */}
                    <div className="flex items-center">
                      <Image src="/images/icon-jam.png" alt="Icon Jam" width={12} height={12} className="mr-1 md:mr-2 w-3 h-3 md:w-auto md:h-auto" />
                      <span className="text-gray-600 text-xs md:text-sm">{formatTimeAgo(twibbon.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && twibbons.length === 0 && (
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
        )}
      </div>
      <div className="flex justify-center w-full mt-6 md:mt-8">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(255, 102, 0, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#ff6600] text-white font-semibold overflow-hidden group text-sm md:text-base"
        >
          {/* Ripple animation */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-500"></span>

          {/* Text */}
          <span className="relative z-10 flex items-center">Selengkapnya</span>

          {/* Glow effect */}
          <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></span>
        </motion.button>
      </div>
    </section>
  );
}

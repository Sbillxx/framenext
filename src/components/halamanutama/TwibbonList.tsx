"use client";

import Image from "next/image";
import Link from "next/link";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  url: string;
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
    <section className="bg-white min-h-screen -mt-50">
      <div className="container px-4 py-12 max-w-7xl w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#0268f8] flex items-center">
            <span className="mr-2">🔥</span> Lagi Viral
          </h2>
          <Link href="/jelajahi" className="text-[#0268f8] hover:text-blue-700 font-medium">
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading twibbons...</p>
        ) : twibbons.length === 0 ? (
          <p className="text-center text-gray-600">No twibbons found. Add some from the admin panel!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {twibbons.map((twibbon) => (
              <div key={twibbon.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105">
                <Link href={`/twibbon/${twibbon.id}`}>
                  <div className="aspect-square relative w-full rounded-t-xl overflow-hidden">
                    <Image src={twibbon.url} alt={twibbon.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{twibbon.name}</h3>
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs text-gray-500">PP</div>
                        <span>Akun Creator</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span>0 dukungan</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(twibbon.created_at)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && twibbons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada twibbon viral</h3>
            <p className="text-gray-600">Twibbon akan muncul di sini setelah ditambahkan oleh admin.</p>
          </div>
        )}
      </div>
    </section>
  );
}
